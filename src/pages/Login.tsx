/**
 * ============================================================================
 * DOSYA: src/pages/Login.tsx
 * GÖREV: Kullanıcıların sisteme giriş yaptığı veya kayıt olduğu ekran.
 * SORUMLU: Ahmet (Backend & Auth)
 * * * YAPILACAKLAR (Arayüz - Faz 1):
 * 1. Ortalanmış, şık ve sade bir giriş formu (Card yapısı) çizilecek.
 * 2. Formda iki alan olacak: "E-posta" ve "Şifre".
 * 3. Sadece "@yildiz.edu.tr" uzantılı maillerin kabul edileceğini belirten
 * küçük bir uyarı metni eklenecek.
 * 4. "Giriş Yap" ve "Kayıt Ol" butonları eklenecek.
 * * * İLERİ AŞAMA (Veritabanı - Faz 2):
 * - Bu formdaki veriler Supabase Authentication'a bağlanacak.
 * ============================================================================
 */

import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <section className="mx-auto max-w-md text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border bg-white text-3xl shadow-sm">
          📖
        </div>

        <h1 className="mt-6 text-3xl font-bold text-slate-900">
          YTÜ Ekosistem
        </h1>

        <p className="mt-2 text-gray-600">
          Akademik paylaşıma katılmak için giriş yapın.
        </p>
      </section>

      <form className="mx-auto mt-8 max-w-md rounded-2xl border bg-white p-8 shadow-sm">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-800">
            E-posta Adresi
          </label>
          <input
            type="email"
            placeholder="isim@std.yildiz.edu.tr"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div className="mt-6">
          <label className="mb-2 block text-sm font-medium text-slate-800">
            Şifre
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full rounded-lg bg-slate-900 px-4 py-3 font-semibold text-white hover:bg-slate-800"
        >
          Giriş Yap
        </button>

        <p className="mt-5 text-center text-sm text-gray-600">
          Hesabın yok mu?{" "}
          <Link to="/register" className="font-semibold text-blue-600">
            Kayıt Ol
          </Link>
        </p>

        <div className="mt-8 rounded-xl bg-gray-50 p-4 text-left text-sm text-gray-600">
          <p>
            <span className="font-semibold text-slate-800">Önemli Bilgi:</span>{" "}
            Sisteme sadece <span className="font-semibold">@yildiz.edu.tr</span>{" "}
            veya <span className="font-semibold">@std.yildiz.edu.tr</span>{" "}
            uzantılı resmi öğrenci/personel e-posta adresleri ile giriş
            yapılabilir.
          </p>
        </div>
      </form>
    </div>
  );
}
