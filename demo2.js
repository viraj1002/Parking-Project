// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-analytics.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCRraBhL8tRK0OdoQia0h2iyl0E962qrMs",
    authDomain: "parkingproject-e9f8c.firebaseapp.com",
    databaseURL: "https://parkingproject-e9f8c-default-rtdb.firebaseio.com",
    projectId: "parkingproject-e9f8c",
    storageBucket: "parkingproject-e9f8c.appspot.com",
    messagingSenderId: "301869465154",
    appId: "1:301869465154:web:743ea862a5ba02696bb7db"
  };

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Get a reference to the Realtime Database
const db = getDatabase();

function selectPayment(option) {
  const paymentDetailsDiv = document.getElementById("payment-details");
  paymentDetailsDiv.innerHTML = `Selected Payment Option: ${option}`;
}

document.querySelector("form").addEventListener("submit", function(event) {
  event.preventDefault();

  // Get form data
  const vehicleNumber = document.getElementById("vehicle-number").value;
  const vehicleType = document.getElementById("vehicle-type").value;
  const inTime = document.getElementById("out-time").value;
  const slot = document.getElementById("slot").value;
  const selectedPayment = document.querySelector("input[name='payment-method']:checked");
  const selectedPaymentOption = selectedPayment ? selectedPayment.value : "";

  // Store data in the Realtime Database
  const parkingDataRef = ref(db, "parkingData");
  push(parkingDataRef, {
    vehicleNumber: vehicleNumber,
    vehicleType: vehicleType,
    inTime: inTime,
    slot: slot,
    selectedPaymentOption: selectedPaymentOption, // Store selected payment option
  })
  .then(() => {
    console.log("Data stored successfully.");
  })
  .catch(error => {
    console.error("Error adding data: ", error);
  });
});



// Function to update the UI with data
function updateUI(data) {
  const dataDiv = document.getElementById("data-div");
  const newDataDiv = document.createElement("div");
  newDataDiv.innerHTML = `
    Vehicle Number: ${data.vehicleNumber}<br>
    Vehicle Type: ${data.vehicleType}<br>
    In Time: ${data.inTime}<br>
    Payment Method: ${data.paymentMethod}<br>
    slot: ${data.slot}<br><br>

  `;
  dataDiv.appendChild(newDataDiv);
}



