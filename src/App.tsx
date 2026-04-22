/**
 * ============================================================================
 * DOSYA: src/App.tsx
 * GÖREV: Sitenin iskeleti ve sayfalar arası geçiş (Routing) yöneticisi.
 * * YAPILACAKLAR:
 * 1. 'react-router-dom' kullanılarak BrowserRouter yapısı kurulacak.
 * 2. Sabit kalacak bir Navbar bileşeni en üste yerleştirilecek.
 * 3. Şu rotalar (Routes) tanımlanacak:
 * - "/" -> Home.tsx (Tüm ilanların listelendiği ana sayfa)
 * - "/login" -> Login.tsx (Giriş yapma sayfası)
 * - "/ilan-ver" -> CreateListing.tsx (İlan verme formu)
 * 4. İlerleyen aşamalarda "/ilan-ver" rotası ProtectedRoute (Sadece giriş 
 * yapanların görebileceği) yapıya çevrilecek.
 * ============================================================================
 */

function App() {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold text-blue-600">YTÜ Akademik Ekosistem - Kurulum Tamamlandı</h1>
      <p className="mt-4 text-gray-600">Sayfa yönlendirmeleri (React Router) buraya kodlanacak.</p>
    </div>
  )
}

export default App;