# PhishGuard - Link Security Checker

PhishGuard adalah aplikasi web sederhana untuk mendeteksi potensi ancaman phishing pada sebuah URL. Aplikasi ini menggunakan analisis heuristik dan database simulasi untuk menilai tingkat keamanan tautan yang dimasukkan.

## Fitur

- **Analisis Heuristik**: Memeriksa URL berdasarkan pola mencurigakan seperti penggunaan alamat IP, subdomain berlebih, kata kunci sensitif, dan format URL yang tidak wajar.
- **Database Mock**: Simulasi pengecekan terhadap daftar domain phishing yang diketahui.
- **Skor Risiko**: Memberikan penilaian keamanan (Aman, Mencurigakan, Berbahaya) beserta alasan deteksinya.
- **Antarmuka Modern**: UI yang responsif dan mudah digunakan.

## Teknologi yang Digunakan

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **Dependencies**: `body-parser`, `cors`

## Cara Install dan Menjalankan

Ikuti langkah-langkah berikut untuk menjalankan proyek ini di komputer lokal Anda:

1.  **Clone repository** (jika menggunakan git):
    ```bash
    git clone https://github.com/username/pengeceklink.git
    cd pengeceklink
    ```

2.  **Install dependencies**:
    Pastikan Anda sudah menginstal Node.js, lalu jalankan:
    ```bash
    npm install
    ```

3.  **Jalankan server**:
    ```bash
    node server.js
    ```

4.  **Buka aplikasi**:
    Buka browser dan kunjungi alamat berikut:
    `http://localhost:3000`

## Catatan Penting

- Aplikasi ini adalah **versi demo** untuk tujuan pembelajaran.
- Deteksi phishing menggunakan logika heuristik sederhana dan database statis (mock data), bukan API keamanan real-time.

## Struktur Folder

```
pengeceklink/
├── public/
│   ├── index.html   # Halaman utama
│   ├── script.js    # Logika frontend
│   └── style.css    # Styling
├── server.js        # Server backend (Express)
├── package.json     # Daftar dependency
└── README.md        # Dokumentasi
```
