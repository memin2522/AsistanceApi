import { google } from "googleapis";

export function createSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"]
  });

  return google.sheets({
    version: "v4",
    auth
  });
}