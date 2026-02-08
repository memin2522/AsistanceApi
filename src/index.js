import "dotenv/config";
import { getSheetPages, getSheetRows } from "./services/sheets/sheetsReader.js";
import { normalizeSheet } from "./services/normalizeService.js";
import { loadWarnings, saveWarnings } from "./services/warningRepoService.js";
import { evaluateAttendance } from "./services/evaluatorService.js";

import config from "./config/loadConfig.js";

async function main() {
    const courses = config.Courses;
    const warningRecords = loadWarnings();

    let resultPages = await getSheetPages(process.env.SPREADSHEET_ID);
    for (const page of resultPages) {
        const course = courses.find(c => c.name === page);
        if (!course) {
            return;
        }

        const rows = await getSheetRows(process.env.SPREADSHEET_ID, page);
        const students = normalizeSheet(rows, course);
        const newWarnings = evaluateAttendance(students, course, warningRecords);

        if (newWarnings.length > 0) {
            saveWarnings(warningRecords, newWarnings)
        }
    }

}

main().catch(error => {
    console.error("Error:", error);
});