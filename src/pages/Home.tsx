import { useState } from "react";
import ListingCard from "../components/ListingCard";
import { DERS_KODLARI } from "../constants/courses";

export default function Home() {
  const [selectedCourse, setSelectedCourse] = useState("");

  const filteredCourses = selectedCourse
    ? DERS_KODLARI.filter((code) => code === selectedCourse)
    : DERS_KODLARI;

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

          {DERS_KODLARI.map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-slate-900">Aktif İlanlar</h2>

        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((code) => (
            <ListingCard key={code} courseCode={code} />
          ))}
        </div>
      </section>
    </div>
  );
}