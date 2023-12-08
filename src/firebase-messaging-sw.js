importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js');
// firebase.initializeApp(environment.firebaseConfig);
firebase.initializeApp({
  apiKey: "AIzaSyBSlrUK75dmgnCb0vdVd1Fr8cea6A9IM14",
  authDomain: "erp-notifications-test.firebaseapp.com",
  projectId: "erp-notifications-test",
  storageBucket: "erp-notifications-test.appspot.com",
  messagingSenderId: "215168582106",
  appId: "1:215168582106:web:ff2230fae873cf0a74c0e3",
  measurementId: "G-KMRBZCT7PJ"
});
const messaging = firebase.messaging();
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
