import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, AlertCircle } from 'lucide-react';

export default function CreateDonationForm({ session }) {
  const [catalog, setCatalog] = useState([]);
  const [selectedMaterialId, setSelectedMaterialId] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCatalog();
  }, []);

  const fetchCatalog = async () => {
    try {
      const { data, error } = await supabase
        .from('materials_catalog')
        .select('*')
        .order('category', { ascending: true });
      if (error) throw error;
      setCatalog(data);
    } catch (error) {
      console.error('Katalog çekme hatası:', error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    
    if (!selectedMaterialId) {
      setErrorMsg('Lütfen listeden bir materyal seçin.');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from('donations').insert([
        { 
          donor_id: session.user.id, 
          material_id: selectedMaterialId,
          status: 'active'
        }
      ]);

      if (error) throw error;
      
      setSuccess(true);
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Yeni Bağış İlanı Oluştur</h2>
      
      {success ? (
        <div className="bg-green-50 p-6 rounded-lg flex flex-col items-center">
          <CheckCircle className="w-12 h-12 text-green-500 mb-3" />
          <p className="text-green-800 font-medium text-lg">Bağışınız başarıyla eklendi!</p>
          <p className="text-green-600 mt-1">Ana sayfaya yönlendiriliyorsunuz...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {errorMsg && (
            <div className="bg-red-50 flex items-center p-4 rounded-md text-red-800">
              <AlertCircle className="w-5 h-5 mr-2" />
              {errorMsg}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bağışlanacak Materyal (Katalogdan Seçiniz)
            </label>
            <div className="text-sm text-gray-500 mb-4">
              Güvenlik ve standardizasyon nedeniyle sadece tanımlı ders malzemeleri seçilebilir. Serbest giriş yapılamamaktadır.
            </div>
            
            <select
              required
              value={selectedMaterialId}
              onChange={(e) => setSelectedMaterialId(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border text-gray-800 bg-white"
            >
              <option value="" disabled>-- Bir materyal seçin --</option>
              {catalog.map((item) => (
                <option key={item.id} value={item.id}>
                  [{item.course_code}] - {item.item_name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading || catalog.length === 0}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'İşleniyor...' : 'Katalogdan Seç ve Yayınla'}
          </button>
        </form>
      )}
    </div>
  );
}
