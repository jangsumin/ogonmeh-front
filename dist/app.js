"use strict";
var NamespaceUser;
(function (NamespaceUser) {
    NamespaceUser.targetDate = "";
})(NamespaceUser || (NamespaceUser = {}));
function executeDropdown() {
    const dropdown = document.querySelector(".dropdown");
    const hamburgerButton = document.querySelector(".hamburger-button");
    let isDropdownOpen = false;
    hamburgerButton === null || hamburgerButton === void 0 ? void 0 : hamburgerButton.addEventListener("click", () => {
        if (dropdown) {
            if (!isDropdownOpen) {
                dropdown.style.height = "200px";
                isDropdownOpen = !isDropdownOpen;
            }
            else {
                dropdown.style.height = "0";
                isDropdownOpen = !isDropdownOpen;
            }
        }
    });
}
executeDropdown();
function executeLoginModal() {
    const managerLoginButton = document.querySelector(".manager-login-button");
    const modalWrap = document.querySelector(".modal-wrap");
    const modalWrapBg = document.querySelector(".modal-wrap-bg");
    const modalCloseButton = document.querySelector(".modal-close-button");
    managerLoginButton === null || managerLoginButton === void 0 ? void 0 : managerLoginButton.addEventListener("click", () => {
        modalWrap === null || modalWrap === void 0 ? void 0 : modalWrap.classList.remove("hidden");
    });
    modalWrapBg === null || modalWrapBg === void 0 ? void 0 : modalWrapBg.addEventListener("click", () => {
        modalWrap === null || modalWrap === void 0 ? void 0 : modalWrap.classList.add("hidden");
    });
    modalCloseButton === null || modalCloseButton === void 0 ? void 0 : modalCloseButton.addEventListener("click", () => {
        modalWrap === null || modalWrap === void 0 ? void 0 : modalWrap.classList.add("hidden");
    });
}
executeLoginModal();
const dateText = document.querySelector(".date-text");
const yesterdayMenuButton = document.querySelector(".yesterday-menu-button");
const tomorrowMenuButton = document.querySelector(".tomorrow-menu-button");
let todayDate = new Date();
let todayYear = String(todayDate.getFullYear());
let todayMonth = String(todayDate.getMonth() + 1);
let todayDay = String(todayDate.getDate());
function isSameDate(date1, date2) {
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
function renderTodayMenu() {
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
    renderMenu();
}
renderTodayMenu();
function renderYesterdayMenu() {
    yesterdayMenuButton === null || yesterdayMenuButton === void 0 ? void 0 : yesterdayMenuButton.addEventListener("click", () => {
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
            }
            else {
                yesterdayMenuButton.style.visibility = "hidden";
            }
        }
        renderMenu();
    });
}
renderYesterdayMenu();
function renderTomorrowMenu() {
    tomorrowMenuButton === null || tomorrowMenuButton === void 0 ? void 0 : tomorrowMenuButton.addEventListener("click", () => {
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
            }
            else {
                yesterdayMenuButton.style.visibility = "hidden";
            }
        }
        renderMenu();
    });
}
renderTomorrowMenu();
const koreanFoodCornerSection = document.querySelector("main .korean-food-corner");
const hotCornerSection = document.querySelector("main .hot-corner");
const saladCornerSection = document.querySelector("main .salad-corner");
const koreanFoodCornerSection_divElements = koreanFoodCornerSection === null || koreanFoodCornerSection === void 0 ? void 0 : koreanFoodCornerSection.querySelectorAll("div");
const hotCornerSection_divElements = hotCornerSection === null || hotCornerSection === void 0 ? void 0 : hotCornerSection.querySelectorAll("div");
const saladCornerSection_divElements = saladCornerSection === null || saladCornerSection === void 0 ? void 0 : saladCornerSection.querySelectorAll("div");
function getMenu(targetDate) {
    const getURL = "http://localhost:4000/get" + `/${targetDate.replace(/\s\/\s/g, "")}`;
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
function renderMenu() {
    NamespaceUser.targetDate =
        todayYear.slice(-2) +
            todayMonth.padStart(2, "0") +
            todayDay.padStart(2, "0");
    console.log(NamespaceUser.targetDate);
    getMenu(NamespaceUser.targetDate).then(() => {
        koreanFoodCornerSection_divElements === null || koreanFoodCornerSection_divElements === void 0 ? void 0 : koreanFoodCornerSection_divElements.forEach((div, idx) => {
            div.textContent = NamespaceUser.menuData[0].koreanFoodCorner[idx];
        });
        hotCornerSection_divElements === null || hotCornerSection_divElements === void 0 ? void 0 : hotCornerSection_divElements.forEach((div, idx) => {
            div.textContent = NamespaceUser.menuData[0].hotCorner[idx];
        });
        saladCornerSection_divElements === null || saladCornerSection_divElements === void 0 ? void 0 : saladCornerSection_divElements.forEach((div, idx) => {
            div.textContent = NamespaceUser.menuData[0].saladCorner[idx];
        });
    });
}
