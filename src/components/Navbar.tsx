import { Link } from "react-router-dom";

export default function Navbar() {
  // örnek user (login olunca dolacak)
  // const user = {
  //   name: "Taha",
  // };
  const user = null; // login değilse

  return (
    <nav className="bg-white shadow">
      <div className="flex items-center justify-between px-6 py-4">
        {/* SOL */}
        <Link to="/" className="text-xl font-bold text-blue-700">
          YTÜ Akademik Ekosistem
        </Link>

        {/* SAĞ */}
        <div className="flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-blue-700 ">
            İlanlar
          </Link>

          <Link to="/ilan-ver" className="text-gray-700 hover:text-blue-700">
            İlan Ver
          </Link>

          {/* 🔥 KRİTİK KISIM */}
          {user ? (
            <Link
              to="/profile"
              className="font-medium text-blue-600 hover:underline"
            >
              Profil
            </Link>
          ) : (
            <Link to="/login" className="text-gray-700 hover:text-blue-700">
              Giriş Yap
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
