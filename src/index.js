import firebase from 'firebase/app';
import './index.scss';
import 'bootstrap';
import $ from 'jquery';

import apiKeys from '../db/apiKeys.json';
import createNavbar from './components/Navbar/navbar';

import loginButton from './components/Auth/auth';
import authHelpers from './helpers/authHelpers';
import needsDoingPage from './components/NeedsDoingPage/needsDoing';
import buildAddForm from './components/AddEditTasks/addEditTasks';

const initializeApp = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  createNavbar();
  authHelpers.checkLoginStatus(needsDoingPage);
  loginButton();
  $('#newTaskButton').on('click', buildAddForm);
};

initializeApp();
