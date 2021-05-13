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
const modalMailRef = document.getElementById('mail');
const modalPasswordRef = document.getElementById('password');
const modalLogInBttnRef = document.querySelector('.acc-modal__submit-bttn');

modalLogInBttnRef.addEventListener('click', e => {
  e.preventDefault();
  const mail = modalMailRef.value;
  const password = modalPasswordRef.value;
  const auth = firebase.auth();
  // Sign in
  const promise = auth.signInWithEmailAndPassword(mail, password);
  promise.catch(e => console.log(e.message));
});
