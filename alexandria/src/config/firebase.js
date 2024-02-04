// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWhcDsFIgvGCLkEVczRLIxPPJ7zE-8bKE",
  authDomain: "alexandria-a4b39.firebaseapp.com",
  projectId: "alexandria-a4b39",
  storageBucket: "alexandria-a4b39.appspot.com",
  messagingSenderId: "846611360206",
  appId: "1:846611360206:web:2e1ade90dc8ca3229d239f",
  measurementId: "G-XHQ93MPRC0",
};

// Initialize Firebase
const fb = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// const auth = getAuth();
// export { fb, auth };
export default fb;
