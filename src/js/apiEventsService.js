const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';
const API_KEY = 'Y7Q54DNo5Fc2RWQ0VYfv9OHSBr0MiT9B';

export default {
  async getAllEvents() {
    const rawResult = await fetch(
      `${BASE_URL}/events.json?countryCode=NL&&apikey=${API_KEY}&page=1&size=28`,
    );

    if (!rawResult.ok) {
      throw rawResult;
    }

    const result = await rawResult.json();

    return result;
  },
};
