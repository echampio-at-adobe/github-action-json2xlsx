const XLSX = require('xlsx');

function convertJsonToXlsx() {
  // Assume your json data is something like this:
  const data = [
    {name: 'John', age: 30, city: 'New York'},
    {name: 'Jane', age: 40, city: 'Chicago'},
  ];

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  // Write workbook to disk
  XLSX.writeFile(wb, 'output.xlsx');
}

convertJsonToXlsx();