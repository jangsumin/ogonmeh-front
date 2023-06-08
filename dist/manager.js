"use strict";
// 관리자 페이지 네임스페이스
var NamespaceManager;
(function (NamespaceManager) {
    NamespaceManager.dateText = document.querySelector(".date-text");
    NamespaceManager.targetDate = "";
    NamespaceManager.todayDate = new Date();
})(NamespaceManager || (NamespaceManager = {}));
// 1주차
const dateList1 = document.querySelector(".date-list1");
// 2주차
const dateList2 = document.querySelector(".date-list2");
// 3주차
const dateList3 = document.querySelector(".date-list3");
// 4주차
const dateList4 = document.querySelector(".date-list4");
// 메뉴를 입력할 수 있는 input요소들이 있는 form 요소
const form = document.querySelector(".menu-input-form");
// 업데이트 버튼
const updateButton = document.querySelector(".update-button");
// 한식 코너 input 요소들의 묶음 요소
const koreanFoodCornerInput = document.querySelector(".lower-wrap .korean-food-corner");
// 핫 코너 input 요소들의 묶음 요소
const hotCornerInput = document.querySelector(".lower-wrap .hot-corner");
// 샐러드 코너 input 요소들의 묶음 요소
const saladCornerInput = document.querySelector(".lower-wrap .salad-corner");
// 한식 코너의 input 요소들
const koreanFoodCorner_inputElements = koreanFoodCornerInput === null || koreanFoodCornerInput === void 0 ? void 0 : koreanFoodCornerInput.querySelectorAll("input");
// 핫 코너의 input 요소들
const hotCorner_inputElements = hotCornerInput === null || hotCornerInput === void 0 ? void 0 : hotCornerInput.querySelectorAll("input");
// 샐러드 코너의 input 요소들
const saladCorner_inputElements = saladCornerInput === null || saladCornerInput === void 0 ? void 0 : saladCornerInput.querySelectorAll("input");
// 한식 코너 뷰 section
const koreanFoodCornerView = document.querySelector(".view-section .korean-food-corner");
// 핫 코너 뷰 section
const hotCornerView = document.querySelector(".view-section .hot-corner");
// 샐러드 코너 뷰 section
const saladCornerView = document.querySelector(".view-section .salad-corner");
// 한식 코너 뷰 section내 모든 div 요소들
const koreanFoodCorner_divElements = koreanFoodCornerView === null || koreanFoodCornerView === void 0 ? void 0 : koreanFoodCornerView.querySelectorAll("div");
// 핫 코너 뷰 section내 모든 div 요소들
const hotCorner_divElements = hotCornerView === null || hotCornerView === void 0 ? void 0 : hotCornerView.querySelectorAll("div");
// 샐러드 코너 뷰 section내 모든 div 요소들
const saladCorner_divElements = saladCornerView === null || saladCornerView === void 0 ? void 0 : saladCornerView.querySelectorAll("div");
// 관리자 페이지 : 날짜 형식을 문자열 형식으로 변환
function convertDateToString(date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dateStr = [
        String(month).padStart(2, "0"),
        String(day).padStart(2, "0"),
    ].join(" / ");
    return dateStr;
}
// 관리자 페이지 : 초기에 오늘의 날짜를 렌더링
function renderTodayDate() {
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
// 관리자 페이지 : 요일과 이미 지난 날짜 조건에 따라 접근 가능한 li 요소와 접근 불가한 li 요소 생성
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
                NamespaceManager.targetDate = NamespaceManager.dateText.textContent;
                getMenuInManagerPage(NamespaceManager.targetDate).then(() => {
                    koreanFoodCorner_divElements === null || koreanFoodCorner_divElements === void 0 ? void 0 : koreanFoodCorner_divElements.forEach((div, idx) => {
                        div.textContent = NamespaceManager.menuData.koreanFoodCorner[idx];
                    });
                    hotCorner_divElements === null || hotCorner_divElements === void 0 ? void 0 : hotCorner_divElements.forEach((div, idx) => {
                        div.textContent = NamespaceManager.menuData.hotCorner[idx];
                    });
                    saladCorner_divElements === null || saladCorner_divElements === void 0 ? void 0 : saladCorner_divElements.forEach((div, idx) => {
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
// 관리자 페이지 : 이번주 월요일을 기준으로 이후 28일의 날짜들을 렌더링
function renderFourWeeksFromBeforeMondayDate() {
    const startDate = new Date();
    const datesInFourWeeks = [];
    startDate.setDate(startDate.getDate() -
        (startDate.getDay() === 0 ? 6 : startDate.getDay() - 1));
    for (let i = 0; i < 28; i++) {
        datesInFourWeeks.push(new Date(startDate.setDate(startDate.getDate() + (i === 0 ? 0 : 1))));
    }
    datesInFourWeeks.map((date, idx) => {
        createListElement(date, idx);
    });
}
renderFourWeeksFromBeforeMondayDate();
// 관리자 페이지 : 메뉴 데이터를 POST 요청
function postMenu() {
    var _a, _b, _c, _d;
    let formData;
    const KOREAN_FOOD_MENU = "korean-food-menu";
    const HOT_MENU = "hot-menu";
    const SALAD_MENU = "salad-menu";
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
}
// 관리자 페이지 : 업데이트 버튼 클릭을 통한 메뉴 POST 요청 실행
function executeUpdateButton() {
    updateButton === null || updateButton === void 0 ? void 0 : updateButton.addEventListener("click", () => {
        postMenu();
    });
}
executeUpdateButton();
// 관리자 페이지 : 오늘의 날짜가 주말일 때 업데이트 버튼이 보이지 않고, input 요소에 접근이 불가능한 기능 수행
function stopAccessToWeekend() {
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
}
stopAccessToWeekend();
// 관리자 페이지 : 선택한 날짜의 메뉴를 GET 요청
function getMenuInManagerPage(targetDate) {
    const getURL = "http://localhost:4000/get" + `/${targetDate.replace(/\s\/\s/g, "")}`;
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
        koreanFoodCorner_divElements === null || koreanFoodCorner_divElements === void 0 ? void 0 : koreanFoodCorner_divElements.forEach((div, idx) => {
            div.textContent = NamespaceManager.menuData.koreanFoodCorner[idx];
        });
        hotCorner_divElements === null || hotCorner_divElements === void 0 ? void 0 : hotCorner_divElements.forEach((div, idx) => {
            div.textContent = NamespaceManager.menuData.hotCorner[idx];
        });
        saladCorner_divElements === null || saladCorner_divElements === void 0 ? void 0 : saladCorner_divElements.forEach((div, idx) => {
            div.textContent = NamespaceManager.menuData.saladCorner[idx];
        });
    });
}
renderMenuInManagerPage();
