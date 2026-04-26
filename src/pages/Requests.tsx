import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type Request = {
  id: string;
  ilan_id: string;
  alici_id: string;
  satici_id: string;
  durum: string;
};

export default function Requests() {
  const [incoming, setIncoming] = useState<Request[]>([]);
  const [sent, setSent] = useState<Request[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  async function fetchRequests() {
    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      return;
    }

    const currentUserId = userData.user.id;
    setUserId(currentUserId);

    const { data, error } = await supabase
      .from("talepler")
      .select("*")
      .or(`alici_id.eq.${currentUserId},satici_id.eq.${currentUserId}`);

    if (error) {
      console.error(error);
      return;
    }

    setIncoming((data ?? []).filter((r) => r.satici_id === currentUserId));
    setSent((data ?? []).filter((r) => r.alici_id === currentUserId));
  }

  async function updateRequestStatus(id: string, durum: string) {
    const { error } = await supabase
      .from("talepler")
      .update({ durum })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    fetchRequests();
  }

  if (!userId) {
    return (
      <div className="p-6">
        <p className="text-gray-600">Talepleri görmek için giriş yapmalısın.</p>
      </div>
    );
  }

  return (
    <div className="px-6 py-10">
      <h1 className="text-3xl font-bold text-slate-900">Talepler</h1>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-slate-800">Gelen Talepler</h2>

        <div className="mt-4 space-y-4">
          {incoming.length === 0 ? (
            <p className="text-gray-500">Gelen talep yok.</p>
          ) : (
            incoming.map((request) => (
              <div key={request.id} className="rounded-lg border bg-white p-4">
                <p>İlan ID: {request.ilan_id}</p>
                <p>Durum: {request.durum}</p>

                {request.durum === "beklemede" && (
                  <div className="mt-3 flex gap-3">
                    <button
                      onClick={() =>
                        updateRequestStatus(request.id, "onaylandi")
                      }
                      className="rounded bg-green-600 px-4 py-2 text-white"
                    >
                      Onayla
                    </button>

                    <button
                      onClick={() =>
                        updateRequestStatus(request.id, "reddedildi")
                      }
                      className="rounded bg-red-600 px-4 py-2 text-white"
                    >
                      Reddet
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-slate-800">
          Gönderilen Talepler
        </h2>

        <div className="mt-4 space-y-4">
          {sent.length === 0 ? (
            <p className="text-gray-500">Gönderilen talep yok.</p>
          ) : (
            sent.map((request) => (
              <div key={request.id} className="rounded-lg border bg-white p-4">
                <p>İlan ID: {request.ilan_id}</p>
                <p>Durum: {request.durum}</p>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
