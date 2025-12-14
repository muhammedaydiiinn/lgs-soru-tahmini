import React, { useState, useEffect } from 'react';
import { BookOpen, Plus, Loader2, CheckCircle2, XCircle, Lightbulb, Calendar } from 'lucide-react';
import { getQuestions, generateQuestion, getQuestionDetail } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Questions = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generatingTopic, setGeneratingTopic] = useState(null);
  const [filters, setFilters] = useState({
    topic_name: '',
    difficulty: ''
  });

  const turkishTopics = [
    "Paragrafta Anlam",
    "Sözcükte Anlam",
    "Cümlenin Ögeleri",
    "Fiilimsiler",
    "Cümlede Anlam",
    "Yazım Kuralları",
    "Noktalama İşaretleri",
    "Sözel Mantık"
  ];

  const difficulties = [
    { value: 'easy', label: 'Kolay' },
    { value: 'medium', label: 'Orta' },
    { value: 'hard', label: 'Zor' }
  ];

  useEffect(() => {
    fetchQuestions();
  }, [filters]);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const data = await getQuestions({ subject: 'Türkçe', ...filters });
      setQuestions(data.questions || []);
    } catch (error) {
      console.error("Sorular yüklenirken hata:", error);
    } finally {
      setLoading(false);
    }
  };

  const [error, setError] = useState(null);

  const handleGenerateQuestion = async (topicName) => {
    try {
      setGenerating(true);
      setGeneratingTopic(topicName);
      setError(null);
      const data = await generateQuestion(topicName, 'medium', true);
      if (data.question) {
        await fetchQuestions();
        // Yeni oluşturulan soruyu göster
        const questionDetail = await getQuestionDetail(data.question.id);
        setSelectedQuestion(questionDetail);
        setSelectedAnswer(null);
        setShowExplanation(false);
      }
    } catch (error) {
      console.error("Soru üretilirken hata:", error);
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          error.response?.data?.details ||
                          "Soru üretilirken bir hata oluştu. Lütfen tekrar deneyin.";
      setError(errorMessage);
    } finally {
      setGenerating(false);
      setGeneratingTopic(null);
    }
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    setShowExplanation(true);
  };

  const getAnswerClass = (option) => {
    if (!showExplanation) return '';
    if (option === selectedQuestion.correct_answer) {
      return 'bg-green-50 border-green-500 text-green-700';
    }
    if (option === selectedAnswer && option !== selectedQuestion.correct_answer) {
      return 'bg-red-50 border-red-500 text-red-700';
    }
    return 'bg-gray-50';
  };

  if (loading && questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin text-blue-600" size={48} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Türkçe Soruları</h1>
          <p className="text-gray-500 mt-2">Güncel olaylarla entegre edilmiş LGS Türkçe soruları</p>
        </div>
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2"
        >
          <BookOpen size={20} />
          Dashboard'a Dön
        </button>
      </div>

      {/* Generating Alert */}
      {generating && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg mb-4 animate-pulse">
          <div className="flex items-center">
            <Loader2 className="animate-spin text-blue-600 mr-3 flex-shrink-0" size={20} />
            <div className="flex-1">
              <h3 className="text-blue-800 font-semibold mb-1">Soru Üretiliyor...</h3>
              <p className="text-blue-700 text-sm">
                {generatingTopic ? `"${generatingTopic}" konusu için soru oluşturuluyor. Lütfen bekleyin...` : "Soru oluşturuluyor. Lütfen bekleyin..."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-4">
          <div className="flex items-start">
            <XCircle className="text-red-500 mr-3 mt-0.5 flex-shrink-0" size={20} />
            <div className="flex-1">
              <h3 className="text-red-800 font-semibold mb-1">Hata Oluştu</h3>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-red-500 hover:text-red-700 ml-4"
            >
              <XCircle size={20} />
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sol Panel - Soru Listesi ve Filtreler */}
        <div className="lg:col-span-1 space-y-4">
          {/* Filtreler */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4">Filtreler</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Konu</label>
                <select
                  value={filters.topic_name}
                  onChange={(e) => setFilters({ ...filters, topic_name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Tüm Konular</option>
                  {turkishTopics.map(topic => (
                    <option key={topic} value={topic}>{topic}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Zorluk</label>
                <select
                  value={filters.difficulty}
                  onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Tüm Seviyeler</option>
                  {difficulties.map(diff => (
                    <option key={diff.value} value={diff.value}>{diff.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Hızlı Soru Üret */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4">Hızlı Soru Üret</h3>
            <div className="space-y-2">
              {turkishTopics.slice(0, 4).map(topic => (
                <button
                  key={topic}
                  onClick={() => handleGenerateQuestion(topic)}
                  disabled={generating}
                  className="w-full text-left px-3 py-2 text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 relative"
                >
                  {generating && generatingTopic === topic ? (
                    <>
                      <Loader2 className="animate-spin" size={16} />
                      <span>Üretiliyor...</span>
                    </>
                  ) : (
                    <>
                      <Plus size={16} />
                      <span>{topic}</span>
                    </>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Soru Listesi */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">Sorular ({questions.length})</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {questions.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {questions.map((q) => (
                    <button
                      key={q.id}
                      onClick={() => {
                        setSelectedQuestion(q);
                        setSelectedAnswer(null);
                        setShowExplanation(false);
                      }}
                      className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                        selectedQuestion?.id === q.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 line-clamp-2">
                            {q.question_text.substring(0, 60)}...
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs text-gray-500">{q.topic_name}</span>
                            <span className="text-xs px-2 py-1 bg-gray-100 rounded text-gray-600">
                              {difficulties.find(d => d.value === q.difficulty)?.label || q.difficulty}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-gray-500">
                  <BookOpen size={48} className="mx-auto mb-4 text-gray-200" />
                  <p>Henüz soru yok. İlk sorunuzu oluşturun!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sağ Panel - Soru Detayı */}
        <div className="lg:col-span-2">
          {generating && !selectedQuestion ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12">
              <div className="flex flex-col items-center justify-center text-center">
                <Loader2 className="animate-spin text-blue-600 mb-4" size={48} />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Soru Üretiliyor</h3>
                <p className="text-gray-600 mb-4">
                  {generatingTopic ? `"${generatingTopic}" konusu için soru oluşturuluyor...` : "Soru oluşturuluyor..."}
                </p>
                <div className="w-full max-w-md bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                </div>
                <p className="text-sm text-gray-500 mt-4">Bu işlem birkaç saniye sürebilir...</p>
              </div>
            </div>
          ) : selectedQuestion ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
              {/* Soru Başlığı */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                      {selectedQuestion.topic_name}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">
                      {difficulties.find(d => d.value === selectedQuestion.difficulty)?.label || selectedQuestion.difficulty}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    {selectedQuestion.question_text}
                  </h2>
                </div>
              </div>

              {/* Güncel Olay Bağlamı */}
              {selectedQuestion.current_event_context && (
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="text-blue-600 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-1">Güncel Olay Bağlamı</h4>
                      <p className="text-sm text-blue-800">{selectedQuestion.current_event_context}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Şıklar */}
              <div className="space-y-3">
                {['A', 'B', 'C', 'D'].map((option) => {
                  const optionKey = `option_${option.toLowerCase()}`;
                  const optionText = selectedQuestion[optionKey];
                  
                  return (
                    <button
                      key={option}
                      onClick={() => handleAnswerSelect(option)}
                      disabled={showExplanation}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        getAnswerClass(option)
                      } ${
                        !showExplanation 
                          ? 'border-gray-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer' 
                          : 'cursor-default'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="font-bold text-lg">{option})</span>
                        <span className="flex-1">{optionText}</span>
                        {showExplanation && option === selectedQuestion.correct_answer && (
                          <CheckCircle2 className="text-green-600" size={24} />
                        )}
                        {showExplanation && option === selectedAnswer && option !== selectedQuestion.correct_answer && (
                          <XCircle className="text-red-600" size={24} />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Açıklama */}
              {showExplanation && selectedQuestion.explanation && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="text-green-600 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-green-900 mb-2">Çözüm Açıklaması</h4>
                      <p className="text-sm text-green-800">{selectedQuestion.explanation}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Tarih */}
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <Calendar size={16} />
                {new Date(selectedQuestion.created_at).toLocaleDateString('tr-TR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
              <BookOpen size={64} className="mx-auto mb-4 text-gray-200" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Soru Seçin</h3>
              <p className="text-gray-500">Sol panelden bir soru seçerek başlayın veya yeni bir soru oluşturun.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Questions;

