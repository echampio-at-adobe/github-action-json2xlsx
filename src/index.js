const XLSX = require("xlsx");

function convertJsonToXlsx() {
  // Assume your json data is something like this:
  const data = [
    {
      questions: "q-category",
      "max-selections": "3",
      "min-selections": "1",
    },
    {
      questions: "q-rather",
      "max-selections": "1",
      "min-selections": "1",
    },
    {
      questions: "q-video",
      "max-selections": "1",
      "min-selections": "1",
    },
    {
      questions: "q-photo",
      "max-selections": "1",
      "min-selections": "1",
    },
    {
      questions: "q-customer",
      "max-selections": "1",
      "min-selections": "1",
    },
    {
      questions: "q-3d",
      "max-selections": "1",
      "min-selections": "1",
    },
    {
      questions: "q-pdf",
      "max-selections": "1",
      "min-selections": "1",
    },
    {
      questions: "q-design",
      "max-selections": "1",
      "min-selections": "1",
    },
    {
      questions: "q-illustration",
      "max-selections": "1",
      "min-selections": "1",
    },
  ];

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "helix-questions");

  // Write workbook to disk
  XLSX.writeFile(wb, "output.xlsx");
}

convertJsonToXlsx();
