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
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler((payload)=>{
    console.log(payload)
})