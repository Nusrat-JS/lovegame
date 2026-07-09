/* =====================================
   Happy Birthday Brownie ❤️
   script.js
===================================== */

// ==============================
// Screens
// ==============================

const loadingScreen = document.getElementById("loadingScreen");
const welcomeScreen = document.getElementById("welcomeScreen");
const storyScreen = document.getElementById("storyScreen");
const gameScreen = document.getElementById("gameScreen");
const galleryScreen = document.getElementById("galleryScreen");
const letterScreen = document.getElementById("letterScreen");

// ==============================
// Buttons
// ==============================

const brownieBtn = document.getElementById("brownieBtn");
const otherBtn = document.getElementById("otherBtn");
const storyNext = document.getElementById("storyNext");
const galleryNext = document.getElementById("galleryNext");
const letterNext = document.getElementById("letterNext");

// ==============================
// Elements
// ==============================

const warningText = document.getElementById("warningText");
const storyText = document.getElementById("storyText");
const letterText = document.getElementById("letterText");
const score = document.getElementById("score");
const floatingHearts = document.getElementById("floatingHearts");

// ==============================
// Variables
// ==============================

let collectedHearts = 0;
let heartInterval = null;
let currentStory = 0;

// ==============================
// Story
// ==============================

const storyLines = [
    "Hi Brownie... 🌸",
    "Before today begins...",
    "I wanted to make something special...",
    "Not flowers...",
    "Not chocolates...",
    "But a little world made only for you.",
    "Every click...",
    "Every heart...",
    "Every animation...",
    "Was created with love. ❤️"
];

// ==============================
// Loading
// ==============================

window.addEventListener("load", () => {

    storyNext.style.display = "none";

    setTimeout(() => {

        loadingScreen.classList.add("hidden");
        welcomeScreen.classList.remove("hidden");

    }, 2500);

});

// ==============================
// Welcome Buttons
// ==============================

brownieBtn.addEventListener("click", () => {

    welcomeScreen.classList.add("hidden");
    storyScreen.classList.remove("hidden");

    startStory();

});

otherBtn.addEventListener("click", () => {

    warningText.innerHTML =
        "🚫 Sorry...<br><br>This website was handmade only for Brownie ❤️";

});

// ==============================
// Story Typing
// ==============================

function startStory() {

    storyText.innerHTML = "";
    currentStory = 0;

    typeLine();

}

function typeLine() {

    if (currentStory >= storyLines.length) {

        storyNext.style.display = "inline-block";
        return;

    }

    const p = document.createElement("p");
    storyText.appendChild(p);

    const line = storyLines[currentStory];

    let i = 0;

    const typing = setInterval(() => {

        p.textContent += line.charAt(i);

        i++;

        if (i >= line.length) {

            clearInterval(typing);

            currentStory++;

            setTimeout(typeLine, 700);

        }

    }, 40);

}

// ==============================
// Continue
// ==============================

storyNext.addEventListener("click", () => {

    storyScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");

    startHeartGame();

});

// ==============================
// Heart Game
// ==============================

function startHeartGame() {

    collectedHearts = 0;

    score.textContent = "0 / 10";

    floatingHearts.innerHTML = "";

    if (heartInterval) {

        clearInterval(heartInterval);

    }

    heartInterval = setInterval(createHeart, 600);

}

// ==============================
// Create Hearts
// ==============================

function createHeart() {

    if (collectedHearts >= 10) {

        clearInterval(heartInterval);

        setTimeout(() => {

            gameScreen.classList.add("hidden");

            if (galleryScreen) {

                galleryScreen.classList.remove("hidden");

            }

        }, 500);

        return;

    }

    const heart = document.createElement("div");

    heart.className = "heart";
    heart.textContent = "❤️";

    heart.style.left = Math.random() * 90 + "vw";
    heart.style.fontSize = (22 + Math.random() * 20) + "px";
    heart.style.animationDuration = (4 + Math.random() * 3) + "s";

    function collectHeart(e) {

        e.preventDefault();
        e.stopPropagation();

        if (!heart.parentNode) return;

        collectedHearts++;

        score.textContent = `${collectedHearts} / 10`;

        heart.remove();

    }

    heart.addEventListener("click", collectHeart);
    heart.addEventListener("touchstart", collectHeart, { passive: false });

    floatingHearts.appendChild(heart);

    setTimeout(() => {

        if (heart.parentNode) {

            heart.remove();

        }

    }, 7000);

}

// ==============================
// Gallery
// ==============================

if (galleryNext) {

    galleryNext.addEventListener("click", () => {

        galleryScreen.classList.add("hidden");
        letterScreen.classList.remove("hidden");

        typeLetter();

    });

}

// ==============================
// Letter
// ==============================

const letterMessage =
`Happy Birthday, Brownie ❤️

I don't know if this little website is perfect...

But every part of it was made while thinking about you.

I hope every smile,
every click,
and every little heart,

reminds you how special you are.

Happy Birthday. ❤️`;

function typeLetter() {

    if (!letterText) return;

    letterText.textContent = "";

    let i = 0;

    const typing = setInterval(() => {

        letterText.textContent += letterMessage.charAt(i);

        i++;

        if (i >= letterMessage.length) {

            clearInterval(typing);

        }

    }, 35);

}

// ==============================
// Restart
// ==============================

if (letterNext) {

    letterNext.addEventListener("click", () => {

        location.reload();

    });

}