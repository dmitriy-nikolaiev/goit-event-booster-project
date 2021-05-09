import logo from '../templates/logo.hbs';

const logoContainer = document.querySelector('body');

function logoAppend() {
  logoContainer.insertAdjacentHTML('afterbegin', logo());
}
logoAppend();
