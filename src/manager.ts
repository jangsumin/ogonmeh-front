interface Menu {
  date?: string;
  koreanFoodCorner: string[];
  hotCorner: string[];
  saladCorner: string[];
}

const form: HTMLFormElement | null = document.querySelector(".menu-input-form");
// 메인 페이지의 dateText 변수와 충돌하므로 namespace 사용
namespace NamespaceManager {
  export const dateText: HTMLInputElement | null =
    document.querySelector(".date-text");
  export const todayDate: Date = new Date(2023, 5, 1);
}
const updateButton: HTMLInputElement | null =
  document.querySelector(".update-button");
let formData: FormData | null;

const KOREAN_FOOD_MENU: string = "korean-food-menu";
const HOT_MENU: string = "hot-menu";
const SALAD_MENU: string = "salad-menu";

// 처음 렌더링 시, 오늘의 날짜가 form에 나타나도록 설정
if (NamespaceManager.dateText) {
  NamespaceManager.dateText.textContent = [
    String(NamespaceManager.todayDate.getFullYear()).slice(-2),
    convertDateToString(NamespaceManager.todayDate),
  ].join(" / ");
}

updateButton?.addEventListener("click", () => {
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

  const URL: string = "http://localhost:4000/register";
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
});

// 이번주 월요일부터 28일동안의 날짜들을 렌더링
function convertDateToString(date: Date): string {
  const month: number = date.getMonth() + 1;
  const day: number = date.getDate();
  const dateStr: string = [
    String(month).padStart(2, "0"),
    String(day).padStart(2, "0"),
  ].join(" / ");
  return dateStr;
}

const startDate = new Date(2023, 5, 1);
startDate.setDate(
  startDate.getDate() - (startDate.getDay() === 0 ? 6 : startDate.getDay() - 1)
);

const datesInFourWeeks: Date[] = [];
for (let i = 0; i < 28; i++) {
  datesInFourWeeks.push(
    new Date(startDate.setDate(startDate.getDate() + (i === 0 ? 0 : 1)))
  );
}

const dateList1: HTMLInputElement | null =
  document.querySelector(".date-list1");
const dateList2: HTMLInputElement | null =
  document.querySelector(".date-list2");
const dateList3: HTMLInputElement | null =
  document.querySelector(".date-list3");
const dateList4: HTMLInputElement | null =
  document.querySelector(".date-list4");

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

function createListElement(date: Date, idx: number): void {
  const li: HTMLLIElement = document.createElement("li");
  li.textContent = convertDateToString(date);

  // if (
  //   !(date.getDay() === 0 || date.getDay() === 6) &&
  //   !compareDates(date, NamespaceManager.todayDate)
  // ) {
  // }

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

const koreanFoodCorner: HTMLInputElement | null = document.querySelector(
  ".lower-wrap .korean-food-corner"
);
const hotCorner: HTMLInputElement | null = document.querySelector(
  ".lower-wrap .hot-corner"
);
const saladCorner: HTMLInputElement | null = document.querySelector(
  ".lower-wrap .salad-corner"
);
const koreanFoodCorner_inputElements: NodeListOf<HTMLInputElement> | undefined =
  koreanFoodCorner?.querySelectorAll("input");
const hotCorner_inputElements: NodeListOf<HTMLInputElement> | undefined =
  hotCorner?.querySelectorAll("input");
const saladCorner_inputElements: NodeListOf<HTMLInputElement> | undefined =
  saladCorner?.querySelectorAll("input");

datesInFourWeeks.map((date, idx) => {
  createListElement(date, idx);
});

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
