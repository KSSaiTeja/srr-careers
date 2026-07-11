import { Readable } from "stream";
import { google } from "googleapis";
import {
  getGoogleAuth,
  GOOGLE_DRIVE_SCOPES,
} from "@/lib/google/auth";

const MAX_RESUME_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_MIME = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

function resolveDriveFolderId(): string {
  const raw = process.env.GOOGLE_DRIVE_FOLDER_ID?.trim() ?? "";
  if (!raw) {
    throw new Error("Resume upload is not configured.");
  }

  // Common mistake: pasting a Google API key (AIza…) instead of a folder id.
  if (raw.startsWith("AIza")) {
    throw new Error(
      "GOOGLE_DRIVE_FOLDER_ID looks like an API key. Use the Drive folder id from the folder URL instead (drive.google.com/drive/folders/<FOLDER_ID>).",
    );
  }

  // Allow pasting a full folder URL.
  const fromUrl = raw.match(/\/folders\/([a-zA-Z0-9_-]+)/)?.[1];
  if (fromUrl) return fromUrl;

  // Strip query params if someone pasted id=...
  const fromQuery = raw.match(/[?&]id=([a-zA-Z0-9_-]+)/)?.[1];
  if (fromQuery) return fromQuery;

  return raw;
}

export function isDriveUploadConfigured(): boolean {
  try {
    const id = process.env.GOOGLE_DRIVE_FOLDER_ID?.trim();
    if (!id || id.startsWith("AIza")) return false;
    return Boolean(getGoogleAuth(GOOGLE_DRIVE_SCOPES));
  } catch {
    return false;
  }
}

/**
 * Uploads a resume to a shared Drive folder and returns a view link for the sheet.
 *
 * Setup:
 *   1. Enable Google Drive API on the same GCP project as Sheets.
 *   2. Create a Drive folder → share with the service account email (Editor).
 *   3. Set GOOGLE_DRIVE_FOLDER_ID to the folder id from the URL:
 *        https://drive.google.com/drive/folders/<THIS_PART>
 *      (Not a Google API key — those start with AIza…)
 */
export async function uploadResumeToDrive(file: {
  buffer: Buffer;
  filename: string;
  mimeType: string;
}): Promise<string> {
  const folderId = resolveDriveFolderId();
  const auth = getGoogleAuth(GOOGLE_DRIVE_SCOPES);
  if (!auth) {
    throw new Error("Resume upload is not configured.");
  }

  if (file.buffer.byteLength > MAX_RESUME_BYTES) {
    throw new Error("Resume must be 5 MB or smaller.");
  }
  if (!ALLOWED_MIME.has(file.mimeType)) {
    throw new Error("Resume must be a PDF or Word document.");
  }

  const drive = google.drive({ version: "v3", auth });
  const safeName = file.filename.replace(/[^\w.\-() ]+/g, "_").slice(0, 120);
  const stamped = `${Date.now()}-${safeName}`;

  const created = await drive.files.create({
    requestBody: {
      name: stamped,
      parents: [folderId],
    },
    media: {
      mimeType: file.mimeType,
      body: Readable.from(file.buffer),
    },
    fields: "id, webViewLink",
    supportsAllDrives: true,
  });

  const fileId = created.data.id;
  if (!fileId) throw new Error("Drive upload failed.");

  await drive.permissions.create({
    fileId,
    requestBody: { role: "reader", type: "anyone" },
    supportsAllDrives: true,
  });

  const meta = await drive.files.get({
    fileId,
    fields: "webViewLink",
    supportsAllDrives: true,
  });

  return (
    meta.data.webViewLink || `https://drive.google.com/file/d/${fileId}/view`
  );
}

export { MAX_RESUME_BYTES, ALLOWED_MIME };
