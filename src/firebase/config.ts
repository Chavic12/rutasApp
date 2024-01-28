// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBmjlAyuIxRQk-wi5u6ey2Zu-9y3c9Rjek',
  authDomain: 'ruta-app-a6117.firebaseapp.com',
  projectId: 'ruta-app-a6117',
  storageBucket: 'ruta-app-a6117.appspot.com',
  messagingSenderId: '515376685392',
  appId: '1:515376685392:web:f5f6021b2d9578696a0c55',
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
// export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
export const auth = initializeAuth(FirebaseApp, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
