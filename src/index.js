import firebase from 'firebase/app';
import './index.scss';
import 'bootstrap';

import apiKeys from '../db/apiKeys.json';
import createNavbar from './components/Navbar/navbar';
import loginButton from './components/Auth/auth';
import checkLoginStatus from './helpers/authHelpers';

const initializeApp = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  createNavbar();
  checkLoginStatus();
  loginButton();
};

initializeApp();
