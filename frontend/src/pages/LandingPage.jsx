import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, User, Clock, FileText, Cpu, BarChart3, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
                <Brain className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">LGS AI</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#features" className="hover:text-blue-600 transition-colors">Özellikler</a>
            <a href="#pricing" className="hover:text-blue-600 transition-colors">Fiyatlandırma</a>
            <a href="#about" className="hover:text-blue-600 transition-colors">Hakkımızda</a>
          </div>
          
          <div className="flex items-center gap-3">
            <Link to="/login" className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md">
              Kayıt Ol
            </Link>
            <Link to="/login" className="bg-gray-100 text-gray-700 px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
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
              LGS AI, modern teknolojiyi kullanarak öğrencilere benzersiz bir hazırlık deneyimi sunar.
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
      <section className="py-24 bg-gray-50">
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

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-gray-100">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
                <Brain className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl text-gray-900">LGS AI</span>
          </div>
          
          <div className="flex gap-8 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-900">Gizlilik Politikası</a>
            <a href="#" className="hover:text-gray-900">Kullanım Koşulları</a>
          </div>
          
          <div className="text-sm text-gray-400">
            &copy; 2024 LGS AI. Tüm hakları saklıdır.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
