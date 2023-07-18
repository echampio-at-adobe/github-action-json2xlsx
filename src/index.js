const XLSX = require("xlsx");
const fs = require("fs").promises;

async function readJsonFile(filepath) {
  try {
    const originData = await fs.readFile(filepath, "utf8");
    return JSON.parse(originData);
  } catch (err) {
    console.error("Error reading file:", err);
    return null;
  }
}

function convertJsonToXlsx(jsonData, outputFileName) {
  const wb = XLSX.utils.book_new();
  
  for (let key in jsonData) {
    if (!key.startsWith(":")) {
      const ws = XLSX.utils.json_to_sheet(jsonData[key].data);
      XLSX.utils.book_append_sheet(wb, ws, "helix-" + key);
    }
  }

  // Write workbook to disk
  XLSX.writeFile(wb, outputFileName);
}

async function main() {
  const jsonData = await readJsonFile("questions.json");
  if(jsonData !== null) {
    convertJsonToXlsx(jsonData, "questions.xlsx");
  }
}

main();