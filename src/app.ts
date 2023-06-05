interface Menu {
  date?: string;
  koreanFoodCorner: string[];
  hotCorner: string[];
  saladCorner: string[];
}

namespace NamespaceUser {
  export const dateText: HTMLInputElement | null =
    document.querySelector(".date-text");
  export let targetDate: string = "";
  export let menuData: Array<Menu>;
  export const todayDate: Date = new Date();
}

function executeDropdown(): void {
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
}

executeDropdown();

function executeLoginModal(): void {
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
}

executeLoginModal();

const yesterdayMenuButton: HTMLInputElement | null = document.querySelector(
  ".yesterday-menu-button"
);
const tomorrowMenuButton: HTMLInputElement | null = document.querySelector(
  ".tomorrow-menu-button"
);

let todayDate: Date = NamespaceUser.todayDate;
let todayYear: string = String(todayDate.getFullYear());
let todayMonth: string = String(todayDate.getMonth() + 1);
let todayDay: string = String(todayDate.getDate());

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

function renderTodayMenu(): void {
  if (NamespaceUser.dateText) {
    NamespaceUser.dateText.innerText =
      todayYear +
      "." +
      todayMonth.padStart(2, "0") +
      "." +
      todayDay.padStart(2, "0");
  }
  if (yesterdayMenuButton) {
    yesterdayMenuButton.style.visibility = "hidden";
  }
  renderMenu();
}

renderTodayMenu();

function renderYesterdayMenu(): void {
  yesterdayMenuButton?.addEventListener("click", () => {
    todayDate = new Date(todayDate.setDate(todayDate.getDate() - 1));
    todayYear = String(todayDate.getFullYear());
    todayMonth = String(todayDate.getMonth() + 1);
    todayDay = String(todayDate.getDate());
    if (NamespaceUser.dateText) {
      NamespaceUser.dateText.innerText =
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
    renderMenu();
  });
}

renderYesterdayMenu();

function renderTomorrowMenu(): void {
  tomorrowMenuButton?.addEventListener("click", () => {
    todayDate = new Date(todayDate.setDate(todayDate.getDate() + 1));
    todayYear = String(todayDate.getFullYear());
    todayMonth = String(todayDate.getMonth() + 1);
    todayDay = String(todayDate.getDate());
    if (NamespaceUser.dateText) {
      NamespaceUser.dateText.innerText =
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
    renderMenu();
  });
}

renderTomorrowMenu();

const koreanFoodCornerSection: HTMLInputElement | null = document.querySelector(
  "main .korean-food-corner"
);
const hotCornerSection: HTMLInputElement | null =
  document.querySelector("main .hot-corner");
const saladCornerSection: HTMLInputElement | null =
  document.querySelector("main .salad-corner");

const koreanFoodCornerSection_divElements:
  | NodeListOf<HTMLDivElement>
  | undefined = koreanFoodCornerSection?.querySelectorAll("div");
const hotCornerSection_divElements: NodeListOf<HTMLDivElement> | undefined =
  hotCornerSection?.querySelectorAll("div");
const saladCornerSection_divElements: NodeListOf<HTMLDivElement> | undefined =
  saladCornerSection?.querySelectorAll("div");

function getMenu(targetDate: string): Promise<void> {
  const getURL: string =
    "http://localhost:4000/get" + `/${targetDate.replace(/\s\/\s/g, "")}`;
  return fetch(getURL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("데이터 가져오기 실패");
      }
      return response.json();
    })
    .then((data) => {
      NamespaceUser.menuData = data;
      console.log(NamespaceUser.menuData);
    })
    .catch((error) => {
      console.error("오류:", error);
    });
}

function renderMenu(): void {
  NamespaceUser.targetDate =
    todayYear.slice(-2) +
    todayMonth.padStart(2, "0") +
    todayDay.padStart(2, "0");
  console.log(NamespaceUser.targetDate);
  getMenu(NamespaceUser.targetDate).then(() => {
    koreanFoodCornerSection_divElements?.forEach((div, idx) => {
      div.textContent = NamespaceUser.menuData[0].koreanFoodCorner[idx];
    });
    hotCornerSection_divElements?.forEach((div, idx) => {
      div.textContent = NamespaceUser.menuData[0].hotCorner[idx];
    });
    saladCornerSection_divElements?.forEach((div, idx) => {
      div.textContent = NamespaceUser.menuData[0].saladCorner[idx];
    });
  });
}
