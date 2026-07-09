/* =========================================================
   HAPPY BIRTHDAY BROWNIE — SCRIPT.JS
   Sections: 1. Utilities  2. Screen navigation  3. Loading
   4. Welcome / gate  5. Story typing  6. Ambient background
   7. Mini heart game  8. Gallery  9. Love letter
   10. Celebration (confetti/fireworks/balloons/music)
   11. Final surprise  12. Ripple + keyboard support  13. Init
   ========================================================= */

(function () {
  'use strict';

  /* ---------- 1. UTILITIES ---------- */
  const $ = (id) => document.getElementById(id);
  const rand = (min, max) => Math.random() * (max - min) + min;

  /* ---------- 2. SCREEN NAVIGATION ---------- */
  const screens = {
    loading: $('loading-screen'),
    welcome: $('welcome-screen'),
    someoneElse: $('someone-else-screen'),
    story: $('story-screen'),
    game: $('game-screen'),
    gallery: $('gallery-screen'),
    letter: $('letter-screen'),
    celebration: $('celebration-screen'),
    surprise: $('surprise-screen'),
  };

  function goTo(screenKey) {
    Object.values(screens).forEach((el) => el && el.classList.remove('active'));
    const target = screens[screenKey];
    if (target) target.classList.add('active');
  }

  /* ---------- 3. LOADING SCREEN ---------- */
  function startLoading() {
    const fill = $('loading-bar-fill');
    requestAnimationFrame(() => { fill.style.width = '100%'; });
    setTimeout(() => { goTo('welcome'); }, 3000);
  }

  /* ---------- 4. WELCOME / GATE ---------- */
  function initWelcome() {
    $('btn-brownie').addEventListener('click', () => {
      goTo('story');
      startStory();
    });
    $('btn-someone-else').addEventListener('click', () => {
      goTo('someoneElse');
    });
    $('btn-go-back').addEventListener('click', () => {
      goTo('welcome');
    });
  }

  /* ---------- 5. STORY TYPING ANIMATION ---------- */
  const storyLines = [
    "Hi Brownie...",
    "Before today begins...",
    "I wanted to make something special...",
    "Not flowers...",
    "Not chocolates...",
    "But a little world built only for you...",
    "Every click...",
    "Every animation...",
    "Every little heart...",
    "Was made with love."
  ];
  let storyStarted = false;

  function startStory() {
    if (storyStarted) return;
    storyStarted = true;
    const container = $('story-lines');
    container.innerHTML = '';
    let lineIndex = 0;

    function typeLine() {
      if (lineIndex >= storyLines.length) {
        $('btn-story-continue').classList.remove('hidden');
        return;
      }
      const lineEl = document.createElement('div');
      lineEl.className = 'story-line';
      container.appendChild(lineEl);
      const text = storyLines[lineIndex];
      let charIndex = 0;
      const cursor = document.createElement('span');
      cursor.className = 'typing-cursor';
      cursor.textContent = '\u00A0';

      const typeChar = () => {
        if (charIndex < text.length) {
          lineEl.textContent = text.slice(0, charIndex + 1);
          lineEl.appendChild(cursor);
          charIndex++;
          setTimeout(typeChar, 38);
        } else {
          cursor.remove();
          lineIndex++;
          setTimeout(typeLine, 380);
        }
      };
      typeChar();
    }
    typeLine();
  }

  function initStoryContinue() {
    $('btn-story-continue').addEventListener('click', () => {
      goTo('game');
      initGameIfNeeded();
    });
  }

  /* ---------- 6. AMBIENT BACKGROUND (floating hearts + sparkle) ---------- */
  function initAmbientCanvas() {
    const canvas = $('ambient-canvas');
    const ctx = canvas.getContext('2d');
    let w, h;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const hearts = Array.from({ length: 18 }, () => spawnHeart());
    function spawnHeart() {
      return {
        x: rand(0, w),
        y: rand(h, h + 400),
        size: rand(8, 20),
        speed: rand(0.25, 0.7),
        drift: rand(-0.3, 0.3),
        opacity: rand(0.12, 0.35),
      };
    }

    function drawHeart(x, y, size, opacity) {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(size / 20, size / 20);
      ctx.beginPath();
      ctx.moveTo(0, 6);
      ctx.bezierCurveTo(-2, 0, -10, 0, -10, -6);
      ctx.bezierCurveTo(-10, -12, -3, -12, 0, -5);
      ctx.bezierCurveTo(3, -12, 10, -12, 10, -6);
      ctx.bezierCurveTo(10, 0, 2, 0, 0, 6);
      ctx.closePath();
      ctx.fillStyle = `rgba(232,96,122,${opacity})`;
      ctx.fill();
      ctx.restore();
    }

    function animate() {
      ctx.clearRect(0, 0, w, h);
      hearts.forEach((hObj) => {
        hObj.y -= hObj.speed;
        hObj.x += hObj.drift;
        if (hObj.y < -30) Object.assign(hObj, spawnHeart(), { y: h + 30 });
        drawHeart(hObj.x, hObj.y, hObj.size, hObj.opacity);
      });
      requestAnimationFrame(animate);
    }
    animate();

    // mouse sparkle trail
    let lastSparkle = 0;
    document.addEventListener('pointermove', (e) => {
      const now = Date.now();
      if (now - lastSparkle < 60) return;
      lastSparkle = now;
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.style.left = e.clientX + 'px';
      sparkle.style.top = e.clientY + 'px';
      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 700);
    });
  }

  /* ---------- 7. MINI HEART GAME ---------- */
  const GAME_TARGET = 10;
  let gameScore = 0;
  let gameInitialized = false;
  let gameSpawnTimer = null;

  function initGameIfNeeded() {
    if (gameInitialized) return;
    gameInitialized = true;
    const field = $('game-field');

    function spawnFloatingHeart() {
      if (gameScore >= GAME_TARGET) return;
      const heart = document.createElement('div');
      heart.className = 'floating-heart';
      const size = rand(28, 52);
      heart.style.width = size + 'px';
      heart.style.height = size + 'px';
      heart.style.left = rand(4, 92) + '%';
      const duration = rand(4.5, 7.5);
      heart.style.animationDuration = duration + 's';
      heart.innerHTML = '<svg viewBox="0 0 32 29"><path d="M16 29 C16 29 0 18.5 0 8.7 C0 2.8 4.6 0 8.8 0 C12 0 14.8 1.9 16 4.9 C17.2 1.9 20 0 23.2 0 C27.4 0 32 2.8 32 8.7 C32 18.5 16 29 16 29Z"/></svg>';

      const collect = (evt) => {
        evt.stopPropagation();
        if (heart.dataset.collected) return;
        heart.dataset.collected = 'true';
        const rect = heart.getBoundingClientRect();
        const fieldRect = field.getBoundingClientRect();
        popEffect(rect.left - fieldRect.left + rect.width / 2, rect.top - fieldRect.top + rect.height / 2);
        heart.remove();
        gameScore++;
        updateScore();
        if (gameScore >= GAME_TARGET) {
          clearInterval(gameSpawnTimer);
          finishGame();
        }
      };
      heart.addEventListener('click', collect);
      heart.addEventListener('touchstart', collect, { passive: true });

      heart.addEventListener('animationend', () => {
        if (!heart.dataset.collected) heart.remove();
      });

      field.appendChild(heart);
    }

    function popEffect(x, y) {
      const pop = document.createElement('div');
      pop.className = 'heart-pop';
      pop.textContent = '💗';
      pop.style.left = x + 'px';
      pop.style.top = y + 'px';
      field.appendChild(pop);
      setTimeout(() => pop.remove(), 500);
    }

    function updateScore() {
      $('score-pill').textContent = `${gameScore} / ${GAME_TARGET}`;
    }

    function finishGame() {
      launchConfetti(140);
      setTimeout(() => {
        goTo('gallery');
      }, 1600);
    }

    gameSpawnTimer = setInterval(spawnFloatingHeart, 650);
  }

  /* ---------- 8. GALLERY ---------- */
  function initGallery() {
    $('btn-gallery-continue').addEventListener('click', () => {
      goTo('letter');
      startLetter();
    });
  }

  /* ---------- 9. LOVE LETTER ---------- */
  const loveLetter = `My dearest Brownie,

If you're reading this, it means you made it through every little heart, every photo, every silly animation I built just to see you smile.

I don't have grand words that could hold everything I feel, but I know this much: you make ordinary days feel like something worth remembering. Your laugh is my favorite sound. Your kindness is the thing I brag about without even meaning to.

Thank you for being my best friend, my favorite person, my safe place. Today is about celebrating you — but every day, I'm grateful you exist.

Here's to more laughter, more adventures, and more little worlds built just for you.

Yours, always.`;

  let letterStarted = false;
  function startLetter() {
    if (letterStarted) return;
    letterStarted = true;
    const el = $('letter-text');
    let i = 0;
    function typeChar() {
      if (i <= loveLetter.length) {
        el.textContent = loveLetter.slice(0, i);
        i += 2;
        setTimeout(typeChar, 14);
      } else {
        $('btn-letter-continue').classList.remove('hidden');
      }
    }
    typeChar();
  }

  function initLetterContinue() {
    $('btn-letter-continue').addEventListener('click', () => {
      goTo('celebration');
      startCelebration();
    });
  }

  /* ---------- 10. CELEBRATION ---------- */
  let celebrationStarted = false;
  function startCelebration() {
    if (celebrationStarted) return;
    celebrationStarted = true;
    launchConfetti(160);
    launchBalloons();
    launchFireworks();
  }

  function launchConfetti(count) {
    const colors = ['#ff8fab', '#e8607a', '#c48a7a', '#ffd6e0', '#ffffff'];
    for (let i = 0; i < count; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      const size = rand(6, 12);
      piece.style.width = size + 'px';
      piece.style.height = size * rand(0.6, 1.4) + 'px';
      piece.style.left = rand(0, 100) + 'vw';
      piece.style.background = colors[Math.floor(rand(0, colors.length))];
      const duration = rand(2.2, 4);
      piece.style.animationDuration = duration + 's';
      piece.style.animationDelay = rand(0, 0.6) + 's';
      document.body.appendChild(piece);
      setTimeout(() => piece.remove(), (duration + 1) * 1000);
    }
  }

  function launchBalloons() {
    const container = $('balloons');
    const colors = ['#ff8fab', '#e8607a', '#c48a7a', '#ffd1dc'];
    for (let i = 0; i < 10; i++) {
      const balloon = document.createElement('div');
      balloon.className = 'balloon';
      balloon.style.left = rand(2, 92) + '%';
      balloon.style.background = colors[Math.floor(rand(0, colors.length))];
      const duration = rand(9, 15);
      balloon.style.animationDuration = duration + 's';
      balloon.style.animationDelay = rand(0, 6) + 's';
      container.appendChild(balloon);
    }
  }

  function launchFireworks() {
    const canvas = $('fireworks-canvas');
    const ctx = canvas.getContext('2d');
    let w, h;
    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    let particles = [];
    const colors = ['#ff8fab', '#e8607a', '#ffd6e0', '#c48a7a', '#ffffff'];

    function burst(x, y) {
      const count = 36;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count;
        const speed = rand(1.5, 4.5);
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          color: colors[Math.floor(rand(0, colors.length))],
        });
      }
    }

    function loop() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.03;
        p.life -= 0.012;
        ctx.globalAlpha = Math.max(p.life, 0);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.4, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      particles = particles.filter((p) => p.life > 0);
      if (screens.celebration.classList.contains('active')) {
        requestAnimationFrame(loop);
      }
    }

    let fireworksTimer = setInterval(() => {
      if (!screens.celebration.classList.contains('active')) {
        clearInterval(fireworksTimer);
        return;
      }
      burst(rand(w * 0.15, w * 0.85), rand(h * 0.15, h * 0.55));
    }, 900);

    burst(w / 2, h * 0.35);
    loop();
  }

  function initCelebrationButtons() {
    $('btn-play-music').addEventListener('click', () => {
      const audio = $('birthday-audio');
      audio.play().catch(() => {
        // No audio file present or autoplay blocked — silently ignore.
      });
    });
    $('btn-celebration-continue').addEventListener('click', () => {
      goTo('surprise');
      startSurprise();
    });
  }

  /* ---------- 11. FINAL SURPRISE ---------- */
  const finalMessage = "From the first hello to right now, every moment with you has felt like home. Happy birthday, my everything — here's to a lifetime more of us.";
  let surpriseStarted = false;

  function startSurprise() {
    if (surpriseStarted) return;
    surpriseStarted = true;
    typeFinalMessage();
  }

  function typeFinalMessage() {
    const el = $('final-message');
    el.textContent = '';
    let i = 0;
    function step() {
      if (i <= finalMessage.length) {
        el.textContent = finalMessage.slice(0, i);
        i++;
        setTimeout(step, 22);
      }
    }
    step();
  }

  function initSurpriseButtons() {
    $('btn-read-again').addEventListener('click', () => {
      goTo('story');
      storyStarted = false;
      startStory();
    });

    $('btn-download').addEventListener('click', () => {
      const card = $('surprise-card');
      if (typeof html2canvas === 'undefined') {
        alert('Screenshot library did not load — check your internet connection.');
        return;
      }
      html2canvas(card, { backgroundColor: '#fff6f8', scale: 2 }).then((canvasEl) => {
        const link = document.createElement('a');
        link.download = 'brownie-birthday-memory.png';
        link.href = canvasEl.toDataURL('image/png');
        link.click();
      });
    });
  }

  /* ---------- 12. BUTTON RIPPLE + KEYBOARD SUPPORT ---------- */
  function initRippleEffect() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn');
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  }

  function initKeyboardSupport() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const focused = document.activeElement;
        if (focused && focused.classList && focused.classList.contains('btn')) {
          e.preventDefault();
          focused.click();
        }
      }
    });
  }

  /* ---------- 13. INIT ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    initAmbientCanvas();
    initWelcome();
    initStoryContinue();
    initGallery();
    initLetterContinue();
    initCelebrationButtons();
    initSurpriseButtons();
    initRippleEffect();
    initKeyboardSupport();
    startLoading();
  });
})();
