const dropdown = document.querySelector('.dropdown');
const hamburgerButton = document.querySelector('.hamburger-button');

let isDropdownOpen = false;
hamburgerButton.addEventListener('click', () => {
  if (!isDropdownOpen) {
    dropdown.style.height = '200px';
    isDropdownOpen = !isDropdownOpen;
  } else {
    dropdown.style.height = '0';
    isDropdownOpen = !isDropdownOpen;
  }
});

const managerLoginButton = document.querySelector('.manager-login-button');
const modalWrap = document.querySelector('.modal-wrap');
const modalWrapBg = document.querySelector('.modal-wrap-bg');
const modalCloseButton = document.querySelector('.modal-close-button');

managerLoginButton.addEventListener('click', () => {
  modalWrap.classList.remove('hidden');
});
modalWrapBg.addEventListener('click', () => {
  modalWrap.classList.add('hidden');
})
modalCloseButton.addEventListener('click', () => {
  modalWrap.classList.add('hidden');
});