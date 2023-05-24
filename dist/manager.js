"use strict";
const form = document.querySelector(".menu-input-form");
const updateButton = document.querySelector(".update-button");
let formData;
const data = {
    koreanFoodCorner: [],
    hotCorner: [],
    saladCorner: [],
};
const KOREAN_FOOD_MENU = "korean-food-menu";
const HOT_MENU = "hot-menu";
const SALAD_MENU = "salad-menu";
updateButton === null || updateButton === void 0 ? void 0 : updateButton.addEventListener("click", () => {
    var _a, _b, _c;
    if (form) {
        formData = new FormData(form);
        for (let [key, value] of formData.entries()) {
            if (key.slice(0, -1) === KOREAN_FOOD_MENU) {
                (_a = data["koreanFoodCorner"]) === null || _a === void 0 ? void 0 : _a.push(String(value));
            }
            if (key.slice(0, -1) === HOT_MENU) {
                (_b = data["hotCorner"]) === null || _b === void 0 ? void 0 : _b.push(String(value));
            }
            if (key.slice(0, -1) === SALAD_MENU) {
                (_c = data["saladCorner"]) === null || _c === void 0 ? void 0 : _c.push(String(value));
            }
        }
    }
    console.log(data);
});
