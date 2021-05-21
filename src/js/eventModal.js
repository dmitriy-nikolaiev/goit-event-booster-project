import eventModalTemplate from '../templates/eventModal.hbs';
import firebase from 'firebase/app';
import 'firebase/auth';

const modalEventContainer = document.createElement('div');
modalEventContainer.classList.add('backdropEvent', 'is-hidden');
document.body.insertAdjacentElement('afterbegin', modalEventContainer);
//
const refs = {
  closeModal: '',
  backdrop: '',
  modalWindow: '',
  addToFavoriteBttn: '',
  eventObj: '',
};

export function showModalDetails(event, searchFunction) {
  // console.log(event, '---eventToMoadl');
  const id = event.id;
  modalEventContainer.innerHTML = eventModalTemplate(event);
  if (event.eventFullInfo !== '') {
    const infoBoxRef = document.querySelector('.event-wrapper');
    infoBoxRef.style.cursor = 'pointer';

    const fullInfoRef = document.querySelector('.fullInfo');
    modalEventContainer.addEventListener('click', e => {
      if (e.target.classList.contains('shortInfo')) {
        fullInfoRef.classList.add('show');
      } else {
        fullInfoRef.classList.remove('show');
      }
    });
  }

  refs.closeModal = document.querySelector('#close_modal_event');
  refs.backdrop = document.querySelector('.backdropEvent');
  refs.modalWindow = document.querySelector('.modal-event-card');
  refs.addToFavoriteBttn = document.querySelector('.add-to-favorite-bttn');

  // Проверка на авторизацию
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      refs.addToFavoriteBttn.classList.remove('is-hidden');
    }
  });

  //Проверка на наличие елемента в локальном хранилище и добавление класса для кнопки
  if (localStorage.getItem(`event-${id}`)) {
    refs.addToFavoriteBttn.classList.add('active');
  }
  //Добавляю слушатель на кнопку-сердечко
  refs.addToFavoriteBttn.addEventListener('click', e => {
    let self = e.currentTarget;
    let localStor = localStorage.getItem('event-key');

    self.classList.toggle('active');

    if (self.classList.contains('active')) {
      refs.eventObj = event;
      refs.eventObj.id = id;
      localStorage.setItem(`event-${id}`, JSON.stringify(refs.eventObj));
      localKeys(localStor, id);
    } else {
      localKeys(localStor, id);
      localStorage.removeItem(`event-${id}`);
    }
  });

  refs.closeModal.addEventListener('click', closeModalEvent);
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
  refs.backdrop.classList.remove('is-hidden');
  refs.modalWindow.classList.remove('animation-close');
  refs.modalWindow.classList.add('animation-open');
  window.addEventListener('keydown', onEscKeydown);
  refs.backdrop.addEventListener('click', closeModalOnBackdropEvent);
}

function closeModalEvent() {
  refs.modalWindow.classList.remove('animation-open');
  refs.modalWindow.classList.add('animation-close');
  refs.backdrop.classList.add('is-hidden');
  setTimeout(() => {
    refs.modalWindow.innerHTML = '';
  }, 500);
}

function closeModalOnBackdropEvent(event) {
  if (event.target === refs.backdrop) {
    closeModalEvent();
  }
}

function onEscKeydown(event) {
  if (event.code === 'Escape') {
    closeModalEvent();
  }
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
