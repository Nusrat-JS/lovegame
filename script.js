/* ===================================
   Happy Birthday Brownie ❤️
   PART 1
=================================== */

// Screens
const loadingScreen = document.getElementById("loadingScreen");
const welcomeScreen = document.getElementById("welcomeScreen");
const storyScreen = document.getElementById("storyScreen");
const gameScreen = document.getElementById("gameScreen");

// Buttons
const brownieBtn = document.getElementById("brownieBtn");
const otherBtn = document.getElementById("otherBtn");

// Text
const warningText = document.getElementById("warningText");
const storyText = document.getElementById("storyText");
const storyNext = document.getElementById("storyNext");

// Floating Hearts Container
const floatingHearts = document.getElementById("floatingHearts");

// Game
let collectedHearts = 0;


/* ================================
   LOADING SCREEN
================================ */

window.onload = () => {

    createFloatingHearts();

    setTimeout(() => {

        loadingScreen.classList.add("hidden");
        welcomeScreen.classList.remove("hidden");

    }, 3000);

};


/* ================================
   FLOATING HEARTS
================================ */

function createFloatingHearts() {

    setInterval(() => {

        const heart = document.createElement("div");

        heart.className = "heart";
        heart.innerHTML = "❤️";

        heart.style.left = Math.random() * 100 + "vw";
        heart.style.fontSize = (20 + Math.random() * 25) + "px";
        heart.style.animationDuration = (5 + Math.random() * 5) + "s";

        // Click to collect
        heart.addEventListener("click", () => {

            collectedHearts++;

            document.getElementById("score").textContent =
                `${collectedHearts} / 10`;

            heart.remove();

            if (collectedHearts >= 10) {

                alert("You collected all the hearts! ❤️");

            }

        });

        floatingHearts.appendChild(heart);

        setTimeout(() => {

            heart.remove();

        }, 9000);

    }, 350);

}


/* ================================
   BROWNIE CHECK
================================ */

brownieBtn.onclick = () => {

    welcomeScreen.classList.add("hidden");
    storyScreen.classList.remove("hidden");

    startStory();

};

otherBtn.onclick = () => {

    warningText.innerHTML =
        "🚫 Nice try...<br><br>This website was handmade for only one person.<br><br>Go call Brownie. ❤️";

};


/* ================================
   STORY
================================ */

const storyLines = [

    "Hi Brownie... 🌸",
    "Before today begins...",
    "I wanted to give you something different.",
    "Something you could keep forever.",
    "Not flowers...",
    "Not chocolates...",
    "But a tiny world I built myself.",
    "So every click...",
    "Every animation...",
    "And every little heart...",
    "Reminds you how important you are to me. ❤️"

];

let currentLine = 0;

function startStory() {

    storyText.innerHTML = "";
    typeLine();

}

function typeLine() {

    if (currentLine >= storyLines.length) {

        storyNext.style.display = "inline-block";
        return;

    }

    let text = storyLines[currentLine];
    let i = 0;

    let paragraph = document.createElement("p");
    storyText.appendChild(paragraph);

    let typing = setInterval(() => {

        paragraph.innerHTML += text.charAt(i);

        i++;

        if (i >= text.length) {

            clearInterval(typing);

            currentLine++;

            setTimeout(typeLine, 800);

        }

    }, 45);

}


/* ================================
   CONTINUE TO GAME
================================ */

storyNext.onclick = () => {

    storyScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");

};


/* =================================
   PART 1 COMPLETE
================================= */