/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  elem = null;
  constructor(rows) {
    this.rows = rows;
    this.elem = this.#elemRender();
  }

  #createElement() {
    const table = document.createElement('table');
    table.innerHTML = this.#headTemplate() + this.#bodyTemplate(this.rows);

    return table;
  }

  #elemRender() {
    const elem = this.#createElement();
    let newButtons = elem.getElementsByTagName('button');
     const buttons = elem.querySelectorAll('button');
     const tableRows = elem.querySelectorAll('tr');
    // console.log(newButtons);
    // console.log(tableRows);
    for (let i = 0; i < newButtons.length; i++) {
      newButtons[i].addEventListener('click', () => {
         newButtons[i].parentElement.parentElement.removeChild.
        //  console.log(newButtons);
        //  console.log(tableRows);
        //elem.rows[i+1].style.display = 'none', {once: true}
        //elem.removeChild(elem.fi);
        elem.deleteRow(i + 1);
      }
      )
    }
    return elem;
  }

  #deleteRows() {

  }

  #headTemplate() {
    return `
      <thead>
        <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
          <th></th>
        </tr>
      </thead>`
  }

  #bodyTemplate(rows) {
    let tableBody = '<tbody>';
    rows.forEach(({ name, age, salary, city }) => {
      tableBody += `
      <tr>
          <td>${name}</td>
          <td>${age}</td>
          <td>${salary}</td>
          <td>${city}</td>
          <td><button>X</button></td>
        </tr>`
    }
    );
    return tableBody += '</tbody>';
  }


}
