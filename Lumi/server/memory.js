const fs = require("fs");


function loadMemory() {
    if (!fs.existsSync("./memory.json")) {
        return [];
    }

    const raw_entries = fs.readFileSync("./memory.json", "utf8");
    return JSON.parse(raw_entries);
}

function saveEntry(entry) {
    let entries = loadMemory();
    entries.push(entry);

    if (entries.length > 20) {
        entries = entries.slice(-20);
    }
    fs.writeFileSync("./memory.json", JSON.stringify(entries, null, 2));
}

function getMostRecentEntries(count) {
    const entries = loadMemory();
    return entries.slice(-count);
}

function getLatestEntry() {
    const entries = loadMemory();
    if (entries.length === 0) {
        return null;
    }
    return entries[entries.length-1];
}

module.exports = {
    saveEntry,
    getMostRecentEntries,
    getLatestEntry
};