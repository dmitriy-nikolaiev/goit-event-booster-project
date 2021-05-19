import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { alert, info, error } from '@pnotify/core';

function ShowInfo() {
  info({
    text: 'Please clarify your request!',

    delay: 2000,
    addClass: 'fix-info',
    width: '300px',
    styling: 'material',
  });
}

function showError() {
  error({
    text: 'Error on request!',
    delay: 2000,
    addClass: 'fix-error',
    width: '300px',
    styling: 'material',
  });
}
function showAlert() {
  alert({
    type: 'notice',
    text: 'Nothing found!',
    delay: 2000,
    addClass: 'fix-alert',
    width: '300px',
    styling: 'material',
  });
}

export { showAlert, showError, ShowInfo };
