# Tugas Praktikum Pertemuan 6 - Mobile Programming

**Nama**: Farel Anwar
**NIM**: 2430511047
**Program Studi**: Teknik Informatika
**Universitas**: Universitas Muhammadiyah Sukabumi

## Tentang Aplikasi
Proyek ini adalah **Diary App** berbasis React Native dan Expo Router. Aplikasi ini memungkinkan pengguna untuk menulis catatan harian, mencari entri, memfilter berdasarkan mood (perasaan), serta menyukai (like) catatan tertentu yang otomatis masuk ke tab Favorites.

## Cara Menjalankan Project
1. Pastikan komputer sudah terinstal **Node.js**.
2. Buka terminal (seperti Git Bash atau terminal bawaan VS Code) lalu arahkan ke dalam folder `diary-app6`.
3. Instal semua dependensi yang dibutuhkan dengan perintah:

   npm install



4. Jalankan aplikasinya dengan perintah:

npx expo start -c




5. Tekan tombol `a` di terminal untuk membuka aplikasi di Android Emulator, atau *scan* QR code yang muncul menggunakan aplikasi **Expo Go** di HP.

## Penjelasan 5 Hooks yang Digunakan

| Hook | Data / Logika | Dependency Array | Kenapa Menggunakan Hook Ini? |
| :--- | :--- | :--- | :--- |
| **`useState`** | **Input**: Teks kosong `''`<br>**Output**: State data & fungsi pengubahnya | *(Tidak pakai array)* | Dipakai untuk menyimpan data sementara yang diinputkan pengguna. Contohnya, saat pengguna mengetik teks di kolom pencarian atau mengisi form catatan harian baru, datanya disimpan di sini agar UI langsung *update*. |
| **`useContext`** | **Input**: File `DiaryContext`<br>**Output**: Data global (daftar diary & status *like*) | *(Tidak pakai array)* | Supaya data utama seperti daftar *diary* dan status tombol *like* bisa dibagikan dan diakses oleh semua halaman (Home, Detail, Favorites) secara langsung, tanpa harus repot mengoper data satu per satu dari halaman induk ke anak (*prop drilling*). |
| **`useMemo`** | **Input**: Rumus filter pencarian<br>**Output**: Daftar hasil pencarian baru | `[entries, debouncedQuery, moodFilter]` | Berfungsi sebagai pengingat hasil saringan data. Kalau daftar *diary*, kata kunci pencarian, atau filter *mood* tidak berubah, aplikasi tidak perlu repot-repot menghitung ulang pencariannya dari awal. Ini bikin aplikasi anti-lemot. |
| **`useEffect`** | **Input**: Fungsi *timer* (*setTimeout*) 350ms & fungsi *cleanup* | `[query]` | Dipakai untuk memberi jeda (*debounce*) saat pengguna mengetik di kolom pencarian. Jadi, aplikasi tidak langsung memfilter data setiap ada 1 huruf yang diketik (yang bisa bikin *nge-lag*), melainkan menunggu pengguna selesai mengetik sejenak (350ms). Fungsi *cleanup*-nya bertugas mereset *timer* kalau pengguna masih lanjut mengetik. |
| **`useCallback`** | **Input**: Fungsi pindah halaman (`openDetail`)<br>**Output**: Referensi memori fungsi yang stabil | `[router]` | Digunakan untuk "membungkus" fungsi agar tidak terus-terusan dibuat ulang setiap kali halamannya dimuat ulang (*re-render*). Dengan begitu, komponen anak yang menerima fungsi ini (seperti `DiaryCard`) tidak ikut-ikutan nge-*render* ulang tanpa alasan. |