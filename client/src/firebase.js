import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCxUnCna1mH9aQS96I_qMG85nuvxZYpQOI',
  authDomain: 'authentication-f8144.firebaseapp.com',
  projectId: 'authentication-f8144',
  storageBucket: 'authentication-f8144.appspot.com',
  messagingSenderId: '916528595504',
  appId: '1:916528595504:web:58e13fc33db095b99263f5',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// const firebaseConfig = {
//   apiKey: process.env.apiKey,
//   authDomain: process.env.authDomain,
//   projectId: process.env.projectId,
//   storageBucket: process.env.storageBucket,
//   messagingSenderId: process.env.messagingSenderId,
//   appId: process.env.appId,
// };
