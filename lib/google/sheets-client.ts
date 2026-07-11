import { google, type sheets_v4 } from "googleapis";
import { getGoogleAuth, GOOGLE_SHEETS_SCOPES } from "@/lib/google/auth";

/**
 * Google Sheets backend via a service account (replaces the brittle Apps Script
 * web-app). Tabs in one spreadsheet, all auto-created with headers:
 *   - "Subscriptions"  newsletter sign-ups          (append)
 *   - "Leads"          demo-class enquiries          (append)
 *   - "Enrollments"    checkout records (upsert by Enrollment Ref)
 *   - "Join Our Team"  faculty / team applications   (append)
 *   - "Internships"    student internship applications (append)
 *
 * Setup (one-time):
 *   1. Google Cloud Console → create a Service Account → add a JSON key.
 *   2. Enable the "Google Sheets API" for that project.
 *   3. Share the target spreadsheet with the service account email (Editor).
 *   4. Env (pick ONE credential style):
 *        GOOGLE_SHEETS_SPREADSHEET_ID        the id in the sheet URL (/d/<ID>/edit)
 *      RECOMMENDED — paste the whole JSON key, base64-encoded (no newline pain):
 *        GOOGLE_SERVICE_ACCOUNT_JSON_BASE64  output of `base64 -i key.json`
 *      OR the two fields individually:
 *        GOOGLE_SERVICE_ACCOUNT_EMAIL        ...@...iam.gserviceaccount.com
 *        GOOGLE_PRIVATE_KEY                  the private_key (with \n escapes, quoted)
 *
 * Until configured, isSheetsConfigured() is false and callers no-op / 503.
 */

type RgbColor = { red: number; green: number; blue: number };

function hex(h: string): RgbColor {
  const n = parseInt(h.replace("#", ""), 16);
  return {
    red: ((n >> 16) & 255) / 255,
    green: ((n >> 8) & 255) / 255,
    blue: (n & 255) / 255,
  };
}

const STATUS_STYLES: Record<string, { bg: RgbColor; fg: RgbColor }> = {
  lead: { bg: hex("#cfe2ff"), fg: hex("#000000") },
  failed: { bg: hex("#ea4335"), fg: hex("#000000") }, // red bg / black text
  success: { bg: hex("#34a853"), fg: hex("#ffffff") },
  pending: { bg: hex("#fff3cd"), fg: hex("#000000") },
};

let cachedSheets: sheets_v4.Sheets | null = null;
const sheetIdCache = new Map<string, number>();

function getSpreadsheetId(): string | undefined {
  return process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
}

function getSheets(): sheets_v4.Sheets | null {
  if (!getSpreadsheetId()) return null;
  if (cachedSheets) return cachedSheets;

  const auth = getGoogleAuth(GOOGLE_SHEETS_SCOPES);
  if (!auth) return null;

  cachedSheets = google.sheets({ version: "v4", auth });
  return cachedSheets;
}

export function isSheetsConfigured(): boolean {
  return getSheets() !== null;
}

function headersMatch(existing: string[], expected: string[]): boolean {
  if (existing.length !== expected.length) return false;
  return expected.every((h, i) => existing[i] === h);
}

/** Returns the sheetId for a tab, creating it (with a bold, frozen header) if missing. */
async function ensureTab(
  sheets: sheets_v4.Sheets,
  spreadsheetId: string,
  title: string,
  headers: string[],
): Promise<number> {
  const meta = await sheets.spreadsheets.get({
    spreadsheetId,
    fields: "sheets.properties(sheetId,title)",
  });
  const existing = meta.data.sheets?.find(
    (s) => s.properties?.title === title,
  );

  let sheetId: number;
  if (existing?.properties?.sheetId != null) {
    sheetId = existing.properties.sheetId;
    const firstRow = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${title}!A1:1`,
    });
    const current = firstRow.data.values?.[0] ?? [];
    if (current.length === 0 || !headersMatch(current, headers)) {
      await writeHeader(sheets, spreadsheetId, sheetId, title, headers);
    }
  } else {
    const created = await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [{ addSheet: { properties: { title } } }],
      },
    });
    sheetId =
      created.data.replies?.[0]?.addSheet?.properties?.sheetId ?? 0;
    await writeHeader(sheets, spreadsheetId, sheetId, title, headers);
  }

  sheetIdCache.set(title, sheetId);
  return sheetId;
}

async function writeHeader(
  sheets: sheets_v4.Sheets,
  spreadsheetId: string,
  sheetId: number,
  title: string,
  headers: string[],
): Promise<void> {
  const endCol = columnLetter(headers.length - 1);
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `${title}!A1:${endCol}1`,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [headers] },
  });
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: [
        {
          repeatCell: {
            range: { sheetId, startRowIndex: 0, endRowIndex: 1 },
            cell: { userEnteredFormat: { textFormat: { bold: true } } },
            fields: "userEnteredFormat.textFormat.bold",
          },
        },
        {
          updateSheetProperties: {
            properties: { sheetId, gridProperties: { frozenRowCount: 1 } },
            fields: "gridProperties.frozenRowCount",
          },
        },
      ],
    },
  });
}

export type CellValue = string | number | null;

/** Appends one row to a tab. */
export async function appendRow(
  title: string,
  headers: string[],
  values: CellValue[],
): Promise<void> {
  const sheets = getSheets();
  const spreadsheetId = getSpreadsheetId();
  if (!sheets || !spreadsheetId) return;

  await ensureTab(sheets, spreadsheetId, title, headers);
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${title}!A1`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [values] },
  });
}

/**
 * Inserts or updates a single row, matched by the value in `keyColumnIndex`
 * (0-based). Optionally recolours a status cell. Used for Enrollments (key =
 * Order ID) so pending → success/failed updates the same row.
 */
export async function upsertRow(opts: {
  title: string;
  headers: string[];
  keyColumnIndex: number;
  keyValue: string;
  values: CellValue[];
  statusColumnIndex?: number;
  status?: string;
}): Promise<void> {
  const sheets = getSheets();
  const spreadsheetId = getSpreadsheetId();
  if (!sheets || !spreadsheetId) return;

  const { title, headers, keyColumnIndex, keyValue, values } = opts;
  const sheetId = await ensureTab(sheets, spreadsheetId, title, headers);

  const keyColLetter = columnLetter(keyColumnIndex);
  const keyCol = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${title}!${keyColLetter}2:${keyColLetter}`,
  });
  const keys = keyCol.data.values ?? [];

  let targetRow = -1; // 1-based sheet row
  for (let i = 0; i < keys.length; i++) {
    if (String(keys[i]?.[0] ?? "") === String(keyValue)) {
      targetRow = i + 2;
      break;
    }
  }

  if (targetRow === -1) {
    const appended = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${title}!A1`,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values: [values] },
    });
    targetRow = parseAppendedRow(appended.data.updates?.updatedRange);
  } else {
    const endCol = columnLetter(values.length - 1);
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${title}!A${targetRow}:${endCol}${targetRow}`,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [values] },
    });
  }

  if (
    opts.statusColumnIndex != null &&
    opts.status &&
    targetRow > 0 &&
    STATUS_STYLES[opts.status.toLowerCase()]
  ) {
    const style = STATUS_STYLES[opts.status.toLowerCase()]!;
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            repeatCell: {
              range: {
                sheetId,
                startRowIndex: targetRow - 1,
                endRowIndex: targetRow,
                startColumnIndex: opts.statusColumnIndex,
                endColumnIndex: opts.statusColumnIndex + 1,
              },
              cell: {
                userEnteredFormat: {
                  backgroundColor: style.bg,
                  textFormat: { foregroundColor: style.fg },
                },
              },
              fields:
                "userEnteredFormat(backgroundColor,textFormat.foregroundColor)",
            },
          },
        ],
      },
    });
  }
}

/** "Sheet1!A5:Q5" → 5. Falls back to -1 when it can't be parsed. */
function parseAppendedRow(updatedRange: string | null | undefined): number {
  if (!updatedRange) return -1;
  const match = updatedRange.match(/![A-Z]+(\d+):/);
  return match ? Number(match[1]) : -1;
}

/** 0 → "A", 25 → "Z", 26 → "AA". */
function columnLetter(index: number): string {
  let n = index;
  let s = "";
  do {
    s = String.fromCharCode((n % 26) + 65) + s;
    n = Math.floor(n / 26) - 1;
  } while (n >= 0);
  return s;
}
