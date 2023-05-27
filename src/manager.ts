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
  export const todayDate: Date = new Date();
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

let startDate: Date = NamespaceManager.todayDate;
startDate = new Date(
  startDate.setDate(
    startDate.getDate() -
      (startDate.getDay() === 0 ? 6 : startDate.getDay() - 1)
  )
);

console.log(startDate);
const datesInFourWeeks: string[] = [convertDateToString(startDate)];
for (let i = 0; i < 28 - 1; i++) {
  datesInFourWeeks.push(
    convertDateToString(new Date(startDate.setDate(startDate.getDate() + 1)))
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

function createListElement(
  text: string,
  dateList: HTMLInputElement | null
): void {
  const li: HTMLLIElement = document.createElement("li");
  li.textContent = text;
  dateList?.appendChild(li);
}

datesInFourWeeks.map((dateStr, idx) => {
  if (Math.floor(idx / 7) === 0) {
    createListElement(dateStr, dateList1);
  } else if (Math.floor(idx / 7) === 1) {
    createListElement(dateStr, dateList2);
  } else if (Math.floor(idx / 7) === 2) {
    createListElement(dateStr, dateList3);
  } else if (Math.floor(idx / 7) === 3) {
    createListElement(dateStr, dateList4);
  }
});
