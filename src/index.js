import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

import './styles.scss';

import './js/appendLogo';
import './js/appendHero';
import './js/eventModal';

import eventsService from './js/apiEventsService';
import EventsList from './js/eventsList.js';

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

// const searchInput = document.querySelector('#search-events-form');
// searchInput.addEventListener('submit', event => {
//   event.preventDefault();
//   const searchValue = event.target.elements['event'].value.trim();
//   const countryValue = event.target.elements['country'].value;
//   // console.log(event.target.elements['country'], '---input-country');
//   eventList.searchEvents(searchValue, countryValue);
// });
