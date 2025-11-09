#  LGS 2026 Soru Tahmini Projesi

## Proje Hakkında
Bu proje, **geçmiş yıllara ait LGS (Liselere Geçiş Sistemi)** sorularını analiz ederek **2026 yılında çıkma olasılığı yüksek konu başlıklarını** tahmin etmeyi amaçlamaktadır.  
Çalışma, **STEAM (Science, Technology, Engineering, Art, Mathematics)** yaklaşımına uygun şekilde bilimsel analiz, yapay zekâ, matematiksel modelleme ve görselleştirme bileşenlerini birleştirir.

---

## Proje Amacı
- 2018–2025 yılları arasındaki LGS sorularının konu dağılımlarını incelemek  
- Geçmiş veriler üzerinden 2026 konularının çıkma olasılığını tahmin etmek  
- Python tabanlı bir makine öğrenmesi modeli geliştirmek  
- Eğitim alanında veri bilimi uygulaması örneği oluşturmak  

---

## SWOT Analizi

### Güçlü Yönler
* **Çift Yönlü Yapay Zekâ:** Proje, hem "Makro Tahmin" (stratejik konu tahmini) hem de "Mikro Teşhis" (kişisel zayıflık tespiti) olmak üzere iki farklı yapay zekâ modelini birleştirmektedir.
* **Sınırsız ve Adaptif İçerik:** "Soru Üretim Modülü" sayesinde, platform statik soru bankalarının aksine her öğrenciye özel yeni soru üretebilir.
* **Bütüncül Öğrenme Ekosistemi:** Platform sadece "soru çöz" demez; teşhis, soru üretimi, konu anlatım tavsiyesi (video/kitap) ve hatta harici soru analizi (OCR ile yükleme) gibi öğrenme döngüsünün tüm adımlarını kapsar.
* **Veri Döngüsü (Data Flywheel):** Kullanıcıların yanlış sorularını OCR ile sisteme yüklemesi, modelin sürekli olarak eğitilmesi ve kendini geliştirmesi için paha biçilmez bir veri toplama mekanizması yaratır (Gelecek çalışmalar için).

### Zayıf Yönler
* **Pedagojik Kalite Kontrolü:** Yapay zekânın (Soru Üretim Modülü) ürettiği soruların kalitesi en büyük risktir. Modelin; müfredat dışı, dil bilgisi açısından bozuk veya (en kötüsü) cevabı yanlış olan sorular üretme potansiyeli vardır.
* **API Bağımlılığı ve Maliyeti:** Soru üretimi (örn: Gemini/OpenAI API) ve OCR analizi (örn: Google Vision AI) gibi kritik fonksiyonlar üçüncü parti API'lere bağımlıdır. Bu durum, hem operasyonel maliyeti hem de hizmet kesintisi riskini artırır.
* **Makro Tahmin Modelinin Veri Kısıtlılığı:** Stratejik tahmin modeli, şu an için nispeten küçük bir veri setine (2018-2025 arası, yani 8 veri noktası) dayanmaktadır. Bu kadar az veri ile istatistiksel olarak anlamlı ve yüksek doğruluklu bir tahmin yapmak zordur.
* **9 Kişilik Ekip Koordinasyonu:** Ekip büyüklüğü (9 kişi) hem bir avantaj hem de bir zayıflıktır. Net bir rol dağılımı ve sıkı bir proje yönetimi (Scrum vb.) uygulanmazsa, projede kaos, görev çakışması ve verimsizlik yaşanması kaçınılmazdır.

### Fırsatlar
* **EdTech Pazarının Büyümesi:** Pandemi sonrası dijital öğrenme araçlarına olan talep ve güven (EdTech - Eğitim Teknolojileri) kalıcı olarak artmıştır. Aileler ve öğrenciler SaaS tabanlı çözümlere alışkındır.
* **B2B Genişleme Potansiyeli:** Proje, MVP aşamasından sonra sadece öğrencilere (B2C) değil, aynı zamanda yayın evlerine, dershanelere ve öğretmenlere (B2B) "istediğiniz konudan, istediğiniz zorlukta 100 adet soru üret" veya "sınıfınızın zayıflık analizini yap" hizmeti satan bir araca dönüşebilir.
* **Pazar Boşluğu:** Mevcut rakiplerin çoğu (örn: Kunduz, Raunt) "dijital soru bankası" veya "soru-cevap" platformudur. Gerçek zamanlı ve kişiye özel soru üreten bir platform pazarda ciddi bir farklılaşma yaratacaktır.

### Tehditler
* **Yapay Zekâ Güvenliği ve Etiği:** AI'nın ürettiği hatalı bir bilgi veya yanlış bir soru, öğrencinin konuyu yanlış öğrenmesine neden olabilir. Bu, platformun itibarı için ciddi bir tehdittir ve yasal sorumluluklar doğurabilir.
* **Köklü Rakiplerin Harekete Geçmesi:** Köklü yayın evleri ve büyük EdTech firmaları (Raunt, Kunduz vb.), büyük bütçeleriyle benzer AI özelliklerini kendi platformlarına entegre ederek pazara giriş engelini yükseltebilir.
* **Sınav Sistemindeki Radikal Değişiklikler:** MEB'in LGS'nin formatını veya müfredatını aniden kökten değiştirmesi (örn: "Parçada Anlam" sorularını tamamen kaldırması), hem Makro Tahmin modelinin verisini hem de Mikro Teşhis modelinin eğitimini geçersiz kılabilir.

---

## SMART Hedefler

Proje başarısını ölçmek ve süreci yönetmek için belirlenen hedefler ve başarı kriterleri aşağıdaki tabloda özetlenmiştir:

| Hedef Numarası | Hedef Başlığı                | Ne Yapılacak? (Kapsam)                                                                                                         | Başarı Nasıl Ölçülecek? (Metrik)                                                                       | Neden Önemli? (Proje Katkısı)                                                     | Planlanan Bitiş Tarihi                 |
| :------------- | :--------------------------- | :----------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------- | :------------------------------------- |
| **Hedef 1**    | Stratejik Tahmin Modeli      | 2018-2025 verisiyle 2026 konu ağırlıklarını tahmin eden Python tabanlı (Regresyon vb.) bir model geliştirmek.                  | Modelin, geçmiş yıl verisiyle test edildiğinde **%80 doğruluk** oranına ulaşması.                      | Platformun "önceliklendirme" özelliğini besler ("Makro Tahmin" vaadi).            | İlk 6 Hafta Sonu                       |
| **Hedef 2**    | Teşhis & Üretim Entegrasyonu | Öğrenci zayıflıklarını teşhis eden ve Google Gemini API ile LGS formatında yeni sorular üreten modülleri entegre etmek.        | Üretilen 50 soruluk bir setin, uzman onayıyla **%80 pedagojik geçerlilik** alması.                     | "Kişiselleştirme" ve "İçerik Sınırlılığı" problemlerine getirdiği temel çözümdür. | İlk 10 Hafta Sonu                      |
| **Hedef 3**    | Destek Modülleri (PoC)       | Zayıf konular için (video/kitap) "Tavsiye Modülü" ve görselden soru analizi (OCR) için bir "Kavram Kanıtı" (PoC) geliştirmek.  | Beta kullanıcılarının %100'ünün tavsiyeleri görmesi. OCR modülünün **%85 metin tanıma** başarısı.      | "Bütüncül Çözüm" ve "Veri Toplama" (Data Flywheel) hedeflerini karşılar.          | İlk 12 Hafta Sonu                      |
| **Hedef 4**    | Entegre SaaS Prototipi       | Tüm modülleri (Tahmin, Teşhis, Üretim, Tavsiye, Yükleme) birleştiren uçtan uca çalışan bir web platformunu beta testine açmak. | **En az 20 beta kullanıcısının** tüm akışı başarıyla tamamlaması ve geri bildirim anketini doldurması. | Projenin "SaaS" hedefini ve teorinin pratiğe döküldüğünü kanıtlar.                | İlk 14 Hafta Sonu (Final Sunum Öncesi) |
---

## Ekip Üyeleri
Güncellenecek

---

## Kullanılan Teknolojiler
Güncellenecek
---

## Proje Aşamaları
Güncellenecek
---

## Proje Durumu
Güncellenecek

---

## Kaynaklar
Güncellenecek
---
