import logInModal from '../templates/logInModal.hbs';
import signUpModal from '../templates/signUpModal.hbs';
import persAccModal from '../templates/accModal.hbs';

const logInModalDivRef = document.querySelector('.log-in-modal');
logInModalDivRef.insertAdjacentHTML('beforeend', logInModal());
const signUpModalDivRef = document.querySelector('.sign-up-modal');
signUpModalDivRef.insertAdjacentHTML('beforeend', signUpModal());
const persAccModalDivRef = document.querySelector('.pers-acc-modal');
persAccModalDivRef.insertAdjacentHTML('beforeend', persAccModal());

const logInLinkBttnRef = document.querySelector('.acc-bttn');
const logInCloseBttnRef = document.querySelector('.log-in__close-bttn');
const logInOverlayRef = document.querySelector('.log-in__overlay');

const signUpLinkRef = document.querySelector('.log-in__logup-span');
const signUpOverlayRef = document.querySelector('.sign-up__overlay');
const signUpCloseBttnRef = document.querySelector('.sign-up__close-bttn');

logInLinkBttnRef.addEventListener('click', openModal);
logInCloseBttnRef.addEventListener('click', closeModal);
logInOverlayRef.addEventListener('click', onBackDropClick);

signUpLinkRef.addEventListener('click', changeModal);
signUpOverlayRef.addEventListener('click', onBackDropClickSignUp);
signUpCloseBttnRef.addEventListener('click', closeSignUp);

function openModal() {
  logInModalDivRef.classList.add('is-open');
  window.addEventListener('keydown', onPressEsc);
}

function closeModal() {
  window.removeEventListener('keydown', onPressEsc);
  logInModalDivRef.classList.remove('is-open');
}
function onBackDropClick(event) {
  if (event.target === event.currentTarget) {
    closeModal();
  }
}
function onPressEsc(event) {
  if (event.code === 'Escape') {
    closeModal();
  }
}
function changeModal() {
  closeModal();
  signUpModalDivRef.classList.add('is-open');
  window.addEventListener('keydown', onPressEscSignUp);
}
function closeSignUp() {
  window.removeEventListener('keydown', onPressEscSignUp);
  signUpModalDivRef.classList.remove('is-open');
}
function onBackDropClickSignUp(event) {
  if (event.target === event.currentTarget) {
    closeSignUp();
  }
}
function onPressEscSignUp(event) {
  if (event.code === 'Escape') {
    closeSignUp();
  }
}
