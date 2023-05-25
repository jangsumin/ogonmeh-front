"use strict";
const form = document.querySelector(".menu-input-form");
// 메인 페이지의 dateText 변수와 충돌하므로 namespace 사용
var NamespaceManager;
(function (NamespaceManager) {
    NamespaceManager.dateText = document.querySelector(".date-text");
})(NamespaceManager || (NamespaceManager = {}));
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
    var _a, _b, _c, _d;
    if (form) {
        data.date = String((_a = NamespaceManager.dateText) === null || _a === void 0 ? void 0 : _a.textContent).replace(/ \/ /g, "");
        formData = new FormData(form);
        for (let [key, value] of formData.entries()) {
            if (key.slice(0, -1) === KOREAN_FOOD_MENU) {
                (_b = data.koreanFoodCorner) === null || _b === void 0 ? void 0 : _b.push(String(value));
            }
            if (key.slice(0, -1) === HOT_MENU) {
                (_c = data.hotCorner) === null || _c === void 0 ? void 0 : _c.push(String(value));
            }
            if (key.slice(0, -1) === SALAD_MENU) {
                (_d = data.saladCorner) === null || _d === void 0 ? void 0 : _d.push(String(value));
            }
        }
    }
    console.log(data);
});
