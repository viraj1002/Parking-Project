import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getDatabase, ref, onChildAdded } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-database.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCRraBhL8tRK0OdoQia0h2iyl0E962qrMs",
    authDomain: "parkingproject-e9f8c.firebaseapp.com",
    databaseURL: "https://parkingproject-e9f8c-default-rtdb.firebaseio.com",
    projectId: "parkingproject-e9f8c",
    storageBucket: "parkingproject-e9f8c.appspot.com",
    messagingSenderId: "301869465154",
    appId: "1:301869465154:web:743ea862a5ba02696bb7db"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Reference to the Firebase database
const database = getDatabase(firebaseApp);
const parkingSlipRef = ref(database, 'parkingSlips');

// Function to update input values
function updateInputValues(data) {
    document.querySelector('.vehicle-number-input').value = data.vehicleNumber || '';
    document.querySelector('.vehicle-type-input').value = data.vehicleType || '';
    document.querySelector('.in-time-input').value = data.inTime || '';
    document.querySelector('.slot-input').value = data.slot || '';
    document.querySelector('.payment-method-input').value = data.paymentMethod || '';
}

// Function to update info values
function updateInfoValues(data) {
    document.querySelector('.vehicle-number').textContent = data.vehicleNumber || 'N/A';
    document.querySelector('.vehicle-type').textContent = data.vehicleType || 'N/A';
    document.querySelector('.in-time').textContent = data.inTime || 'N/A';
    document.querySelector('.slot').textContent = data.slot || 'N/A';
    document.querySelector('.payment-method').textContent = data.paymentMethod || 'N/A';

    // Update input values with the new data
    updateInputValues(data);
}

// Attach a listener to read the most recent data
onChildAdded(parkingSlipRef, (snapshot) => {
    const newParkingSlip = snapshot.val();

    // Update info values with the new data
    updateInfoValues(newParkingSlip);
});
