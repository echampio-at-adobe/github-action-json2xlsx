const XLSX = require('xlsx');

// Your JSON data

const jsonData = [

{ Name: "John", Age: 30, City: "New York" }
,

{ Name: "Jane", Age: 40, City: "Chicago" }
];

// Create a worksheet

let worksheet = XLSX.utils.json_to_sheet(jsonData);

// Create a new workbook

let workbook = XLSX.utils.book_new();

// Append the worksheet to the workbook

XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

// Write the workbook to a file

XLSX.writeFile(workbook, "output.xlsx");