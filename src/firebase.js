import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAdJKzmzN472Ux0tDwRw1as7sQGIArUkm4",
  authDomain: "messenger-9b12b.firebaseapp.com",
  databaseURL: "https://messenger-9b12b-default-rtdb.firebaseio.com",
  projectId: "messenger-9b12b",
  storageBucket: "messenger-9b12b.appspot.com",
  messagingSenderId: "870427118899",
  appId: "1:870427118899:web:2f6ec9bee0c862bb4e4246"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export default firebase
