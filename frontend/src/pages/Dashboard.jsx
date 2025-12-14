import React, { useState, useEffect } from 'react';
import { Plus, ArrowRight, Target, BookOpen, Award } from 'lucide-react';
import { getDashboardStats } from '../services/api';
import { useNavigate } from 'react-router-dom';

const StatCard = ({ title, value, extra, type, icon: Icon }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        {Icon && <div className="p-2 bg-gray-50 rounded-lg text-gray-400"><Icon size={18} /></div>}
      </div>
      <div className="flex items-end justify-between">
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        {extra && <p className={`text-sm font-semibold ${type === 'success' ? 'text-green-500' : 'text-gray-900'}`}>{extra}</p>}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [analyses, setAnalyses] = useState([]);
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
      setAnalyses(data.recent_analyses);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
      return <div className="text-center p-10 text-gray-500">Veriler yükleniyor...</div>;
  }

  const statCards = stats ? [
    { title: 'Kalan Analiz Hakkı', value: stats.usage_quota, extra: '', type: 'neutral', icon: Target },
    { title: 'Toplam Analiz', value: stats.total_analyses, extra: '', type: 'neutral', icon: BookOpen },
    { title: 'Uzmanlaşılan Konular', value: stats.mastered_topics, extra: 'Harika!', type: 'success', icon: Award },
    { title: 'Abonelik', value: stats.subscription_plan, extra: stats.is_subscribed ? 'Aktif' : 'Pasif', type: 'neutral', icon: null },
  ] : [];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
            <h1 className="text-3xl font-bold text-gray-900">Hoş Geldiniz, {user?.username || 'Öğrenci'}!</h1>
            <p className="text-gray-500 mt-2">Bugün hangi derse odaklanmak istersin?</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button 
              onClick={() => navigate('/dashboard/predict')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 shadow-md transition-all flex-1 md:flex-none justify-center"
          >
              <Plus size={20} />
              Yeni Konu Analizi
          </button>
          <button 
              onClick={() => navigate('/dashboard/questions')}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 shadow-md transition-all flex-1 md:flex-none justify-center"
          >
              <BookOpen size={20} />
              Sorular
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Recent Analyses / Focused Topics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900">Önerilen Çalışma Programı</h2>
            <button className="text-sm text-blue-600 font-medium hover:underline">Tümünü Gör</button>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-gray-500 font-medium uppercase text-xs">
                    <tr>
                        <th className="px-6 py-4">Ders</th>
                        <th className="px-6 py-4">Odak Konusu</th>
                        <th className="px-6 py-4">Çıkma Olasılığı</th>
                        <th className="px-6 py-4">Tavsiye</th>
                        <th className="px-6 py-4">Tarih</th>
                        <th className="px-6 py-4"></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {analyses.length > 0 ? (
                        analyses.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50 transition-colors group">
                                <td className="px-6 py-4 font-medium text-gray-900">{item.subject}</td>
                                <td className="px-6 py-4 font-medium text-blue-600">{item.topic_name}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div className="h-full bg-green-500" style={{ width: `${item.relevance_score}%` }}></div>
                                        </div>
                                        <span className="text-xs font-bold text-gray-700">%{item.relevance_score}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-500 max-w-xs truncate" title={item.recommendation}>
                                    {item.recommendation}
                                </td>
                                <td className="px-6 py-4 text-gray-400">{new Date(item.created_at).toLocaleDateString('tr-TR')}</td>
                                <td className="px-6 py-4 text-right">
                                    <button 
                                        onClick={() => navigate(`/dashboard/questions?topic=${encodeURIComponent(item.topic_name)}`)}
                                        className="text-gray-400 hover:text-blue-600 p-1 rounded-full hover:bg-blue-50 transition-all"
                                        title="Bu konudan soru üret"
                                    >
                                        <ArrowRight size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                <div className="flex flex-col items-center gap-3">
                                    <BookOpen size={48} className="text-gray-200" />
                                    <p>Henüz bir analiz yapmadın. İlk analizini başlatarak çalışma rotanı belirle!</p>
                                </div>
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
