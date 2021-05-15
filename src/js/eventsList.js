import eventsService from './apiEventsService.js';
import dataAdapters from './apiDataAdapters';
import eventCardListTemplate from '../templates/eventCardList.hbs';
import Paginator from './paginator';

class EventsList {
  constructor(selector) {
    this.listElement = document.querySelector(selector);
    this.searchQuery = '';
    this.countryCode = '';
    this.itemsPerPage = 24;
    this.paginator = new Paginator(
      this.itemsPerPage,
      '#paginator',
      this.queryHandler,
    );
  }

  renderList(events) {
    // console.log(events, '---events');
    this.listElement.innerHTML = eventCardListTemplate(
      events.map(event => dataAdapters.transformEventData(event)),
    );
  }

  queryHandler = async () => {
    try {
      const result = await eventsService.eventSearch(
        this.searchQuery,
        this.countryCode,
        this.paginator.page,
        this.paginator.itemsPerPage,
      );
      // console.log(result, '---queryHandler');
      if (result._embedded) {
        this.paginator.init(result.page.number, result.page.totalPages);
        this.renderList(result._embedded.events);
      } else {
        // TODO: Display not found
        console.log('Not Found');
      }
    } catch (error) {
      // TODO: Dislay error
      console.log(error, '---errorGetAll');
    }
  };

  searchEvents(queryString = '', countryCode = '') {
    this.searchQuery = queryString;
    this.countryCode = countryCode;
    this.paginator.setToInitial();
    this.queryHandler();
  }
}

export default EventsList;
