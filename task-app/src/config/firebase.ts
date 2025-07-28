import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAhPln6HdCEg10Ru8YHIWIc3h8uSdmeW7k",
  authDomain: 'taskproject-74200.firebaseapp.com',
  projectId: 'taskproject-74200',
  storageBucket: 'taskproject-74200.appspot.com',
  messagingSenderId: '127722620869',
  appId: '1:127722620869:web:10314b1cc7da4939c32dac',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
