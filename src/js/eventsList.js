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
    // console.log(events, '---events');
    this.listElement.innerHTML = eventCardListTemplate(
      events.map(event => dataAdapters.transformEventData(event)),
    );

    // Удалил
    // this.listElement.innerHTML = eventCardListTemplate(
    //   events.map(event => {
    //     const temp = dataAdapters.transformEventData(event);
    //     // console.log(temp);
    //     return temp;
    //   }),
    // );

    // events.forEach(event => {
    //   const element = this.listElement.querySelector(
    //     '#event-element-' + event.id,
    //   );
    //   const eventCopy = event;
    //   const _this = this;
    //   element.addEventListener('click', function (event) {
    //     _this.loadDetails(eventCopy.id);
    //   });
    // });
  }

  // Удалил
  // loadDetails(id) {
  //   this.detailsQueryHandler(id);
  // }

  // Переделал
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

  //Добавл слушателя на список и передачу ИД в запрос
  initListener() {
    this.listElement.addEventListener('click', e => {
      const cardRef = e.target.closest('.event-card');
      if (cardRef) this.detailsQueryHandler(cardRef.dataset.id);
    });
  }

  // Удалил
  // eventListRef.addEventListener('click', e => {
  //   const cardRef = e.target.closest('.event-card');
  //   // console.log(cardRef.dataset.id);
  //   eventsService.getEventDetails(cardRef.dataset.id).then(res => {
  //     // console.log(res, '---ravRes from lisener');
  //     // const dataDetails = dataAdapter.transformEventDetails(res);
  //     // console.log(dataDetails, '---adapt.data');
  //     // showModalDetails(dataDetails);
  //     showModalDetails(res);
  //   });
  // });

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
}

export default EventsList;
