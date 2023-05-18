const dropdown: HTMLInputElement | null = document.querySelector(".dropdown");
const hamburgerButton: HTMLInputElement | null =
  document.querySelector(".hamburger-button");
let isDropdownOpen: boolean = false;
hamburgerButton?.addEventListener("click", () => {
  if (dropdown) {
    if (!isDropdownOpen) {
      dropdown.style.height = "200px";
      isDropdownOpen = !isDropdownOpen;
    } else {
      dropdown.style.height = "0";
      isDropdownOpen = !isDropdownOpen;
    }
  }
});

const managerLoginButton: HTMLInputElement | null = document.querySelector(
  ".manager-login-button"
);
const modalWrap: HTMLInputElement | null =
  document.querySelector(".modal-wrap");
const modalWrapBg: HTMLInputElement | null =
  document.querySelector(".modal-wrap-bg");
const modalCloseButton: HTMLInputElement | null = document.querySelector(
  ".modal-close-button"
);
managerLoginButton?.addEventListener("click", () => {
  modalWrap?.classList.remove("hidden");
});
modalWrapBg?.addEventListener("click", () => {
  modalWrap?.classList.add("hidden");
});
modalCloseButton?.addEventListener("click", () => {
  modalWrap?.classList.add("hidden");
});

const dateText: HTMLInputElement | null = document.querySelector(".date-text");
let todayDate: Date = new Date();
let todayYear: string = String(todayDate.getFullYear());
let todayMonth: string = String(todayDate.getMonth() + 1);
let todayDay: string = String(todayDate.getDate());
if (dateText) {
  dateText.innerText =
    todayYear +
    "." +
    todayMonth.padStart(2, "0") +
    "." +
    todayDay.padStart(2, "0");
}

const yesterdayMenuButton: HTMLInputElement | null = document.querySelector(
  ".yesterday-menu-button"
);
const tomorrowMenuButton: HTMLInputElement | null = document.querySelector(
  ".tomorrow-menu-button"
);
yesterdayMenuButton?.addEventListener("click", () => {
  todayDate = new Date(todayDate.setDate(todayDate.getDate() - 1));
  todayYear = String(todayDate.getFullYear());
  todayMonth = String(todayDate.getMonth() + 1);
  todayDay = String(todayDate.getDate());
  if (dateText) {
    dateText.innerText =
      todayYear +
      "." +
      todayMonth.padStart(2, "0") +
      "." +
      todayDay.padStart(2, "0");
  }
});
tomorrowMenuButton?.addEventListener("click", () => {
  todayDate = new Date(todayDate.setDate(todayDate.getDate() + 1));
  todayYear = String(todayDate.getFullYear());
  todayMonth = String(todayDate.getMonth() + 1);
  todayDay = String(todayDate.getDate());
  if (dateText) {
    dateText.innerText =
      todayYear +
      "." +
      todayMonth.padStart(2, "0") +
      "." +
      todayDay.padStart(2, "0");
  }
});
