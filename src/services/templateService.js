import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const templateMap = {
    WARNING: "warning.html",
    LOST: "lost.html",
    REMINDER:  "reminder.html"
};