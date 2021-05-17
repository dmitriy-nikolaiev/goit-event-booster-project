import countryCodes from './countryCodes';
import EventsList from './eventsList.js';

// const getAllEvents = async () => {
//   try {
//     const result = await eventsService.getAllEvents();
//     console.log(result, '---result');
//   } catch (error) {
//     console.log(error);
//   }
// };

//dimnik: Пример работы API
// getAllEvents();
const eventList = new EventsList('.cards-holder');
eventList.searchEvents();
// eventList.renderStartEvents();  LvZ189dbEEKvP5Yv7f1_4   Z698xZbpZ17a4oM LvZ18bkibXSdn2O8BRAG5 vv178ZpbGkmTeZm_ 1AvfZ4UGkTwNpAw
// import dataAdapter from './js/apiDataAdapters';
// eventsService.getEventDetails('1AvfZ4UGkTwNpAw').then(res => {
//   console.log(res);
//   const dataDetails = dataAdapter.transformEventDetails(res);
//   console.log(dataDetails);
// });
//
//

const selectRef = document.querySelector('#input-country');

function createCountriesSelect() {
  const options = countryCodes.map(({ alphaCode, name }) => {
    // деструктуризація елементів масиву обєктів країн
    return `<option class='optin-coutries-list' value="${alphaCode}">${name}</option>`; //парент-строка з даними
  });
  selectRef.insertAdjacentHTML('beforeend', options.join('')); // заганяєм це все добро в кнопку
}
createCountriesSelect();

const searchForm = document.querySelector('#search-events-form');
searchForm.addEventListener('submit', event => {
  event.preventDefault();
  const searchValue = event.target.elements['event'].value.trim();
  const countryValue = event.target.elements['country'].value;
  // console.log(countryValue, '--countryValue');
  // console.log(event.target.elements['country'], '---input-country');
  eventList.searchEvents(searchValue, countryValue);
});
