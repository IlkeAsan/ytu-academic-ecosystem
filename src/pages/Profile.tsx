import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import ListingCard from "../components/ListingCard";

type Listing = {
  id: string;
  ders_kodu: string;
  malzemeler: string[];
};

export default function Profile() {
  const navigate = useNavigate();
  const [myListings, setMyListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMyListings() {
      // 1. Giriş yapmış kullanıcıyı al
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        setLoading(false);
        return;
      }

      // 2. Sadece bu kullanıcının ID'sine sahip ilanları getir
      const { data, error } = await supabase
        .from("listings")
        .select("*")
        .eq("olusturan_id", userData.user.id);

      if (!error && data) {
        setMyListings(data);
      }
      setLoading(false);
    }

    fetchMyListings();
  }, []);

  async function handleDeleteListing(id: string) {
    const confirmDelete = window.confirm("Bu ilanı silmek istediğinize emin misiniz?");
    if (!confirmDelete) return;

    // 1. Supabase'den sil
    const { error } = await supabase.from("listings").delete().eq("id", id);
    
    if (error) {
      alert("İlan silinirken bir hata oluştu!");
      console.error(error);
      return;
    }

    // 2. Başarıyla silindiyse ekrandaki listeyi de güncelle (sayfayı yenilemeye gerek kalmadan)
    setMyListings((prevListings) => prevListings.filter((listing) => listing.id !== id));
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between rounded-xl bg-white p-6 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Profilim</h1>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-red-700"
          >
            Çıkış Yap
          </button>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold text-slate-900">Benim İlanlarım</h2>

          {loading ? (
            <p className="mt-4 text-gray-500">İlanlarınız yükleniyor...</p>
          ) : myListings.length === 0 ? (
            <p className="mt-4 text-gray-500">Henüz yayınladığınız bir ilan bulunmuyor.</p>
          ) : (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {myListings.map((listing) => (
                <ListingCard
                  key={listing.id}
                  courseCode={listing.ders_kodu}
                  materials={listing.malzemeler}
                  isOwnListing={true}
                  onDelete={() => handleDeleteListing(listing.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
