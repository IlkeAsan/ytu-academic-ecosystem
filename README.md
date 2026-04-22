🎓 YTÜ Akademik Ekosistem Bilgi Sistemi

Bu platform, Yıldız Teknik Üniversitesi Bilgisayar Mühendisliği öğrencilerinin laboratuvar malzemelerine erişimini kolaylaştırmak, ders bazlı malzeme setlerini paylaşmak ve akademik yardımlaşmayı artırmak için geliştirilmiştir.

🌟 Temel Özellikler

Ders Bazlı İlan Verme: Fotoğraf yükleme zorunluluğu olmadan, ders koduna göre hazır malzeme listeleri üzerinden hızlıca ilan açma.

Güvenli İletişim: Telefon numaralarının sadece malzeme eşleşmesi onaylandığında paylaşılması.

Akademik Odak: Sadece @yildiz.edu.tr uzantılı e-postaya sahip aktif öğrencilerin katılımı.

Güven Puanı: İşlem sonrası karşılıklı değerlendirme sistemi.

🛠 Kullanılan Teknolojiler

Frontend: React 18 + TypeScript + Vite

Tasarım: Tailwind CSS (Modern ve sade arayüz)

İkonlar: Lucide React

Veritabanı & Kimlik Doğrulama: Supabase (PostgreSQL)

🚀 Kurulum ve Çalıştırma

Projeyi kendi bilgisayarınızda çalıştırmak için terminalinizde şu adımları izleyin:

Projeyi Klonlayın:

git clone [https://github.com/IlkeAsan/ytu-academic-ecosystem.git](https://github.com/IlkeAsan/ytu-academic-ecosystem.git)


Bağımlılıkları Yükleyin:

npm install


Geliştirme Sunucusunu Başlatın:

npm run dev


Site şu adreste çalışacaktır: http://localhost:5173

⚠️ Git Çalışma Düzeni (Geliştiriciler İçin)

Projenin sağlığı ve kod çakışmalarını önlemek için şu kurallara uymak zorunludur:

1. Yeni Bir Göreve Başlarken

Asla main branch'inde çalışmayın. Her yeni özellik için yeni bir dal açın:

git checkout -b ozellik-adi


(Örnek: git checkout -b login-ekrani)

2. Kodları Kaydetme ve Gönderme

Yaptığınız değişiklikleri belirli aralıklarla paketleyin ve kendi dalınıza gönderin:

git add .
git commit -m "Görev hakkında kısa ve öz açıklama"
git push origin ozellik-adi


3. Kodların Birleştirilmesi (Pull Request)

GitHub üzerinden bir Pull Request (PR) açın. Kodlarınız proje lideri tarafından incelendikten sonra ana projeye (main) dahil edilecektir.

📁 Proje Yapısı (src/)

/components: Tekrar kullanılabilir arayüz parçaları (Butonlar, Kartlar).

/pages: Sitenin ana sayfaları (Home, CreateListing).

/constants: Ders kodları ve sabit malzeme listeleri.

/lib: Supabase bağlantı ayarları.

/types: TypeScript veri modelleri.





/////////////////////////////////////////////
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
