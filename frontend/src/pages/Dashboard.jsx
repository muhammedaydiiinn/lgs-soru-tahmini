import React from 'react';
import { Plus, ArrowRight } from 'lucide-react';

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
  const stats = [
    { title: 'Kalan Tahmin Hakkı', value: '12', extra: '', type: 'neutral' },
    { title: 'Toplam Tahmin', value: '8', extra: '', type: 'neutral' },
    { title: 'Başarı Oranı', value: '82%', extra: '', type: 'success' },
    { title: 'Abonelik', value: 'Pro', extra: '', type: 'neutral' },
  ];

  const recentPredictions = [
    { id: '#T84H12', date: '12 Mayıs 2024', subject: 'Matematik', topic: 'Üslü İfadeler', status: 'Tamamlandı', statusColor: 'bg-green-100 text-green-700' },
    { id: '#G56J89', date: '10 Mayıs 2024', subject: 'Fen Bilimleri', topic: 'DNA ve Genetik Kod', status: 'Tamamlandı', statusColor: 'bg-green-100 text-green-700' },
    { id: '#K23L45', date: '8 Mayıs 2024', subject: 'Türkçe', topic: 'Paragrafta Anlam', status: 'Tamamlandı', statusColor: 'bg-green-100 text-green-700' },
    { id: '#P98O76', date: '5 Mayıs 2024', subject: 'İngilizce', topic: 'Simple Present Tense', status: 'Hatalı', statusColor: 'bg-red-100 text-red-700' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex justify-between items-end">
        <div>
            <h1 className="text-3xl font-bold text-gray-900">Hoş Geldiniz, Ahmet!</h1>
            <p className="text-gray-500 mt-2">LGS 2026 tahminlerinize buradan başlayın.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 shadow-md transition-all">
            <Plus size={20} />
            Yeni Tahmin Yap
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
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
                        <th className="px-6 py-4">Ders</th>
                        <th className="px-6 py-4">Konu</th>
                        <th className="px-6 py-4">Durum</th>
                        <th className="px-6 py-4"></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {recentPredictions.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 font-medium text-gray-900">{item.id}</td>
                            <td className="px-6 py-4">{item.date}</td>
                            <td className="px-6 py-4">{item.subject}</td>
                            <td className="px-6 py-4">{item.topic}</td>
                            <td className="px-6 py-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.statusColor}`}>
                                    {item.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">Detaylar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

