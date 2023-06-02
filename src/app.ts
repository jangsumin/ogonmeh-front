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

let currentTargetDate1: string = "";

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
  currentTargetDate1 =
    todayYear.slice(-2) +
    todayMonth.padStart(2, "0") +
    todayDay.padStart(2, "0");
  getMenuData1(currentTargetDate1).then(() => {
    koreanFoodCornerSection_divElements?.forEach((div, idx) => {
      div.textContent = menuData1[0].koreanFoodCorner[idx];
    });
    hotCornerSection_divElements?.forEach((div, idx) => {
      div.textContent = menuData1[0].hotCorner[idx];
    });
    saladCornerSection_divElements?.forEach((div, idx) => {
      div.textContent = menuData1[0].saladCorner[idx];
    });
  });
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
  currentTargetDate1 =
    todayYear.slice(-2) +
    todayMonth.padStart(2, "0") +
    todayDay.padStart(2, "0");
  getMenuData1(currentTargetDate1).then(() => {
    koreanFoodCornerSection_divElements?.forEach((div, idx) => {
      div.textContent = menuData1[0].koreanFoodCorner[idx];
    });
    hotCornerSection_divElements?.forEach((div, idx) => {
      div.textContent = menuData1[0].hotCorner[idx];
    });
    saladCornerSection_divElements?.forEach((div, idx) => {
      div.textContent = menuData1[0].saladCorner[idx];
    });
  });
});

// 데이터 GET 요청
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

currentTargetDate1 =
  todayYear.slice(-2) + todayMonth.padStart(2, "0") + todayDay.padStart(2, "0");
console.log(currentTargetDate1);
let menuData1: Array<Menu>;
const getMenuData1 = (currentTargetDate: string) => {
  const getURL: string =
    "http://localhost:4000/get" +
    `/${currentTargetDate.replace(/\s\/\s/g, "")}`;
  return fetch(getURL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("데이터 가져오기 실패");
      }
      return response.json();
    })
    .then((data) => {
      menuData1 = data; // 응답 데이터를 변수에 저장
      console.log(menuData1); // 저장된 데이터 처리
    })
    .catch((error) => {
      console.error("오류:", error);
    });
};
getMenuData1(currentTargetDate1).then(() => {
  koreanFoodCornerSection_divElements?.forEach((div, idx) => {
    div.textContent = menuData1[0].koreanFoodCorner[idx];
  });
  hotCornerSection_divElements?.forEach((div, idx) => {
    div.textContent = menuData1[0].hotCorner[idx];
  });
  saladCornerSection_divElements?.forEach((div, idx) => {
    div.textContent = menuData1[0].saladCorner[idx];
  });
});
