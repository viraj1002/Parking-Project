// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-analytics.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCInesJO087J-x7s2by9GSowIddmgDwuZk",
  authDomain: "smart-parking-87c15.firebaseapp.com",
  databaseURL: "https://smart-parking-87c15-default-rtdb.firebaseio.com",
  projectId: "smart-parking-87c15",
  storageBucket: "smart-parking-87c15.appspot.com",
  messagingSenderId: "427530993449",
  appId: "1:427530993449:web:74cabe50a47a2a2690c138"
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





