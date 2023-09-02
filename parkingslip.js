  // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-database.js";

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
const db = getDatabase();

function updateUI(data) {
  const dataDiv = document.getElementById("data-div");

  if (dataDiv) {
    const newDataDiv = document.createElement("div");
    newDataDiv.innerHTML = `
      Vehicle Number: ${data.vehicleNumber}<br>
      Vehicle Type: ${data.vehicleType}<br>
      In Time: ${data.inTime}<br>
      Payment Method: ${data.selectedPaymentOption}<br>
      Slot: ${data.slot}<br><br>
    `;
    dataDiv.appendChild(newDataDiv);
  } else {
    console.error("data-div element not found.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const parkingDataRef = ref(db, "parkingData");
  onValue(parkingDataRef, snapshot => {
    const data = snapshot.val();
    if (data) {
      const keys = Object.keys(data);
      const lastEnteredKey = keys[keys.length - 1];
      const lastEnteredData = data[lastEnteredKey];
      updateUI(lastEnteredData);
    }
  });
});