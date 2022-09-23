function makeDiagonalRed(table) {
  let rowsHTMLCollection = table.rows;
  for (let i = 0; i < rowsHTMLCollection.length; i++) {
    rowsHTMLCollection[i].cells[i].style.background = 'red';
  }
}
