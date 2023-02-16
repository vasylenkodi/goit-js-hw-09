import { Notify } from "notiflix/build/notiflix-notify-aio";
import "notiflix/dist/notiflix-3.2.6.min.css";

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });

}

const formElement = document.querySelector(".form");

formElement.addEventListener("submit", (event) => {
  event.preventDefault();

  const options = {
    delay: Number(formElement[0].value),
    step: Number(formElement[1].value),
    amount: Number(formElement[2].value),
  };

  for (i = 0; i < options.amount; i += 1) {
    const promisePosition = i + 1;
    const promiseDelay = options.delay + options.step * i;
    
    createPromise(promisePosition, promiseDelay)
      .then(({ position, delay }) =>
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
      )
      .catch(({ position, delay }) =>
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
      );;
  }
});
    
