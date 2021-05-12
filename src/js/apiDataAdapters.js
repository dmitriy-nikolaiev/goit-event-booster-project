export default {
  transformEventData(event) {
    //height: 225  width: 305  ratio: "4_3"   height: 203  width: 305 ratio: "3_2"
    const { id, name, dates, images, _embedded } = event;
    const image = images.find(
      image => image.height === 225 && image.width === 305,
    );
    let venue = 'Without venue';
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

  // getDate(addMonth = 0) {
  //   // yyyy-MM-dd’T’HH:mm:ssZ. Example: 2015-02-01T10:00:00Z.
  //   const date = new Date(); //2021-05-23
  //   if (addMonth > 0) {
  //     // date.setMonth(date.getMonth() + addMonth);
  //     date.setDate(date.getDate() + addMonth);
  //   }
  //   const yyyy = date.getFullYear();
  //   // const MM = (date.getMonth() + 1).toString().padStart(2, '0');
  //   const MM = date.getMonth().toString().padStart(2, '0');
  //   const dd = date.getDate().toString().padStart(2, '0');
  //   return `${yyyy}-${MM}-${dd}T00:00:00Z`;
  //   // return JSON.stringify(date);
  // },

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
