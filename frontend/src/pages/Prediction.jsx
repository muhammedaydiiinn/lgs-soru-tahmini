import React, { useState } from 'react';
import { Target, Sparkles, BookOpen, ArrowRight, Loader2 } from 'lucide-react';
import { analyzeTopic } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Prediction = () => {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const subjects = [
    "Matematik", "Fen Bilimleri", "Türkçe", "İnkılap Tarihi", "İngilizce", "Din Kültürü"
  ];

  const handleAnalysis = async () => {
    if (!selectedSubject) return;
    
    setLoading(true);
    setError(null);
    try {
      await analyzeTopic(selectedSubject);
      // Redirect to dashboard to see the result in the list
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError("Analiz başlatılamadı. Lütfen tekrar deneyin veya kotanızı kontrol edin.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Yeni Konu Analizi Başlat</h1>
        <p className="text-gray-500">
          Yapay zeka destekli sistemimiz, seçtiğin ders için en stratejik çalışma alanını belirlesin.
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <BookOpen className="text-blue-600" size={20} />
            Ders Seçimi
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {subjects.map((subject) => (
                <button
                    key={subject}
                    onClick={() => setSelectedSubject(subject)}
                    className={`p-4 rounded-xl border text-left transition-all hover:shadow-md ${
                        selectedSubject === subject 
                        ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' 
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                >
                    <span className={`font-medium ${selectedSubject === subject ? 'text-blue-700' : 'text-gray-700'}`}>
                        {subject}
                    </span>
                </button>
            ))}
        </div>

        {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm">
                {error}
            </div>
        )}

        <div className="flex justify-end">
            <button
                onClick={handleAnalysis}
                disabled={!selectedSubject || loading}
                className={`
                    flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all
                    ${!selectedSubject || loading 
                        ? 'bg-gray-300 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-blue-200 hover:-translate-y-1'}
                `}
            >
                {loading ? (
                    <>
                        <Loader2 size={20} className="animate-spin" />
                        Analiz Yapılıyor...
                    </>
                ) : (
                    <>
                        <Sparkles size={20} />
                        Analizi Başlat
                    </>
                )}
            </button>
        </div>
      </div>

      <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 flex gap-4">
        <div className="p-3 bg-white rounded-full h-fit text-blue-600 shadow-sm">
            <Target size={24} />
        </div>
        <div>
            <h3 className="font-semibold text-blue-900 mb-1">Nasıl Çalışır?</h3>
            <p className="text-sm text-blue-800 leading-relaxed">
                Sistem, seçtiğiniz dersin müfredatını ve geçmiş sınav verilerini tarar. 
                Sizin için en yüksek getiriye sahip "Odak Konusu"nu ve ona uygun çalışma stratejisini belirler.
                Sonuçlar anında panelinize eklenir.
            </p>
        </div>
      </div>
    </div>
  );
};

export default Prediction;
