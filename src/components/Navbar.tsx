import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // 1. Mevcut oturumu al
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // 2. Oturum değişikliklerini (giriş/çıkış) dinle
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fullName = user?.user_metadata?.first_name
    ? `${user.user_metadata.first_name} ${user.user_metadata.last_name || ""}`
    : "Profil";

  return (
    <nav className="bg-white shadow">
      <div className="flex items-center justify-between px-6 py-4">
        <Link to="/" className="text-xl font-bold text-blue-700">
          YTÜ Akademik Ekosistem
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-blue-700">
            İlanlar
          </Link>

          <Link to="/ilan-ver" className="text-gray-700 hover:text-blue-700">
            İlan Ver
          </Link>

          {user ? (
            <Link
              to="/profile"
              className="font-medium text-blue-600 hover:underline"
            >
              {fullName}
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
