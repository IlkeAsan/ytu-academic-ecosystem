# YTÜ Akademik Ekosistem Bilgi Sistemi 🎓

Bu proje, \"Sistem Analizi ve Tasarımı\" dersi kapsamında YTÜ Bilgisayar Mühendisliği öğrencileri için geliştirilmiş, hızlı, güvenli ve katalog tabanlı bir bağış platformudur.

## 🚀 Temel Felsefe
**\"Hızlı, Güvenli, Katalog Tabanlı Bağış Platformu\"**
Kullanıcılar fotoğraf veya metin girmekle uğraşmazlar, yalnızca sistemde tanımlı laboratuvar veya ders malzemelerinden birini seçerek bağış ilanı oluştururlar. İlanlar sadece \"Bağış\" (Donation) türündedir.

## 🛠 Teknoloji Yığını
*   **Frontend:** React (Vite), Tailwind CSS, Lucide React
*   **Backend & Veritabanı:** Supabase (PostgreSQL, Supabase Auth)
*   **Yetkilendirme:** Özel `@std.yildiz.edu.tr` uzantısı kontrolü

---

## 💻 Kurulum ve Çalıştırma (Install & Run)

### 1. Supabase (Veritabanı) Kurulumu
1. [Supabase](https://supabase.com/) üzerinde yeni bir proje oluşturun.
2. Projenizin **SQL Editor** kısmına gidin.
3. Proje dizininde bulunan `supabase/schema.sql` dosyasının içeriğini buraya yapıştırıp çalıştırın.
   *(Bu işlem tabloları, ilişkileri, örnek malzeme kataloğunu ve RLS politikalarını otomatik oluşturur.)*

### 2. Frontend Kurulumu
1. Proje ana dizinindeki `frontend` klasörüne girin:
   ```bash
   cd frontend
   ```
2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
3. Supabase değişkenlerini bağlayın. `frontend/.env` dosyası oluşturun (veya `src/supabaseClient.js` içindeki yer tutucuları kendi projenizin değerleriyle değiştirin):
   ```env
   VITE_SUPABASE_URL=YOUR_SUPABASE_URL
   VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
   ```
4. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```

---

## 🗄 Veritabanı Mimarisi (Tablolar)

Proje Supabase (PostgreSQL) üzerinde aşağıdaki tablolarla çalışır:

*   **`profiles`**: Supabase `auth.users` ile senkronize çalışır. Yalnızca YTÜ e-postasına sahip öğrencilerin profillerini ve WhatsApp numaralarını tutar.
*   **`materials_catalog`**: Kullanıcıların bağış yapabileceği malzemelerin (Arduino, STM32 vb.) ve bağlı oldukları derslerin (Örn: BLM2021) sabit listesidir.
*   **`donations`**: Açılan bağış ilanlarını tutar. `status` alanı ('active', 'completed' vs.) ilanın durumunu belirler.
*   **`requests`**: İlanlara yapılan talepleri ve onay süreçlerini ('pending', 'approved', 'rejected') yönetir.
*   **`ratings`**: İşlem sonucunda alıcı ve satıcının birbirini 1-5 arası puanladığı ve yorum içermeyen değerlendirme kayıtlarını tutar.

---

## 👤 Kullanıcı Senaryoları (User Stories)

1. **Öğrenci Kaydı:** *\"Bir YTÜ öğrencisi olarak, sadece `@std.yildiz.edu.tr` uzantılı mailimle sisteme güvenle kayıt olabilmeliyim.\"*
2. **Katalogdan İlan Açma:** *\"Bağışçı olarak, elimdeki Arduino'yu bağışlamak için fotoğraf yüklemekle uğraşmadan katalogdan 'Arduino Uno / BLM2021' seçerek tek tıkla ilan açabilmeliyim.\"*
3. **Filtreleme:** *\"İhtiyaç sahibi öğrenci olarak, sadece 'BLM2021' dersine ait malzemeleri filtreleyerek Mantık Devreleri dersi için gerekenleri görebilmeliyim.\"*
4. **Talep ve Onay:** *\"Bağışçı olarak, ilanlarıma gelen talepleri (kullanıcı adlarını) görüp birini onaylayabilmeliyim.\"*
5. **WhatsApp İletişimi:** *\"Talep onaylandığında, uygulama içi mesajlaşmayla vakit kaybetmeden doğrudan karşı tarafın WhatsApp (wa.me) sohbetine yönlendirilebilmeliyim.\"*
6. **Yıldız Puanlama:** *\"İşlem bittiğinde, karşı tarafın güvenilirliğini belirtmek için yorum yazmaya zorlanmadan 1-5 arası bir yıldız verebilmeliyim.\"*

---

## 📋 Ekip Üyeleri Görev Dağılımı Şablonu

Proje geliştirme sürecinde aşağıdaki şablon kullanılarak iş paylaşımı yapılabilir:

| Görev / Modül | Sorumlu Kişi | Durum | Bitiş Tarihi |
| :--- | :--- | :--- | :--- |
| **Araştırma & Gereksinim Analizi** | [İsim Soyisim] | Tamamlandı | DD/MM/YYYY |
| **Veritabanı (Supabase) Şema & SQL Tasarımı** | [İsim Soyisim] | Tamamlandı | DD/MM/YYYY |
| **Frontend: Auth Modülü (@std.yildiz.edu.tr)** | [İsim Soyisim] | Tamamlandı | DD/MM/YYYY |
| **Frontend: Katalog ve İlan Formu Bileşenleri**| [İsim Soyisim] | Tamamlandı | DD/MM/YYYY |
| **Frontend: Dashboard ve Filtreleme İşlemleri**| [İsim Soyisim] | Tamamlandı | DD/MM/YYYY |
| **Frontend: Talep, WhatsApp Yönlendirme ve Rating** | [İsim Soyisim] | Tamamlandı | DD/MM/YYYY |
| **Test Senaryoları ve Doğrulama** | [İsim Soyisim] | Bekliyor | DD/MM/YYYY |
| **Dökümantasyon ve Proje Sunumu Hazırlığı** | [İsim Soyisim] | Devam Ediyor | DD/MM/YYYY |

---
*Bu sistem, öğrenci ekosisteminde dayanışmayı artırmak ve ders materyallerinin geri dönüşümünü sağlamak için tasarlanmıştır.*
