const XLSX = require("xlsx");
const fs = require("fs").promises;
const simpleGit = require("simple-git");

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

async function getLatestCommitFiles() {
  const git = simpleGit();
  const logList = await git.log();
  const latestCommitHash = logList.latest.hash;
  const diffSummary = await git.diffSummary([
    `${latestCommitHash}~1..${latestCommitHash}`,
  ]);

  console.log("Files changed in the latest commit:");
  diffSummary.files.forEach((file) => console.log(file.file));

  return diffSummary.files;
}

async function main() {
  const files = await getLatestCommitFiles();

  for (let file of files) {
    if (file.file.endsWith(".json")) {
      const jsonData = await readJsonFile(file.file);
      if (jsonData !== null) {
        convertJsonToXlsx(jsonData, file.file.replace("json", "xlsx"));
      }
    }
  }
  // const jsonData = await readJsonFile("questions.json");
  // if(jsonData !== null) {
  //   convertJsonToXlsx(jsonData, "questions.xlsx");
  // }
}

main();
