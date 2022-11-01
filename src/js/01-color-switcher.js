// Напиши скрипт, який після натискання кнопки «Start»,
// раз на секунду змінює колір фону < body > на випадкове значення,
//     використовуючи інлайн стиль.Натисканням на кнопку «Stop» зміна
//     кольору фону повинна зупинятися.

// УВАГА
// Враховуй, що на кнопку «Start» можна натиснути нескінченну кількість разів.
// Зроби так, щоб доки зміна теми запущена, кнопка «Start» була неактивною(disabled).

// Для генерування випадкового кольору використовуй функцію getRandomHexColor.

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let timerId = null;

startBtn.addEventListener('click', onStartButtonClick);
stopBtn.addEventListener('click', onStopButtonClick);

stopBtn.setAttribute('disabled', 'disabled');

function onStartButtonClick(e) {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  setAttributeOnButton(stopBtn, startBtn);
}

function onStopButtonClick() {
  clearInterval(timerId);
  setAttributeOnButton(startBtn, stopBtn);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function setAttributeOnButton(enabledButton, disabledButton) {
  enabledButton.removeAttribute('disabled');
  disabledButton.setAttribute('disabled', 'disabled');
}
