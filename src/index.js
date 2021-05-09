import './styles.scss';
import './js/appendLogo';


import eventsService from './js/apiEventsService';
import EventsList from './js/eventsList.js';

const getAllEvents = async () => {
  try {
    const result = await eventsService.getAllEvents();
    console.log(result, '---result');
  } catch (error) {
    console.log(error);
  }
};

//dimnik: Пример работы API
// getAllEvents();
const eventList = new EventsList('.cards-holder');
eventList.getAllEvents();
