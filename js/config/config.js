// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCU6aoGuiBmCp73yiU_Xfc1URv8ZqHn6M4",
    authDomain: "guided-efd44.firebaseapp.com",
    projectId: "guided-efd44",
    storageBucket: "guided-efd44.appspot.com",
    messagingSenderId: "914223813485",
    appId: "1:914223813485:web:fe46a318f4135ee9584064",
    measurementId: "G-SXGSSNCG04"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    // Initialize variables
    const auth = firebase.auth()
    const database = firebase.database()