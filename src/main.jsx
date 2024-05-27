import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYkeCt4mLXXnzA5u02rUI8mSiS7s8BFaw",
  authDomain: "coderhouse-ecommerce-291cc.firebaseapp.com",
  projectId: "coderhouse-ecommerce-291cc",
  storageBucket: "coderhouse-ecommerce-291cc.appspot.com",
  messagingSenderId: "232101529614",
  appId: "1:232101529614:web:4145292d8ceb852a90145f"
};

// Initialize Firebase
initializeApp(firebaseConfig);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
