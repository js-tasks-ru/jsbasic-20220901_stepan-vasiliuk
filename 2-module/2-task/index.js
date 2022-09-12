function isEmpty(obj) {
  let sum = 0;
  for (key in obj) {
    sum++;
  }
  return (sum === 0);
}