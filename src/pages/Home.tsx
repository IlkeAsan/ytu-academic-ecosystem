/**
 * ============================================================================
 * DOSYA: src/pages/Home.tsx
 * GÖREV: Supabase'deki aktif ilanların çekilip listelendiği vitrin.
 * * YAPILACAKLAR:
 * 1. Sayfa yüklendiğinde (useEffect ile) Supabase'den 'listings' tablosu çekilecek.
 * 2. Gelen veriler map() fonksiyonu ile dönülerek 'ListingCard' bileşenlerine
 * aktarılacak (Grid yapısında listelenecek).
 * 3. Üst kısma "Ders Koduna Göre Ara" (Örn: BLM2042) şeklinde basit bir text
 * filtresi eklenecek.
 * 4. Yüklenme durumu için bir Loading (Yükleniyor...) animasyonu (Spinner) eklenecek.
 * ============================================================================
 */
import { useState } from "react";
import ListingCard from "../components/ListingCard";
import { courses } from "../constants/courses";

export default function Home() {
  const [selectedCourse, setSelectedCourse] = useState("");

  const filteredCourses = selectedCourse
    ? courses.filter((course) => course.code === selectedCourse)
    : courses;

  return (
    <div className="px-6 py-10">
      <section className="text-center">
        <h1 className="text-4xl font-bold text-slate-900">
          YTÜ Laboratuvar Malzemeleri Takas Ağı
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-gray-600">
          Kullanmadığınız laboratuvar malzemelerini diğer öğrencilerle paylaşın
          veya ihtiyacınız olan malzemeleri hemen bulun.
        </p>

        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="mt-8 w-full max-w-xl rounded-full border border-gray-300 px-6 py-3 shadow-sm outline-none focus:border-blue-500"
        >
          <option value="">Ders seçiniz</option>

          {courses.map((course) => (
            <option key={course.code} value={course.code}>
              {course.code} - {course.name}
            </option>
          ))}
        </select>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-slate-900">Aktif İlanlar</h2>

        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <ListingCard key={course.code} courseCode={course.code} />
          ))}
        </div>
      </section>
    </div>
  );
}

// Ana sayfa listeleme kodları buraya yazılacak...
