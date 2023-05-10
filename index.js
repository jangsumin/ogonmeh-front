const modal = document.querySelector('.modal');
const hamburgerButton = document.querySelector('.hamburger-button');

let isModalOn = false;
hamburgerButton.addEventListener('click', () => {
  if (!isModalOn) {
    modal.style.display = 'block';
    modal.style.height = '200px';
    modal.classList.remove('off');
    modal.classList.add('on');
    isModalOn = !isModalOn;
  } else {
    modal.style.height = '0';
    modal.classList.remove('on');
    modal.classList.add('off');
    isModalOn = !isModalOn;
  }
});