
// ========================================
// 1. 야식 메뉴 목록
// ========================================

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


// ========================================
// 2. HTML 요소 가져오기
// ========================================

const menuElement = document.getElementById("menu");
const recommendButton = document.getElementById("recommendButton");


// ========================================
// 3. 폭죽을 표시할 영역 만들기
// ========================================

const confettiContainer = document.createElement("div");

confettiContainer.id = "confetti-container";
confettiContainer.setAttribute("aria-hidden", "true");

document.body.appendChild(confettiContainer);


// ========================================
// 4. 오디오 설정
// ========================================

// 브라우저에서 소리를 생성하는 도구
let audioContext = null;

// 소리 기능이 준비되었는지 확인
function initializeAudio() {
    if (!audioContext) {
        const AudioContextClass =
            window.AudioContext || window.webkitAudioContext;

        if (!AudioContextClass) {
            return false;
        }

        audioContext = new AudioContextClass();
    }

    if (audioContext.state === "suspended") {
        audioContext.resume();
    }

    return true;
}


// ========================================
// 5. 기본 전자음 만들기
// ========================================

// 주파수와 길이를 지정해 전자음을 생성
function playTone(
    frequency,
    duration = 0.08,
    type = "square",
    volume = 0.04,
    endFrequency = null
) {
    if (!audioContext || audioContext.state !== "running") {
        return;
    }

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    const now = audioContext.currentTime;

    oscillator.type = type;

    oscillator.frequency.setValueAtTime(frequency, now);

    // 필요하다면 소리의 높이를 점차 변경
    if (endFrequency !== null) {
        oscillator.frequency.exponentialRampToValueAtTime(
            Math.max(1, endFrequency),
            now + duration
        );
    }

    // 소리가 갑자기 끊기지 않도록 조절
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.005);
    gain.gain.exponentialRampToValueAtTime(
        0.001,
        now + duration
    );

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start(now);
    oscillator.stop(now + duration + 0.02);
}


// ========================================
// 6. 슬롯머신 효과음
// ========================================

let tickCount = 0;

function playSlotSound() {
    tickCount++;

    // 메뉴가 바뀔 때마다 짧은 딸깍 소리
    const frequency = 350 + Math.random() * 250;

    playTone(frequency, 0.045, "square", 0.025);
}


// ========================================
// 7. 감속 효과음
// ========================================

function playSlowdownSound() {
    // 낮은 전자음으로 추첨이 끝나가는 느낌
    playTone(260, 0.12, "triangle", 0.05);
}


// ========================================
// 8. 결과 발표 팡파르
// ========================================

function playFanfare() {
    // 밝은 음을 차례대로 재생
    const notes = [
        { frequency: 523.25, delay: 0 },
        { frequency: 659.25, delay: 0.12 },
        { frequency: 783.99, delay: 0.24 },
        { frequency: 1046.50, delay: 0.40 }
    ];

    notes.forEach(function (note) {
        setTimeout(function () {
            playTone(
                note.frequency,
                0.22,
                "sine",
                0.09
            );
        }, note.delay * 1000);
    });
}


// ========================================
// 9. 폭죽 효과음
// ========================================

function playFireworkSound() {
    // 폭죽이 터지는 듯한 짧은 하강음
    const frequency = 500 + Math.random() * 500;

    playTone(
        frequency,
        0.18,
        "sawtooth",
        0.035,
        90
    );
}


// ========================================
// 10. 슬롯머신 실행 상태
// ========================================

let isSpinning = false;


// ========================================
// 11. 추천 버튼 클릭
// ========================================

recommendButton.addEventListener("click", function () {

    // 추첨 중에는 중복 실행 방지
    if (isSpinning) {
        return;
    }

    isSpinning = true;

    // 사용자 클릭으로 오디오 시작
    initializeAudio();

    recommendButton.disabled = true;
    recommendButton.textContent = "🎰 메뉴 추첨 중...";

    // 이전 애니메이션 초기화
    menuElement.classList.remove("result");
    menuElement.classList.add("spinning");

    // 이전 폭죽 제거
    confettiContainer.replaceChildren();

    // 이전 추첨 상태 초기화
    tickCount = 0;

    let elapsed = 0;
    let interval = 50;

    // 슬롯머신 회전
    function spin() {

        // 무작위 메뉴 표시
        const randomIndex = Math.floor(
            Math.random() * menus.length
        );

        menuElement.textContent = menus[randomIndex];

        // 메뉴가 바뀔 때 효과음 재생
        playSlotSound();

        elapsed += interval;

        // 점점 느려지게 만들기
        if (elapsed > 1800) {
            interval = 250;
        } else if (elapsed > 1200) {
            interval = 150;
        } else if (elapsed > 600) {
            interval = 90;
        } else {
            interval = 50;
        }

        // 약 2.5초 후 추첨 종료
        if (elapsed < 2500) {

            // 마지막 구간에는 감속 소리 추가
            if (elapsed > 1800) {
                playSlowdownSound();
            }

            setTimeout(spin, interval);

        } else {
            finishSpin();
        }
    }


    // ========================================
    // 12. 최종 메뉴 결정
    // ========================================

    function finishSpin() {

        const randomIndex = Math.floor(
            Math.random() * menus.length
        );

        const selectedMenu = menus[randomIndex];

        menuElement.textContent =
            `🎉 오늘의 야식은...\n${selectedMenu}!`;

        menuElement.classList.remove("spinning");

        // 애니메이션 다시 실행
        void menuElement.offsetWidth;

        menuElement.classList.add("result");

        // 결과 발표 소리
        playFanfare();

        // 폭죽 효과와 폭죽 소리
        launchConfetti();

        // 버튼 다시 활성화
        recommendButton.disabled = false;
        recommendButton.textContent = "다시 추천받기 🎲";

        isSpinning = false;
    }

    // 슬롯머신 시작
    spin();
});


// ========================================
// 13. 폭죽 애니메이션
// ========================================

function launchConfetti() {

    const colors = [
        "#ff595e",
        "#ffca3a",
        "#8ac926",
        "#1982c4",
        "#6a4c93",
        "#ff99c8"
    ];

    // 색종이 100개 생성
    for (let i = 0; i < 100; i++) {

        const confetti = document.createElement("span");

        confetti.className = "confetti";

        // 가로 위치 무작위 지정
        confetti.style.left =
            Math.random() * 100 + "vw";

        // 색상 무작위 선택
        confetti.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];

        // 크기 무작위 지정
        confetti.style.width =
            5 + Math.random() * 7 + "px";

        confetti.style.height =
            8 + Math.random() * 12 + "px";

        // 떨어지는 시간 지정
        const duration = 2 + Math.random() * 2;

        confetti.style.setProperty(
            "--duration",
            duration + "s"
        );

        // 좌우로 흩어지는 거리
        confetti.style.setProperty(
            "--drift",
            Math.random() * 300 - 150 + "px"
        );

        confettiContainer.appendChild(confetti);

        // 애니메이션이 끝나면 색종이 삭제
        confetti.addEventListener(
            "animationend",
            function () {
                confetti.remove();
            }
        );

        // 일부 색종이가 터질 때 폭죽 소리
        if (i % 20 === 0) {
            setTimeout(function () {
                playFireworkSound();
            }, Math.random() * 300);
        }
    }
}