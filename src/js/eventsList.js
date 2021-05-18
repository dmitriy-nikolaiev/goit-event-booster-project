import eventsService from './apiEventsService.js';
import dataAdapters from './apiDataAdapters';
import eventCardListTemplate from '../templates/eventCardList.hbs';
import Paginator from './paginator';
import { showModalDetails } from './eventModal';

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

    this.initListener();
  }

  renderList(events) {
    this.listElement.innerHTML = eventCardListTemplate(
      events.map(event => dataAdapters.transformEventData(event)),
    );
  }

  detailsQueryHandler = async id => {
    try {
      const resultEvent = await eventsService.getEventDetails(id);
      // console.log(result, '---queryHandler');
      const dataDetails = dataAdapters.transformEventDetails(resultEvent);
      showModalDetails(dataDetails);
    } catch (error) {
      // TODO: Dislay error for detail query error
      console.log(error, '---errorDetailsQuery');
    }
  };

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
      console.log(error, '---searchEvents');
    }
  };

  searchEvents(queryString = '', countryCode = '') {
    this.searchQuery = queryString;
    this.countryCode = countryCode;
    this.paginator.setToInitial();
    this.queryHandler();
  }

  initListener() {
    this.listElement.addEventListener('click', e => {
      const cardRef = e.target.closest('.event-card');
      if (cardRef) this.detailsQueryHandler(cardRef.dataset.id);
    });
    //
    const searchForm = document.querySelector('#search-events-form');
    searchForm.addEventListener('submit', event => {
      event.preventDefault();
      const searchValue = event.target.elements['event'].value.trim();
      const countryValue = event.target.elements['country'].value;
      this.searchEvents(searchValue, countryValue);
    });
    //
    const countrySelect = document.querySelector('#input-country');
    countrySelect.addEventListener('change', event => {
      const countryValue = event.target.value;
      this.searchEvents(this.searchQuery, countryValue);
    });
  }
}

export default EventsList;
