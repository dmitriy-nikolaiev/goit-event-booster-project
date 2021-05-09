import './styles.scss';

// import eventsService from './js/apiEventsService';

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
import EventsList from './js/eventsList.js';
const eventList = new EventsList('cards-holder');
eventList.getAllEvents();
