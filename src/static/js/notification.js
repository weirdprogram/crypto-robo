// Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

const InitializeMessaging = () => {
    messaging
        .requestPermission()
        .then(()=>{
            console.log("Notification Permission")
            return messaging.getToken()
        })
        .then((token)=>{
            console.log("Token:", token)
            // TODO: show token to html
        })
        .catch((err)=>{
            console.log(err)
        })
}

messaging.onMessage((payload)=>{
    console.log(payload)
})

// New Token Generate
messaging.onTokenRefresh(()=>{
    console.log("Refresh Token")
    messaging.getToken()
        .then((newToken)=>{
            console.log("New Token:", newToken)
        })
        .catch((err)=>{
            console.log(err)
        })
})

InitializeMessaging()