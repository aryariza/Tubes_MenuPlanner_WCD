# Tugas Besar - Web Client Development
## Website Menu Planner (Perencana Menu Makan)

### Anggota Kelompok:
1. Arya - 
2. Zaky - 
3. Lyan - 

### Deskripsi Proyek:
Aplikasi web berbasis client-side untuk merencanakan menu makanan harian dengan kalkulasi gizi, harga, dan visualisasi gambar secara real-time.

### Penjelasan Fungsi Setiap File:

#### 1. File HTML Utama
* **index.html**: Halaman utama (Landing Page) bergaya marketing yang berisi hero section, call-to-action (CTA), penjelasan konsep, dan menu favorit.
* **planner.html**: Halaman utama aplikasi (Planner) yang berisi struktur layout untuk Tabel Menu dan Panel Hasil (informasi kalori, harga, status gizi, dan stack gambar).

#### 2. Folder css/ (Eksternal CSS)
* **style.css**: Berisi reset CSS, variabel tema warna (color palette), serta komponen global yang digunakan di kedua halaman seperti Navbar dan Footer.
* **landing.css**: Khusus mengatur styling dan responsivitas halaman Landing Page.
* **planner.css**: Khusus mengatur layout grid/flexbox untuk Tabel Menu dan Panel Hasil pada halaman Planner.

#### 3. Folder js/ (JavaScript DOM Logic)
* **data.js**: Berisi dataset mentah (array of objects) dari 26 menu wajib beserta informasi nama, kategori, kalori, harga, dan path gambar terkait.
* **app.js**: Berisi seluruh logic manipulasi DOM, handling event listener pada checkbox, kalkulasi real-time gizi dan harga, serta visualisasi dinamis badge "Menu Seimbang!".

#### 4. Folder images/
* Tempat penyimpanan 26 aset gambar menu makanan dengan ukuran dan rasio yang konsisten untuk dipanggil melalui sistem visualisasi halaman planner.