import { initializeApp } from 'firebase/app';
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA7aZD2xdYz0Q_rMaPHSmuB2jmc9BZD7g4',
  authDomain: 'graphiql-app-8eced.firebaseapp.com',
  projectId: 'graphiql-app-8eced',
  storageBucket: 'graphiql-app-8eced.appspot.com',
  messagingSenderId: '218521179630',
  appId: '1:218521179630:web:2edf146e572007ae296aff',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, userID: response?.user?.uid, error: '' };
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err);
      return { success: false, error: err.message };
    } else {
      console.error(err);
      return { success: false, error: 'An unknown error occurred' };
    }
  }
};

const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string,
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    });
    return { success: true, error: '' };
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err);
      return { success: false, error: err.message };
    } else {
      console.error(err);
      return { success: false, error: 'An unknown error occurred' };
    }
  }
};

const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert('Password reset link sent!');
  } catch (err) {
    console.error(err);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
