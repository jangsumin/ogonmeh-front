"use strict";
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
