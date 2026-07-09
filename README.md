# lovegame
# Happy Birthday Brownie ❤️

A full interactive birthday website: loading screen → welcome gate → typed story →
catch-10-hearts mini game → photo gallery → love letter → birthday celebration
(confetti, fireworks, balloons) → final surprise with a downloadable screenshot.

## How to run it
Just open `index.html` in a browser, or push the whole `lovegame` folder to GitHub
Pages. No build step, no npm install — pure HTML/CSS/JS.

## Make it yours (2 things to swap in)

**1. Her photos**
Drop four real photos into the `assets/` folder named exactly:
```
assets/brownie1.jpg
assets/brownie2.jpg
assets/brownie3.jpg
assets/brownie4.jpg
```
Until you add them, the gallery and the final circular frame show a soft pink
heart placeholder instead — so the site still works perfectly, it'll just look
even better with her real pictures in there.

**2. Your song**
Drop an MP3 into `assets/birthday.mp3`. The "🎵 Play our song" button on the
celebration screen will play it (browsers block autoplay without a click, which
is why it's a button rather than automatic).

## Personalizing the words
Open `script.js` and look for these two spots to make it even more personal:
- `storyLines` (near the top) — the typed story on page 3
- `loveLetter` — the full love letter on page 6
- `finalMessage` — the last line on the final surprise screen

Everything else — animations, the game, confetti, fireworks — works as-is.

