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
    "🍣 초밥",
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
    "🥩 돈가스",
    "🌮 타코",
    "🌯 브리또",
    "🥗 샐러드",
    "🍢 어묵",
    "🍳 계란말이",
    "🍙 주먹밥",
    "🍙 김밥",
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
    "🍢 닭꼬치",
    "🍢 양꼬치",
    "🥘 찜닭",
    "🥘 닭볶음탕",
    "🥩 탕수육",
    "🍗 깐풍기",
    "🍲 마라탕",
    "🥘 마라샹궈",
    "🥩 제육볶음",
    "🍚 불고기덮밥",
    "🍛 오므라이스",
    "🍱 도시락",
    "🥗 회덮밥",
    "🍣 연어덮밥",
    "🍚 돈부리",
    "🍜 라멘",
    "🐙 타코야키",
    "🍳 오코노미야키",
    "🍕 피자빵",
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
    "🍟 감자튀김",
    "🧅 양파링",
    "🍗 치킨너겟",
    "🥓 베이컨",
    "🧆 크로켓",
    "🥟 군만두",
    "🍡 떡꼬치",
    "🍡 떡",
    "🍲 샤브샤브",
    "🥩 육회",
    "🍖 갈비찜",
    "🍚 비빔밥",
    "🍲 육개장",
    "🍲 설렁탕",
    "🍲 갈비탕",
    "🥘 리조또",
    "🍤 감바스",
    "🥙 케밥",
    "🍳 계란밥",
    "🍜 볶음우동",
    "🍲 어묵탕"
];


// ========================================
// 2. HTML 요소 가져오기
// ========================================

const menuElement = document.getElementById("menu");
const recommendButton = document.getElementById("recommendButton");
const soundToggle = document.getElementById("soundToggle");

let isSoundOn = true;


// ========================================
// 3. 폭죽 영역 만들기
// ========================================

const confettiContainer = document.createElement("div");

confettiContainer.id = "confetti-container";
confettiContainer.setAttribute("aria-hidden", "true");

document.body.appendChild(confettiContainer);


// ========================================
// 4. 오디오 설정
// ========================================

let audioContext = null;

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

function playTone(
    frequency,
    duration = 0.08,
    type = "square",
    volume = 0.04,
    endFrequency = null
) {
    // 소리가 꺼져 있으면 재생하지 않음
    if (
        !isSoundOn ||
        !audioContext ||
        audioContext.state !== "running"
    ) {
        return;
    }

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const now = audioContext.currentTime;

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, now);

    if (endFrequency !== null) {
        oscillator.frequency.exponentialRampToValueAtTime(
            Math.max(1, endFrequency),
            now + duration
        );
    }

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

    const frequency = 350 + Math.random() * 250;

    playTone(frequency, 0.045, "square", 0.025);
}


// ========================================
// 7. 감속 효과음
// ========================================

function playSlowdownSound() {
    playTone(260, 0.12, "triangle", 0.05);
}


// ========================================
// 8. 결과 발표 팡파르
// ========================================

function playFanfare() {
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
// 10. 소리 켜기 / 끄기 버튼
// ========================================

soundToggle.addEventListener("click", function () {
    isSoundOn = !isSoundOn;

    if (isSoundOn) {
        soundToggle.textContent = "🔊";
        soundToggle.setAttribute("aria-label", "소리 끄기");
        soundToggle.title = "소리 끄기";
    } else {
        soundToggle.textContent = "🔇";
        soundToggle.setAttribute("aria-label", "소리 켜기");
        soundToggle.title = "소리 켜기";
    }
});


// ========================================
// 11. 슬롯머신 실행 상태
// ========================================

let isSpinning = false;
let spinTimer = null;
let finishSpinFunction = null;


// ========================================
// 12. 추천 버튼 클릭
// ========================================

recommendButton.addEventListener("click", function () {
    // 추첨 중이면 즉시 스킵
    if (isSpinning) {
        clearTimeout(spinTimer);

        if (finishSpinFunction) {
            finishSpinFunction();
        }

        return;
    }

    isSpinning = true;

    // 소리가 켜져 있을 때만 오디오 시작
    if (isSoundOn) {
        initializeAudio();
    }

    recommendButton.disabled = false;
    recommendButton.textContent = "⏩ 스킵하기";

    menuElement.classList.remove("result");
    menuElement.classList.add("spinning");

    confettiContainer.replaceChildren();

    tickCount = 0;

    let elapsed = 0;
    let interval = 50;

    // 실제 당첨 메뉴를 미리 결정
    const selectedMenu =
        menus[Math.floor(Math.random() * menus.length)];

    // ========================================
    // 13. 최종 메뉴 결정
    // ========================================

    function finishSpin() {
        if (!isSpinning) {
            return;
        }

        clearTimeout(spinTimer);

        menuElement.textContent =
            `🎉 오늘의 야식은...\n${selectedMenu}!`;

        menuElement.classList.remove("spinning");

        // 결과 애니메이션 다시 실행
        void menuElement.offsetWidth;

        menuElement.classList.add("result");

        // 결과 발표 소리와 폭죽
        playFanfare();
        launchConfetti();

        recommendButton.disabled = false;
        recommendButton.textContent = "다시 추천받기 🎲";

        isSpinning = false;
        spinTimer = null;
        finishSpinFunction = null;
    }

    finishSpinFunction = finishSpin;

    // 슬롯머신 회전
    function spin() {
        if (!isSpinning) {
            return;
        }

        const randomIndex = Math.floor(
            Math.random() * menus.length
        );

        menuElement.textContent = menus[randomIndex];

        playSlotSound();

        elapsed += interval;

        if (elapsed > 1800) {
            interval = 250;
        } else if (elapsed > 1200) {
            interval = 150;
        } else if (elapsed > 600) {
            interval = 90;
        } else {
            interval = 50;
        }

        if (elapsed < 2500) {
            if (elapsed > 1800) {
                playSlowdownSound();
            }

            spinTimer = setTimeout(spin, interval);
        } else {
            finishSpin();
        }
    }

    spin();
});


// ========================================
// 14. 폭죽 애니메이션
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

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement("span");

        confetti.className = "confetti";

        confetti.style.left =
            Math.random() * 100 + "vw";

        confetti.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];

        confetti.style.width =
            5 + Math.random() * 7 + "px";

        confetti.style.height =
            8 + Math.random() * 12 + "px";

        const duration = 2 + Math.random() * 2;

        confetti.style.setProperty(
            "--duration",
            duration + "s"
        );

        confetti.style.setProperty(
            "--drift",
            Math.random() * 300 - 150 + "px"
        );

        confettiContainer.appendChild(confetti);

        confetti.addEventListener("animationend", function () {
            confetti.remove();
        });

        // 소리가 켜져 있을 때만 폭죽 소리 예약
        if (i % 20 === 0) {
            setTimeout(function () {
                playFireworkSound();
            }, Math.random() * 300);
        }
    }
}