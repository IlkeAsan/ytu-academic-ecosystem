import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const allowedEmail =
      form.email.endsWith("@yildiz.edu.tr") ||
      form.email.endsWith("@std.yildiz.edu.tr");

    if (!allowedEmail) {
      setError("Sadece YTÜ uzantılı e-posta adresleri kabul edilir.");
      return;
    }

    if (form.phone.length !== 11) {
      setError("Telefon numarası 11 haneli olmalıdır.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Şifreler birbiriyle uyuşmuyor.");
      return;
    }

    console.log("Kayıt bilgileri:", form);

    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <section className="mx-auto max-w-md text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border bg-white text-3xl shadow-sm">
          📖
        </div>

        <h1 className="mt-6 text-3xl font-bold text-slate-900">Kayıt Ol</h1>

        <p className="mt-2 text-gray-600">
          YTÜ Ekosistem’e katılmak için bilgilerinizi girin.
        </p>
      </section>

      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-8 max-w-md rounded-2xl border bg-white p-8 shadow-sm"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-800">
              İsim
            </label>
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-800">
              Soyisim
            </label>
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="mt-5">
          <label className="mb-2 block text-sm font-medium text-slate-800">
            E-posta Adresi
          </label>
          <input
            type="email"
            name="email"
            placeholder="isim@std.yildiz.edu.tr"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div className="mt-5">
          <label className="mb-2 block text-sm font-medium text-slate-800">
            Telefon Numarası
          </label>
          <input
            type="tel"
            name="phone"
            placeholder="05xxxxxxxxx"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div className="mt-5">
          <label className="mb-2 block text-sm font-medium text-slate-800">
            Şifre
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div className="mt-5">
          <label className="mb-2 block text-sm font-medium text-slate-800">
            Şifre Tekrar
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="mt-6 w-full rounded-lg bg-slate-900 px-4 py-3 font-semibold text-white hover:bg-slate-800"
        >
          Kayıt Ol
        </button>

        <div className="mt-8 rounded-xl bg-gray-50 p-4 text-left text-sm text-gray-600">
          <p>
            <span className="font-semibold text-slate-800">Önemli Bilgi:</span>{" "}
            Sisteme sadece <span className="font-semibold">@yildiz.edu.tr</span>{" "}
            veya <span className="font-semibold">@std.yildiz.edu.tr</span>{" "}
            uzantılı resmi öğrenci/personel e-posta adresleri ile kayıt
            olunabilir.
          </p>
        </div>
      </form>
    </div>
  );
}
