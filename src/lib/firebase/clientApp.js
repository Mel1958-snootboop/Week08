"use client";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Use automatic initialization
// https://firebase.google.com/docs/app-hosting/firebase-sdks#initialize-with-no-arguments

const firebaseConfig = {
  apiKey: "AIzaSyBCxn9L4T1CDiqIzzDStaVSQ959gGMrLSE",
  authDomain: "friendlyeats-codelab-2c405.firebaseapp.com",
  projectId: "friendlyeats-codelab-2c405",
  storageBucket: "friendlyeats-codelab-2c405.firebasestorage.app",
  messagingSenderId: "877444130324",
  appId: "1:877444130324:web:b6c53118609433b08ca901",
  measurementId: "G-CSQS7JTT30"
};


export const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
