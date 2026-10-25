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
    "🍰 케이크",
    "🍚 볶음밥",
    "🍖 보쌈",
    "🍜 우동",
    "🍣 돈가스",
    "🌮 타코",
    "🌯 브리또",
    "🥗 샐러드",
    "🍢 어묵",
    "🍳 계란말이",
    "🍙 주먹밥",
    "🥢 김밥",
    "🍲 김치찌개",
    "🍲 된장찌개",
    "🍲 순댓국",
    "🍲 감자탕",
    "🍜 칼국수",
    "🍜 잔치국수",
    "🍜 비빔국수",
    "🍜 쫄면",
    "🍜 냉면",
    "🍖 갈비",
    "🍖 닭꼬치",
    "🍖 양꼬치",
    "🥘 찜닭",
    "🍗 닭볶음탕",
    "🍤 탕수육",
    "🥡 깐풍기",
    "🍲 마라탕",
    "🥘 마라샹궈",
    "🍚 제육볶음",
    "🍚 불고기덮밥",
    "🍛 오므라이스",
    "🍱 도시락",
    "🍣 회덮밥",
    "🍣 연어덮밥",
    "🍤 돈부리",
    "🍜 라멘",
    "🍥 타코야키",
    "🥞 오코노미야키",
    "🍕 피자빵",
    "🥐 크루아상",
    "🍞 토스트",
    "🧇 와플",
    "🍩 도넛",
    "🍪 쿠키",
    "🍫 초콜릿",
    "🍮 푸딩",
    "🍧 빙수",
    "🍨 젤라토",
    "🥨 프레첼",
    "🍿 팝콘",
    "🍠 군고구마",
    "🥔 감자튀김",
    "🧅 양파링",
    "🍗 치킨너겟",
    "🥓 베이컨",
    "🧆 크로켓",
    "🥠 군만두",
    "🍘 떡꼬치",
    "🍡 떡",
    "🍲 샤브샤브",
    "🥩 육회",
    "🍖 갈비찜",
    "🍚 비빔밥",
    "🍲 육개장",
    "🍲 설렁탕",
    "🍲 갈비탕",
    "🍝 리조또",
    "🍤 감바스",
    "🥙 케밥",
    "🥚 계란밥",
    "🍜 볶음우동",
    "🍲 어묵탕"
];

// HTML 요소 가져오기
const menuElement = document.getElementById("menu");
const recommendButton = document.getElementById("recommendButton");

// 폭죽을 표시할 영역 만들기
const confettiContainer = document.createElement("div");
confettiContainer.id = "confetti-container";
confettiContainer.setAttribute("aria-hidden", "true");
document.body.appendChild(confettiContainer);

// 슬롯머신 작동 상태
let isSpinning = false;

// 추천 버튼 클릭
recommendButton.addEventListener("click", function () {
    // 이미 슬롯머신이 돌아가고 있다면 중복 실행 방지
    if (isSpinning) {
        return;
    }

    isSpinning = true;
    recommendButton.disabled = true;
    recommendButton.textContent = "🎰 메뉴 추첨 중...";

    // 이전 결과의 효과 제거
    menuElement.classList.remove("result");
    menuElement.classList.add("spinning");

    // 이전 폭죽 제거
    confettiContainer.replaceChildren();

    let elapsed = 0;
    let interval = 50;

    // 처음에는 빠르게 메뉴 변경
    function spin() {
        const randomIndex = Math.floor(Math.random() * menus.length);

        menuElement.textContent = menus[randomIndex];

        elapsed += interval;

        // 약 2.5초 동안 돌리고 점점 느려지게 만들기
        if (elapsed < 2500) {
            if (elapsed > 1800) {
                interval = 250;
            } else if (elapsed > 1200) {
                interval = 150;
            } else if (elapsed > 600) {
                interval = 90;
            } else {
                interval = 50;
            }

            setTimeout(spin, interval);
        } else {
            finishSpin();
        }
    }

    // 최종 메뉴 결정
    function finishSpin() {
        const randomIndex = Math.floor(Math.random() * menus.length);
        const selectedMenu = menus[randomIndex];

        menuElement.textContent = `🎉 오늘의 야식은...\n${selectedMenu}!`;

        menuElement.classList.remove("spinning");

        // 애니메이션을 다시 실행하기 위한 처리
        void menuElement.offsetWidth;

        menuElement.classList.add("result");

        // 폭죽 효과 실행
        launchConfetti();

        recommendButton.disabled = false;
        recommendButton.textContent = "다시 추천받기 🎲";

        isSpinning = false;
    }
    
    spin();
});

// 폭죽 효과
function launchConfetti() {
    const colors = [
        "#ff595e",
        "#ffca3a",
        "#8ac926",
        "#1982c4",
        "#6a4c93",
        "#ff99c8"
    ];

    // 화면에 색종이 100개 생성
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement("span");

        confetti.className = "confetti";

        // 화면의 가로 위치를 무작위로 지정
        confetti.style.left = Math.random() * 100 + "vw";

        // 색상 무작위 선택
        confetti.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];

        // 색종이 크기와 떨어지는 시간 설정
        confetti.style.width = 5 + Math.random() * 7 + "px";
        confetti.style.height = 8 + Math.random() * 12 + "px";

        confetti.style.setProperty(
            "--duration",
            2 + Math.random() * 2 + "s"
        );

        confetti.style.setProperty(
            "--drift",
            Math.random() * 300 - 150 + "px"
        );

        confettiContainer.appendChild(confetti);

        // 애니메이션이 끝나면 해당 색종이 삭제
        confetti.addEventListener("animationend", function () {
            confetti.remove();
        });
    }
}