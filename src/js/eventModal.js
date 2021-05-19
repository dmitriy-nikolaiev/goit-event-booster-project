import eventModalTemplate from '../templates/eventModal.hbs';
import firebase from 'firebase/app';
import 'firebase/auth';

const modalEventContainer = document.createElement('div');
modalEventContainer.classList.add('backdropEvent', 'is-hidden');
document.body.insertAdjacentElement('afterbegin', modalEventContainer);
//

let closeModal;
let backdrop;
let modalWindow;
let addToFavoriteBttn;
let eventObj;

export function showModalDetails(event, searchFunction) {
  // console.log(event, '---eventToMoadl');
  const id = event.id;
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
  addToFavoriteBttn = document.querySelector('.add-to-favorite-bttn');

  // Проверка на авторизацию
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      addToFavoriteBttn.classList.remove('is-hidden');
    }
  });

  //Проверка на наличие елемента в локальном хранилище и добавление класса для кнопки
  if (localStorage.getItem(`event-${id}`)) {
    addToFavoriteBttn.classList.add('active');
  }
  //Добавляю слушатель на кнопку-сердечко
  addToFavoriteBttn.addEventListener('click', e => {
    let self = e.currentTarget;
    let localStor = localStorage.getItem('event-key');

    self.classList.toggle('active');

    if (self.classList.contains('active')) {
      eventObj = event;
      eventObj.id = id;
      localStorage.setItem(`event-${id}`, JSON.stringify(eventObj));
      localKeys(localStor, id);
    } else {
      localKeys(localStor, id);
      localStorage.removeItem(`event-${id}`);
    }
  });

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

function localKeys(obj, id) {
  let localkey = [];
  let eventId = `event-${id}`;
  localkey = JSON.parse(obj);
  if (localkey === null) {
    localkey = [eventId];
    return localStorage.setItem(`event-key`, JSON.stringify(localkey));
  }

  let index = localkey.indexOf(eventId);
  if (index === -1) {
    localkey.push(eventId);
    return localStorage.setItem(`event-key`, JSON.stringify(localkey));
  } else if (index !== -1) {
    localkey.splice(index, 1);
    return localStorage.setItem(`event-key`, JSON.stringify(localkey));
  }
}
