import { useEffect, useState } from "react";
import ListingCard from "../components/ListingCard";
import { DERS_KODLARI } from "../constants/courses";
import { supabase } from "../lib/supabase";

type Listing = {
  id: string;
  ders_kodu: string;
  malzemeler: string[] | string;
  olusturan_id: string;
};

export default function Home() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    fetchUserAndListings();
  }, []);

  async function fetchUserAndListings() {
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id ?? null;

    setCurrentUserId(userId);

    const { data, error } = await supabase.from("listings").select("*");

    if (error) {
      console.error(error);
      return;
    }

    const sortedListings = (data ?? []).sort((a, b) => {
      if (a.olusturan_id === userId && b.olusturan_id !== userId) return -1;
      if (a.olusturan_id !== userId && b.olusturan_id === userId) return 1;
      return 0;
    });

    setListings(sortedListings);
  }

  const filteredListings = selectedCourse
    ? listings.filter((l) => l.ders_kodu === selectedCourse)
    : listings;

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
          <option value="">Tüm Dersler</option>

          {DERS_KODLARI.map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-slate-900">Aktif İlanlar</h2>

        {filteredListings.length === 0 ? (
          <p className="mt-4 text-gray-500">Henüz ilan yok.</p>
        ) : (
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredListings.map((listing) => (
              <ListingCard
                key={listing.id}
                listingId={listing.id}
                courseCode={listing.ders_kodu}
                materials={listing.malzemeler}
                ownerId={listing.olusturan_id}
                isOwnListing={listing.olusturan_id === currentUserId}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
