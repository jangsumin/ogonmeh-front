// 메뉴 인터페이스 선언
interface Menu {
  date?: string;
  koreanFoodCorner: string[];
  hotCorner: string[];
  saladCorner: string[];
}

// 사용자 페이지 네임스페이스
namespace NamespaceUser {
  export const dateText: HTMLInputElement | null =
    document.querySelector(".date-text");
  export let targetDate: string = "";
  export let menuData: Array<Menu>;
  export const todayDate: Date = new Date();
}

// 드롭다운 요소
const dropdown: HTMLInputElement | null = document.querySelector(".dropdown");
// 햄버거 버튼
const hamburgerButton: HTMLInputElement | null =
  document.querySelector(".hamburger-button");
// 매니저 로그인 버튼
const managerLoginButton: HTMLInputElement | null = document.querySelector(
  ".manager-login-button"
);
// 모달 구역
const modalWrap: HTMLInputElement | null =
  document.querySelector(".modal-wrap");
// 모달 배경
const modalWrapBg: HTMLInputElement | null =
  document.querySelector(".modal-wrap-bg");
// 모달 닫기 버튼
const modalCloseButton: HTMLInputElement | null = document.querySelector(
  ".modal-close-button"
);
// 현재 기준 어제로 가는 삼각형 버튼
const yesterdayMenuButton: HTMLInputElement | null = document.querySelector(
  ".yesterday-menu-button"
);
// 현재 기준 내일로 가는 삼각형 버튼
const tomorrowMenuButton: HTMLInputElement | null = document.querySelector(
  ".tomorrow-menu-button"
);
// 현재 날짜 상태
let todayDate: Date = NamespaceUser.todayDate;
let todayYear: string = String(todayDate.getFullYear());
let todayMonth: string = String(todayDate.getMonth() + 1);
let todayDay: string = String(todayDate.getDate());
// 요일 배열
const days: Array<string> = ["일", "월", "화", "수", "목", "금", "토"];
// 한식 코너 section
const koreanFoodCornerSection: HTMLInputElement | null = document.querySelector(
  "main .korean-food-corner"
);
// 핫 코너 section
const hotCornerSection: HTMLInputElement | null =
  document.querySelector("main .hot-corner");
// 샐러드 코너 section
const saladCornerSection: HTMLInputElement | null =
  document.querySelector("main .salad-corner");
// 한식 코너 section 내 모든 div 요소들
const koreanFoodCornerSection_divElements:
  | NodeListOf<HTMLDivElement>
  | undefined = koreanFoodCornerSection?.querySelectorAll("div");
// 핫 코너 section 내 모든 div 요소들
const hotCornerSection_divElements: NodeListOf<HTMLDivElement> | undefined =
  hotCornerSection?.querySelectorAll("div");
// 샐러드 코너 section 내 모든 div 요소들
const saladCornerSection_divElements: NodeListOf<HTMLDivElement> | undefined =
  saladCornerSection?.querySelectorAll("div");

// 사용자 페이지 : 드롭다운 기능 수행
function executeDropdown(): void {
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

// 사용자 페이지 : 로그인 모달 띄우기
function executeLoginModal(): void {
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

// 사용자 페이지 : 같은 날짜인지 비교하는 함수 수행으로 현재 기준 어제로 가는 버튼 접근 막기
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

// 사용자 페이지 : 오늘의 메뉴를 렌더링
function renderTodayMenu(): void {
  if (NamespaceUser.dateText) {
    NamespaceUser.dateText.innerText =
      todayYear +
      "." +
      todayMonth.padStart(2, "0") +
      "." +
      todayDay.padStart(2, "0") +
      `(${days[todayDate.getDay()]})`;
  }
  if (yesterdayMenuButton) {
    yesterdayMenuButton.style.visibility = "hidden";
  }
  renderMenu();
}

renderTodayMenu();

// 사용자 페이지 : 현재 기준 어제로 가는 버튼을 누르고 나서 메뉴를 렌더링
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
        todayDay.padStart(2, "0") +
        `(${days[todayDate.getDay()]})`;
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

// 사용자 페이지 : 현재 기준 내일로 가는 버튼을 누르고 나서 메뉴를 렌더링
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
        todayDay.padStart(2, "0") +
        `(${days[todayDate.getDay()]})`;
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

// 사용자 페이지 : 메뉴 데이터를 GET 요청
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

// 사용자 페이지 : 메뉴를 렌더링
function renderMenu(): void {
  NamespaceUser.targetDate =
    todayYear.slice(-2) +
    todayMonth.padStart(2, "0") +
    todayDay.padStart(2, "0");
  console.log(NamespaceUser.targetDate);
  koreanFoodCornerSection_divElements?.forEach((div, idx) => {
    div.textContent = "";
  });
  hotCornerSection_divElements?.forEach((div, idx) => {
    div.textContent = "";
  });
  saladCornerSection_divElements?.forEach((div, idx) => {
    div.textContent = "";
  });
  if (!(todayDate.getDay() === 0 || todayDate.getDay() === 6)) {
    getMenu(NamespaceUser.targetDate).then(() => {
      if (NamespaceUser.menuData[0]) {
        koreanFoodCornerSection_divElements?.forEach((div, idx) => {
          div.textContent = NamespaceUser.menuData[0].koreanFoodCorner[idx];
        });
        hotCornerSection_divElements?.forEach((div, idx) => {
          div.textContent = NamespaceUser.menuData[0].hotCorner[idx];
        });
        saladCornerSection_divElements?.forEach((div, idx) => {
          div.textContent = NamespaceUser.menuData[0].saladCorner[idx];
        });
      }
    });
  }
}
