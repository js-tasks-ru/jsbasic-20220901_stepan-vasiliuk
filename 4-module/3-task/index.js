function highlight(table) {
  const rowsHTMLCollection = table.rows;

  const statusIndex = getColumnIndex('Status');
  const ageIndex = getColumnIndex('Age');
  const genderIndex = getColumnIndex('Gender');

  function getColumnIndex(textParameter) {
    const cellsHTMLCollection = table.rows[0].cells;
    for (let i = 0; i < cellsHTMLCollection.length; i++) {
      if (cellsHTMLCollection[i].textContent === textParameter) {
        return i;
      }
    }
  }

  for (let i = 1; i < rowsHTMLCollection.length; i++) {

    if (!(rowsHTMLCollection[i].cells[statusIndex].hasAttribute('data-available'))) {
      rowsHTMLCollection[i].setAttribute('hidden', true);
    }
    else if ((rowsHTMLCollection[i].cells[statusIndex].dataset.available) == 'true') {
      rowsHTMLCollection[i].classList.add('available');
    }
    else {
      rowsHTMLCollection[i].classList.add('unavailable');
    }
    if (rowsHTMLCollection[i].cells[genderIndex].textContent === 'm') {
      rowsHTMLCollection[i].classList.add('male');
    }
    if (rowsHTMLCollection[i].cells[genderIndex].textContent === 'f') {
      rowsHTMLCollection[i].classList.add('female');
    }
    if (+rowsHTMLCollection[i].cells[ageIndex].textContent < 18) {
      rowsHTMLCollection[i].style.textDecoration = 'line-through';
    }
  }
}