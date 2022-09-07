function checkSpam(str) {
  let stringToCheck = str.toUpperCase();
  let deniedValue1 = '1XBET';
  let deniedValue2 = 'XXX';
  return (stringToCheck.includes(deniedValue2) || stringToCheck.includes(deniedValue1));
}