// 드롭다운 구현
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

// 매니저 로그인 버튼 클릭 시, 로그인 모달 나타나도록 구현
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

// 날짜 이동 구현
const dateText: HTMLInputElement | null = document.querySelector(".date-text");
const yesterdayMenuButton: HTMLInputElement | null = document.querySelector(
  ".yesterday-menu-button"
);
const tomorrowMenuButton: HTMLInputElement | null = document.querySelector(
  ".tomorrow-menu-button"
);
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
if (yesterdayMenuButton) {
  yesterdayMenuButton.style.visibility = "hidden";
}
function isSameDate(date1: Date, date2: Date): boolean {
  if (date1.getFullYear() !== date2.getFullYear()) {
    return false;
  }
  if (date1.getMonth() + 1 !== date2.getMonth() + 1) {
    return false;
  }
  if (date1.getDate() !== date2.getDate()) {
    return false;
  }
  return true;
}
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
  if (yesterdayMenuButton) {
    if (!isSameDate(todayDate, new Date())) {
      yesterdayMenuButton.style.visibility = "visible";
    } else {
      yesterdayMenuButton.style.visibility = "hidden";
    }
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
  if (yesterdayMenuButton) {
    if (!isSameDate(todayDate, new Date())) {
      yesterdayMenuButton.style.visibility = "visible";
    } else {
      yesterdayMenuButton.style.visibility = "hidden";
    }
  }
});
