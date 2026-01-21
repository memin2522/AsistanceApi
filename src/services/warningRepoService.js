import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const WARNINGS_FILE = path.join(__dirname, "../../data/warnings.json");

export function loadWarnings() {
    try {
        const raw = fs.readFileSync(WARNINGS_FILE, "utf-8");
        return JSON.parse(raw);
    } catch (error) {
        return [];
    }
}

export function saveWarnings(existingWarnings, newWarnings) {
  const allWarnings = [...existingWarnings, ...newWarnings];

  fs.writeFileSync(
    WARNINGS_FILE,
    JSON.stringify(allWarnings, null, 2),
    "utf-8"
  );

  return allWarnings;
}