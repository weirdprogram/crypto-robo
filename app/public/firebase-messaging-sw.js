importScripts('https://www.gstatic.com/firebasejs/8.2.3/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.2.3/firebase-messaging.js')

const firebaseConfig = {
    apiKey: "AIzaSyDV7Xnm_vJttN0enxIce83SkYhcBn_uXMQ",
    authDomain: "cryptorobo-11ff6.firebaseapp.com",
    projectId: "cryptorobo-11ff6",
    storageBucket: "cryptorobo-11ff6.appspot.com",
    messagingSenderId: "533075399214",
    appId: "1:533075399214:web:9f06177811a8c8285045bf",
    measurementId: "G-6BBMND45KP"
  };


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    firebase.messaging();
    
    //background notifications will be received here
    firebase.messaging().setBackgroundMessageHandler((payload) => {

        const notificationTitle = payload.notification.title;
        const notificationOptions = {
            body: payload.notification.body,
            icon: payload.notification.icon,
            click_action: payload.notification.click_action
        };

        return self.registration.showNotification(notificationTitle,
            notificationOptions);
    });
}

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    clients.openWindow(event.notification.click_action);
});