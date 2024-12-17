import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getDatabase, ref, push, onValue } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js';
import { firebaseConfig } from './app.js';

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const itemInput = document.getElementById("item-input");
const addButton = document.getElementById("add-button");
const itemsList = document.getElementById("items-list");

addButton.addEventListener('click', () => {
    const newItem = itemInput.value.trim();
    if (newItem) {
        push(ref(db, 'items'), newItem);
        itemInput.value = '';
    }
});

onValue(ref(db, 'items'), (snapshot) => {
    itemsList.innerHTML = '';
    snapshot.forEach(childSnapshot => {
        const item = childSnapshot.val();
        const li = document.createElement('li');
        li.textContent = item;
        itemsList.appendChild(li);
    });
});
