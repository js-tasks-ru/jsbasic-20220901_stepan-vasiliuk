function initCarousel() {
  const rightButton = document.querySelector('.carousel__arrow_right');
  const leftButton = document.querySelector('.carousel__arrow_left');

  const carouselInner = document.querySelector('.carousel__inner');
  const slides = carouselInner.querySelectorAll('.carousel__slide');

  let carouselTransform = 0;
  let clickCounter = 0;

  checkCounter();


  rightButton.addEventListener('click', () => {
    carouselTransform -= getOffSetSize(carouselInner);
    carouselInner.style.transform = `translateX(${carouselTransform}px)`;
    clickCounter += 1;
    checkCounter();
  })

  leftButton.addEventListener('click', () => {
    carouselTransform += getOffSetSize(carouselInner);
    carouselInner.style.transform = `translateX(${carouselTransform}px)`;
    clickCounter -= 1;
    checkCounter();
  })

  function checkCounter() {
    if (clickCounter >= slides.length - 1) {
      rightButton.style.display = 'none';
      //leftButton.style.display = '';
    }
    else if (clickCounter == 0) {
      leftButton.style.display = 'none';
      //rightButton.style.display = '';
    }
    else {
      leftButton.style.display = '';
      rightButton.style.display = '';
    }
  }

  function getOffSetSize(elem) { return elem.offsetWidth };
}
