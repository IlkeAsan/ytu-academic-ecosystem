import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Profile() {
  // react-router-dom'dan gelen bu aracı, kullanıcı çıkış yaptığında onu 
  // boş ekranda bırakmayıp Giriş sayfasına (login) yönlendirmek için kullanıyoruz.
  const navigate = useNavigate();

  async function handleLogout() {
    // 1. Supabase üzerinden kullanıcının oturumunu güvenli şekilde kapatır
    await supabase.auth.signOut();
    
    // 2. Çıkış yapıldıktan sonra kullanıcıyı anında /login sayfasına yönlendirir
    navigate("/login");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-slate-900">Profil</h1>
      <p className="mt-2 text-gray-600">Kullanıcı bilgileri burada olacak.</p>
      
      <button
        onClick={handleLogout}
        className="mt-6 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-red-700"
      >
        Çıkış Yap
      </button>
    </div>
  );
}
