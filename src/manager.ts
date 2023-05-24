interface Menu {
  date?: String;
  koreanFoodCorner: String[];
  hotCorner: String[];
  saladCorner: String[];
}

const form: HTMLFormElement | null = document.querySelector(".menu-input-form");
// 메인 페이지의 dateText 변수와 충돌하므로 namespace 사용
namespace NamespaceManager {
  export const dateText: HTMLInputElement | null =
    document.querySelector(".date-text");
}
const updateButton: HTMLInputElement | null =
  document.querySelector(".update-button");
let formData: FormData | null;
const data: Menu = {
  koreanFoodCorner: [],
  hotCorner: [],
  saladCorner: [],
};

const KOREAN_FOOD_MENU: String = "korean-food-menu";
const HOT_MENU: String = "hot-menu";
const SALAD_MENU: String = "salad-menu";

updateButton?.addEventListener("click", () => {
  if (form) {
    data.date = String(NamespaceManager.dateText?.textContent);
    formData = new FormData(form);
    for (let [key, value] of formData.entries()) {
      if (key.slice(0, -1) === KOREAN_FOOD_MENU) {
        data.koreanFoodCorner?.push(String(value));
      }
      if (key.slice(0, -1) === HOT_MENU) {
        data.hotCorner?.push(String(value));
      }
      if (key.slice(0, -1) === SALAD_MENU) {
        data.saladCorner?.push(String(value));
      }
    }
  }
  console.log(data);
});
