import hero from '../templates/hero.hbs';

const heroContainer = document.querySelector('.hero');

function heroAppend() {
  heroContainer.insertAdjacentHTML('beforeend', hero());
  // console.log(hero);
}
heroAppend();
