function factorial(n) {
  let temp = 1;
  for(let i = 1; i<=n; i++){
    temp*= i;
  }
  return temp;
}
