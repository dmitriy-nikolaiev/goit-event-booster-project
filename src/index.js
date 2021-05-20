import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

import './styles.scss';

import EventsList from './js/eventsList.js';
import './js/appendLogo';
import './js/appendHero';
import './js/eventModal';
import './js/account';
import './js/auth';
import './js/appendSearchForm';
import './js/addToFavorite';
import './js/preloader';


const eventList = new EventsList('.cards-holder');
eventList.searchEvents();
