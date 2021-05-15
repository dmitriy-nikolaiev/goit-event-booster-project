import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBR98LyVBl1yvrp4_hzST_--Ipdwc_Ugw8',
  authDomain: 'event-booster-f001e.firebaseapp.com',
  projectId: 'event-booster-f001e',
  storageBucket: 'event-booster-f001e.appspot.com',
  messagingSenderId: '988399991894',
  appId: '1:988399991894:web:1bb0c32ef6a59b01600ff7',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Get element
const logInModalDivRef = document.querySelector('.log-in-modal');
const signUpModalDivRef = document.querySelector('.sign-up-modal');
const persAccModalDivRef = document.querySelector('.pers-acc-modal');

const persAccCloseBttnRef = document.querySelector('.pers-acc__close-bttn');
const persAccOverlayRef = document.querySelector('.pers-acc__overlay');
const persAccLogOutBttnRef = document.querySelector('.pers-acc__out-bttn');

const logInLinkBttnRef = document.querySelector('.acc-bttn');
const logInMailRef = document.getElementById('logInMail');
const logInPasswordRef = document.getElementById('logInPassword');
const logInBttnRef = document.querySelector('.log-in__submit-bttn');

const signUpMailRef = document.getElementById('signUpMail');
const signUpPasswordRef = document.getElementById('signUpPassword');
const signUpBttnRef = document.querySelector('.sign-up__submit-bttn');

logInBttnRef.addEventListener('click', e => {
  e.preventDefault();
  const mail = logInMailRef.value;
  const password = logInPasswordRef.value;
  const auth = firebase.auth();
  // Sign in
  const promise = auth.signInWithEmailAndPassword(mail, password);
  promise.catch(e => console.log(e.message));
  promise.then(e => {
    location.reload();
    return false;
  });
});

signUpBttnRef.addEventListener('click', e => {
  e.preventDefault();
  const mail = signUpMailRef.value;
  const password = signUpPasswordRef.value;
  const auth = firebase.auth();
  // Sign in
  const promise = auth.createUserWithEmailAndPassword(mail, password);
  promise.catch(e => console.log(e.message));
  promise.then(e => {
    location.reload();
    return false;
  });
});

persAccLogOutBttnRef.addEventListener('click', e => {
  firebase.auth().signOut();
  location.reload();
  return false;
});

firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    console.log(firebaseUser);
    logInLinkBttnRef.innerHTML = 'Account';
    logInLinkBttnRef.addEventListener('click', insertAccModal);
    persAccOverlayRef.addEventListener('click', onBackDropClick);
    persAccCloseBttnRef.addEventListener('click', closeModal);
  } else {
    console.log('not logged in');
    logInLinkBttnRef.innerHTML = 'Log in';
  }
});

function insertAccModal() {
  logInModalDivRef.classList.remove('is-open');
  signUpModalDivRef.classList.remove('is-open');
  window.addEventListener('keydown', onPressEsc);
  persAccModalDivRef.classList.add('is-open');
}
function closeModal() {
  window.removeEventListener('keydown', onPressEsc);
  persAccModalDivRef.classList.remove('is-open');
}
function onBackDropClick(event) {
  if (event.target === event.currentTarget) {
    closeModal();
  }
}
function onPressEsc(event) {
  if (event.code === 'Escape') {
    closeModal();
  }
}
