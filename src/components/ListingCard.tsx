
/**
 * ============================================================================
 * DOSYA: src/components/ListingCard.tsx
 * GÖREV: Tek bir ilanın bilgilerini gösteren şık bir kart tasarımı.
 * SORUMLU: Mehmet (UI/UX)
 * * * YAPILACAKLAR:
 * 1. Resimsiz, metin odaklı temiz bir "Card" tasarımı yapılacak (Tailwind ile).
 * 2. Kartın üzerinde şunlar belirgin şekilde yazacak:
 * - Ders Kodu (Örn: BLM2042)
 * - Malzemeler (Yan yana veya alt alta liste şeklinde)
 * - "İletişime Geç" butonu.
 * 3. Şimdilik gerçek veritabanı olmadığı için içerisine "Örnek Ders", 
 * "Örnek Malzeme" gibi sahte (mock) metinler yazılacak.
 * 4. Bu kart bileşeni, Home.tsx içerisinde map() ile defalarca çağırılacak.
 * ============================================================================
 */

export default function ListingCard() {
  return (
    <div className="border p-4 rounded-lg shadow-sm">
      <h3>Ders Kodu: Örnek</h3>
      <p>Malzemeler: Liste buraya gelecek</p>
      <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">İletişime Geç</button>
    </div>
  );
}