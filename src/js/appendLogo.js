import logo from '../templates/logo.hbs';

const logoContainer = document.querySelector('main');

function logoAppend() {
  logoContainer.insertAdjacentHTML('afterbegin', logo());
}
logoAppend();
