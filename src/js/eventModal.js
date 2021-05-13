import eventModal from '../templates/eventModal.hbs';

const modalEventContainer = document.querySelector('body');

function modalAppend() {
  modalEventContainer.insertAdjacentHTML('afterbegin', eventModal());
}
modalAppend();

const openModalEvent = document.getElementById('myBtn');
const closeModal = document.querySelector('#close_modal_event');
const backdrop = document.querySelector('.backdropEvent');
const modalWindow = document.querySelector('.modal-event-card');

closeModal.addEventListener('click', closeModalEvent);
openModalEvent.addEventListener('click', openModalFunc);

function openModalFunc(evt) {
  evt.preventDefault();
  backdrop.classList.remove('is-hidden');
  modalWindow.classList.remove('animation-close');
  modalWindow.classList.add('animation-open');
  window.addEventListener('keydown', onEscKeydown);
  backdrop.addEventListener('click', closeModalOnBackdropEvent);
}

function closeModalEvent() {
  modalWindow.classList.remove('animation-open');
  modalWindow.classList.add('animation-close');
  backdrop.classList.add('is-hidden');
}
function closeModalOnBackdropEvent(event) {
  if (event.target === backdrop) {
    closeModalEvent();
  }
}

function onEscKeydown(event) {
  if (event.code === 'Escape') {
    closeModalEvent();
  }
}
