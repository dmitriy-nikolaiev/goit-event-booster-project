import eventFavorite from '../templates/eventFavorite.hbs';
import eventModal from '../templates/eventModal.hbs';
import firebase from 'firebase/app';
import 'firebase/auth';

const openModal = document.querySelector('.acc-bttn');
const favoriteList = document.querySelector('.pers-acc__favorite-list');
const modalDivRef = document.querySelector('.backdropEvent');

let modalWindow;
let closeModal;

openModal.addEventListener('click', createMarkup);

// Проверка на наличие елемента в локальном хранилище и отрисовка карточек в списке отмеченого
function createMarkup() {
  favoriteList.innerHTML = '';
  if (localStorage.getItem(`event-key`)) {
    const keys = localStorage.getItem(`event-key`);
    const idArray = JSON.parse(keys);
    idArray.map(id => {
      let eventKey = localStorage.getItem(id);
      let parseKey = JSON.parse(eventKey);
      favoriteList.insertAdjacentHTML('afterbegin', eventFavorite(parseKey));
    });
  }
}

// Слушатель списка
favoriteList.addEventListener('click', openEventFavorite);
let closest;
let infoEvent;
let clearId;
let idRef;
let parceStor;

// Відкриття модалки
function openEventFavorite(event) {
  const self = event.target;
  // Перевірка на елемент
  if (self.nodeName === 'UL') {
    return;
  }
  // Получаємо дані: li, id, event-id, розпарсений key
  closest = self.closest('.event-in-favorite');
  clearId = closest.dataset.id;
  idRef = closest.getAttribute('id');
  infoEvent = localStorage.getItem(idRef);
  parceStor = JSON.parse(infoEvent);
  // Створюю розмітку модалки
  modalDivRef.innerHTML = eventModal(parceStor);
  // Отримую посилання на кнопку-серце
  const addToFavoriteBttn = document.querySelector('.add-to-favorite-bttn');
  // Провіряю аунтефікацію
  audit(addToFavoriteBttn);
  // Провіряю кнопку на наявність в localStorage
  if (localStorage.getItem(idRef)) {
    addToFavoriteBttn.classList.add('active');
  }
  // Вішаю прослуховування на кнопку і додаю їй функціонал(Такий же як у eventModal)
  addToFavoriteBttn.addEventListener('click', e => {
    let self = e.currentTarget;
    let localStor = localStorage.getItem('event-key');
    self.classList.toggle('active');
    if (self.classList.contains('active')) {
      let eventObj = parceStor;
      eventObj.id = clearId;
      localStorage.setItem(`event-${clearId}`, JSON.stringify(eventObj));
      localKeys(localStor, clearId);
    } else {
      localKeys(localStor, clearId);
      localStorage.removeItem(`event-${clearId}`);
    }
  });

  closeModal = document.querySelector('#close_modal_event');
  modalWindow = document.querySelector('.modal-event-card');

  openModalFunc();
  closeModal.addEventListener('click', closeModalEvent);
}
function openModalFunc() {
  modalDivRef.classList.remove('is-hidden');
  modalWindow.classList.remove('animation-close');
  modalWindow.classList.add('animation-open');
  window.addEventListener('keydown', onEscKeydown);
  modalDivRef.addEventListener('click', closeModalOnBackdropEvent);
}

function closeModalEvent() {
  modalWindow.classList.remove('animation-open');
  modalWindow.classList.add('animation-close');
  modalDivRef.classList.add('is-hidden');
  window.removeEventListener('keydown', onEscKeydown);
  modalWindow.innerHTML = '';
  createMarkup();
}

function closeModalOnBackdropEvent(event) {
  if (event.target === modalDivRef) {
    closeModalEvent();
  }
}

function onEscKeydown(event) {
  if (event.code === 'Escape') {
    closeModalEvent();
  }
}
function audit(addToFavoriteBttn) {
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      addToFavoriteBttn.classList.remove('is-hidden');
    }
  });
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
