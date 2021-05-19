import eventFavorite from '../templates/eventFavorite.hbs';

const openModal = document.querySelector('.acc-bttn');
const favoriteList = document.querySelector('.pers-acc__favorite-list');

openModal.addEventListener('click', createMarkup);

// Проверка на наличие елемента в локальном хранилище и отрисовка карточек в списке отмеченого
function createMarkup() {
  if (localStorage.getItem(`event-key`)) {
    const keys = localStorage.getItem(`event-key`);
    console.log(keys);
    const idArray = JSON.parse(keys);
    console.log(idArray);
    idArray.map(id => {
      let eventKey = localStorage.getItem(id);
      let parseKey = JSON.parse(eventKey);
      favoriteList.insertAdjacentHTML('afterbegin', eventFavorite(parseKey));
    });
  }
}
