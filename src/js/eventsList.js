import eventsService from './apiEventsService.js';
import dataAdapters from './apiDataAdapters';
import eventCardListTemplate from '../templates/eventCardList.hbs';
import Paginator from './paginator';

class EventsList {
  constructor(selector) {
    this.listElement = document.querySelector(selector);
    this._searchQuery = '';
    // this.currentPage = 1;
    // this.totalPages = 0;
    this.itemsPerPage = 24;
    this.paginator = new Paginator(
      this.itemsPerPage,
      '#paginator',
      this.getAllEvents,
    );
  }

  get searchQuery() {
    return this._searchQuery;
  }

  set searchQuery(query) {
    this._searchQuery = query;
    if (query === '') {
      this.getAllEvents();
      return;
    }
    this.paginator.callback = this.searchByKeyword;
    this.paginator.setToInitial();
    this.searchByKeyword();
  }

  renderList(events) {
    // console.log(events, '---events');
    this.listElement.innerHTML = eventCardListTemplate(
      events.map(event => dataAdapters.transformEventData(event)),
    );
  }

  getAllEvents = async () => {
    // console.log('getAll');
    try {
      this.paginator.callback = this.getAllEvents;
      const result = await eventsService.getStartEvents(
        this.paginator.page,
        this.paginator.itemsPerPage,
      );
      if (result._embedded) {
        this.paginator.init(result.page.number, result.page.totalPages);
        // console.log(result, '---result getAllEvents');
        this.renderList(result._embedded.events);
      } else {
        // TODO: Display not found
        console.log('Non Found');
      }
    } catch (error) {
      // TODO: Dislay error
      console.log(error, '---errorGetAll');
    }
  };

  searchByKeyword = async () => {
    try {
      const result = await eventsService.eventSearch(
        this._searchQuery,
        this.paginator.page,
        this.paginator.itemsPerPage,
      );
      // console.log(result, '---resultByKeyword');
      if (result._embedded) {
        this.paginator.init(result.page.number, result.page.totalPages);
        this.renderList(result._embedded.events);
      } else {
        // TODO: Display not found
        console.log('Non Found');
      }
    } catch (error) {
      // TODO: Dislay error
      console.log(error, '---errorGetAll');
    }
  };

  searchByCountry = async countryCode => {};
}

export default EventsList;
