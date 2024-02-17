document.addEventListener("DOMContentLoaded", function () {
  renderContent(window.location.pathname);

  // 페이지 변경 시 이벤트 리스너 등록
  window.addEventListener("popstate", function (event) {
    renderContent(event.state.path);
  });
});

// URL에 따라 컨텐츠 렌더링 함수
export default function renderContent(path) {
  if (!document.querySelector(".content_title")) {
    return;
  }

  const contentTitle = document.querySelector(".content_title");

  // 컨텐츠에 따라 다른 내용을 표시하는 로직을 추가
  if (path === "/web/") {
    contentTitle.innerHTML = "<h1>Great PeoPle</h1>";
  } else if (path === "/web/signup") {
    contentTitle.innerHTML = "<h1>Sign Up GreatPeople</h1>";
  } else {
    contentTitle.innerHTML = "<h1>Page not found</h1>";
  }
}

// ContentTitle.js

document.addEventListener("DOMContentLoaded", function () {
  const path = window.location.pathname;

  if (path === "/web/") {
    renderContentTitle("Great PeoPle");
  } else if (path === "/web/signup") {
    renderContentTitle("signup Great PeoPle");
  } else {
    renderContentTitle("Page not found");
  }
});

function renderContentTitle(title) {
  const contentTitle = document.querySelector(".content_title");
  if (contentTitle) {
    contentTitle.innerHTML = `<h1>${title}</h1>`;
  }
}
