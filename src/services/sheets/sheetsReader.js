import { createSheetsClient } from "./sheetsClient.js";

export async function getSheetPages(spreadsheetId) {
  const sheets = createSheetsClient();

  const response = await sheets.spreadsheets.get({
    spreadsheetId
  });

  return response.data.sheets.map(
    sheet => sheet.properties.title
  );
}

export async function getSheetRows(spreadsheetId, sheetName) {
  const sheets = createSheetsClient();

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: sheetName
  });

  return response.data.values || [];
}