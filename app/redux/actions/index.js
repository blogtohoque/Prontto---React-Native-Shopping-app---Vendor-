import * as homeActions from './home'
import * as authActions from './auth'
import * as firebase from "firebase";

firebase.initializeApp({
  apiKey: "AIzaSyB-KPQpVdbY9ztn31RxYThhoVZptYUC2S4",
  authDomain: "prontto-retail.firebaseapp.com",
  databaseURL: "https://prontto-retail.firebaseio.com",
  projectId: "prontto-retail",
  storageBucket: "prontto-retail.appspot.com",
  messagingSenderId: "671546443265"
});

export const ActionCreators = Object.assign({},
  homeActions,
  authActions
);
