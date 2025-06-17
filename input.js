// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js";
import {
  getDatabase, ref, push, set
} from "https://www.gstatic.com/firebasejs/11.9.0/firebase-database.js";
import {
  getAuth, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.9.0/firebase-auth.js";

// Konfigurasi Firebase
const appId = 'default-app-id';
const firebaseConfig = {
  apiKey: "AIzaSyADC13ymwj8_NKLZt8TgxEYEzzw2jYfvjc",
  authDomain: "tugaspraktik9.firebaseapp.com",
  databaseURL: "https://tugaspraktik9-default-rtdb.firebaseio.com",
  projectId: "tugaspraktik9",
  storageBucket: "tugaspraktik9.appspot.com",
  messagingSenderId: "1025237797274",
  appId: "1:1025237797274:web:7c40f6a3ce147f3dbb9223"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

// Elemen form
const showLostFormBtn = document.getElementById('showLostFormBtn');
const lostItemFormSection = document.getElementById('lostItemFormSection');
const laporLostForm = document.getElementById('laporLostForm');

const showFoundFormBtn = document.getElementById('showFoundFormBtn');
const foundItemFormSection = document.getElementById('foundItemFormSection');
const laporFoundForm = document.getElementById('laporFoundForm');

const loadingOverlay = document.getElementById('loadingOverlay');
const messageModal = document.getElementById('messageModal');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');
const modalCloseBtn = document.getElementById('modalCloseBtn');

// Fungsi UI
function showLoading() {
  loadingOverlay.classList.add('show');
}

function hideLoading() {
  loadingOverlay.classList.remove('show');
}

function showMessageModal(title, message) {
  modalTitle.textContent = title;
  modalMessage.textContent = message;
  messageModal.classList.add('show');
}

modalCloseBtn.addEventListener('click', () => {
  messageModal.classList.remove('show');
});

function hideAllForms() {
  if (lostItemFormSection) lostItemFormSection.classList.remove('show-form');
  if (foundItemFormSection) foundItemFormSection.classList.remove('show-form');
}

// Tombol tampil form
if (showLostFormBtn && lostItemFormSection) {
  showLostFormBtn.addEventListener('click', () => {
    hideAllForms();
    lostItemFormSection.classList.toggle('show-form');
  });
}

if (showFoundFormBtn && foundItemFormSection) {
  showFoundFormBtn.addEventListener('click', () => {
    hideAllForms();
    foundItemFormSection.classList.toggle('show-form');
  });
}

// Kirim laporan ke Firebase
async function submitReportToFirebase(formElement, type) {
  showLoading();
  try {
    const prefix = type === 'hilang' ? 'lost' : 'found';

    const email = formElement.querySelector(`#${prefix}_email`).value;
    const nama = formElement.querySelector(`#${prefix}_nama`).value;
    const nohp = formElement.querySelector(`#${prefix}_nohp`).value;
    const barang = formElement.querySelector(`#${prefix}_barang`).value;
    const deskripsi = formElement.querySelector(`#${prefix}_deskripsi`).value;
    const tempat = formElement.querySelector(`#${prefix}_tempat`).value;
    const waktu = formElement.querySelector(`#${prefix}_waktu`).value;

    const formData = {
      tipe: type,
      email,
      nama,
      nohp,
      barang,
      deskripsi,
      tempat,
      waktu,
      timestamp: Date.now(),
      disetujui: false
    };

    const newReportRef = push(ref(db, `artifacts/${appId}/public/data/lostAndFound`));
    await set(newReportRef, formData);

    showMessageModal('Sukses!', 'Laporan Anda berhasil dikirim dan menunggu persetujuan admin.');
    formElement.reset();
    hideAllForms();
  } catch (error) {
    console.error("Error submitting report:", error);
    showMessageModal('Error!', 'Terjadi kesalahan saat mengirim laporan: ' + error.message);
  } finally {
    hideLoading();
  }
}

// Kirim laporan hilang
if (laporLostForm) {
  laporLostForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) {
      showMessageModal('Login Diperlukan', 'Silakan login terlebih dahulu untuk mengirim laporan.');
      return;
    }
    await submitReportToFirebase(laporLostForm, 'hilang');
  });
}

// Kirim laporan temuan
if (laporFoundForm) {
  laporFoundForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) {
      showMessageModal('Login Diperlukan', 'Silakan login terlebih dahulu untuk mengirim laporan.');
      return;
    }
    await submitReportToFirebase(laporFoundForm, 'temuan');
  });
}
