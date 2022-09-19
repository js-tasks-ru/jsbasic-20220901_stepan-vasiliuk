function showSalary(users, age) {
  return users.filter(obj => obj.age <= age)
    .map((item) => item.name + ', ' + item.balance)
    .join('\n');
}
