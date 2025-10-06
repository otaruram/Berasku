# 🌾 Berasku - AI Rice Classifier

![Berasku Logo](public/1.png)

**Berasku** adalah aplikasi web modern untuk identifikasi jenis beras menggunakan teknologi Artificial Intelligence (AI) dengan TensorFlow.js. Aplikasi ini memungkinkan pengguna untuk mengupload foto beras dan mendapatkan hasil identifikasi secara real-time tanpa memerlukan backend server.

## ✨ Fitur Utama

- 🔍 **Identifikasi Otomatis**: Analisis jenis beras menggunakan model AI yang akurat
- 📱 **Responsive Design**: Interface yang optimal di desktop dan mobile
- 🚀 **Real-time Processing**: Proses identifikasi cepat menggunakan TensorFlow.js
- 🎯 **User-Friendly**: Workflow yang intuitif dengan kontrol penuh dari user
- 📊 **Confidence Score**: Menampilkan tingkat kepercayaan hasil prediksi
- 🌐 **No Backend Required**: Berjalan sepenuhnya di browser client-side

## 🎮 Cara Penggunaan

1. **Upload Foto**: Pilih atau drag & drop foto beras yang ingin diidentifikasi
2. **Preview**: Lihat preview gambar yang telah diupload
3. **Mulai Analisis**: Klik tombol "� Mulai Analisis Beras" untuk memulai identifikasi
4. **Lihat Hasil**: Dapatkan hasil prediksi dengan confidence score

## 🛠️ Teknologi yang Digunakan

- **Frontend Framework**: React 18 dengan TypeScript
- **Build Tool**: Vite untuk development dan build yang cepat
- **UI Components**: shadcn/ui dengan Tailwind CSS
- **AI/ML**: TensorFlow.js untuk machine learning di browser
- **State Management**: React Hooks (useState, useEffect)
- **Notifications**: Sonner untuk toast notifications
- **Icons**: Lucide React untuk ikon yang konsisten

## 🚀 Quick Start

### Prerequisites

Pastikan Anda memiliki Node.js versi 16 atau lebih tinggi yang terinstall di sistem Anda.

### Instalasi dan Menjalankan Aplikasi

```sh
# Step 1: Clone repository ini
git clone <YOUR_GIT_URL>

# Step 2: Masuk ke direktori project
cd berasku-ai-classifier

# Step 3: Install dependencies
npm install

# Step 4: Jalankan development server
npm run dev
```

Aplikasi akan berjalan di:
- **Local**: http://localhost:8080/
- **Network**: http://[your-ip]:8080/

### Build untuk Production

```sh
# Build aplikasi untuk production
npm run build

# Preview build hasil
npm run preview
```

## 📁 Struktur Project

```
berasku-ai-classifier/
├── public/
│   ├── 1.png              # Logo Berasku
│   └── model/             # TensorFlow.js Model Files
│       ├── model.json     # Model architecture
│       └── group1-shard*  # Model weights
├── src/
│   ├── components/        # React Components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── Header.tsx    # App header dengan branding
│   │   ├── ImageUpload.tsx # Upload area
│   │   ├── ResultsDisplay.tsx # Hasil prediksi
│   │   └── Footer.tsx    # App footer
│   ├── hooks/            # Custom React Hooks
│   │   └── useModelLoader.ts # Model loading logic
│   ├── utils/            # Utility functions
│   │   └── riceClassifier.ts # AI classification logic
│   └── pages/            # Page components
│       └── Index.tsx     # Main application page
├── package.json
└── README.md
```

## 🤖 AI Model

Aplikasi ini menggunakan model TensorFlow.js yang telah dilatih untuk mengidentifikasi berbagai jenis beras. Model ini:

- **Input Size**: 128x128 pixels
- **Format**: RGB images
- **Output**: Klasifikasi dengan confidence score
- **Size**: Optimized untuk web usage

## 🎨 UI/UX Features

- **Modern Design**: Interface clean dengan gradient dan animasi halus
- **Intuitive Workflow**: Upload → Preview → Analyze → Results
- **Visual Feedback**: Toast notifications dan loading states
- **Responsive Layout**: Optimal di berbagai ukuran layar
- **Accessibility**: ARIA labels dan keyboard navigation

## 🔧 Konfigurasi

### Vite Configuration

```typescript
// vite.config.ts
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

### Tailwind CSS

Project ini menggunakan Tailwind CSS dengan konfigurasi custom untuk konsistensi design system.

## 📱 Browser Support

- ✅ Chrome 88+
- ✅ Firefox 85+
- ✅ Safari 14+
- ✅ Edge 88+

## 🚀 Deployment

Aplikasi ini dapat di-deploy ke berbagai platform:

### Vercel (Recommended)
```sh
npm install -g vercel
vercel
```

### Netlify
```sh
npm run build
# Upload dist/ folder ke Netlify
```

### Firebase Hosting
```sh
npm install -g firebase-tools
npm run build
firebase deploy
```

## 🤝 Kontribusi

Kontribusi selalu diterima! Berikut cara berkontribusi:

1. Fork repository ini
2. Buat branch feature baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 License

Project ini menggunakan MIT License. Lihat file `LICENSE` untuk detail lebih lanjut.

## 👥 Tim Pengembang

**Berasku Development Team**
- Frontend Engineering
- AI/ML Engineering
- UI/UX Design

## 📞 Support

Jika Anda mengalami masalah atau memiliki pertanyaan:

- 📧 Email: support@berasku.com
- 🐛 Issues: [GitHub Issues](../../issues)
- 📖 Documentation: [Wiki](../../wiki)

---

**Dibuat dengan ❤️ oleh Tim Berasku**

*Membantu petani dan konsumen mengidentifikasi jenis beras dengan teknologi AI terdepan*
