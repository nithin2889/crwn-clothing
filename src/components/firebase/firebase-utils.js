import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAESVac1VAVetJuYDCwEdQw4GTrSWTVrnk",
  authDomain: "crwn-clothing-db-6403a.firebaseapp.com",
  databaseURL: "https://crwn-clothing-db-6403a.firebaseio.com",
  projectId: "crwn-clothing-db-6403a",
  storageBucket: "crwn-clothing-db-6403a.appspot.com",
  messagingSenderId: "77302222100",
  appId: "1:77302222100:web:a85e499bf9f1b24c098601",
  measurementId: "G-2J26TT9Z0V",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
