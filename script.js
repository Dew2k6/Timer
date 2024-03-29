document.addEventListener('DOMContentLoaded', function () {
  const timerDisplay = document.getElementById('timer-display');
  const timerInput = document.getElementById('timer-input');
  const startBtn = document.getElementById('start-btn');
  const stopBtn = document.getElementById('stop-btn');
  const lofiBtn = document.getElementById('lofi-btn');
  const backgroundChangeBtn = document.getElementById('background-change-btn');
  const ringtone = document.getElementById('ringtone');
  const lofiAudio = document.getElementById('lofi-audio');
  let countdown;
  let endTime;

  startBtn.addEventListener('click', startTimer);
  lofiBtn.addEventListener('click', playLofi);
  stopBtn.addEventListener('click', stopTimer);
  backgroundChangeBtn.addEventListener('click', toggleBackground);

  function startTimer() {
    const minutes = parseInt(timerInput.value);
    if (!minutes || minutes <= 0) return;
    endTime = new Date().getTime() + minutes * 60 * 1000;
    countdown = setInterval(updateTimer, 1000);
    timerInput.disabled = true;
    startBtn.textContent = 'Start';
    stopBtn.style.display = 'inline-block';
    stopBtn.textContent = 'Stop';
    document.title = timerDisplay.textContent;
    updateTimer(); // Update immediately after starting
  }

  function updateTimer() {
    const now = new Date().getTime();
    const distance = endTime - now;

    if (distance <= 0) {
      clearInterval(countdown);
      timerDisplay.textContent = '00:00';
      ringtone.play();
      timerInput.disabled = false;
      startBtn.textContent = 'Start';
      stopBtn.style.display = 'none';
      document.title = 'Timer';
    } else {
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      let displayTime = '';
      if (hours > 0) {
        displayTime += (hours < 10 ? '0' : '') + hours + ':';
      }
      displayTime += (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
      timerDisplay.textContent = displayTime;
      document.title = displayTime;
    }
  }

  function stopTimer() {
    clearInterval(countdown);
    timerInput.disabled = false; // Re-enable the input field
    startBtn.textContent = 'Start';
    stopBtn.style.display = 'none';
  }

  function playLofi() {
    lofiAudio.play();
  }

  function toggleBackground() {
    document.body.classList.toggle('white-bg');
  }
});