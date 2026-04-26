type ListingCardProps = {
  courseCode: string;
  materials: string[];
};

export default function ListingCard({
  courseCode,
  materials,
}: ListingCardProps) {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <h3 className="text-xl font-bold text-slate-900">{courseCode}</h3>

      <p className="mt-3 text-sm text-gray-500">Sağlanan Malzemeler</p>

      <div className="mt-2 flex flex-wrap gap-2">
        {materials.map((m) => (
          <span key={m} className="rounded bg-gray-100 px-3 py-1 text-sm">
            {m}
          </span>
        ))}
      </div>

      <button className="mt-4 rounded border border-slate-900 px-4 py-2 text-sm hover:bg-slate-900 hover:text-white">
        İletişime Geç
      </button>
    </div>
  );
}
