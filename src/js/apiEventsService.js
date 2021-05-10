import { request } from './apiHelpers';

const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';
const API_KEY = 'Y7Q54DNo5Fc2RWQ0VYfv9OHSBr0MiT9B';

export default {
  getAllEvents() {
    return request(`${BASE_URL}/events.json?apikey=${API_KEY}`);
  },

  getEventDetails(id) {
    return request(`${BASE_URL}/events/${id}.json?size=1&apikey=${API_KEY}`);
  },

  eventSearch(query, countryCode, page = 1) {
    return request(
      `${BASE_URL}/events.json?keyword=${query}&page${page}&apikey=${API_KEY}`,
    );
  },

  //v2/events/G5diZfkn0B-bh.json?apikey=
  // async getAllEvents() {
  //   const rawResult = await fetch(`${BASE_URL}/events.json?apikey=${API_KEY}`);

  //   if (!rawResult.ok) {
  //     throw rawResult;
  //   }

  //   const result = await rawResult.json();

  //   return result;
  // },
};
