import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Login() {
  const navigate = useNavigate();

  // State tanımlamaları
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    // 1. Basit format kontrolü (Register'daki gibi)
    const allowedEmail =
      email.endsWith("@yildiz.edu.tr") ||
      email.endsWith("@std.yildiz.edu.tr");

    if (!allowedEmail) {
      setError("Sadece YTÜ uzantılı e-posta adresleri kabul edilir.");
      setLoading(false);
      return;
    }

    try {
      // 2. Supabase ile giriş yapma
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (loginError) throw loginError;

      console.log("Giriş başarılı:", data);
      
      // Giriş başarılıysa ana sayfaya yönlendir
      navigate("/");
      
    } catch (err: any) {
      // Hata mesajlarını Türkçeleştirebilirsin
      if (err.message === "Invalid login credentials") {
        setError("E-posta adresi veya şifre hatalı.");
      } else if (err.message === "Email not confirmed") {
        setError("Lütfen önce e-posta adresinizi onaylayın.");
      } else {
        setError(err.message || "Giriş yapılırken bir hata oluştu.");
      }
    } finally {
      setLoading(false);
    }
  }

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

      <form 
        onSubmit={handleSubmit}
        className="mx-auto mt-8 max-w-md rounded-2xl border bg-white p-8 shadow-sm"
      >
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-800">
            E-posta Adresi
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="isim@std.yildiz.edu.tr"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div className="mt-6">
          <label className="mb-2 block text-sm font-medium text-slate-800">
            Şifre
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        {/* Hata Mesajı Alanı */}
        {error && (
          <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`mt-6 w-full rounded-lg bg-slate-900 px-4 py-3 font-semibold text-white hover:bg-slate-800 transition-colors ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
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