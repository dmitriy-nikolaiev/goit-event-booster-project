import eventModalTemplate from '../templates/eventModal.hbs';

const modalEventContainer = document.createElement('div');
modalEventContainer.classList.add('backdropEvent', 'is-hidden');
document.body.insertAdjacentElement('afterbegin', modalEventContainer);
//

let closeModal;
let backdrop;
let modalWindow;

export function showModalDetails(event) {
  modalEventContainer.innerHTML = eventModalTemplate(event);

  closeModal = document.querySelector('#close_modal_event');
  backdrop = document.querySelector('.backdropEvent');
  modalWindow = document.querySelector('.modal-event-card');

  closeModal.addEventListener('click', closeModalEvent);
  openModalFunc();
}

function openModalFunc() {
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
  modalWindow.innerHTML = '';
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

function showModal(id) {
  alert(id);
}
