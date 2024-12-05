// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQku7oAzjB_k0DFSdgo-VnCZ1ucx6WOtg",
  authDomain: "probono-1e122.firebaseapp.com",
  projectId: "probono-1e122",
  storageBucket: "probono-1e122.firebasestorage.app",
  messagingSenderId: "12941440789",
  appId: "1:12941440789:web:5e2ea09e41c30ebc9b5b1c",
  measurementId: "G-SY9216VKQ4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Инициализация Firestore
const db = getFirestore(app);

// Экспортируем db, чтобы использовать в других файлах
export { db, collection, addDoc, getDocs, deleteDoc, doc };
