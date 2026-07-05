/* ===================================
   Happy Birthday Brownie ❤️
   script.js - PART 1
=================================== */

// =======================
// Screens
// =======================

const loadingScreen = document.getElementById("loadingScreen");
const welcomeScreen = document.getElementById("welcomeScreen");
const storyScreen = document.getElementById("storyScreen");
const gameScreen = document.getElementById("gameScreen");

// =======================
// Buttons
// =======================

const brownieBtn = document.getElementById("brownieBtn");
const otherBtn = document.getElementById("otherBtn");
const storyNext = document.getElementById("storyNext");

// =======================
// Elements
// =======================

const warningText = document.getElementById("warningText");
const storyText = document.getElementById("storyText");
const score = document.getElementById("score");
const floatingHearts = document.getElementById("floatingHearts");

// =======================
// Variables
// =======================

let collectedHearts = 0;
let currentStoryLine = 0;

// =======================
// Story
// =======================

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

// =======================
// Loading
// =======================

window.onload = function () {

    setTimeout(() => {

        loadingScreen.classList.add("hidden");
        welcomeScreen.classList.remove("hidden");

    }, 2500);

};

// =======================
// Welcome Buttons
// =======================

brownieBtn.onclick = () => {

    welcomeScreen.classList.add("hidden");
    storyScreen.classList.remove("hidden");

    startStory();

};

otherBtn.onclick = () => {

    warningText.innerHTML =
        "🚫 Sorry...<br><br>This website was handmade only for Brownie ❤️";

};

// =======================
// Story Typing
// =======================

function startStory() {

    storyText.innerHTML = "";
    currentStoryLine = 0;

    typeNextLine();

}

function typeNextLine() {

    if (currentStoryLine >= storyLines.length) {

        storyNext.style.display = "inline-block";
        return;

    }

    const p = document.createElement("p");

    storyText.appendChild(p);

    let i = 0;

    const line = storyLines[currentStoryLine];

    const typing = setInterval(() => {

        p.innerHTML += line.charAt(i);

        i++;

        if (i >= line.length) {

            clearInterval(typing);

            currentStoryLine++;

            setTimeout(typeNextLine, 700);

        }

    }, 40);

}

// =======================
// Continue
// =======================

storyNext.onclick = () => {

    storyScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");

    startHeartGame();

};

// =======================
// Heart Game
// =======================

function startHeartGame() {

    score.textContent = "0 / 10";

    collectedHearts = 0;

    floatingHearts.innerHTML = "";

    createHeart();

}

// =======================
// Create Hearts
// =======================

function createHeart() {

    const interval = setInterval(() => {

        if (collectedHearts >= 10) {

            clearInterval(interval);

            setTimeout(() => {

                alert("🎉 You collected all the hearts!");

                // Part 2 starts here

            }, 300);

            return;

        }

        const heart = document.createElement("div");

        heart.className = "heart";

        heart.innerHTML = "❤️";

        heart.style.left = Math.random() * 90 + "vw";

        heart.style.fontSize =
            (24 + Math.random() * 18) + "px";

        heart.style.animationDuration =
            (4 + Math.random() * 3) + "s";

        heart.onclick = () => {

            collectedHearts++;

            score.textContent =
                `${collectedHearts} / 10`;

            heart.remove();

        };

        floatingHearts.appendChild(heart);

        setTimeout(() => {

            heart.remove();

        }, 7000);

    }, 500);

}

/* ===================================
   PART 1 COMPLETE
=================================== */