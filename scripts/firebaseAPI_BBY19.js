//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
    apiKey: "AIzaSyCEJvicod-9EAOY-09h5VpHLVtOF0VYCRQ",
    authDomain: "teambby19-9bd63.firebaseapp.com",
    projectId: "teambby19-9bd63",
    storageBucket: "teambby19-9bd63.appspot.com",
    messagingSenderId: "983784500725",
    appId: "1:983784500725:web:06669e62471940e10f04bc"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();