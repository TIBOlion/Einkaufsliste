// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAzaZksGMriLJnbuGcoyHh4-rTdLlQ7BAM",
  authDomain: "einkaufsliste-bc7cf.firebaseapp.com",
  projectId: "einkaufsliste-bc7cf",
  storageBucket: "einkaufsliste-bc7cf.firebasestorage.app",
  messagingSenderId: "270069108055",
  appId: "1:270069108055:web:d3ec43e28e350db72f0212",
  measurementId: "G-4EM9M7DPR7"
};

// Firebase initialisieren
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// DOM-Elemente
const itemInput = document.getElementById("item-input");
const addButton = document.getElementById("add-button");
const itemsList = document.getElementById("items-list");

// Funktion zum Hinzufügen eines neuen Produkts
addButton.addEventListener('click', () => {
    const newItem = itemInput.value.trim();
    if (newItem) {
        db.ref('items').push(newItem);
        itemInput.value = '';
    }
});

// Funktion zum Auflisten der Produkte und Zuhören auf Änderungen
db.ref('items').on('value', (snapshot) => {
    itemsList.innerHTML = '';
    snapshot.forEach(childSnapshot => {
        const item = childSnapshot.val();
        const li = document.createElement('li');
        li.textContent = item;
        itemsList.appendChild(li);
    });
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);