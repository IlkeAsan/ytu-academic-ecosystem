import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Check, X, MessageCircle, Star, Trash2 } from 'lucide-react';
import RatingModal from './RatingModal';

export default function MyRequestsAndDonations({ session }) {
  const [myDonations, setMyDonations] = useState([]); // Includes incoming requests
  const [myRequests, setMyRequests] = useState([]);   // Includes donation info
  const [loading, setLoading] = useState(true);
  const [userScores, setUserScores] = useState({});
  
  // Rating states
  const [showRating, setShowRating] = useState(false);
  const [ratingDonationId, setRatingDonationId] = useState('');
  const [ratingTargetUserId, setRatingTargetUserId] = useState('');
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Benim ilanlarım ve onlara gelen talepler
      const { data: donationsData, error: dError } = await supabase
        .from('donations')
        .select(`
          id, status, created_at,
          materials_catalog ( item_name ),
          requests ( id, requester_id, status, profiles:requester_id ( email, phone_number ) )
        `)
        .eq('donor_id', session.user.id)
        .order('created_at', { ascending: false });
      
      if (dError) throw dError;
      setMyDonations(donationsData || []);

      // Benim taleplerim ve ilan bilgileri
      const { data: requestsData, error: rError } = await supabase
        .from('requests')
        .select(`
          id, status, donation_id,
          donations!inner ( id, status, donor_id, profiles:donor_id ( email, phone_number ), materials_catalog ( item_name ) )
        `)
        .eq('requester_id', session.user.id)
        .order('created_at', { ascending: false });

      if (rError) throw rError;
      setMyRequests(requestsData || []);

      const { data: ratingsData } = await supabase.from('ratings').select('rated_user_id, score');
      if (ratingsData) {
        const scoreMap = {};
        ratingsData.forEach(r => {
          if (!scoreMap[r.rated_user_id]) scoreMap[r.rated_user_id] = { total: 0, count: 0 };
          scoreMap[r.rated_user_id].total += r.score;
          scoreMap[r.rated_user_id].count += 1;
        });
        const avgScores = {};
        Object.keys(scoreMap).forEach(key => {
          avgScores[key] = {
            avg: (scoreMap[key].total / scoreMap[key].count).toFixed(1),
            count: scoreMap[key].count
          };
        });
        setUserScores(avgScores);
      }

    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (donationId, requestId) => {
    try {
      // 1. İlgili talebi approve yap
      await supabase.from('requests').update({ status: 'approved' }).eq('id', requestId);
      
      fetchData();
    } catch (error) {
      alert("Hata: " + error.message);
    }
  };

  const handleDeliver = async (donationId, requestId) => {
    try {
      // 1. İlan statüsünü completed yap
      await supabase.from('donations').update({ status: 'completed' }).eq('id', donationId);
      // 2. Diğer tüm talepleri reject yap
      await supabase.from('requests').update({ status: 'rejected' }).eq('donation_id', donationId).neq('id', requestId);
      
      fetchData();
    } catch (error) {
      alert("Hata: " + error.message);
    }
  };

  const handleDeleteDonation = async (donationId) => {
    if (!window.confirm("Bu ilanı kaldırmak istediğinize emin misiniz? İlan ve bu ilana gelen tüm talepler kalıcı olarak silinecektir.")) return;
    
    try {
      // 1. Önce ilana ait talepleri siliyoruz (foreign key hatası almamak için)
      await supabase.from('requests').delete().eq('donation_id', donationId);
      
      // 2. İlanın kendisini siliyoruz
      const { error } = await supabase.from('donations').delete().eq('id', donationId);
      if (error) throw error;
      
      fetchData();
    } catch (error) {
      alert("Silme işlemi sırasında hata oluştu: " + error.message);
    }
  };

  const openWhatsApp = (phoneStr) => {
    if(!phoneStr) {
      alert("Kullanıcı iletişim numarası sağlamamış.");
      return;
    }
    let cleanPhone = phoneStr.replace(/\D/g, '');
    if (!cleanPhone.startsWith('90')) cleanPhone = '90' + cleanPhone;
    window.open(`https://wa.me/${cleanPhone}`, '_blank');
  };

  const openRatingModal = (donationId, targetUserId) => {
    setRatingDonationId(donationId);
    setRatingTargetUserId(targetUserId);
    setShowRating(true);
  };

  return (
    <div className="space-y-8 mt-6">
      
      {/* Gelen Talepler (Benim İlanlarım) */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 border-b pb-3 mb-4">Benim İlanlarım & Gelen Talepler</h2>
        {myDonations.length === 0 ? (
          <p className="text-gray-500 py-4 text-center">Henüz açılmış bir bağış ilanınız bulunmuyor.</p>
        ) : (
          <div className="space-y-4">
            {myDonations.map(donation => (
              <div key={donation.id} className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-900 border-l-4 border-blue-500 pl-3">
                    {donation.materials_catalog?.item_name || 'Bilinmeyen Materyal'}
                  </h3>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${
                      donation.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {donation.status === 'completed' ? 'TAMAMLANDI' : 'AKTİF'}
                    </span>
                    <button
                      onClick={() => handleDeleteDonation(donation.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded-full transition-colors flex items-center justify-center"
                      title="İlanı Kaldır"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                {donation.requests && donation.requests.length > 0 ? (
                  <div className="mt-4 bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                      <span className="bg-gray-200 text-gray-800 px-2 py-0.5 rounded-full mr-2 text-xs">
                        {donation.requests.length}
                      </span>
                      Talep Listesi:
                    </h4>
                    <div className="space-y-3">
                      {donation.requests.map(req => (
                        <div key={req.id} className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg border ${
                          req.status === 'approved' ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
                        }`}>
                          <div className="mb-3 sm:mb-0">
                            <span className="font-medium text-gray-800">@{req.profiles?.email.split('@')[0]}</span>
                            {userScores[req.requester_id] && (
                              <span className="ml-2 text-xs text-yellow-600 font-semibold bg-yellow-50 px-2 py-0.5 rounded border border-yellow-200">
                                ⭐ {userScores[req.requester_id].avg} ({userScores[req.requester_id].count})
                              </span>
                            )}
                            {req.status === 'approved' && (
                              <span className="ml-2 text-green-700 font-bold text-sm bg-green-100 px-2 py-1 rounded">Onaylandı ✓</span>
                            )}
                            {req.status === 'rejected' && (
                              <span className="ml-2 text-red-500 font-medium text-sm">Reddedildi</span>
                            )}
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-2">
                            {donation.status === 'active' && req.status === 'pending' && (
                              <button 
                                onClick={() => handleApprove(donation.id, req.id)}
                                className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors shadow-sm"
                              >
                                <Check className="w-4 h-4 mr-1.5"/> Kabul Et & WhatsApp İletişimine Geç
                              </button>
                            )}
                            
                            {req.status === 'approved' && req.profiles?.phone_number && (
                              <>
                                <button
                                  onClick={() => openWhatsApp(req.profiles.phone_number)}
                                  className="flex items-center px-4 py-2 bg-[#25D366] hover:bg-[#128C7E] text-white text-sm font-medium rounded-md transition-colors shadow-sm"
                                >
                                  <MessageCircle className="w-4 h-4 mr-1.5"/> WhatsApp
                                </button>
                                {donation.status === 'active' && (
                                  <button
                                    onClick={() => handleDeliver(donation.id, req.id)}
                                    className="flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-md transition-colors shadow-sm"
                                  >
                                    <Check className="w-4 h-4 mr-1.5"/> Teslim Ettim / Kapat
                                  </button>
                                )}
                                <button
                                  onClick={() => openRatingModal(donation.id, req.requester_id)}
                                  className="flex items-center px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium rounded-md transition-colors shadow-sm"
                                >
                                  <Star className="w-4 h-4 mr-1.5"/> Puan Ver
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 mt-2 italic">Henüz bu ilana gelen bir talep yok.</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Yaptığım Talepler */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 border-b pb-3 mb-4">Gönderdiğim Talepler</h2>
        {myRequests.length === 0 ? (
          <p className="text-gray-500 py-4 text-center">Henüz herhangi bir ilan için talepte bulunmadınız.</p>
        ) : (
          <div className="space-y-4">
            {myRequests.map(req => (
              <div key={req.id} className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm flex flex-col md:flex-row md:items-center justify-between hover:border-gray-300 transition-colors">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 border-l-4 border-emerald-500 pl-3">
                    {req.donations?.materials_catalog?.item_name || 'Bilinmeyen Materyal'}
                  </h3>
                  <div className="mt-2 flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Durum:</span>
                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                      req.status === 'approved' ? 'bg-green-100 text-green-800' :
                      req.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {req.status === 'approved' ? 'ONAYLANDI' : 
                       req.status === 'rejected' ? 'REDDEDİLDİ' : 'BEKLİYOR'}
                    </span>
                    {req.donations?.donor_id && userScores[req.donations.donor_id] && (
                      <span className="ml-2 text-xs text-yellow-600 font-semibold bg-yellow-50 px-2 py-0.5 rounded border border-yellow-200">
                        Bağışçı Puanı: ⭐ {userScores[req.donations.donor_id].avg} ({userScores[req.donations.donor_id].count})
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="mt-5 md:mt-0 flex gap-2">
                  {req.status === 'approved' && req.donations?.profiles?.phone_number && (
                    <>
                      <button
                        onClick={() => openWhatsApp(req.donations.profiles.phone_number)}
                        className="flex items-center px-4 py-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white text-sm font-medium rounded-md transition-colors shadow-sm"
                      >
                        <MessageCircle className="w-4 h-4 mr-2"/> Satıcıya WhatsApp'tan Ulaş
                      </button>
                      <button
                        onClick={() => openRatingModal(req.donations.id, req.donations.donor_id)}
                        className="flex items-center px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium rounded-md transition-colors shadow-sm"
                      >
                        <Star className="w-4 h-4 mr-2"/> Puan Ver
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showRating && (
        <RatingModal 
          session={session} 
          donationId={ratingDonationId} 
          targetUserId={ratingTargetUserId} 
          onClose={() => setShowRating(false)} 
        />
      )}
    </div>
  );
}
