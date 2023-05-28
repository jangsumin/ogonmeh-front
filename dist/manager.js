"use strict";
const form = document.querySelector(".menu-input-form");
// 메인 페이지의 dateText 변수와 충돌하므로 namespace 사용
var NamespaceManager;
(function (NamespaceManager) {
    NamespaceManager.dateText = document.querySelector(".date-text");
    NamespaceManager.todayDate = new Date(2023, 5, 1);
})(NamespaceManager || (NamespaceManager = {}));
const updateButton = document.querySelector(".update-button");
let formData;
const KOREAN_FOOD_MENU = "korean-food-menu";
const HOT_MENU = "hot-menu";
const SALAD_MENU = "salad-menu";
// 처음 렌더링 시, 오늘의 날짜가 form에 나타나도록 설정
if (NamespaceManager.dateText) {
    NamespaceManager.dateText.textContent = [
        String(NamespaceManager.todayDate.getFullYear()).slice(-2),
        convertDateToString(NamespaceManager.todayDate),
    ].join(" / ");
}
updateButton === null || updateButton === void 0 ? void 0 : updateButton.addEventListener("click", () => {
    var _a, _b, _c, _d;
    const data = {
        koreanFoodCorner: [],
        hotCorner: [],
        saladCorner: [],
    };
    if (form) {
        data.date = String((_a = NamespaceManager.dateText) === null || _a === void 0 ? void 0 : _a.textContent).replace(/ \/ /g, "");
        formData = new FormData(form);
        for (let [key, value] of formData.entries()) {
            if (value === "") {
                continue;
            }
            if (key.slice(0, -1) === KOREAN_FOOD_MENU) {
                (_b = data.koreanFoodCorner) === null || _b === void 0 ? void 0 : _b.push(String(value).trim());
            }
            if (key.slice(0, -1) === HOT_MENU) {
                (_c = data.hotCorner) === null || _c === void 0 ? void 0 : _c.push(String(value).trim());
            }
            if (key.slice(0, -1) === SALAD_MENU) {
                (_d = data.saladCorner) === null || _d === void 0 ? void 0 : _d.push(String(value).trim());
            }
        }
    }
    console.log(data);
    const URL = "http://localhost:4000/register";
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
function convertDateToString(date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dateStr = [
        String(month).padStart(2, "0"),
        String(day).padStart(2, "0"),
    ].join(" / ");
    return dateStr;
}
const startDate = new Date(2023, 5, 1);
startDate.setDate(startDate.getDate() - (startDate.getDay() === 0 ? 6 : startDate.getDay() - 1));
const datesInFourWeeks = [];
for (let i = 0; i < 28; i++) {
    datesInFourWeeks.push(new Date(startDate.setDate(startDate.getDate() + (i === 0 ? 0 : 1))));
}
const dateList1 = document.querySelector(".date-list1");
const dateList2 = document.querySelector(".date-list2");
const dateList3 = document.querySelector(".date-list3");
const dateList4 = document.querySelector(".date-list4");
function compareDates(date1, date2) {
    let isDate1SmallerThanDate2;
    if (date1.getMonth() < date2.getMonth()
        ? true
        : date1.getMonth() === date2.getMonth()
            ? date1.getDate() < date2.getDate()
                ? true
                : false
            : false) {
        isDate1SmallerThanDate2 = true;
    }
    else {
        isDate1SmallerThanDate2 = false;
    }
    return isDate1SmallerThanDate2;
}
function createListElement(date, idx) {
    const li = document.createElement("li");
    li.textContent = convertDateToString(date);
    if (!(date.getDay() === 0 || date.getDay() === 6) &&
        !compareDates(date, NamespaceManager.todayDate)) {
        li.addEventListener("click", () => {
            if (NamespaceManager.dateText) {
                NamespaceManager.dateText.textContent = [
                    String(NamespaceManager.todayDate.getFullYear()).slice(-2),
                    li.textContent,
                ].join(" / ");
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
        dateList1 === null || dateList1 === void 0 ? void 0 : dateList1.appendChild(li);
    }
    if (Math.floor(idx / 7) === 1) {
        dateList2 === null || dateList2 === void 0 ? void 0 : dateList2.appendChild(li);
    }
    if (Math.floor(idx / 7) === 2) {
        dateList3 === null || dateList3 === void 0 ? void 0 : dateList3.appendChild(li);
    }
    if (Math.floor(idx / 7) === 3) {
        dateList4 === null || dateList4 === void 0 ? void 0 : dateList4.appendChild(li);
    }
}
const koreanFoodCorner = document.querySelector(".lower-wrap .korean-food-corner");
const hotCorner = document.querySelector(".lower-wrap .hot-corner");
const saladCorner = document.querySelector(".lower-wrap .salad-corner");
const koreanFoodCorner_inputElements = koreanFoodCorner === null || koreanFoodCorner === void 0 ? void 0 : koreanFoodCorner.querySelectorAll("input");
const hotCorner_inputElements = hotCorner === null || hotCorner === void 0 ? void 0 : hotCorner.querySelectorAll("input");
const saladCorner_inputElements = saladCorner === null || saladCorner === void 0 ? void 0 : saladCorner.querySelectorAll("input");
datesInFourWeeks.map((date, idx) => {
    createListElement(date, idx);
});
if (NamespaceManager.todayDate.getDay() === 0 ||
    NamespaceManager.todayDate.getDay() === 6) {
    if (updateButton) {
        updateButton.style.display = "none";
    }
    koreanFoodCorner_inputElements === null || koreanFoodCorner_inputElements === void 0 ? void 0 : koreanFoodCorner_inputElements.forEach((input) => {
        input.disabled = true;
    });
    hotCorner_inputElements === null || hotCorner_inputElements === void 0 ? void 0 : hotCorner_inputElements.forEach((input) => {
        input.disabled = true;
    });
    saladCorner_inputElements === null || saladCorner_inputElements === void 0 ? void 0 : saladCorner_inputElements.forEach((input) => {
        input.disabled = true;
    });
}
