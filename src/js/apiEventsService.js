import { request } from './apiHelpers';

const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';
const API_KEY = 'Y7Q54DNo5Fc2RWQ0VYfv9OHSBr0MiT9B';

export default {
  getAllEvents(page = 1, perPage = 24) {
    const setDate = new Date(); //2021-05-23
    const startDate = `${setDate.getFullYear()}-${
      setDate.getMonth() + 1
    }-${setDate.getDate()}`;

    setDate.setMonth(setDate.getMonth() + 3);
    const endDate = `${setDate.getFullYear()}-${
      setDate.getMonth() + 1
    }-${setDate.getDate()}`;
    // console.log(startDate, endDate, 's-e');

    return request(
      `${BASE_URL}/events.json?size=${perPage}&page=${page}&apikey=${API_KEY}`,
    );
  },

  getEventDetails(id) {
    return request(`${BASE_URL}/events/${id}.json?size=1&apikey=${API_KEY}`);
  },

  eventSearch(query, countryCode, page = 1, perPage = 24) {
    return request(
      `${BASE_URL}/events.json?keyword=${query}&size=${perPage}&page=${page}&apikey=${API_KEY}`,
    );
  },
};
