"use strict";
// 사용자 페이지 네임스페이스
var NamespaceUser;
(function (NamespaceUser) {
    NamespaceUser.dateText = document.querySelector(".date-text");
    NamespaceUser.targetDate = "";
    NamespaceUser.todayDate = new Date();
    NamespaceUser.isSuccessToLogin = true;
    NamespaceUser.backURL = "https://port-0-ogonmeh-back-kvmh2mljv4mx4z.sel4.cloudtype.app/";
})(NamespaceUser || (NamespaceUser = {}));
// 드롭다운 요소
const dropdown = document.querySelector(".dropdown");
// 햄버거 버튼
const hamburgerButton = document.querySelector(".hamburger-button");
// 매니저 로그인 버튼
const managerLoginButton = document.querySelector(".manager-login-button");
// 모달 구역
const modalWrap = document.querySelector(".modal-wrap");
// 모달 배경
const modalWrapBg = document.querySelector(".modal-wrap-bg");
// 모달 닫기 버튼
const modalCloseButton = document.querySelector(".modal-close-button");
// 현재 기준 어제로 가는 삼각형 버튼
const yesterdayMenuButton = document.querySelector(".yesterday-menu-button");
// 현재 기준 내일로 가는 삼각형 버튼
const tomorrowMenuButton = document.querySelector(".tomorrow-menu-button");
// 현재 날짜 상태
let todayDate = NamespaceUser.todayDate;
let todayYear = String(todayDate.getFullYear());
let todayMonth = String(todayDate.getMonth() + 1);
let todayDay = String(todayDate.getDate());
// 요일 배열
const days = ["일", "월", "화", "수", "목", "금", "토"];
// 한식 코너 section
const koreanFoodCornerSection = document.querySelector("main .korean-food-corner");
// 핫 코너 section
const hotCornerSection = document.querySelector("main .hot-corner");
// 샐러드 코너 section
const saladCornerSection = document.querySelector("main .salad-corner");
// 한식 코너 section 내 모든 div 요소들
const koreanFoodCornerSection_divElements = koreanFoodCornerSection === null || koreanFoodCornerSection === void 0 ? void 0 : koreanFoodCornerSection.querySelectorAll("div");
// 핫 코너 section 내 모든 div 요소들
const hotCornerSection_divElements = hotCornerSection === null || hotCornerSection === void 0 ? void 0 : hotCornerSection.querySelectorAll("div");
// 샐러드 코너 section 내 모든 div 요소들
const saladCornerSection_divElements = saladCornerSection === null || saladCornerSection === void 0 ? void 0 : saladCornerSection.querySelectorAll("div");
// 누적 방문자 수
const accumulatedVisitor = document.querySelector(".accumulated-visitor");
// 로그인 버튼
const loginButton = document.querySelector(".login-button");
// 사용자 페이지 : 드롭다운 기능 수행
function executeDropdown() {
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
// 사용자 페이지 : 로그인 모달 띄우기
function executeLoginModal() {
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
// 사용자 페이지 : 같은 날짜인지 비교하는 함수 수행으로 현재 기준 어제로 가는 버튼 접근 막기
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
// 사용자 페이지 : 오늘의 메뉴를 렌더링
function renderTodayMenu() {
    if (NamespaceUser.dateText) {
        NamespaceUser.dateText.innerText =
            todayYear +
                "." +
                todayMonth.padStart(2, "0") +
                "." +
                todayDay.padStart(2, "0") +
                `(${days[todayDate.getDay()]})`;
    }
    if (yesterdayMenuButton) {
        yesterdayMenuButton.style.visibility = "hidden";
    }
    renderMenu();
}
renderTodayMenu();
// 사용자 페이지 : 현재 기준 어제로 가는 버튼을 누르고 나서 메뉴를 렌더링
function renderYesterdayMenu() {
    yesterdayMenuButton === null || yesterdayMenuButton === void 0 ? void 0 : yesterdayMenuButton.addEventListener("click", () => {
        NamespaceUser.menuData = {
            koreanFoodCorner: [],
            hotCorner: [],
            saladCorner: [],
        };
        todayDate = new Date(todayDate.setDate(todayDate.getDate() - 1));
        todayYear = String(todayDate.getFullYear());
        todayMonth = String(todayDate.getMonth() + 1);
        todayDay = String(todayDate.getDate());
        if (NamespaceUser.dateText) {
            NamespaceUser.dateText.innerText =
                todayYear +
                    "." +
                    todayMonth.padStart(2, "0") +
                    "." +
                    todayDay.padStart(2, "0") +
                    `(${days[todayDate.getDay()]})`;
        }
        if (yesterdayMenuButton) {
            if (!isSameDate(todayDate, new Date())) {
                yesterdayMenuButton.style.visibility = "visible";
            }
            else {
                yesterdayMenuButton.style.visibility = "hidden";
            }
        }
        if (tomorrowMenuButton) {
            if (!isSameDate(todayDate, new Date(new Date().setDate(new Date().getDate() + 28)))) {
                tomorrowMenuButton.style.visibility = "visible";
            }
            else {
                tomorrowMenuButton.style.visibility = "hidden";
            }
        }
        renderMenu();
    });
}
renderYesterdayMenu();
// 사용자 페이지 : 현재 기준 내일로 가는 버튼을 누르고 나서 메뉴를 렌더링
function renderTomorrowMenu() {
    tomorrowMenuButton === null || tomorrowMenuButton === void 0 ? void 0 : tomorrowMenuButton.addEventListener("click", () => {
        NamespaceUser.menuData = {
            koreanFoodCorner: [],
            hotCorner: [],
            saladCorner: [],
        };
        todayDate = new Date(todayDate.setDate(todayDate.getDate() + 1));
        todayYear = String(todayDate.getFullYear());
        todayMonth = String(todayDate.getMonth() + 1);
        todayDay = String(todayDate.getDate());
        if (NamespaceUser.dateText) {
            NamespaceUser.dateText.innerText =
                todayYear +
                    "." +
                    todayMonth.padStart(2, "0") +
                    "." +
                    todayDay.padStart(2, "0") +
                    `(${days[todayDate.getDay()]})`;
        }
        if (yesterdayMenuButton) {
            if (!isSameDate(todayDate, new Date())) {
                yesterdayMenuButton.style.visibility = "visible";
            }
            else {
                yesterdayMenuButton.style.visibility = "hidden";
            }
        }
        if (tomorrowMenuButton) {
            if (!isSameDate(todayDate, new Date(new Date().setDate(new Date().getDate() + 28)))) {
                tomorrowMenuButton.style.visibility = "visible";
            }
            else {
                tomorrowMenuButton.style.visibility = "hidden";
            }
        }
        renderMenu();
    });
}
renderTomorrowMenu();
// 사용자 페이지 : 메뉴 데이터를 GET 요청
function getMenu(targetDate) {
    // const getURL: string =
    //   "http://localhost:4000/get" + `/${targetDate.replace(/\s\/\s/g, "")}`;
    const getURL = `${NamespaceUser.backURL}get` + `/${targetDate.replace(/\s\/\s/g, "")}`;
    return fetch(getURL)
        .then((response) => {
        if (!response.ok) {
            throw new Error("데이터 가져오기 실패");
        }
        return response.json();
    })
        .then((data) => {
        NamespaceUser.menuData = data;
    })
        .catch((error) => {
        console.error("오류:", error);
    });
}
// 사용자 페이지 : 메뉴를 렌더링
function renderMenu() {
    NamespaceUser.targetDate =
        todayYear.slice(-2) +
            todayMonth.padStart(2, "0") +
            todayDay.padStart(2, "0");
    koreanFoodCornerSection_divElements === null || koreanFoodCornerSection_divElements === void 0 ? void 0 : koreanFoodCornerSection_divElements.forEach((div) => {
        div.textContent = "";
    });
    hotCornerSection_divElements === null || hotCornerSection_divElements === void 0 ? void 0 : hotCornerSection_divElements.forEach((div) => {
        div.textContent = "";
    });
    saladCornerSection_divElements === null || saladCornerSection_divElements === void 0 ? void 0 : saladCornerSection_divElements.forEach((div) => {
        div.textContent = "";
    });
    if (!(todayDate.getDay() === 0 || todayDate.getDay() === 6)) {
        getMenu(NamespaceUser.targetDate).then(() => {
            if (NamespaceUser.menuData) {
                koreanFoodCornerSection_divElements === null || koreanFoodCornerSection_divElements === void 0 ? void 0 : koreanFoodCornerSection_divElements.forEach((div, idx) => {
                    div.textContent = NamespaceUser.menuData.koreanFoodCorner[idx];
                });
                hotCornerSection_divElements === null || hotCornerSection_divElements === void 0 ? void 0 : hotCornerSection_divElements.forEach((div, idx) => {
                    div.textContent = NamespaceUser.menuData.hotCorner[idx];
                });
                saladCornerSection_divElements === null || saladCornerSection_divElements === void 0 ? void 0 : saladCornerSection_divElements.forEach((div, idx) => {
                    div.textContent = NamespaceUser.menuData.saladCorner[idx];
                });
            }
        });
    }
    else {
        koreanFoodCornerSection_divElements === null || koreanFoodCornerSection_divElements === void 0 ? void 0 : koreanFoodCornerSection_divElements.forEach((div) => {
            div.textContent = "-";
        });
        hotCornerSection_divElements === null || hotCornerSection_divElements === void 0 ? void 0 : hotCornerSection_divElements.forEach((div) => {
            div.textContent = "-";
        });
        saladCornerSection_divElements === null || saladCornerSection_divElements === void 0 ? void 0 : saladCornerSection_divElements.forEach((div) => {
            div.textContent = "-";
        });
    }
}
// 사용자 페이지 : 방문자 데이터를 GET 요청
function getVisitor() {
    // const getURL: string = "http://localhost:4000/getCount";
    const getURL = `${NamespaceUser.backURL}getCount`;
    return fetch(getURL)
        .then((response) => {
        if (!response.ok) {
            throw new Error("데이터 가져오기 실패");
        }
        return response.json();
    })
        .then((data) => {
        NamespaceUser.count = data.count;
    })
        .catch((error) => {
        console.error("오류:", error);
    });
}
// 사용자 페이지 : 방문자 데이터를 UPDATE 요청
function updateVisitor() {
    // const updateURL: string = "http://localhost:4000/updateCount";
    const updateURL = `${NamespaceUser.backURL}updateCount`;
    return fetch(updateURL, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
        if (!response.ok) {
            throw new Error("데이터 가져오기 실패");
        }
        return response.json();
    })
        .then((data) => {
        NamespaceUser.count = data.count;
    })
        .catch((error) => {
        console.error("오류:", error);
    });
}
// 사용자 페이지 : 방문자 수 카운팅
function countVisitor() {
    if (!document.cookie.includes("visited=true")) {
        let date = new Date(Date.now() + 86400e3);
        document.cookie = "visited=true; expires=" + date.toUTCString();
        updateVisitor().then(() => {
            if (accumulatedVisitor) {
                accumulatedVisitor.textContent = NamespaceUser.count.toString();
            }
        });
    }
    else {
        getVisitor().then(() => {
            if (accumulatedVisitor) {
                accumulatedVisitor.textContent = NamespaceUser.count.toString();
            }
        });
    }
}
countVisitor();
// 사용자 페이지 : 로그인 버튼 클릭 시 로그인 정보 확인
function login() {
    loginButton === null || loginButton === void 0 ? void 0 : loginButton.addEventListener("click", () => {
        checkLogin();
    });
}
login();
// 사용자 페이지 : 계정 확인 API 사용으로, 관리자 페이지 혹은 새로 고침
function checkLogin() {
    // const loginURL: string = "http://localhost:4000/login";
    const loginURL = `${NamespaceUser.backURL}login`;
    // 아이디
    const id = document.querySelector(".id-input");
    // 비밀번호
    const password = document.querySelector(".password-input");
    const data = {
        id: id === null || id === void 0 ? void 0 : id.value,
        password: password === null || password === void 0 ? void 0 : password.value,
    };
    fetch(loginURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
        return response.json();
    })
        .then((data) => {
        if (data.success === false) {
            NamespaceUser.isSuccessToLogin = false;
        }
        else {
            let date = new Date(Date.now() + 86400e3);
            document.cookie = "loggedIn=true; expires=" + date.toUTCString();
        }
        if (NamespaceUser.isSuccessToLogin) {
            window.location.href = "manager.html";
        }
        else {
            window.location.reload();
        }
    })
        .catch((error) => {
        console.error("오류:", error);
    });
}
