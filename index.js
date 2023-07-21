const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');
var intervalID 

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {  
  return (seconds) => {
    const startSeconds = seconds
    const startTimeStamp = new Date().getTime() 
    let time = 0
    let diff
    let hh = '00'
    let mm = '00'
    let ss = seconds
    
    function runSecond() {            

      hh = String(Math.floor(seconds / 3600))
      if (hh.length < 2) hh = '0' + hh

      mm = String(Math.floor((seconds - Number(hh) * 3600) / 60))    
      if (mm.length < 2) mm = '0' + mm

      
      ss = String(seconds - Number(hh) * 3600 - Number(mm) * 60)
      if (ss.length < 2) ss = '0' + ss
      
      timerEl.textContent = hh + ':' + mm + ':' + ss
      time += 1000
      seconds = time/1000 + startSeconds   

    }
    diff = (new Date().getTime() - startTimeStamp - time);
    intervalID = setInterval(runSecond, (1000-diff));   
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', () => {
  // Очистите input так, чтобы в значении
  // оставались только числа
  if (isNaN(parseInt(inputEl.value[inputEl.value.length-1]))){
    inputEl.value = inputEl.value.slice(0,-1)    
  }
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);

  if (intervalID != undefined) clearInterval(intervalID)

  animateTimer(seconds);
  
  inputEl.value = '';
});
