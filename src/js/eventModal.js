import eventModalTemplate from '../templates/eventModal.hbs';

const modalEventContainer = document.createElement('div');
modalEventContainer.classList.add('backdropEvent', 'is-hidden');
document.body.insertAdjacentElement('afterbegin', modalEventContainer);
//

let closeModal;
let backdrop;
let modalWindow;

export function showModalDetails(event, searchFunction) {
  // console.log(event, '---eventToMoadl');
  modalEventContainer.innerHTML = eventModalTemplate(event);
  if (event.eventFullInfo !== '') {
    const infoBoxRef = document.querySelector('.event-wrapper');
    infoBoxRef.classList.add('full-info-present');
    // infoBoxRef.dataset.full = 'true';
    const fullInfoRef = document.querySelector('.fullInfo');
    modalEventContainer.addEventListener('click', e => {
      if (e.target.classList.contains('shortInfo')) {
        fullInfoRef.classList.toggle('show');
      } else {
        // fullInfoRef.classList.contains('fullInfo');
        fullInfoRef.classList.toggle('show');
      }
    });
  }

  closeModal = document.querySelector('#close_modal_event');
  backdrop = document.querySelector('.backdropEvent');
  modalWindow = document.querySelector('.modal-event-card');

  closeModal.addEventListener('click', closeModalEvent);
  openModalFunc();
  //
  const moreRef = document.querySelector('.more_about_author_wraper');
  moreRef.addEventListener('click', e => {
    e.preventDefault();
    const searchValue = event.attractions
      ? event.attractions.split(',')[0]
      : event.name;
    searchFunction(searchValue);
    closeModalEvent();
  });
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
