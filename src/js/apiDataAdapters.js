export default {
  transformEventData(event) {
    //height: 225  width: 305  ratio: "4_3"   height: 203  width: 305 ratio: "3_2"
    const { id, name, dates, images, _embedded } = event;
    const image = images.find(
      image => image.height === 225 && image.width === 305,
    );

    let venue = 'No venue';
    if (_embedded && _embedded.venues) {
      venue = _embedded.venues[0].name
        ? _embedded.venues[0].name
        : _embedded.venues[0].city.name;
    } else if (event.place && event.place.city) {
      venue = event.place.city.name;
    }

    // if (event.products) {
    //   console.log(id, 'id_products');
    // }
    // if (event.priceRanges && event.products && event.priceRanges.length > 1) {
    //   console.log(id, 'id_priceRanges>1');
    // }

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
      name,
      description,
      info,
      images,
      dates,
      priceRanges,
      products,
      _embedded,
    } = event;

    const eventInfo = info || description || name || '';
    const eventImages = images.filter(
      image =>
        (image.height === 225 && image.width === 305) ||
        (image.height === 683 && image.width === 1024),
    );

    let venue = '';
    let city = '';
    let country = '';
    let attractions = [];

    if (_embedded) {
      if (_embedded.venues) {
        venue = _embedded.venues[0].name;
        city = _embedded.venues[0].city.name;
        country = _embedded.venues[0].country.name;
      }

      if (_embedded.attractions) {
        attractions = _embedded.attractions.map(attraction => {
          return attraction.name;
        });
      }
    } else if (event.place) {
      city = event.place.city.name;
      country = event.place.country.name;
    }

    return {
      name,
      eventInfo,
      eventImages,
      date: dates.start.localDate,
      time: dates.start.localTime,
      city,
      country,
      venue,
      attractions,
      priceRanges,
      products,
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
