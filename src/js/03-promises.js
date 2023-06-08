import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const delayInput = document.querySelector('input[name="delay"]');
  const stepInput = document.querySelector('input[name="step"]');
  const amountInput = document.querySelector('input[name="amount"]');

  let delay = Number(delayInput.value);
  const step = Number(stepInput.value);
  const amount = Number(amountInput.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay).then(onSuccess).catch(onError);
    delay += step;
  }
}
  function onSuccess({ position, delay }) {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  }

  function onError({ position, delay }) {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
};