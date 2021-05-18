import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { alert, info, error } from '@pnotify/core';

function ShowInfo() {
  info({
    text: 'Try again!',
    delay: 2000,
  });
}

function showError() {
  error({
    text: 'Error!',
    delay: 2000,
  });
}
function showAlert() {
  alert({
    text: 'Please clarify your request!',
    delay: 2000,
  });
}

export { showAlert, showError, ShowInfo };
