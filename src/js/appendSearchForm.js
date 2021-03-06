import countryCodes from './countryCodes';
import styleselect from 'styleselect';
import Scrollbar from 'smooth-scrollbar';
// import EventsList from './eventsList.js';

// const eventList = new EventsList('.cards-holder');
// eventList.searchEvents();

const selectRef = document.querySelector('#input-country');

function createCountriesSelect() {
  const options = countryCodes.map(({ alphaCode, name }) => {
    // деструктуризація елементів масиву обєктів країн
    return `<option class='optin-coutries-list' value="${alphaCode}">${name}</option>`; //парент-строка з даними
  });
  selectRef.insertAdjacentHTML('beforeend', options.join('')); // заганяєм це все добро в кнопку
}
createCountriesSelect();

//
styleselect(selectRef);
//
const customListRef = document.querySelector('.ss-dropdown');
if (customListRef) {
  Scrollbar.init(customListRef, {
    alwaysShowTracks: true,
    thumbMinSize: 43,
  });
  Scrollbar.detachStyle();
  selectRef.style.display = 'none';
}
