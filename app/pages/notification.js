import 'firebase/messaging';
import firebase from 'firebase/app';
import localforage from 'localforage';

const firebaseConfig = {
    apiKey: "AIzaSyDV7Xnm_vJttN0enxIce83SkYhcBn_uXMQ",
    authDomain: "cryptorobo-11ff6.firebaseapp.com",
    projectId: "cryptorobo-11ff6",
    storageBucket: "cryptorobo-11ff6.appspot.com",
    messagingSenderId: "533075399214",
    appId: "1:533075399214:web:9f06177811a8c8285045bf",
    measurementId: "G-6BBMND45KP"
};

const firebaseCloudMessaging = {
    // Check token on local storage
    tokenInLocalforage: async () => {
        return localforage.getItem('fcm_token');
    },

    // Initialize firebase
    init: async function () {
        if(!firebase.apps.length){
            
            firebase.initializeApp(firebaseConfig);

            try {
                const messaging = firebase.messaging();
                const tokenInLocalForage = await this.tokenInLocalforage();
            
                //if FCM token is already there just return the token
                if(tokenInLocalForage !== null) {
                    return tokenInLocalForage;
                }

                //requesting notification permission from browser
                const status = await Notification.requestPermission();
                if(status && status === 'granted') {
                    //getting token from FCM
                    const fcm_token = await messaging.getToken();
                    if (fcm_token) {
                        //setting FCM token in indexed db using localforage
                        localforage.setItem('fcm_token', fcm_token);
                        console.log('fcm token:', fcm_token);
                        //return the FCM token after saving it
                        return fcm_token;
                    }
                }
            } catch (error) {
                console.error(error);
                return null;
            }
        }
    },
};

export {
    firebaseCloudMessaging
};