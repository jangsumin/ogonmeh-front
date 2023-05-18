"use strict";
// 드롭다운 구현
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
// 매니저 로그인 버튼 클릭 시, 로그인 모달 나타나도록 구현
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
// 날짜 이동 구현
const dateText = document.querySelector(".date-text");
const yesterdayMenuButton = document.querySelector(".yesterday-menu-button");
const tomorrowMenuButton = document.querySelector(".tomorrow-menu-button");
let todayDate = new Date();
let todayYear = String(todayDate.getFullYear());
let todayMonth = String(todayDate.getMonth() + 1);
let todayDay = String(todayDate.getDate());
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
});
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
});
