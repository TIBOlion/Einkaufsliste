import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getDatabase, ref, push, onValue, remove } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js';
import { firebaseConfig } from './app.js';

// Firebase initialisieren
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const itemInput = document.getElementById("item-input");
const itemsList = document.getElementById("items-list");

itemInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const newItem = itemInput.value.trim();
        if (newItem.startsWith('/delete-')) {
            const itemToDelete = newItem.replace('/delete-', '').trim();
            deleteItem(itemToDelete);
        } else if (newItem) {
            addItem(newItem);
        }
        itemInput.value = '';
    }
});

function addItem(newItem) {
    push(ref(db, 'items'), newItem);
}

function deleteItem(itemToDelete) {
    onValue(ref(db, 'items'), (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const itemKey = childSnapshot.key;
            const itemValue = childSnapshot.val();
            if (itemValue === itemToDelete) {
                remove(ref(db, `items/${itemKey}`));
            }
        });
    });
}

onValue(ref(db, 'items'), (snapshot) => {
    itemsList.innerHTML = '';
    snapshot.forEach((childSnapshot) => {
        const item = childSnapshot.val();
        const li = document.createElement('li');
        li.textContent = item;
        itemsList.appendChild(li);
    });
});
