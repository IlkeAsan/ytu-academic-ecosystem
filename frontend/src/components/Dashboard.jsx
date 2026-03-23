import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Search, Package, MapPin, Send } from 'lucide-react';

export default function Dashboard({ session }) {
  const [donations, setDonations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchDonations = async () => {
    setLoading(true);
    try {
      let { data, error } = await supabase
        .from('donations')
        .select(`
          id,
          created_at,
          status,
          donor_id,
          profiles:donor_id ( id, email ),
          materials_catalog:material_id ( id, item_name, course_code, course_name, category )
        `)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDonations(data || []);
    } catch (error) {
      console.error('İlanları çekerken hata:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const handleRequest = async (donationId, donorId) => {
    if (donorId === session.user.id) {
      alert("Kendi bağış ilanınıza talepte bulunamazsınız!");
      return;
    }
    try {
      const { error } = await supabase.from('requests').insert([
        { donation_id: donationId, requester_id: session.user.id, status: 'pending' }
      ]);
      if (error) {
        if (error.code === '23505') alert('Bu ilan için beklemede olan veya onaylanmış bir talebiniz zaten var.');
        else throw error;
      } else {
        alert('Talebiniz başarıyla satıcıya iletildi. Panelim sayfasından WhatsApp linkini takip edebilirsiniz.');
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const filteredDonations = donations.filter(d => {
    if (!searchQuery) return true;
    const cat = d.materials_catalog;
    const term = searchQuery.toLowerCase();
    return (
      cat.course_code.toLowerCase().includes(term) ||
      cat.course_name.toLowerCase().includes(term) ||
      cat.item_name.toLowerCase().includes(term)
    );
  });

  return (
    <div className="mt-6">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center mb-4 md:mb-0">
          <Package className="w-6 h-6 mr-2 text-blue-500" />
          Aktif Bağış İlanları
        </h1>
        
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Ders Kodu, Adı veya Malzeme ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-500">Yükleniyor...</div>
      ) : filteredDonations.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-lg">Kriterlerinize uygun aktif bağış ilanı bulunamadı.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDonations.map((d) => (
            <div key={d.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="bg-blue-50 px-4 py-3 border-b border-gray-100 flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-200 px-2 py-1 rounded">
                    {d.materials_catalog.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(d.created_at).toLocaleDateString('tr-TR')}
                  </span>
                </div>
                
                <div className="p-5 pb-0">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{d.materials_catalog.item_name}</h3>
                  <p className="text-sm font-medium text-gray-600 mb-4">
                    <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded mr-2">{d.materials_catalog.course_code}</span>
                    {d.materials_catalog.course_name}
                  </p>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-6">
                    <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                    Bağışçı: {d.profiles?.email?.split('@')[0]}
                  </div>
                </div>
              </div>
              
              <div className="p-5 pt-0">
                <button
                  onClick={() => handleRequest(d.id, d.donor_id)}
                  disabled={d.donor_id === session.user.id}
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {d.donor_id === session.user.id ? 'Size Ait İlan' : 'Talep Et'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
