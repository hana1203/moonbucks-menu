function App() {
  //기본 submit event 있는 form 태그 자동으로 전송되는 이벤트 막기 - 없으면 엔터칠때마다 화면이 새로고침됨
  document
    .querySelector("#espresso-menu-form")
    .addEventListener("submit", (e) => e.preventDefault());

  const $espressoMenuName = document.querySelector("#espresso-menu-name");

  const addMenuName = () => {
    //입력값 빈값이면 추가하지 않기
    if ($espressoMenuName.value === "") {
      alert("값을 입력해주세요");
      return;
    }
    //메뉴이름 input요소 바인딩
    document.querySelector("#espresso-menu-list").insertAdjacentHTML(
      "beforeend", //lastchild에 insert하기
      `
    <li class="menu-list-item d-flex items-center py-2">
  <span class="w-100 pl-2 menu-name">${$espressoMenuName.value}</span>
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
    updateMenuCount();
    $espressoMenuName.value = ""; //입력값 빈값으로 초기화
  };

  //li갯수에 따라 카운팅 변경 총 값 변경 - 재사용 가능하게 함수로 작성
  const updateMenuCount = () => {
    let menuCount = document
      .querySelector("#espresso-menu-list")
      .querySelectorAll("li").length; //length없이 li요소 찍으면 NodeList [li.menu-list-item.d-flex.items-center.py-2]
    document.querySelector(".menu-count").textContent = `총 ${menuCount}개`;
  };

  //엔터 이벤트
  $espressoMenuName.addEventListener("keypress", (e) => {
    console.log(e.key); //input값 칠때마다 한개씩 콘솔에 출력

    //enter를 쳐야지 사용자가 입력한 값 가져오기
    if (e.key === "Enter") {
      console.log($espressoMenuName.value);
      addMenuName();
    }
  });

  const $espressoMenuSubmitButton = document.querySelector(
    "#espresso-menu-submit-button"
  );

  //클릭 이벤트
  $espressoMenuSubmitButton.addEventListener("click", (e) => {
    console.log($espressoMenuName.value); //확인버튼 눌러야지 인풋값 콘솔에 띄워짐
    addMenuName();
  });

  //수정/삭제 기능
  //메뉴 li요소와 수정/삭제 버튼은 html에는 없는 element이고 addMenuName함수를 통해 input이 입력된 이후에 생성되기때문에 부모 요소에게 이벤트를 위임
  document
    .querySelector("#espresso-menu-list")
    .addEventListener("click", (e) => {
      console.log(e); //PointerEvent {isTrusted: true, pointerId: 1, width: 1, height: 1, pressure: 0, …}
      console.log(e.target); //<button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"> 수정 </button>
      //수정 이벤트
      if (e.target.classList.contains("menu-edit-button")) {
        //클릭한 요소의 클래스 배열중 menu-edit-button 클래스 있으면
        //가장가까운 li태그를 찾아서 li > span 태그 ('.menu-name')의 textContent 를 띄워주고 수정
        const $menuName = e.target.closest("li").querySelector(".menu-name");
        let updatedMenuName = prompt(
          "메뉴이름을 수정해주세요",
          $menuName.textContent
        );
        $menuName.textContent = updatedMenuName;
      }

      //삭제 이벤트
      if (e.target.classList.contains("menu-remove-button")) {
        if (confirm(`정말 삭제할까요?`)) {
          //확인누르면 true, 취소하면 false 리턴
          e.target.closest("li").remove();
          //총 갯수도 줄이기
          updateMenuCount();
        }
      }
    });
}
App();
