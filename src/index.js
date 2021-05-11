import './styles.scss';
import './js/appendLogo';
import './js/appendHero';

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
// eventList.renderStartEvents();
// eventsService.getEventDetails('Z698xZbpZ17a4oM').then(res => console.log(res));
// eventsService.eventSearch('Eagles', 'USA', 1).then(res => console.log(res));
