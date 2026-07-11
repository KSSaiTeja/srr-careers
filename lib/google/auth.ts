import { google } from "googleapis";

/**
 * Shared Google service-account auth for Sheets + Drive.
 */

const SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets";
const DRIVE_SCOPE = "https://www.googleapis.com/auth/drive.file";

function normalizeKey(raw: string): string {
  let key = raw.trim();
  if (
    (key.startsWith('"') && key.endsWith('"')) ||
    (key.startsWith("'") && key.endsWith("'"))
  ) {
    key = key.slice(1, -1);
  }
  if (key.includes("\\n")) key = key.replace(/\\n/g, "\n");
  return key;
}

export function loadGoogleCredentials(): { email: string; key: string } | null {
  const b64 =
    process.env.GOOGLE_SERVICE_ACCOUNT_JSON_BASE64 ??
    process.env.GOOGLE_SERVICE_ACCOUNT_KEY_BASE64;
  if (b64) {
    try {
      const json = JSON.parse(
        Buffer.from(b64.trim(), "base64").toString("utf8"),
      ) as { client_email?: string; private_key?: string };
      if (json.client_email && json.private_key) {
        return {
          email: json.client_email,
          key: normalizeKey(json.private_key),
        };
      }
    } catch (error) {
      console.error("[google] GOOGLE_SERVICE_ACCOUNT_JSON_BASE64 is invalid", error);
    }
  }

  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawKey = process.env.GOOGLE_PRIVATE_KEY;
  if (email && rawKey) return { email, key: normalizeKey(rawKey) };

  return null;
}

export function getGoogleAuth(scopes: string[]) {
  const creds = loadGoogleCredentials();
  if (!creds) return null;
  return new google.auth.JWT({
    email: creds.email,
    key: creds.key,
    scopes,
  });
}

export const GOOGLE_SHEETS_SCOPES = [SHEETS_SCOPE];
export const GOOGLE_DRIVE_SCOPES = [DRIVE_SCOPE];
export const GOOGLE_SHEETS_AND_DRIVE_SCOPES = [SHEETS_SCOPE, DRIVE_SCOPE];
