# 🧠 Static Quiz Application (State Tracking Module)

Aplikasi kuis pilihan ganda interaktif satu halaman menggunakan **Vanilla JavaScript**. Aplikasi ini dirancang untuk mengajarkan bagaimana mengelola *data state* dinamis di memori web peramban (melacak nomor indeks soal aktif dan akumulasi skor) serta merender elemen UI berdasarkan *Array of Objects*.

Sangat ideal bagi siswa SMK Jurusan RPL untuk memahami teknik pembuatan struktur data kuis terpusat (*Centralized Data Structure*).

---

## 🚀 Fitur Utama

* **Centralized Array of Objects:** Seluruh pustaka pertanyaan, pilihan ganda, dan kunci jawaban dikemas rapi dalam satu variabel array terstruktur sehingga sangat mudah ditambah di masa depan.
* **Component Component Lock Architecture:** Begitu salah satu opsi jawaban diklik, properti `.disabled = true` dipasang secara instan pada semua tombol guna mencegah kecurangan pengiriman data ganda.
* **Smart Correct-Answer Revealer:** Jika pengguna salah memilih jawaban, algoritma JavaScript akan otomatis melacak dan menyuntikkan kelas warna `.correct` pada jawaban yang semestinya benar sebagai bahan edukasi langsung.
* **Linear Progress Percentage Tracker:** Ukuran lebar bar indikator CSS (`width`) dihitung secara matematika dinamis melalui pembagian nomor soal berjalan terhadap panjang total kapasitas array soal.

---

## 📂 Struktur Folder Proyek

```text
├── index.html       # Kerangka boks kuis, pengukur bar kemajuan, penampung opsi, dan panel skor akhir
├── style.css        # Skema penegasan visual (merah/hijau), layout grid boks pop art, dan animasi pop-in
└── script.js        # Struktur data array kuis, pelacak state indeks, dan mesin interseptor jawaban
