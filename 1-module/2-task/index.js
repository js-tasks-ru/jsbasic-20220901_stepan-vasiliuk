/**
 * Эту функцию трогать не нужно
 */
function print(text) {
  console.log(text);
}

/**
 * Эту функцию нужно поменять так,
 * чтобы функция sayHello работала корректно
 */
function isValid(name) {
  if (name && name.length >= 4 && notContansSpaces(name)) {
    return true;
  } else return false;
}

function notContansSpaces(name) {
  for (let i = 0; i < name.length; i++) {
    if (name.charAt(i) === ' ') {
      return false;
    }
  }
  return true;
}

function sayHello() {
  let userName = prompt('Введите ваше имя');

  if (isValid(userName)) {
    print(`Welcome back, ${userName}!`);
  } else {
    print('Некорректное имя');
  }
}