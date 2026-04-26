import { supabase } from "../lib/supabase";

type ListingCardProps = {
  listingId: string;
  courseCode: string;
  materials: string[] | string;
  ownerId: string;
  isOwnListing?: boolean;
  onDelete?: () => void;
};

export default function ListingCard({
  listingId,
  courseCode,
  materials,
  ownerId,
  isOwnListing,
  onDelete,
}: ListingCardProps) {
  const materialList = Array.isArray(materials)
    ? materials
    : materials
      ? JSON.parse(materials)
      : [];

  async function handleRequest() {
    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      alert("Talep göndermek için giriş yapmalısın.");
      return;
    }

    const { error } = await supabase.from("talepler").insert([
      {
        ilan_id: listingId,
        alici_id: userData.user.id,
        satici_id: ownerId,
        durum: "beklemede",
      },
    ]);

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    alert("Talep gönderildi.");
  }

  return (
    <div className="relative rounded-lg border bg-white p-4 shadow-sm">
      {isOwnListing && onDelete && (
        <button
          onClick={onDelete}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-lg font-bold text-red-600 transition-colors hover:bg-red-600 hover:text-white"
          title="İlanı Sil"
        >
          -
        </button>
      )}
      <h3 className="text-xl font-bold text-slate-900 pr-8">{courseCode}</h3>

      <p className="mt-3 text-sm text-gray-500">Sağlanan Malzemeler</p>

      <div className="mt-2 flex flex-wrap gap-2">
        {materialList.map((m: string) => (
          <span key={m} className="rounded bg-gray-100 px-3 py-1 text-sm">
            {m}
          </span>
        ))}
      </div>

      {!isOwnListing && (
        <button
          onClick={handleRequest}
          className="mt-4 rounded border border-slate-900 px-4 py-2 text-sm hover:bg-slate-900 hover:text-white"
        >
          İletişime Geç
        </button>
      )}
    </div>
  );
}
