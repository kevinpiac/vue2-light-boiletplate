/**
 * =============
 * FIREBASE
 * =============
 *
 * Configure the firebase sdk
 */

import Vue from 'vue';
import * as Firebase from 'firebase';
import store from '@/store';

// Get firebase config from env
const config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
};

/**
 * Initialize firebase app
 */
Firebase.initializeApp(config);

// Bind Firebase to Vue.
Vue.$firebase = Firebase;

Object.defineProperty(Vue.prototype, '$firebase', {
  get() {
    return Firebase;
  },
});

/**
 * Update state on firebase state changed
 */
Firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch('auth/login', user);
  }
});

/**
 * Returns the user auth status
 */
const getUserStatus = function () {
  return new Promise((resolve, reject) => {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        store.dispatch('auth/login', user);
        resolve(user.uid);
      } else {
        reject(Error('It broke'));
      }
    });
  });
};

export default getUserStatus;
