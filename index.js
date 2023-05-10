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
