import accModal from '../templates/accModal.hbs';

const accModalDivRef = document.querySelector('.acc-modal');
accModalDivRef.insertAdjacentHTML('beforeend', accModal());

const accBttn = document.querySelector('.acc-bttn');
const bttnCloseModalRef = document.querySelector('.acc-modal__button');
const modalOverlayRef = document.querySelector('.acc-modal__overlay');

accBttn.addEventListener('click', openModal);
bttnCloseModalRef.addEventListener('click', closeModal);
modalOverlayRef.addEventListener('click', onBackDropClick);

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
