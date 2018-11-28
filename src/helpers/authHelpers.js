import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';


const checkLoginStatus = (initializeNeedsPage) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $('#auth').hide();
      $('#navbar-button-logout').show();
      initializeNeedsPage();
    } else {
      $('#auth').show();
      $('#navbar-button-logout').hide();
    }
  });
};

const getCurrentUid = () => firebase.auth().currentUser.uid;

export default { checkLoginStatus, getCurrentUid };
