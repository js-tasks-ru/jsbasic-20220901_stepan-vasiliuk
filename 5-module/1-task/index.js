function hideSelf() {
  const buttonToHide = document.querySelector('.hide-self-button');

  buttonToHide.addEventListener('click', ()=> {
    buttonToHide.setAttribute('hidden', true);
  })
}