import eventsService from './apiEventsService.js';

class EventsList {
  constructor(selector) {
    this.listElement = document.querySelector(selector);
    this.currentPage = 1;
    this.totalPages = 0;
  }
  //height: 225  width: 305  ratio: "4_3"   height: 203  width: 305 ratio: "3_2"
  eventDataAdapter(event) {
    const { id, name, dates, images, _embedded } = event;
    const image = images.find(
      image => image.height === 225 && image.width === 305,
    );
    const venue = _embedded.venues[0].name
      ? _embedded.venues[0].name
      : `Place of ${_embedded.venues[0].country.name}`;

    return {
      id,
      name,
      imageUrl: image.url,
      date: dates.start.localDate,
      venue,
    };
  }

  renderList(events) {
    // console.log(events, '---events');
    const eventData = events.map(event => {
      return this.eventDataAdapter(event);
    });

    console.log(eventData, '---eventData');
  }

  getAllEvents = async () => {
    try {
      const result = await eventsService.getAllEvents();
      // console.log(result, '---result');
      this.renderList(result._embedded.events);
    } catch (error) {
      console.log(error);
    }
  };
}

export default EventsList;
