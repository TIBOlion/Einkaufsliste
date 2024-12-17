const firebaseConfig = {
  apiKey: "AIzaSyAzaZksGMriLJnbuGcoyHh4-rTdLlQ7BAM",
  authDomain: "einkaufsliste-bc7cf.firebaseapp.com",
  projectId: "einkaufsliste-bc7cf",
  storageBucket: "einkaufsliste-bc7cf.firebasestorage.app",
  messagingSenderId: "270069108055",
  appId: "1:270069108055:web:d3ec43e28e350db72f0212",
  measurementId: "G-4EM9M7DPR7"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const itemInput = document.getElementById("item-input");
const addButton = document.getElementById("add-button");
const itemsList = document.getElementById("items-list");

addButton.addEventListener('click', () => {
    const newItem = itemInput.value.trim();
    if (newItem) {
        db.ref('items').push(newItem);
        itemInput.value = '';
    }
});

db.ref('items').on('value', (snapshot) => {
    itemsList.innerHTML = '';
    snapshot.forEach(childSnapshot => {
        const item = childSnapshot.val();
        const li = document.createElement('li');
        li.textContent = item;
        itemsList.appendChild(li);
    });
});
