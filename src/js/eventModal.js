import eventModalTemplate from '../templates/eventModal.hbs';

// Создаем контейнер для модалки методом createElement,
// тогда он будет доступен как переменная modalEventContainer и не нужно делать querySelector.
// В шаблоне удалил контейнер
const modalEventContainer = document.createElement('div');
modalEventContainer.classList.add('backdropEvent', 'is-hidden');
document.body.insertAdjacentElement('afterbegin', modalEventContainer);
//

let closeModal;
let backdrop;
let modalWindow;

export function showModalDetails(event) {
  // шаблон переделан под адаптированные данные.
  // подготовленные данные в apiDataAdapters для шаблона:
  //  name,
  // eventInfo,
  // eventImages,
  // date: dates.start.localDate,
  // time: dates.start.localTime,
  // city,
  // country,
  // venue,
  // attractions: attractions.join(', '),
  // priceRanges,
  // products,

  // console.log(event, '---eventInModal');
  // Вставляем шаблон в контейнер, заменяя его содержимое
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
  // правильней было бы почистить контейнер, но тогда пропадет анимация убирания окна
  // можно что-то попробовать придумать.
  // modalEventContainer.innerHTML = '';
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
