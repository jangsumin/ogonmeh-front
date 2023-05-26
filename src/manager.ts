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

const KOREAN_FOOD_MENU: String = "korean-food-menu";
const HOT_MENU: String = "hot-menu";
const SALAD_MENU: String = "salad-menu";

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
