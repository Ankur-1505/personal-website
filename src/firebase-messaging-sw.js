importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');


firebase.initializeApp({
  'messagingSenderId': '624648720335'
});

const messaging = firebase.messaging();

messaging.usePublicVapidKey("BDey1pUU_jCAL8HR-062WocoKVO7J0V21lA28dUlISub4I5zEH-uOiOif3_4_AFCTGgTrFNEyk6_hvtgBMNQ3v0");

messaging.onMessage(function(payload) {
  console.log('Message received. ', payload);
  // ...
});

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  var notificationTitle = 'Background Message Title';
  var notificationOptions = {
    body: 'Background Message body.',
    icon: 'https://icons8.com/icon/62/secured-letter',
    click_action : 'https://websiteproject-sanketnaik99.firebaseapp.com/'
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});