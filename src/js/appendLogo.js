import logo from '../templates/logo.hbs';

const logoContainer = document.body;

function logoAppend() {
  logoContainer.insertAdjacentHTML('afterbegin', logo());
}
logoAppend();
