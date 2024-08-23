import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const delay = parseInt(form.querySelector('input[name="delay"]').value, 10);
  const state = form.querySelector('input[name="state"]:checked').value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });

  promise
    .then(value => {
      iziToast.show({
        message: value,
        messageColor: '#fff',
        backgroundColor: '#4CAF50',
        animateInside: false,
        position: 'topRight',
        progressBar: false,
      });
    })

    .catch(error => {
      iziToast.show({
        message: error,
        messageColor: '#fff',
        backgroundColor: '#FF6682',
        animateInside: false,
        position: 'topRight',
        progressBar: false,
      });
    });
});
