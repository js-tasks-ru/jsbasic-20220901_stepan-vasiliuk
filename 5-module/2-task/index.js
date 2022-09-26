function toggleText() {
  const button = document.querySelector('.toggle-text-button');
  const textToHide = document.getElementById('text');

  button.addEventListener('click', () => {
    textToHide.hidden ? textToHide.hidden = false : textToHide.hidden = true;
  });
}