// src/lib/firebase/auth.js
// Firebase authentication helpers
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
  onIdTokenChanged as _onIdTokenChanged,
} from "firebase/auth";

// Firebase client app instance
import { auth } from "@/src/lib/firebase/clientApp";

// Listen to authentication state changes
export function onAuthStateChanged(cb) {
  return _onAuthStateChanged(auth, cb);
}

// Listen to ID token changes
export function onIdTokenChanged(cb) {
  return _onIdTokenChanged(auth, cb);
}

// Sign in with Google using a popup
export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Error signing in with Google", error);
  }
}

// Sign out the current user
export async function signOut() {
  try {
    return auth.signOut();
  } catch (error) {
    console.error("Error signing out with Google", error);
  }
}