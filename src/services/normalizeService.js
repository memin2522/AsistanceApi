export function normalizeSheet(rows, course) {

    if (!rows || rows.length === 0) {
        return [];
    }

    const [headerRow, ...dataRows] = rows;
    const columnMap = mapColumns(headerRow);

    const students = [];

    for (const row of dataRows) {
        const student = normalizeRow(row, columnMap, course);
        if (student) {
            students.push(student);
        }
    }

    return students;

}

function mapColumns(headerRow) {
    return {
        nameIndex: headerRow.findIndex(h => h?.toLowerCase() === "nombre"),
        codeIndex: headerRow.findIndex(h => h?.toLowerCase() === "codigo"),
        emailIndex: headerRow.findIndex(h => h?.toLowerCase() === "correo"),
        sessionStartIndex: 3
    };
}

function normalizeRow(row, columnMap, course) {
    const name = row[columnMap.nameIndex];
    const code = row[columnMap.codeIndex];
    const email = row[columnMap.emailIndex];

    if (!name || !code || !email) {
        return null;
    }

    const absences = countAbsences(
        row.slice(columnMap.sessionStartIndex)
    );

    return {
        name,
        code,
        email,
        absences,
        course: course.name
    };
}

function countAbsences(sessionCells) {
    let absences = 0;

    for (const cell of sessionCells) {
        if (!cell || cell.trim() === "n") {
            absences++;
        }
    }

    return absences;
}