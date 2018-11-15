import firebase from 'firebase/app';
import './index.scss';
import 'bootstrap';

import apiKeys from '../db/apiKeys.json';
import loginButton from './components/Auth/auth';
import createNavbar from './components/Navbar/navbar';

const initializeApp = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  createNavbar();
  loginButton();
};

initializeApp();
