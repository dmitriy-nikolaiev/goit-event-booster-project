import { request } from './apiHelpers';
import dataAdapters from './apiDataAdapters';

const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';
const API_KEY = 'Y7Q54DNo5Fc2RWQ0VYfv9OHSBr0MiT9B';

export default {
  getStartEvents(page, perPage) {
    // const endDate = new Date(); //2021-05-23
    // endDate.setDate(endDate.getDate() + 5);
    // const  = startDate;
    // endDate.setMonth(endDate.getMonth() + 2);
    // const datesStr = JSON.stringify([startDate, endDate]);
    return request(
      // `${BASE_URL}/events.json?size=${perPage}&page=${page}&startDateTime=${dataAdapters.getDate()}&endDateTime=${dataAdapters.getDate(
      //   10,
      // )}&sort=date,asc&apikey=${API_KEY}`,
      // `${BASE_URL}/events.json?size=${perPage}&page=${page}&startDateTime=${dataAdapters.getDate()}&sort=date,asc&apikey=${API_KEY}`,
      // `${BASE_URL}/events.json?size=${perPage}&page=${page}&startEndDateTime=${
      //   new Date().toISOString().split('.')[0] + 'Z'
      // },${
      //   endDate.toISOString().split('.')[0] + 'Z'
      // }&sort=date,asc&apikey=${API_KEY}`,
      `${BASE_URL}/events.json?size=${perPage}&page=${page}&startEndDateTime=${dataAdapters.getDatesRange(
        2,
      )}&sort=date,asc&apikey=${API_KEY}`,
    );
  },

  getEventDetails(id) {
    return request(`${BASE_URL}/events/${id}.json?size=1&apikey=${API_KEY}`);
  },

  eventSearch(query, page, perPage) {
    return request(
      `${BASE_URL}/events.json?keyword=${query}&size=${perPage}&page=${page}&sort=relevance,desc&startDateTime=${
        new Date().toISOString().split('.')[0] + 'Z'
      }&apikey=${API_KEY}`,
    );
  },
};
