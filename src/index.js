import './styles.scss';
import './js/appendLogo';

import eventsService from './js/apiEventsService';

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
