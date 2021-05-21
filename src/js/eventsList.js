import eventsService from './apiEventsService.js';
import dataAdapters from './apiDataAdapters';
import eventCardListTemplate from '../templates/eventCardList.hbs';
import Paginator from './paginator';
import { showModalDetails } from './eventModal';
import * as showNotify from './pnotify';

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
    //
    this.inputCountryRef = document.querySelector('#input-country');
    this.inputEventRef = document.querySelector('#input-event');

    this.initListener();
  }

  renderList(events) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    this.listElement.innerHTML = eventCardListTemplate(
      events.map(event => dataAdapters.transformEventData(event)),
    );
  }

  detailsQueryHandler = async id => {
    try {
      const resultEvent = await eventsService.getEventDetails(id);
      //
      const dataDetails = dataAdapters.transformEventDetails(resultEvent);
      showModalDetails(dataDetails, this.searchMore.bind(this));
    } catch (error) {
      showNotify.showError();
      // console.log(error);
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
      if (result._embedded) {
        this.paginator.init(
          result.page.number,
          result.page.totalPages > Math.floor(1000 / this.itemsPerPage)
            ? Math.floor(1000 / this.itemsPerPage)
            : result.page.totalPages,
        );
        this.renderList(result._embedded.events);
      } else {
        showNotify.showAlert();
      }
    } catch (error) {
      showNotify.ShowInfo();
      // console.log(error);
    }
  };

  searchMore(searchName) {
    this.inputCountryRef.value = '';
    this.inputEventRef.value = searchName;
    this.searchEvents(searchName, '');
  }

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
    this.inputCountryRef.addEventListener('change', event => {
      const countryValue = event.target.value;
      this.searchEvents(this.inputEventRef.value, countryValue);
    });
  }
}

export default EventsList;
