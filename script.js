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

            clearInterval(heartInterval);

            alert("🎉 You collected all 10 hearts!");

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