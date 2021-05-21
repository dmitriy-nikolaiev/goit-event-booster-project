export default {
  transformEventData(event) {
    //height: 225  width: 305  ratio: "4_3"   height: 203  width: 305 ratio: "3_2"
    const { id, name, dates, images, _embedded } = event;
    const image = images.find(
      image => image.height === 225 && image.width === 305,
    );

    let venue = '';
    if (_embedded && _embedded.venues) {
      venue = _embedded.venues[0].name
        ? _embedded.venues[0].name
        : _embedded.venues[0].city.name;
    } else if (event.place && event.place.city) {
      venue = event.place.city.name;
    }

    return {
      id,
      name,
      imageUrl: image.url,
      date: dates.start.localDate,
      venue,
    };
  },

  transformEventDetails(event) {
    const {
      id,
      name,
      description,
      info,
      images,
      dates,
      priceRanges,
      _embedded,
      url,
    } = event;

    let eventFullInfo = info || description || name || '';
    const eventInfo = eventFullInfo.trim().substring(0, 110);
    if (eventFullInfo.length <= 110) {
      eventFullInfo = '';
    }
    const eventImages = images.filter(
      image =>
        (image.height === 225 && image.width === 305) ||
        (image.height === 683 && image.width === 1024),
    );
    eventImages.sort(function (a, b) {
      return a.width - b.width;
    });

    let venue = '';
    let city = '';
    let country = '';
    let attractions = [];

    // if (_embedded.venues) {
    if (_embedded.venues) {
      venue = _embedded.venues[0].name;
      city = _embedded.venues[0].city.name;
      country = _embedded.venues[0].country.name;
    } else if (event.place) {
      city = event.place.city.name;
      country = event.place.country.name;
    }
    // }
    if (_embedded.attractions) {
      attractions = _embedded.attractions.map(attraction => {
        return attraction.name;
      });
    }

    const date = dates.start.localDate ? dates.start.localDate : '';
    const time = dates.start.localTime
      ? dates.start.localTime.split(':').slice(0, 2).join(':')
      : '';
    const timezone = dates.timezone
      ? dates.timezone.replace('_', ' ', 'g')
      : '';

    return {
      id,
      name,
      eventInfo,
      eventFullInfo,
      eventImages,
      date,
      time,
      timezone,
      city,
      country,
      venue,
      attractions: attractions.join(', '),
      priceRanges,
      url,
    };
  },

  getDatesRange(addDays = 1) {
    const startDate = new Date();
    const endDate = new Date();
    startDate.setDate(startDate.getDate());
    endDate.setDate(endDate.getDate() + addDays);

    return (
      startDate.toISOString().split('.')[0] +
      'Z,' +
      endDate.toISOString().split('.')[0] +
      'Z'
    );
  },
};
