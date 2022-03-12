import firebase from "firebase/compat/app"
import "firebase/compat/auth"

const app = firebase.initializeApp({
  apiKey: "AIzaSyBpmTzHzO_-S1NmLtYZGT_wnI05-9go_UA",
  authDomain: "teampro-ccb5d.firebaseapp.com",
  projectId: "teampro-ccb5d",
  storageBucket: "teampro-ccb5d.appspot.com",
  messagingSenderId: "135141015556",
  appId: "1:135141015556:web:d78bdd1b4dab7d1bb4b551"
})

export const auth = app.auth()
export default app
