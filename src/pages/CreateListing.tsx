/**
 * ============================================================================
 * DOSYA: src/pages/CreateListing.tsx
 * GÖREV: Kullanıcının fotoğraf yüklemeden, ders seçerek malzeme ilanı açtığı sayfa.
 * * YAPILACAKLAR (Adım Adım Form Mantığı):
 * 1. Ekranda bir "Ders Seçimi" açılır listesi (select/dropdown) olacak.
 * 2. Kullanıcı ders seçtiğinde, 'src/constants/courses.ts' dosyasından o
 * dersin malzeme listesi çekilip ekranda onay (checkbox) şeklinde listelenecek.
 * 3. Kullanıcı vereceği malzemeleri işaretleyecek.
 * 4. Formun altında zorunlu "Telefon Numarası" alanı olacak.
 * 5. Submit edildiğinde veriler Supabase'deki 'listings' tablosuna yazılacak
 * ve kullanıcı Ana Sayfaya (Home) yönlendirilecek.
 * * TASARIM: Tailwind kullanılarak beyaz/gri tonlarında, modern ve mobil uyumlu
 * sade bir form çizilecek.
 * ============================================================================
 */

// Form sayfası kodları buraya yazılacak...
// export default function CreateListing() {
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold">İlan Ver</h1>
//       <p className="mt-2 text-gray-600">İlan oluşturma formu burada olacak.</p>
//     </div>
//   );
// }
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { courses } from "../constants/courses";

export default function CreateListing() {
  const navigate = useNavigate();

  const [selectedCourseCode, setSelectedCourseCode] = useState("");
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);

  const selectedCourse = courses.find(
    (course) => course.code === selectedCourseCode,
  );

  function handleMaterialChange(material: string) {
    if (selectedMaterials.includes(material)) {
      setSelectedMaterials(
        selectedMaterials.filter((item) => item !== material),
      );
    } else {
      setSelectedMaterials([...selectedMaterials, material]);
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newListing = {
      courseCode: selectedCourseCode,
      materials: selectedMaterials,
    };

    console.log("Yeni ilan:", newListing);

    // Supabase eklenecek yer burası

    navigate("/");
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-2xl rounded-xl bg-white p-6 shadow">
        <h1 className="text-2xl font-bold text-slate-900">İlan Ver</h1>

        <p className="mt-2 text-gray-600">
          Ders seçerek elindeki laboratuvar malzemelerini paylaş.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div>
            <label className="mb-2 block font-medium text-slate-800">
              Ders Seçimi
            </label>

            <select
              value={selectedCourseCode}
              onChange={(e) => {
                setSelectedCourseCode(e.target.value);
                setSelectedMaterials([]);
              }}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
              required
            >
              <option value="">Ders seçiniz</option>

              {courses.map((course) => (
                <option key={course.code} value={course.code}>
                  {course.code} - {course.name}
                </option>
              ))}
            </select>
          </div>

          {selectedCourse && (
            <div>
              <h2 className="mb-3 font-medium text-slate-800">Malzemeler</h2>

              <div className="grid gap-3 sm:grid-cols-2">
                {selectedCourse.materials.map((material) => (
                  <label
                    key={material}
                    className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-3 hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      checked={selectedMaterials.includes(material)}
                      onChange={() => handleMaterialChange(material)}
                      className="h-4 w-4"
                    />
                    <span>{material}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={!selectedCourseCode || selectedMaterials.length === 0}
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            İlanı Yayınla
          </button>
        </form>
      </div>
    </div>
  );
}
