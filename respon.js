import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyADC13ymwj8_NKLZt8TgxEYEzzw2jYfvjc",
  authDomain: "tugaspraktik9.firebaseapp.com",
  databaseURL: "https://tugaspraktik9-default-rtdb.firebaseio.com",
  projectId: "tugaspraktik9",
  storageBucket: "tugaspraktik9.appspot.com",
  messagingSenderId: "1025237797274",
  appId: "1:1025237797274:web:7c40f6a3ce147f3dbb9223"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

let allItems = [];

window.addEventListener("DOMContentLoaded", () => {
  const dataRef = ref(db, `artifacts/default-app-id/public/data/lostAndFound`);
  onValue(dataRef, (snapshot) => {
    const data = snapshot.val();
    allItems = [];

    if (data) {
      allItems = Object.keys(data)
        .map(key => ({ id: key, ...data[key] }))
        .filter(item => item.disetujui);
    }

    filterItems('hilang'); // Default tampilan awal
  });
});

window.filterItems = function(type) {
  const listEl = document.getElementById("publicItemsList");
  if (!listEl) return;

  listEl.innerHTML = "";

  const filtered = allItems.filter(item => item.tipe === type);

  if (filtered.length === 0) {
    listEl.innerHTML = `<p>Tidak ada barang ${type === 'hilang' ? 'hilang' : 'temuan'} yang tersedia.</p>`;
    return;
  }

  filtered.forEach(item => {
    const div = document.createElement("div");
    div.className = `item-card ${item.tipe}-item`;
    div.innerHTML = `
      <div class="info">
        <h3>${item.tipe === 'hilang' ? 'Barang Hilang' : 'Barang Temuan'}: ${item.barang}</h3>
        <p><strong>Email:</strong> ${item.email}</p>
        <p><strong>Nama:</strong> ${item.nama}</p>
        <p><strong>No HP:</strong> ${item.nohp}</p>
        <p><strong>Deskripsi:</strong> ${item.deskripsi}</p>
        <p><strong>Tempat:</strong> ${item.tempat}</p>
        <p><strong>Waktu:</strong> ${item.waktu}</p>
      </div>
    `;
    listEl.appendChild(div);
  });
};
