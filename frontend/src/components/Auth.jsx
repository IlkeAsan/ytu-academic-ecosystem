import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { BookOpen } from 'lucide-react';

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const handleAuth = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // YTÜ Email Kısıtlaması (@std.yildiz.edu.tr)
    const emailDomain = '@std.yildiz.edu.tr';
    if (!email.toLowerCase().endsWith(emailDomain)) {
      setErrorMsg(`Sadece ${emailDomain} uzantılı öğrenci e-postaları ile işlem yapılabilir.`);
      return;
    }

    setLoading(true);
    
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              phone_number: phone
            }
          }
        });
        if (error) throw error;
        
        // Eğer Supabase session döndürmediyse (eski confirm email hatası vs), otomatik giriş yap
        if (!data.session) {
          const { error: loginError } = await supabase.auth.signInWithPassword({
            email,
            password
          });
          if (loginError) throw loginError;
        }
        // Session varsa zaten App.jsx onAuthStateChange ile otomatik yönlendirecek
      }
    } catch (error) {
      setErrorMsg(error.message || 'Bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center -mt-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        <div className="flex flex-col items-center">
          <BookOpen className="h-12 w-12 text-blue-600 mb-2" />
          <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
            YTÜ Akademik Ekosistem
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isLogin ? 'Öğrenci hesabınıza giriş yapın' : 'Topluluğa katılmak için hesabınızı oluşturun'}
          </p>
        </div>
        
        {errorMsg && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
            <p className="text-sm font-medium text-red-800">{errorMsg}</p>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleAuth}>
          <div className="rounded-md shadow-sm space-y-3">
            <div>
              <input
                type="email"
                required
                className="appearance-none relative block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Öğrenci E-posta (@std.yildiz.edu.tr)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {!isLogin && (
              <div>
                <input
                  type="text"
                  required
                  className="appearance-none relative block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="WhatsApp No (Örn: 905551234567)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            )}
            <div>
              <input
                type="password"
                required
                className="appearance-none relative block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Şifre"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              {loading ? 'İşleniyor...' : (isLogin ? 'Güvenli Giriş Yap' : 'Öğrenci Kaydını Tamamla')}
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <button
            onClick={() => { setIsLogin(!isLogin); setErrorMsg(''); }}
            className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
          >
            {isLogin ? 'Hesabınız yok mu? Yeni kayıt oluşturun' : 'Zaten hesabınız var mı? Giriş yapın'}
          </button>
        </div>
      </div>
    </div>
  );
}
