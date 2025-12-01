import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Brain, User, Clock, FileText, Cpu, BarChart3, ArrowRight, Check, X, Plus, Minus, Target, BookOpen } from 'lucide-react';

const LandingPage = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      question: "Konu analizleri nasıl belirleniyor?",
      answer: "Yapay zeka algoritmamız, son 10 yılın LGS ve MEB örnek sorularını analiz ederek, bu yıl hangi konulardan soru gelme ihtimalinin yüksek olduğunu istatistiksel olarak belirler."
    },
    {
      question: "Sadece soru tahmini mi yapıyorsunuz?",
      answer: "Hayır, amacımız sadece 'bu soru çıkar' demek değil. Hangi konularda eksiğiniz olduğunu ve sınava kadar hangi konulara öncelik vermeniz gerektiğini gösteren stratejik bir çalışma planı sunuyoruz."
    },
    {
      question: "Kişiselleştirilmiş program nasıl çalışıyor?",
      answer: "Sizin deneme sonuçlarınızı ve sistem üzerindeki analizlerinizi takip ederek, güçlü ve zayıf yönlerinize göre size özel haftalık çalışma önerileri oluşturuyoruz."
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
            <span className="font-bold text-xl tracking-tight text-gray-900">LGS Strateji</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#features" className="hover:text-blue-600 transition-colors">Özellikler</a>
            <a href="#pricing" className="hover:text-blue-600 transition-colors">Paketler</a>
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
              Akıllı Konu <br className="hidden md:block" />
              Analizleriyle <br className="hidden md:block" />
              Hazırlanın
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-xl mx-auto md:mx-0">
              Neye çalışacağınızı bilmek başarının yarısıdır. Yapay zeka destekli sistemimizle 
              hangi konulara odaklanmanız gerektiğini keşfedin, zamanınızı en verimli şekilde yönetin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/dashboard" className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200 hover:-translate-y-1 flex items-center justify-center gap-2">
                Ücretsiz Analiz Yap
              </Link>
            </div>
          </div>
          
          <div className="flex-1 relative">
             {/* Same chart graphic but concept focused on strategy */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200 bg-gray-900 aspect-square md:aspect-[4/3] flex items-center justify-center group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-gray-900 opacity-90"></div>
                <div className="relative z-10 p-8">
                    <div className="w-64 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-6 shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-white text-sm">
                                <span>Odak Konusu: Üslü Sayılar</span>
                                <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs">%92 Önem</span>
                            </div>
                            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 w-[85%]"></div>
                            </div>
                            <div className="flex gap-2 mt-4">
                                <div className="h-16 w-1/3 bg-blue-500/20 rounded border border-blue-500/30 flex flex-col items-center justify-center">
                                    <Target size={16} className="text-blue-400 mb-1" />
                                    <span className="text-[10px] text-blue-200">Hedef</span>
                                </div>
                                <div className="h-16 w-1/3 bg-purple-500/20 rounded border border-purple-500/30 flex flex-col items-center justify-center">
                                    <BookOpen size={16} className="text-purple-400 mb-1" />
                                    <span className="text-[10px] text-purple-200">Çalışma</span>
                                </div>
                                <div className="h-16 w-1/3 bg-green-500/20 rounded border border-green-500/30 flex flex-col items-center justify-center">
                                    <BarChart3 size={16} className="text-green-400 mb-1" />
                                    <span className="text-[10px] text-green-200">Gelişim</span>
                                </div>
                            </div>
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
              Sınav Başarınızı Şansa Bırakmayın
            </h2>
            <p className="text-gray-600 text-lg">
              LGS Strateji ile sadece ders çalışmayın, doğru yere çalışın.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {/* Card 1 */}
            <div className="bg-gray-50 p-8 rounded-3xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100 group">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Nokta Atışı Konu Analizi</h3>
              <p className="text-gray-600 leading-relaxed">
                Müfredattaki her konunun sınavdaki ağırlığını analiz eder, çalışmanız gereken öncelikli alanları belirler.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-gray-50 p-8 rounded-3xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100 group">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <User size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Kişisel Gelişim Rotası</h3>
              <p className="text-gray-600 leading-relaxed">
                Sizin eksiklerinize göre şekillenen, dinamik bir çalışma takvimi ve konu sıralaması sunar.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-gray-50 p-8 rounded-3xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100 group">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Clock size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Verimli Zaman Yönetimi</h3>
              <p className="text-gray-600 leading-relaxed">
                Az zamanda çok iş başarmak için hangi konuya ne kadar vakit ayırmanız gerektiğini planlar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-gray-50 py-24">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Geleceğine Yatırım Yap</h2>
            <p className="text-gray-600 text-lg mb-10">
              LGS 2026 yolculuğunda profesyonel strateji desteği al.
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
                <p className="text-sm text-gray-500 mt-4">Başlangıç seviyesi için konu analizleri.</p>
              </div>
              
              <div className="space-y-4 mb-8 flex-1">
                <div className="flex items-center gap-3">
                    <Check size={18} className="text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">Aylık 5 Konu Analizi</span>
                </div>
                <div className="flex items-center gap-3">
                    <Check size={18} className="text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">Temel İstatistikler</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                    <X size={18} className="flex-shrink-0" />
                    <span className="text-sm line-through">Detaylı Yol Haritası</span>
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
                <p className="text-sm text-gray-500 mt-4">Ciddi hazırlanmak isteyenler için.</p>
              </div>
              
              <div className="space-y-4 mb-8 flex-1">
                <div className="flex items-center gap-3">
                    <Check size={18} className="text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">Sınırsız Konu Analizi</span>
                </div>
                <div className="flex items-center gap-3">
                    <Check size={18} className="text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">Kişisel Çalışma Programı</span>
                </div>
                <div className="flex items-center gap-3">
                    <Check size={18} className="text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">Gelişim Raporları</span>
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-200">
                Hemen Abone Ol
              </button>
            </div>

            {/* Premium Plan */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow flex flex-col">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900">Koçluk</h3>
                <div className="flex items-end gap-1 mt-4">
                    <span className="text-4xl font-extrabold text-gray-900">₺{isAnnual ? '2690' : '299'}</span>
                    <span className="text-gray-500 mb-1">{isAnnual ? '/yıl' : '/ay'}</span>
                </div>
                <p className="text-sm text-gray-500 mt-4">Yapay zeka + Birebir destek.</p>
              </div>
              
              <div className="space-y-4 mb-8 flex-1">
                <div className="flex items-center gap-3">
                    <Check size={18} className="text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">Tüm Pro Özellikleri</span>
                </div>
                <div className="flex items-center gap-3">
                    <Check size={18} className="text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">Aylık Mentor Görüşmesi</span>
                </div>
                <div className="flex items-center gap-3">
                    <Check size={18} className="text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">7/24 Soru Sorma</span>
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
            <span className="font-bold text-xl text-gray-900">LGS Strateji</span>
          </div>
          
          <div className="flex gap-8 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-900">Hizmet Şartları</a>
            <a href="#" className="hover:text-gray-900">Gizlilik Politikası</a>
          </div>
          
          <div className="text-sm text-gray-400">
            &copy; 2024 LGS Strateji. Tüm hakları saklıdır.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
