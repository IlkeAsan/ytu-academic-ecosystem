import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Star, X } from 'lucide-react';

export default function RatingModal({ session, donationId, targetUserId, onClose }) {
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      alert("Lütfen 1 ile 5 arasında bir puan seçin.");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.from('ratings').insert([{
        donation_id: donationId,
        rater_id: session.user.id,
        rated_user_id: targetUserId,
        score: rating
      }]);
      
      if (error) {
        if (error.code === '23505') alert("Bu işlem için daha önce puanlama yaptınız veya değerlendirme eklenemiyor.");
        else throw error;
      } else {
        alert("Puanınız kaydedildi, teşekkürler!");
      }
      onClose();
    } catch (err) {
      alert("Hata: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full relative transform transition-all">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-1 transition-colors">
          <X className="w-6 h-6" />
        </button>
        
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-blue-500 mb-4">
            <Star className="w-8 h-8 fill-current" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Kullanıcıyı Değerlendir</h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            İşlemden memnun kaldınız mı? Lütfen 1-5 arasında yorumsuz sadece puan vererek ekosistemimize katkıda bulunun.
          </p>
        </div>
        
        <div className="flex justify-center space-x-3 mb-8">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className={`focus:outline-none transition-transform hover:scale-110 active:scale-95`}
            >
              <Star 
                className={`w-12 h-12 transition-colors duration-200 ${
                  rating >= star ? 'text-amber-400 fill-current' : 'text-gray-200'
                }`} 
              />
            </button>
          ))}
        </div>
        
        <button
          onClick={handleSubmit}
          disabled={loading || rating === 0}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg active:shadow-sm"
        >
          {loading ? 'Kaydediliyor...' : 'Puanı Gönder ve Tamamla'}
        </button>
      </div>
    </div>
  );
}
