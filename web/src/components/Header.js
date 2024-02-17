import renderContent from "./ContentTitle.js";

document.addEventListener("DOMContentLoaded", function () {
  // 최초 페이지 로딩 시 이벤트 리스너 등록
  registerEventListeners();

  // 초기화: 페이지 로딩 시 기본 페이지 설정
  navigateTo(window.location.pathname);
});

// URL에 따라 페이지 렌더링 함수
function navigateTo(path) {
  // URL 변경
  window.history.pushState({ path }, "", path);

  // 페이지 렌더링
  renderPage(path);
}

// 페이지 렌더링 함수
function renderPage(path) {
  const appContainer = document.querySelector(".app");

  // 페이지에 따라 다른 내용을 로드하여 렌더링하는 로직을 추가해야 함
  fetchPageContent(path)
    .then((html) => {
      appContainer.innerHTML = html;

      // 새로운 페이지에 대한 이벤트 리스너 등록
      registerEventListeners();
    })
    .then(() => {
      renderContent(path);
    })
    .catch((error) => {
      console.error(`Error fetching ${path}:`, error);
    });
}

// 이벤트 리스너 등록 함수
function registerEventListeners() {
  const homeMenu = document.getElementById("menu_home");
  homeMenu.addEventListener("click", function () {
    navigateTo("/web/");
  });

  const signupMenu = document.getElementById("menu_signup");
  signupMenu.addEventListener("click", function () {
    navigateTo("/web/signup");
  });
}

// 페이지 내용을 가져오는 함수
async function fetchPageContent(path) {
  try {
    let response;
    if (path === "/web/") {
      response = await fetch(`${path}home.html`);
    } else if (path === "/web/signup") {
      response = await fetch(`${path}.html`);
    }
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const html = await response.text();
    return html;
  } catch (error) {
    throw error;
  }
}
