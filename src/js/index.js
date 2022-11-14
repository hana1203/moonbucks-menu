function App() {
  //기본 submit event 있는 form 태그 자동으로 전송되는 이벤트 막기 - 없으면 엔터칠때마다 화면이 새로고침됨
  document
    .querySelector("#espresso-menu-form")
    .addEventListener("submit", (e) => e.preventDefault());

  const espressoMenuName = document.querySelector("#espresso-menu-name");
  //메뉴 이름 입력 받기

  const addMenuName = () => {
    document.querySelector("#espresso-menu-list").insertAdjacentHTML(
      "beforeend", //lastchild에 insert하기
      `
    <li class="menu-list-item d-flex items-center py-2">
  <span class="w-100 pl-2 menu-name">${espressoMenuName.value}</span>
  <button
    type="button"
    class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
  >
    수정
  </button>
  <button
    type="button"
    class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
  >
    삭제
  </button>
</li>`
    );
  };

  espressoMenuName.addEventListener("keypress", (e) => {
    console.log(e.key); //input값 칠때마다 한개씩 콘솔에 출력
    //입력값 빈값이면 추가하지 않기
    if (espressoMenuName.value === "") {
      return;
    }
    //enter를 쳐야지 사용자가 입력한 값 가져오기
    if (e.key === "Enter") {
      console.log(espressoMenuName.value);
      addMenuName();
      espressoMenuName.value = ""; //입력값 빈값으로 초기화
    }
  });
}

App();
