function sumSalary(salaries) {
  let sum = 0;
  for (key in salaries) {
    if ((typeof (salaries[key]) === 'number') && (salaries[key] !== Infinity) && (salaries[key] !== -Infinity) && (!isNaN(salaries[key]))) {
      sum += salaries[key];
    }
  }
  return sum;
}
