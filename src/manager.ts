namespace NamespaceManager {
  export const dateText: HTMLInputElement | null =
    document.querySelector(".date-text");
  export let targetDate = "";
  export let menuData: Array<Menu>;
  export const todayDate: Date = new Date();
}

const form: HTMLFormElement | null = document.querySelector(".menu-input-form");
const updateButton: HTMLInputElement | null =
  document.querySelector(".update-button");
let formData: FormData | null;

const KOREAN_FOOD_MENU: string = "korean-food-menu";
const HOT_MENU: string = "hot-menu";
const SALAD_MENU: string = "salad-menu";

if (NamespaceManager.dateText) {
  NamespaceManager.dateText.textContent = [
    String(NamespaceManager.todayDate.getFullYear()).slice(-2),
    convertDateToString(NamespaceManager.todayDate),
  ].join(" / ");
  NamespaceManager.targetDate = NamespaceManager.dateText.textContent;
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

const startDate = new Date();
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
        getMenuData(NamespaceManager.targetDate).then(() => {
          koreanFoodCorner_divElements?.forEach((div, idx) => {
            div.textContent =
              NamespaceManager.menuData[0].koreanFoodCorner[idx];
          });
          hotCorner_divElements?.forEach((div, idx) => {
            div.textContent = NamespaceManager.menuData[0].hotCorner[idx];
          });
          saladCorner_divElements?.forEach((div, idx) => {
            div.textContent = NamespaceManager.menuData[0].saladCorner[idx];
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

const koreanFoodCornerInput: HTMLInputElement | null = document.querySelector(
  ".lower-wrap .korean-food-corner"
);
const hotCornerInput: HTMLInputElement | null = document.querySelector(
  ".lower-wrap .hot-corner"
);
const saladCornerInput: HTMLInputElement | null = document.querySelector(
  ".lower-wrap .salad-corner"
);
const koreanFoodCorner_inputElements: NodeListOf<HTMLInputElement> | undefined =
  koreanFoodCornerInput?.querySelectorAll("input");
const hotCorner_inputElements: NodeListOf<HTMLInputElement> | undefined =
  hotCornerInput?.querySelectorAll("input");
const saladCorner_inputElements: NodeListOf<HTMLInputElement> | undefined =
  saladCornerInput?.querySelectorAll("input");

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

// 데이터 GET 요청
const koreanFoodCornerView: HTMLInputElement | null = document.querySelector(
  ".view-section .korean-food-corner"
);
const hotCornerView: HTMLInputElement | null = document.querySelector(
  ".view-section .hot-corner"
);
const saladCornerView: HTMLInputElement | null = document.querySelector(
  ".view-section .salad-corner"
);

const koreanFoodCorner_divElements: NodeListOf<HTMLDivElement> | undefined =
  koreanFoodCornerView?.querySelectorAll("div");
const hotCorner_divElements: NodeListOf<HTMLDivElement> | undefined =
  hotCornerView?.querySelectorAll("div");
const saladCorner_divElements: NodeListOf<HTMLDivElement> | undefined =
  saladCornerView?.querySelectorAll("div");

const getMenuData = (currentTargetDate: string) => {
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
      NamespaceManager.menuData = data; // 응답 데이터를 변수에 저장
      console.log(NamespaceManager.menuData); // 저장된 데이터 처리
    })
    .catch((error) => {
      console.error("오류:", error);
    });
};
getMenuData(NamespaceManager.targetDate).then(() => {
  koreanFoodCorner_divElements?.forEach((div, idx) => {
    div.textContent = NamespaceManager.menuData[0].koreanFoodCorner[idx];
  });
  hotCorner_divElements?.forEach((div, idx) => {
    div.textContent = NamespaceManager.menuData[0].hotCorner[idx];
  });
  saladCorner_divElements?.forEach((div, idx) => {
    div.textContent = NamespaceManager.menuData[0].saladCorner[idx];
  });
});
