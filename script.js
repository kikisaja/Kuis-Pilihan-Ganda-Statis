// --- 1. STRUKTUR DATA PERTANYAAN KUIS (ARRAY OF OBJECTS) ---
const KUMPULAN_SOAL = [
    {
        pertanyaan: "Manakah di bawah ini yang merupakan ekstensi file standar untuk stylesheet CSS?",
        pilihan: [".html", ".js", ".css", ".xml"],
        jawabanBenar: 2 // Merujuk pada indeks ke-2 dari array pilihan yaitu ".css"
    },
    {
        pertanyaan: "Fungsi bawaan JavaScript manakah yang digunakan untuk menampilkan dialog peringatan popup?",
        pilihan: ["console.log()", "alert()", "prompt()", "document.write()"],
        jawabanBenar: 1 // Merujuk pada indeks ke-1 yaitu "alert()"
    },
    {
        pertanyaan: "Di dalam struktur HTML, di manakah lokasi terbaik untuk menautkan file CSS eksternal?",
        pilihan: ["Di dalam tag <head>", "Di bagian paling bawah <footer>", "Di dalam tag <body>", "Di luar tag <html>"],
        jawabanBenar: 0 // Merujuk pada indeks ke-0 yaitu "Di dalam tag <head>"
    }
];

// --- 2. VARIABEL STATE / PENANDA STATUS INTERNAL ---
let indeksSoalSekarang = 0;
let totalSkor = 0;

// --- 3. SELEKSI ELEMEN DOM ---
const boxKuis = document.getElementById("quiz-box");
const boxHasil = document.getElementById("result-box");

const elNumSoal = document.getElementById("current-question-num");
const elLiveSkor = document.getElementById("live-score");
const elBarFill = document.getElementById("bar-fill");
const elPertanyaan = document.getElementById("text-pertanyaan");
const elWadahOpsi = document.getElementById("wrapper-opsi");
const btnNext = document.getElementById("btn-next");

const elSkorAkhir = document.getElementById("final-score");
const elPesanHasil = document.getElementById("result-message");
const btnRestart = document.getElementById("btn-restart");

// --- 4. FUNGSI LOGIKA UTAMA ---

// A. Fungsi Memuat Soal ke Layar
function muatPertanyaan() {
    // Sembunyikan tombol 'Next' di awal soal baru
    btnNext.classList.add("hidden");
    elWadahOpsi.innerHTML = "";

    // Ambil objek data soal aktif berdasarkan indeks nomor berjalan
    const dataSoalAktif = KUMPULAN_SOAL[indeksSoalSekarang];

    // Pembaruan Teks Informasi Header & Progress Bar
    elNumSoal.innerText = indeksSoalSekarang + 1;
    elLiveSkor.innerText = totalSkor;
    
    const persentaseProgress = ((indeksSoalSekarang + 1) / KUMPULAN_SOAL.length) * 100;
    elBarFill.style.width = `${persentaseProgress}%`;

    // Tampilkan Teks Soal
    elPertanyaan.innerText = dataSoalAktif.pertanyaan;

    // Loop data pilihan jawaban untuk dicetak menjadi elemen tombol <button>
    dataSoalAktif.pilihan.forEach((teksOpsi, indeksOpsi) => {
        const tombolOpsi = document.createElement("button");
        tombolOpsi.classList.add("btn-option");
        tombolOpsi.innerText = teksOpsi;
        
        // Pasang event klik pada tombol pilihan jawaban
        tombolOpsi.addEventListener("click", () => prosesCekJawaban(indeksOpsi, tombolOpsi));
        
        elWadahOpsi.appendChild(tombolOpsi);
    });
}

// B. Fungsi Memeriksa Jawaban Benar / Salah
function prosesCekJawaban(indeksTerpilih, tombolTerpilih) {
    const dataSoalAktif = KUMPULAN_SOAL[indeksSoalSekarang];
    const semuaTombolOpsi = elWadahOpsi.querySelectorAll(".btn-option");

    // Kunci seluruh tombol agar user tidak bisa mengganti jawaban atau klik berulang kali
    semuaTombolOpsi.forEach(tombol => tombol.disabled = true);

    // Bandingkan indeks tombol yang diklik dengan indeks jawabanBenar di database
    if (indeksTerpilih === dataSoalAktif.jawabanBenar) {
        // Jika Benar: beri warna hijau dan tambahkan skor (+100)
        tombolTerpilih.classList.add("correct");
        totalSkor += 100;
        elLiveSkor.innerText = totalSkor;
    } else {
        // Jika Salah: beri warna merah pada tombol yang diklik...
        tombolTerpilih.classList.add("wrong");
        // ...lalu cari dan beri warna hijau pada jawaban yang seharusnya benar
        semuaTombolOpsi[dataSoalAktif.jawabanBenar].classList.add("correct");
    }

    // Munculkan tombol 'Next' setelah user menjawab
    btnNext.classList.remove("hidden");
}

// C. Fungsi Menggeser ke Soal Berikutnya / Mengakhiri Kuis
function navigasiKeSoalBerikutnya() {
    indeksSoalSekarang++;

    // Jika masih ada soal tersisa di dalam array
    if (indeksSoalSekarang < KUMPULAN_SOAL.length) {
        muatPertanyaan();
    } else {
        // Jika soal sudah habis semua, panggil panel hasil akhir
        tampilkanPanelHasil();
    }
}

// D. Fungsi Menampilkan Ringkasan Hasil Skor Akhir
function tampilkanPanelHasil() {
    boxKuis.classList.add("hidden");
    boxHasil.classList.remove("hidden");
    elSkorAkhir.innerText = totalSkor;

    // Berikan pesan apresiasi yang bervariasi tergantung total skor akhir
    const skorMaksimal = KUMPULAN_SOAL.length * 100;
    if (totalSkor === skorMaksimal) {
        elPesanHasil.innerText = "Sempurna! Kamu menguasai materi IT dasar dengan sangat baik 🌟🏆";
    } else if (totalSkor > 0) {
        elPesanHasil.innerText = "Kerja bagus! Tingkatkan lagi belajarmu agar mendapat nilai sempurna 💪";
    } else {
        elPesanHasil.innerText = "Jangan berkecil hati. Ayo coba lagi dan baca materi kelas SMK kembali! 📚📖";
    }
}

// E. Fungsi Memulai Ulang Kuis dari Awal (Reset)
function resetKuis() {
    indeksSoalSekarang = 0;
    totalSkor = 0;
    boxHasil.classList.add("hidden");
    boxKuis.classList.remove("hidden");
    muatPertanyaan();
}

// --- 5. BINDING EVENT LISTENERS ---
btnNext.addEventListener("click", navigasiKeSoalBerikutnya);
btnRestart.addEventListener("click", resetKuis);

// Jalankan kuis otomatis saat file web dimuat pertama kali di browser
document.addEventListener("DOMContentLoaded", muatPertanyaan);
