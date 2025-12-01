import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Brain, User, Clock, FileText, Cpu, BarChart3, ArrowRight, Check, X, Plus, Minus } from 'lucide-react';

const LandingPage = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      question: "Ödeme yöntemleriniz nelerdir?",
      answer: "Tüm yaygın kredi kartları ve banka kartları ile güvenli bir şekilde ödeme yapabilirsiniz. Ödeme altyapımız uluslararası güvenlik standartlarına uygundur."
    },
    {
      question: "Aboneliğimi istediğim zaman iptal edebilir miyim?",
      answer: "Evet, aboneliğinizi taahhüt süresi olmaksızın istediğiniz zaman panelinizden iptal edebilirsiniz. İptal sonrası, mevcut dönem sonuna kadar kullanım hakkınız devam eder."
    },
    {
      question: "Yıllık planın avantajı nedir?",
      answer: "Yıllık plan, aylık ödemeye göre %10 daha ekonomiktir ve tüm yıl boyunca kesintisiz erişim sağlar. Ayrıca fiyat değişikliklerinden etkilenmezsiniz."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
                <Brain className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">LGS Tahmin</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#features" className="hover:text-blue-600 transition-colors">Özellikler</a>
            <a href="#pricing" className="hover:text-blue-600 transition-colors">Fiyatlandırma</a>
            <a href="#faq" className="hover:text-blue-600 transition-colors">SSS</a>
          </div>
          
          <div className="flex items-center gap-3">
            <Link to="/login" className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md">
              Giriş Yap
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="container mx-auto px-6 py-20 md:py-28">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
          <div className="flex-1 text-center md:text-left space-y-8">
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-[1.15] tracking-tight">
              LGS 2026'ya <br className="hidden md:block" />
              Yapay Zeka <br className="hidden md:block" />
              Destekli Soru <br className="hidden md:block" />
              Tahminleriyle <br className="hidden md:block" />
              Hazırlanın
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-xl mx-auto md:mx-0">
              Yapay zeka algoritmalarımızla geçmiş sınav verilerini analiz ediyor, 
              size özel soru tahminleri ve çalışma stratejileri sunarak sınavda 
              bir adım öne geçmenizi sağlıyoruz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/dashboard" className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200 hover:-translate-y-1 flex items-center justify-center gap-2">
                Şimdi Ücretsiz Dene
              </Link>
            </div>
          </div>
          
          <div className="flex-1 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200 bg-gray-900 aspect-square md:aspect-[4/3] flex items-center justify-center group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-gray-900 opacity-90"></div>
                {/* Abstract Chart Decoration */}
                <div className="relative z-10 p-8">
                    <div className="w-64 h-48 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-4 shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
                        <div className="h-full flex items-end justify-between gap-2">
                            <div className="w-8 bg-blue-500/50 rounded-t-md h-[40%]"></div>
                            <div className="w-8 bg-blue-500/70 rounded-t-md h-[60%]"></div>
                            <div className="w-8 bg-blue-500/90 rounded-t-md h-[80%]"></div>
                            <div className="w-8 bg-blue-400 rounded-t-md h-[50%]"></div>
                            <div className="w-8 bg-green-400 rounded-t-md h-[90%] shadow-[0_0_15px_rgba(74,222,128,0.5)]"></div>
                        </div>
                    </div>
                </div>
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="bg-white py-24 border-y border-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Sınav Başarınızı En Üst Düzeye Çıkarın
            </h2>
            <p className="text-gray-600 text-lg">
              LGS Tahmin, modern teknolojiyi kullanarak öğrencilere benzersiz bir hazırlık deneyimi sunar. 
              İşte sizi başarıya taşıyacak temel özelliklerimiz:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {/* Card 1 */}
            <div className="bg-gray-50 p-8 rounded-3xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100 group">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Brain size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Yapay Zeka Destekli Analiz</h3>
              <p className="text-gray-600 leading-relaxed">
                Gelişmiş algoritmalarımız, binlerce soruyu analiz ederek çıkması muhtemel konu ve soru tiplerini yüksek doğrulukla belirler.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-gray-50 p-8 rounded-3xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100 group">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <User size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Kişiselleştirilmiş Tahminler</h3>
              <p className="text-gray-600 leading-relaxed">
                Performansınıza göre size özel olarak hazırlanan tahminler ve deneme sınavları ile eksiklerinizi anında tespit edin.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-gray-50 p-8 rounded-3xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100 group">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Clock size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Zaman Yönetimi Stratejileri</h3>
              <p className="text-gray-600 leading-relaxed">
                Sınav anında zamanı en verimli şekilde kullanmanız için size özel taktikler ve öneriler sunar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Nasıl Çalışır?</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Sadece üç basit adımda LGS başarınızı garantileyin. Süreci sizin için kolay ve anlaşılır hale getirdik.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Vertical Line */}
            <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2 hidden md:block"></div>
            <div className="absolute left-[27px] top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2 md:hidden"></div>

            <div className="space-y-12 md:space-y-24">
              {/* Step 1 */}
              <div className="relative flex flex-col md:flex-row gap-8 md:gap-0 items-start md:items-center group">
                <div className="md:w-1/2 md:pr-12 md:text-right order-2 md:order-1 pl-16 md:pl-0">
                  <span className="text-sm font-bold text-blue-600 tracking-wider uppercase mb-2 block">Adım 1</span>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Veri Analizi</h3>
                  <p className="text-gray-600">
                    Geçmiş LGS sorularını ve MEB kazanımlarını derinlemesine analiz ediyoruz.
                  </p>
                </div>
                <div className="absolute left-[27px] md:left-1/2 -translate-x-1/2 w-14 h-14 bg-blue-100 rounded-full border-4 border-white flex items-center justify-center z-10 order-1 md:order-2 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <FileText size={24} className="text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <div className="md:w-1/2 md:pl-12 order-3 hidden md:block"></div>
              </div>

              {/* Step 2 */}
              <div className="relative flex flex-col md:flex-row gap-8 md:gap-0 items-start md:items-center group">
                <div className="md:w-1/2 md:pr-12 hidden md:block"></div>
                <div className="absolute left-[27px] md:left-1/2 -translate-x-1/2 w-14 h-14 bg-blue-100 rounded-full border-4 border-white flex items-center justify-center z-10 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Cpu size={24} className="text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <div className="md:w-1/2 md:pl-12 order-2 pl-16 md:pl-0">
                  <span className="text-sm font-bold text-blue-600 tracking-wider uppercase mb-2 block">Adım 2</span>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Tahmin Oluşturma</h3>
                  <p className="text-gray-600">
                    Yapay zeka modelimiz, analiz sonuçlarına göre kişiselleştirilmiş soru tahminleri üretir.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative flex flex-col md:flex-row gap-8 md:gap-0 items-start md:items-center group">
                <div className="md:w-1/2 md:pr-12 md:text-right order-2 md:order-1 pl-16 md:pl-0">
                  <span className="text-sm font-bold text-blue-600 tracking-wider uppercase mb-2 block">Adım 3</span>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Raporlama ve Gelişim</h3>
                  <p className="text-gray-600">
                    Performans raporları ile eksiklerinizi görün ve çalışma planınızı optimize edin.
                  </p>
                </div>
                <div className="absolute left-[27px] md:left-1/2 -translate-x-1/2 w-14 h-14 bg-blue-100 rounded-full border-4 border-white flex items-center justify-center z-10 order-1 md:order-2 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <BarChart3 size={24} className="text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <div className="md:w-1/2 md:pl-12 order-3 hidden md:block"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-gray-50 py-24">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Sana En Uygun Planı Seç</h2>
            <p className="text-gray-600 text-lg mb-10">
              LGS 2026'ya en iyi tahminlerle hazırlanarak rakiplerinin önüne geç.
            </p>

            {/* Toggle */}
            <div className="bg-white p-1 rounded-full inline-flex border border-gray-200">
              <button 
                onClick={() => setIsAnnual(false)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${!isAnnual ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
              >
                Aylık
              </button>
              <button 
                onClick={() => setIsAnnual(true)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${isAnnual ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
              >
                Yıllık (%10 İndirimli)
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            
            {/* Basic Plan */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow flex flex-col">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900">Temel</h3>
                <div className="flex items-end gap-1 mt-4">
                    <span className="text-4xl font-extrabold text-gray-900">₺{isAnnual ? '890' : '99'}</span>
                    <span className="text-gray-500 mb-1">{isAnnual ? '/yıl' : '/ay'}</span>
                </div>
                <p className="text-sm text-gray-500 mt-4">Bireysel öğrenciler için harika bir başlangıç.</p>
              </div>
              
              <div className="space-y-4 mb-8 flex-1">
                <div className="flex items-center gap-3">
                    <Check size={18} className="text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">100 Soru Tahmini</span>
                </div>
                <div className="flex items-center gap-3">
                    <Check size={18} className="text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">Temel Analizler</span>
                </div>
                <div className="flex items-center gap-3">
                    <Check size={18} className="text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">Standart Destek</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                    <X size={18} className="flex-shrink-0" />
                    <span className="text-sm line-through">Deneme Sınavları (Kısıtlı)</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                    <X size={18} className="flex-shrink-0" />
                    <span className="text-sm line-through">Çoklu Kullanıcı Erişimi</span>
                </div>
              </div>

              <button className="w-full bg-gray-50 text-gray-900 font-semibold py-3 rounded-xl hover:bg-gray-100 transition-colors">
                Planı Seç
              </button>
            </div>

            {/* Pro Plan (Popular) */}
            <div className="bg-white p-8 rounded-3xl shadow-xl border-2 border-blue-600 relative flex flex-col scale-105 z-10">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                En Popüler
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900">Pro</h3>
                <div className="flex items-end gap-1 mt-4">
                    <span className="text-4xl font-extrabold text-gray-900">₺{isAnnual ? '1790' : '199'}</span>
                    <span className="text-gray-500 mb-1">{isAnnual ? '/yıl' : '/ay'}</span>
                </div>
                <p className="text-sm text-gray-500 mt-4">Hedeflerini yükselten ciddi öğrenciler için.</p>
              </div>
              
              <div className="space-y-4 mb-8 flex-1">
                <div className="flex items-center gap-3">
                    <Check size={18} className="text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">500 Soru Tahmini</span>
                </div>
                <div className="flex items-center gap-3">
                    <Check size={18} className="text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">Detaylı Performans Analizi</span>
                </div>
                <div className="flex items-center gap-3">
                    <Check size={18} className="text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">Öncelikli Destek</span>
                </div>
                <div className="flex items-center gap-3">
                    <Check size={18} className="text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">Tüm Deneme Sınavları</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                    <X size={18} className="flex-shrink-0" />
                    <span className="text-sm line-through">Çoklu Kullanıcı Erişimi</span>
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-200">
                Hemen Abone Ol
              </button>
            </div>

            {/* Premium Plan */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow flex flex-col">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900">Premium</h3>
                <div className="flex items-end gap-1 mt-4">
                    <span className="text-4xl font-extrabold text-gray-900">₺{isAnnual ? '2690' : '299'}</span>
                    <span className="text-gray-500 mb-1">{isAnnual ? '/yıl' : '/ay'}</span>
                </div>
                <p className="text-sm text-gray-500 mt-4">Sınırsız potansiyel, en iyisini isteyenler için.</p>
              </div>
              
              <div className="space-y-4 mb-8 flex-1">
                <div className="flex items-center gap-3">
                    <Check size={18} className="text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">Sınırsız Soru Tahmini</span>
                </div>
                <div className="flex items-center gap-3">
                    <Check size={18} className="text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">Gelişmiş Analizler</span>
                </div>
                <div className="flex items-center gap-3">
                    <Check size={18} className="text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">7/24 Özel Destek</span>
                </div>
                <div className="flex items-center gap-3">
                    <Check size={18} className="text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">Tüm Deneme Sınavları</span>
                </div>
                <div className="flex items-center gap-3">
                    <Check size={18} className="text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">Çoklu Kullanıcı Erişimi (5 kullanıcı)</span>
                </div>
              </div>

              <button className="w-full bg-gray-50 text-gray-900 font-semibold py-3 rounded-xl hover:bg-gray-100 transition-colors">
                Planı Seç
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-white py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">Sıkça Sorulan Sorular</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Aklınızda Soru Kalmasın</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl overflow-hidden transition-all duration-300">
                <button 
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                  className="w-full flex items-center justify-between p-6 text-left font-bold text-gray-900 hover:bg-gray-100 transition-colors"
                >
                  {faq.question}
                  {openFaq === index ? <Minus size={20} className="text-blue-600" /> : <Plus size={20} className="text-gray-400" />}
                </button>
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12 border-t border-gray-100">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
                <Brain className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl text-gray-900">LGS Tahmin</span>
          </div>
          
          <div className="flex gap-8 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-900">Hizmet Şartları</a>
            <a href="#" className="hover:text-gray-900">Gizlilik Politikası</a>
          </div>
          
          <div className="text-sm text-gray-400">
            &copy; 2024 LGS Tahmin. Tüm hakları saklıdır.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
