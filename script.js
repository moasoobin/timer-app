const buttons = document.querySelectorAll('.btn');
const timerDisplay = document.getElementById('timer');
const alarmSound = document.getElementById('alarm-sound');
const musicPlayer = document.getElementById('btn-music');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const themeToggle = document.getElementById('theme-toggle');
const timerGif = document.getElementById('timer-gif');
const progressFill = document.getElementById('progress-fill');
const body = document.body;

let countdown;
let remaining = 0;
let original = 0;
let isPaused = false;

// 預設日間主題
body.classList.add('day');

// 按鈕點擊：播放音樂並開始倒數
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const audioSrc = button.getAttribute('data-audio');
    if (audioSrc) {
      musicPlayer.pause();
      musicPlayer.currentTime = 0;
      musicPlayer.src = audioSrc;
      musicPlayer.play();
    }

    original = parseInt(button.dataset.time);
    startCountdown(original);
  });
});

// 啟動倒數
function startCountdown(seconds) {
  clearInterval(countdown);
  alarmSound.pause();
  alarmSound.currentTime = 0;
  musicPlayer.pause();
  musicPlayer.currentTime = 0;
  musicPlayer.play();

  timerGif.style.display = 'block';

  remaining = seconds;
  updateDisplay(remaining);
  updateProgress();

  countdown = setInterval(() => {
    if (!isPaused) {
      remaining--;
      updateDisplay(remaining);
      updateProgress();

      if (remaining <= 0) {
        clearInterval(countdown);
        musicPlayer.pause();
        timerDisplay.textContent = "Time's up!";
        progressFill.style.width = "100%";
        alarmSound.play();
        timerGif.style.display = 'none';
      }
    }
  }, 1000);
}

// 更新時間顯示
function updateDisplay(seconds) {
  const min = Math.floor(seconds / 60).toString().padStart(2, '0');
  const sec = (seconds % 60).toString().padStart(2, '0');
  timerDisplay.textContent = `${min}:${sec}`;
}

// 更新進度條
function updateProgress() {
  if (original > 0) {
    const percent = ((original - remaining) / original) * 100;
    progressFill.style.width = `${percent}%`;
  } else {
    progressFill.style.width = "0%";
  }
}

// 暫停與繼續
pauseBtn.addEventListener('click', () => {
  isPaused = !isPaused;
  pauseBtn.textContent = isPaused ? '▶ Resume' : '⏸ Pause';

  if (isPaused) {
    musicPlayer.pause();
  } else {
    musicPlayer.play();
  }
});

// 重設
resetBtn.addEventListener('click', () => {
  clearInterval(countdown);
  if (original > 0) {
    remaining = original;
    updateDisplay(remaining);
    updateProgress();
    isPaused = false;
    pauseBtn.textContent = '⏸ Pause';
    musicPlayer.pause();
    musicPlayer.currentTime = 0;
    musicPlayer.play();
    timerGif.style.display = 'block';

    countdown = setInterval(() => {
      if (!isPaused) {
        remaining--;
        updateDisplay(remaining);
        updateProgress();

        if (remaining <= 0) {
          clearInterval(countdown);
          musicPlayer.pause();
          timerDisplay.textContent = "Time's up!";
          progressFill.style.width = "100%";
          alarmSound.play();
          timerGif.style.display = 'none';
        }
      }
    }, 1000);
  }
});

// 日夜主題切換
themeToggle.addEventListener('click', () => {
  themeToggle.classList.add('animate');
  if (body.classList.contains('day')) {
    body.classList.remove('day');
    body.classList.add('night');
    themeToggle.textContent = '☀️';
  } else {
    body.classList.remove('night');
    body.classList.add('day');
    themeToggle.textContent = '🌙';
  }

  setTimeout(() => {
    themeToggle.classList.remove('animate');
  }, 300);
});
