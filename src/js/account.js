import accModal from '../templates/accModal.hbs';
import signUpModal from '../templates/signUpModal.hbs';

const accModalDivRef = document.querySelector('.acc-modal');
accModalDivRef.insertAdjacentHTML('beforeend', accModal());
const signUpModalDivRef = document.querySelector('.sign-up-modal');
signUpModalDivRef.insertAdjacentHTML('beforeend', signUpModal());

const accBttn = document.querySelector('.acc-bttn');
const bttnCloseModalRef = document.querySelector('.acc-modal__button');
const modalOverlayRef = document.querySelector('.acc-modal__overlay');

const modalSignUpRef = document.querySelector('.acc-modal__logup-span');
const signUpOverlayRef = document.querySelector('.sign-up__overlay');
const signUpCloseBttnRef = document.querySelector('.sign-up__close-bttn');

accBttn.addEventListener('click', openModal);
bttnCloseModalRef.addEventListener('click', closeModal);
modalOverlayRef.addEventListener('click', onBackDropClick);

modalSignUpRef.addEventListener('click', changeModal);
signUpOverlayRef.addEventListener('click', onBackDropClickSignUp);
signUpCloseBttnRef.addEventListener('click', closeSignUp);

function openModal() {
  accModalDivRef.classList.add('is-open');
  window.addEventListener('keydown', onPressEsc);
}

function closeModal() {
  window.removeEventListener('keydown', onPressEsc);
  accModalDivRef.classList.remove('is-open');
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
