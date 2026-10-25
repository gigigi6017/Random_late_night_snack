// 야식 메뉴 목록
const menus = [
    "🍗 치킨",
    "🍕 피자",
    "🍜 라면",
    "🌶️ 떡볶이",
    "🍖 족발",
    "🥟 만두",
    "🍔 햄버거",
    "🌭 핫도그",
    "🍝 파스타",
    "🥘 닭발",
    "🍱 초밥",
    "🥓 삼겹살",
    "🍛 카레",
    "🧀 치즈볼",
    "🍙 삼각김밥",
    "🥪 샌드위치",
    "🍗 닭강정",
    "🥞 팬케이크",
    "🍲 부대찌개",
    "🍜 짜장면",
    "🍜 짬뽕",
    "🍤 새우튀김",
    "🥩 스테이크",
    "🍦 아이스크림",
    "🍰 케이크"
];

// HTML에서 메뉴 표시 영역과 버튼 가져오기
const menuElement = document.getElementById("menu");
const recommendButton = document.getElementById("recommendButton");

// 버튼을 클릭하면 실행
recommendButton.addEventListener("click", function () {

    // 메뉴 목록에서 무작위 번호 선택
    const randomIndex = Math.floor(Math.random() * menus.length);

    // 선택한 메뉴 가져오기
    const selectedMenu = menus[randomIndex];

    // 화면에 추천 메뉴 표시
    menuElement.textContent = "오늘의 야식은...\n" + selectedMenu + "!";
});