import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

import './styles.scss';

import './js/appendLogo';
import './js/appendHero';
import './js/eventModal';
import './js/account';
import './js/auth';
import './js/appendSearchForm';



const modalRef = document.querySelector('.backdropEvent');
const eventListRef = document.querySelector('.cards-holder');
eventListRef.addEventListener('click', e => {
  const cardRef = e.target.closest('.event-card');
  // console.log(cardRef.dataset.id);
});


