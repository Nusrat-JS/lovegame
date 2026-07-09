/* ===================================
   Happy Birthday Brownie ❤️
   script.js - PART 1
=================================== */

// ===============================
// Screens
// ===============================

const loadingScreen = document.getElementById("loadingScreen");
const welcomeScreen = document.getElementById("welcomeScreen");
const storyScreen = document.getElementById("storyScreen");
const gameScreen = document.getElementById("gameScreen");

// ===============================
// Buttons
// ===============================

const brownieBtn = document.getElementById("brownieBtn");
const otherBtn = document.getElementById("otherBtn");
const storyNext = document.getElementById("storyNext");

// ===============================
// Elements
// ===============================

const warningText = document.getElementById("warningText");
const storyText = document.getElementById("storyText");
const score = document.getElementById("score");
const floatingHearts = document.getElementById("floatingHearts");

// ===============================
// Variables
// ===============================

let collectedHearts = 0;
let heartInterval = null;
let currentStoryLine = 0;

// ===============================
// Story Lines
// ===============================

const storyLines = [
    "Hi Brownie... 🌸",
    "Before today begins...",
    "I wanted to make something special...",
    "Not flowers...",
    "Not chocolates...",
    "But a little world made only for you.",
    "Every click...",
    "Every little heart...",
    "Every animation...",
    "Was created with love. ❤️"
];

// ===============================
// Loading Screen
// ===============================

window.onload = () => {

    setTimeout(() => {

        loadingScreen.classList.add("hidden");
        welcomeScreen.classList.remove("hidden");

    }, 2500);

};

// ===============================
// Welcome Buttons
// ===============================

brownieBtn.addEventListener("click", () => {

    welcomeScreen.classList.add("hidden");
    storyScreen.classList.remove("hidden");

    startStory();

});

otherBtn.addEventListener("click", () => {

    warningText.innerHTML =
        "🚫 Sorry...<br><br>This website was handmade only for Brownie ❤️";

});

// ===============================
// Story Typing
// ===============================

function startStory() {

    currentStoryLine = 0;
    storyText.innerHTML = "";
    storyNext.style.display = "none";

    typeLine();

}

function typeLine() {

    if (currentStoryLine >= storyLines.length) {

        storyNext.style.display = "inline-block";
        return;

    }

    const p = document.createElement("p");
    storyText.appendChild(p);

    const line = storyLines[currentStoryLine];

    let i = 0;

    const typing = setInterval(() => {

        p.textContent += line.charAt(i);

        i++;

        if (i >= line.length) {

            clearInterval(typing);

            currentStoryLine++;

            setTimeout(typeLine, 700);

        }

    }, 40);

}

// ===============================
// Continue Button
// ===============================

storyNext.addEventListener("click", () => {

    storyScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");

    startHeartGame();

});

// ===============================
// Heart Game
// ===============================

function startHeartGame() {

    collectedHearts = 0;

    score.textContent = "0 / 10";

    floatingHearts.innerHTML = "";

    if (heartInterval) {
        clearInterval(heartInterval);
    }

    createHearts();

}

// ===============================
// Create Hearts
// ===============================

function createHearts() {

    heartInterval = setInterval(() => {

       if (collectedHearts >= 10) {

    gameCompleted();

    return;
}


        const heart = document.createElement("div");

        heart.className = "heart";
        heart.innerHTML = "❤️";

        heart.style.left = Math.random() * 90 + "vw";
        heart.style.fontSize = (24 + Math.random() * 20) + "px";
        heart.style.animationDuration = (5 + Math.random() * 3) + "s";

        heart.addEventListener("click", function (e) {

            e.stopPropagation();

            collectedHearts++;

            score.textContent = `${collectedHearts} / 10`;

            heart.remove();

        });

        floatingHearts.appendChild(heart);

        setTimeout(() => {

            if (heart.parentNode) {
                heart.remove();
            }

        }, 8000);

    }, 500);

}

/* ===================================
   END OF PART 1
=================================== */

/* ===================================
   PART 2
   Gallery → Letter → Final Screen
=================================== */

// ===============================
// Elements
// ===============================

const galleryScreen = document.getElementById("galleryScreen");
const galleryNext = document.getElementById("galleryNext");

const letterScreen = document.getElementById("letterScreen");
const letterText = document.getElementById("letterText");
const letterNext = document.getElementById("letterNext");

const finalScreen = document.getElementById("finalScreen");
const loveMessage = document.getElementById("loveMessage");
const restartBtn = document.getElementById("restartBtn");

const bgMusic = document.getElementById("bgMusic");

// ===============================
// Finish Heart Game
// ===============================

function finishHeartGame() {

    gameScreen.classList.add("hidden");

    galleryScreen.classList.remove("hidden");

}

// ===============================
// Replace alert
// ===============================

function gameCompleted() {

    clearInterval(heartInterval);

    setTimeout(() => {

        finishHeartGame();

    }, 800);

}

// ===============================
// Gallery
// ===============================

galleryNext.addEventListener("click", () => {

    galleryScreen.classList.add("hidden");

    letterScreen.classList.remove("hidden");

    startLetter();

});

// ===============================
// Letter
// ===============================

const letter = `

Happy Birthday Brownie ❤️

I know this isn't the biggest gift in the world...

But every page,
every animation,
every line of code,

was written while thinking about you.

Thank you for existing.

Thank you for making ordinary days feel special.

I hope this tiny website makes you smile whenever you visit it.

No matter where life takes us...

You'll always have this little world.

Happy Birthday, Brownie.

❤️
`;

function startLetter() {

    letterText.innerHTML = "";

    let i = 0;

    const typing = setInterval(() => {

        letterText.textContent += letter.charAt(i);

        i++;

        if (i >= letter.length) {

            clearInterval(typing);

            letterNext.style.display = "inline-block";

        }

    }, 35);

}

// ===============================
// Final Screen
// ===============================

letterNext.addEventListener("click", () => {

    letterScreen.classList.add("hidden");

    finalScreen.classList.remove("hidden");

    showFinalMessage();

});

// ===============================
// Final Message
// ===============================

const finalText = `

Happy Birthday Brownie ❤️

May your smile never fade.

May your dreams come true.

May Allah protect you,
guide you,
and keep you happy forever.

Thank you for being my favorite person.

❤️
`;

function showFinalMessage() {

    loveMessage.innerHTML = "";

    let i = 0;

    const typing = setInterval(() => {

        loveMessage.textContent += finalText.charAt(i);

        i++;

        if (i >= finalText.length) {

            clearInterval(typing);

        }

    }, 35);

    if (bgMusic) {

        bgMusic.volume = 0.5;

        bgMusic.play().catch(() => {});

    }

}

// ===============================
// Restart
// ===============================

restartBtn.addEventListener("click", () => {

    location.reload();

});