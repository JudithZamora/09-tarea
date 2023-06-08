function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
  }
  
  const startButton = document.querySelector('[data-start]');
  const stopButton = document.querySelector('[data-stop]');
  let intervalId;
  
  startButton.addEventListener('click', startColorSwitch);
  stopButton.addEventListener('click', stopColorSwitch);
  
  function startColorSwitch() {
    startButton.disabled = true; // Deshabilitar el botón Start
    intervalId = setInterval(changeBackgroundColor, 1000);
  }
  // botón Start
  function stopColorSwitch() {
    startButton.disabled = false; 
    clearInterval(intervalId);
  }
  
  function changeBackgroundColor() {
    const body = document.body;
    const randomColor = getRandomHexColor();
    body.style.backgroundColor = randomColor;
  }
  
