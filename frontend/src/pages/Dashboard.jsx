import React, { useState, useEffect } from 'react';
import { Plus, ArrowRight } from 'lucide-react';
import { getDashboardStats, makePrediction } from '../services/api';

const StatCard = ({ title, value, extra, type }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-gray-500 text-sm font-medium mb-2">{title}</h3>
      <div className="flex items-end justify-between">
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        {extra && <p className={`text-sm font-semibold ${type === 'success' ? 'text-green-500' : 'text-gray-900'}`}>{extra}</p>}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data.stats);
      setPredictions(data.recent_predictions);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
      return <div className="text-center p-10">Yükleniyor...</div>;
  }

  const statCards = stats ? [
    { title: 'Kalan Tahmin Hakkı', value: stats.usage_quota, extra: '', type: 'neutral' },
    { title: 'Toplam Tahmin', value: stats.total_predictions, extra: '', type: 'neutral' },
    { title: 'Başarı Oranı', value: stats.success_rate, extra: '', type: 'success' },
    { title: 'Abonelik', value: stats.subscription_plan, extra: stats.is_subscribed ? 'Aktif' : 'Pasif', type: 'neutral' },
  ] : [];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex justify-between items-end">
        <div>
            <h1 className="text-3xl font-bold text-gray-900">Hoş Geldiniz, {user?.username || 'Kullanıcı'}!</h1>
            <p className="text-gray-500 mt-2">LGS 2026 tahminlerinize buradan başlayın.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 shadow-md transition-all">
            <Plus size={20} />
            Yeni Tahmin Yap
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Recent Predictions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">Son Tahminler</h2>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-gray-500 font-medium uppercase text-xs">
                    <tr>
                        <th className="px-6 py-4">Tahmin ID</th>
                        <th className="px-6 py-4">Tarih</th>
                        <th className="px-6 py-4">Soru (Özet)</th>
                        <th className="px-6 py-4">Tahmin</th>
                        <th className="px-6 py-4">Durum</th>
                        <th className="px-6 py-4"></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {predictions.length > 0 ? (
                        predictions.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-900">#{item.id}</td>
                                <td className="px-6 py-4">{new Date(item.created_at).toLocaleDateString('tr-TR')}</td>
                                <td className="px-6 py-4 truncate max-w-xs">{item.question_text.substring(0, 50)}...</td>
                                <td className="px-6 py-4">{item.predicted_category}</td>
                                <td className="px-6 py-4">
                                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                        Tamamlandı
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">Detaylar</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                                Henüz hiç tahmin yapmadınız.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
