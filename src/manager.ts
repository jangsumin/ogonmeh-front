// 관리자 페이지 네임스페이스
namespace NamespaceManager {
  export const dateText: HTMLInputElement | null =
    document.querySelector(".date-text");
  export let targetDate = "";
  export let menuData: Menu;
  export const todayDate: Date = new Date();
}

// 1주차
const dateList1: HTMLInputElement | null =
  document.querySelector(".date-list1");
// 2주차
const dateList2: HTMLInputElement | null =
  document.querySelector(".date-list2");
// 3주차
const dateList3: HTMLInputElement | null =
  document.querySelector(".date-list3");
// 4주차
const dateList4: HTMLInputElement | null =
  document.querySelector(".date-list4");
// 메뉴를 입력할 수 있는 input요소들이 있는 form 요소
const form: HTMLFormElement | null = document.querySelector(".menu-input-form");
// 업데이트 버튼
const updateButton: HTMLInputElement | null =
  document.querySelector(".update-button");
// 한식 코너 input 요소들의 묶음 요소
const koreanFoodCornerInput: HTMLInputElement | null = document.querySelector(
  ".lower-wrap .korean-food-corner"
);
// 핫 코너 input 요소들의 묶음 요소
const hotCornerInput: HTMLInputElement | null = document.querySelector(
  ".lower-wrap .hot-corner"
);
// 샐러드 코너 input 요소들의 묶음 요소
const saladCornerInput: HTMLInputElement | null = document.querySelector(
  ".lower-wrap .salad-corner"
);
// 한식 코너의 input 요소들
const koreanFoodCorner_inputElements: NodeListOf<HTMLInputElement> | undefined =
  koreanFoodCornerInput?.querySelectorAll("input");
// 핫 코너의 input 요소들
const hotCorner_inputElements: NodeListOf<HTMLInputElement> | undefined =
  hotCornerInput?.querySelectorAll("input");
// 샐러드 코너의 input 요소들
const saladCorner_inputElements: NodeListOf<HTMLInputElement> | undefined =
  saladCornerInput?.querySelectorAll("input");
// 한식 코너 뷰 section
const koreanFoodCornerView: HTMLInputElement | null = document.querySelector(
  ".view-section .korean-food-corner"
);
// 핫 코너 뷰 section
const hotCornerView: HTMLInputElement | null = document.querySelector(
  ".view-section .hot-corner"
);
// 샐러드 코너 뷰 section
const saladCornerView: HTMLInputElement | null = document.querySelector(
  ".view-section .salad-corner"
);
// 한식 코너 뷰 section내 모든 div 요소들
const koreanFoodCorner_divElements: NodeListOf<HTMLDivElement> | undefined =
  koreanFoodCornerView?.querySelectorAll("div");
// 핫 코너 뷰 section내 모든 div 요소들
const hotCorner_divElements: NodeListOf<HTMLDivElement> | undefined =
  hotCornerView?.querySelectorAll("div");
// 샐러드 코너 뷰 section내 모든 div 요소들
const saladCorner_divElements: NodeListOf<HTMLDivElement> | undefined =
  saladCornerView?.querySelectorAll("div");

// 관리자 페이지 : 날짜 형식을 문자열 형식으로 변환
function convertDateToString(date: Date): string {
  const month: number = date.getMonth() + 1;
  const day: number = date.getDate();
  const dateStr: string = [
    String(month).padStart(2, "0"),
    String(day).padStart(2, "0"),
  ].join(" / ");
  return dateStr;
}

// 관리자 페이지 : 초기에 오늘의 날짜를 렌더링
function renderTodayDate(): void {
  if (NamespaceManager.dateText) {
    NamespaceManager.dateText.textContent = [
      String(NamespaceManager.todayDate.getFullYear()).slice(-2),
      convertDateToString(NamespaceManager.todayDate),
    ].join(" / ");
    NamespaceManager.targetDate = NamespaceManager.dateText.textContent;
  }
}

renderTodayDate();

// 관리자 페이지 : 두 날짜의 비교 함수를 통해 오늘보다 작은 날짜들에 접근 불가토록 설정
function compareDates(date1: Date, date2: Date): boolean {
  let isDate1SmallerThanDate2: boolean;
  if (
    date1.getMonth() < date2.getMonth()
      ? true
      : date1.getMonth() === date2.getMonth()
      ? date1.getDate() < date2.getDate()
        ? true
        : false
      : false
  ) {
    isDate1SmallerThanDate2 = true;
  } else {
    isDate1SmallerThanDate2 = false;
  }
  return isDate1SmallerThanDate2;
}

// 관리자 페이지 : 요일과 이미 지난 날짜 조건에 따라 접근 가능한 li 요소와 접근 불가한 li 요소 생성
function createListElement(date: Date, idx: number): void {
  const li: HTMLLIElement = document.createElement("li");
  li.textContent = convertDateToString(date);
  if (
    !(date.getDay() === 0 || date.getDay() === 6) &&
    !compareDates(date, NamespaceManager.todayDate)
  ) {
    li.addEventListener("click", () => {
      if (NamespaceManager.dateText) {
        NamespaceManager.dateText.textContent = [
          String(NamespaceManager.todayDate.getFullYear()).slice(-2),
          li.textContent,
        ].join(" / ");
        NamespaceManager.targetDate = NamespaceManager.dateText.textContent;
        getMenuInManagerPage(NamespaceManager.targetDate).then(() => {
          koreanFoodCorner_divElements?.forEach((div, idx) => {
            div.textContent = NamespaceManager.menuData.koreanFoodCorner[idx];
          });
          hotCorner_divElements?.forEach((div, idx) => {
            div.textContent = NamespaceManager.menuData.hotCorner[idx];
          });
          saladCorner_divElements?.forEach((div, idx) => {
            div.textContent = NamespaceManager.menuData.saladCorner[idx];
          });
        });
      }
    });
  }
  if (compareDates(date, NamespaceManager.todayDate)) {
    li.style.cursor = "auto";
    li.style.opacity = "0.33";
  }
  if (idx % 7 === 5 || idx % 7 === 6) {
    li.style.cursor = "auto";
    li.style.color = "#e66060";
    li.style.opacity = "0.33";
  }
  if (Math.floor(idx / 7) === 0) {
    dateList1?.appendChild(li);
  }
  if (Math.floor(idx / 7) === 1) {
    dateList2?.appendChild(li);
  }
  if (Math.floor(idx / 7) === 2) {
    dateList3?.appendChild(li);
  }
  if (Math.floor(idx / 7) === 3) {
    dateList4?.appendChild(li);
  }
}

// 관리자 페이지 : 이번주 월요일을 기준으로 이후 28일의 날짜들을 렌더링
function renderFourWeeksFromBeforeMondayDate(): void {
  const startDate = new Date();
  const datesInFourWeeks: Date[] = [];
  startDate.setDate(
    startDate.getDate() -
      (startDate.getDay() === 0 ? 6 : startDate.getDay() - 1)
  );
  for (let i = 0; i < 28; i++) {
    datesInFourWeeks.push(
      new Date(startDate.setDate(startDate.getDate() + (i === 0 ? 0 : 1)))
    );
  }
  datesInFourWeeks.map((date, idx) => {
    createListElement(date, idx);
  });
}

renderFourWeeksFromBeforeMondayDate();

// 관리자 페이지 : 메뉴 데이터를 POST 요청
function postMenu(): void {
  let formData: FormData | null;
  const KOREAN_FOOD_MENU: string = "korean-food-menu";
  const HOT_MENU: string = "hot-menu";
  const SALAD_MENU: string = "salad-menu";
  const data: Menu = {
    koreanFoodCorner: [],
    hotCorner: [],
    saladCorner: [],
  };
  if (form) {
    data.date = String(NamespaceManager.dateText?.textContent).replace(
      / \/ /g,
      ""
    );
    formData = new FormData(form);
    for (let [key, value] of formData.entries()) {
      if (value === "") {
        continue;
      }
      if (key.slice(0, -1) === KOREAN_FOOD_MENU) {
        data.koreanFoodCorner?.push(String(value).trim());
      }
      if (key.slice(0, -1) === HOT_MENU) {
        data.hotCorner?.push(String(value).trim());
      }
      if (key.slice(0, -1) === SALAD_MENU) {
        data.saladCorner?.push(String(value).trim());
      }
    }
  }
  console.log(data);
  const URL: string = "http://localhost:4000/post";
  fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.error(error);
    });
}

// 관리자 페이지 : 업데이트 버튼 클릭을 통한 메뉴 POST 요청 실행
function executeUpdateButton() {
  updateButton?.addEventListener("click", () => {
    postMenu();
  });
}

executeUpdateButton();

// 관리자 페이지 : 오늘의 날짜가 주말일 때 업데이트 버튼이 보이지 않고, input 요소에 접근이 불가능한 기능 수행
function stopAccessToWeekend() {
  if (
    NamespaceManager.todayDate.getDay() === 0 ||
    NamespaceManager.todayDate.getDay() === 6
  ) {
    if (updateButton) {
      updateButton.style.display = "none";
    }
    koreanFoodCorner_inputElements?.forEach((input) => {
      input.disabled = true;
    });
    hotCorner_inputElements?.forEach((input) => {
      input.disabled = true;
    });
    saladCorner_inputElements?.forEach((input) => {
      input.disabled = true;
    });
  }
}

stopAccessToWeekend();

// 관리자 페이지 : 선택한 날짜의 메뉴를 GET 요청
function getMenuInManagerPage(targetDate: string): Promise<void> {
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
      NamespaceManager.menuData = data;
      console.log(NamespaceManager.menuData);
    })
    .catch((error) => {
      console.error("오류:", error);
    });
}

// 관리자 페이지 : 선택한 날짜의 메뉴를 렌더링
function renderMenuInManagerPage() {
  getMenuInManagerPage(NamespaceManager.targetDate).then(() => {
    koreanFoodCorner_divElements?.forEach((div, idx) => {
      div.textContent = NamespaceManager.menuData.koreanFoodCorner[idx];
    });
    hotCorner_divElements?.forEach((div, idx) => {
      div.textContent = NamespaceManager.menuData.hotCorner[idx];
    });
    saladCorner_divElements?.forEach((div, idx) => {
      div.textContent = NamespaceManager.menuData.saladCorner[idx];
    });
  });
}

renderMenuInManagerPage();
