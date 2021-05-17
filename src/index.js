import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

import './styles.scss';

import './js/appendLogo';
import './js/appendHero';
import EventsList from './js/eventsList.js';
import './js/eventModal';
import './js/account';
import './js/auth';
import './js/appendSearchForm';


const eventList = new EventsList('.cards-holder');
eventList.searchEvents();

