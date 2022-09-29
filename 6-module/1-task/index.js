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
    const buttons = elem.querySelectorAll('button');

    buttons.forEach(button => {
      button.addEventListener('click', () => button.parentElement.parentElement.remove()
        , { once: true });

    });

    return elem;
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
