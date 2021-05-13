import { request } from './apiHelpers';
import dataAdapters from './apiDataAdapters';

const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';
const API_KEY = 'Y7Q54DNo5Fc2RWQ0VYfv9OHSBr0MiT9B';

export default {
  //     // `${BASE_URL}/events.json?size=${perPage}&page=${page}&startDateTime=${dataAdapters.getDate()}&endDateTime=${dataAdapters.getDate(
  //     //   10,
  //     // )}&sort=date,asc&apikey=${API_KEY}`,
  //     // `${BASE_URL}/events.json?size=${perPage}&page=${page}&startDateTime=${dataAdapters.getDate()}&sort=date,asc&apikey=${API_KEY}`,
  //     // `${BASE_URL}/events.json?size=${perPage}&page=${page}&startEndDateTime=${
  //     //   new Date().toISOString().split('.')[0] + 'Z'
  //     // },${
  //     //   endDate.toISOString().split('.')[0] + 'Z'
  //     // }&sort=date,asc&apikey=${API_KEY}`,
  //     `${BASE_URL}events.json?size=${perPage}&page=${page}&startEndDateTime=${dataAdapters.getDatesRange(
  //       2,
  //     )}&sort=date,asc&apikey=${API_KEY}`,
  //   );
  // },

  getEventDetails(id) {
    const data = request(
      `${BASE_URL}events/${id}.json?size=1&apikey=${API_KEY}`,
    );
    console.log(data, '---dataID');
    return data;
  },

  eventSearch(query, countryCode, page, perPage) {
    const queryString = query !== '' ? `&keyword=${query}` : '';
    const countryString =
      countryCode !== '' ? `&countryCode=${countryCode}` : '';
    const sortString = query !== '' ? '&sort=relevance,desc' : '&sort=date,asc';
    const dateString =
      query === '' && countryCode === ''
        ? `&startEndDateTime=${dataAdapters.getDatesRange(1)}`
        : `&startDateTime=${new Date().toISOString().split('.')[0] + 'Z'}`;

    const requestString = `${BASE_URL}events.json?size=${perPage}&page=${page}${queryString}${countryString}${sortString}${dateString}&apikey=${API_KEY}`;
    // console.log(requestString, '---requestString');

    return request(requestString);
    // return request(
    //   `${BASE_URL}/events.json?size=${perPage}&page=${page}${queryString}${countryString}${sortString}${dateString}&apikey=${API_KEY}`,
    // );
  },
};
