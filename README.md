# PresensiApp

PresensiApp adalah aplikasi berbasis web untuk mencatat presensi (kehadiran) menggunakan Node.js, Express, dan Socket.IO. Aplikasi ini memungkinkan pengguna untuk menambah data presensi dan melihat daftar presensi yang telah ditambahkan dalam bentuk tabel.

## Fitur

- Menambah data presensi dengan nama dan waktu.
- Menampilkan daftar presensi dalam bentuk tabel dengan kolom Nomor, Nama, dan Check-In.
- Real-time update menggunakan Socket.IO untuk menampilkan data presensi yang baru ditambahkan.
- CRUD Operations
- ES6 Modules
- Linter Eslint
- Pattern Model, Controller, View, Routes
- TailwindCSS, AlpineJs
- Menggunakan Sequelize ORM untuk interaksi dengan basis data MySQL.

## Prasyarat

Sebelum memulai, pastikan Anda telah menginstal:

- Node.js versi terbaru (v20.12.2)
- NPM
- Express
- MySQL
- Sequelize

## Installation

1. Clone repositori ini:

```bash
   git clone https://github.com/farhanhunter/FSW-47-Gold-Kelvin-Desman-Farhan-Adi-Saputra.git
```

2. Masuk ke direktori proyek:

```bash
cd PresensiApp
```

3. Instal dependensi:

```bash
npm install
```

4. Konfigurasi basis data:

- Buat database MySQL dengan nama db_presensi.
- Tambahkan tabel attendance dan users dengan struktur berikut:

```bash
  CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(255) NOT NULL,
  user_id VARCHAR(255) NOT NULL UNIQUE,
  role VARCHAR(50) NOT NULL
);

CREATE TABLE attendance (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  clock_in DATETIME,
  clock_out DATETIME,
  reason TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

5.  Sesuaikan konfigurasi basis data di config/database.js dengan kredensial MySQL Anda.

## Menjalankan Aplikasi

1. Jalankan Server:

```bash
node app.js
```

2. Buka browser dan akses http://localhost:3001/presensi untuk melihat aplikasi.

## Struktur Proyek

- app.js: Berisi konfigurasi server dan middleware.
- controllers/presensiController.js: Mengatur logika untuk mendapatkan dan menambah data
  presensi.
- models/presensiModel.js: Berisi data model presensi.
- views/presensiView.html: Template HTML untuk menampilkan form dan daftar presensi.
- public/src/css/app.css: Berisi gaya (CSS) untuk tampilan tabel presensi.
- package.json: Berisi informasi proyek dan dependensi.

## Directory Structure

Here’s the structure of your project from the root directory:

```bash
MVC-NODEJS/
├── config/
│   └── database.mjs
├── controllers/
│   ├── errorController.mjs
│   ├── presensiController.mjs
│   └── reasonController.mjs
├── models/
│   ├── associations.mjs
│   ├── attendanceModel.mjs
│   ├── presensiModel.mjs
│   ├── reasonModel.mjs
│   └── userModel.mjs
├── node_modules/
│   └── (installed dependencies)
├── public/
│   ├── css/
│   │   └── app.css
│   │   └── styles.css
│   ├── img/
│   │   └── bg-image.png
│   │   └── profil-pic.png
│   └── js/
│       └── index.js
├── routes/
│   ├── errorRoutes.mjs
│   ├── presensiRoutes.mjs
│   └── reasonRoutes.mjs
├── views/
│   ├── components/
│   │   ├── footer.ejs
│   │   ├── header.ejs
│   └── layout.ejs
│   └── errorView.ejs
│   └── portofolio.ejs
│   └── presensiView.ejs
├── .eslintrc.json
├── .gitignore
├── app.mjs
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── sinkronisasi.mjs
└── tailwind.config.js
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

```bash
Dengan penambahan ini, README.md Anda akan mencerminkan penggunaan Sequelize ORM dan MySQL, serta memberikan petunjuk yang lebih rinci tentang cara mengkonfigurasi dan menjalankan aplikasi.
```
