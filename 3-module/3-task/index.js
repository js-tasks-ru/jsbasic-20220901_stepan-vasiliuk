function camelize(str) {
  let stringArray = str.split('-');
  let newArray = [];
  for (let i = 0; i < stringArray.length; i++) {
    if (i === 0) {
      newArray.push(stringArray[i]);
    } else {
      newArray.push(stringArray[i].charAt(0).toUpperCase() + stringArray[i].slice(1, stringArray[i].length));
    }
  }
  return newArray.join('');
}
