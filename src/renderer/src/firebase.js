import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAd9wbxJn4unEOkd1zBbnIPd2gmXZWd28w",
  authDomain: "code-wallet-225cc.firebaseapp.com",
  projectId: "code-wallet-225cc",
  storageBucket: "code-wallet-225cc.appspot.com",
  messagingSenderId: "321935319945",
  appId: "1:321935319945:web:1db52b38a2fdafc33e7758",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
