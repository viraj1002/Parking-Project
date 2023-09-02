import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-database.js";

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

function updateTable(data) {
  const dataBody = document.getElementById("dataBody");

  if (dataBody) {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${data.vehicleNumber}</td>
      <td>${data.vehicleType}</td>
      <td>${data.inTime}</td>
      <td>${data.selectedPaymentOption}</td>
      <td>${data.slot}</td>
    `;

    dataBody.appendChild(newRow);
  } else {
    console.error("dataBody element not found.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const parkingDataRef = ref(db, "parkingData");
  onValue(parkingDataRef, snapshot => {
    const data = snapshot.val();
    if (data) {
      Object.values(data).forEach(entry => {
        updateTable(entry);
      });
    }
  });
});
