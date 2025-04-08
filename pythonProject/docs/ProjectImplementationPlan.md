# Proje Uygulama Planı - Meta Reklam Hedefleme Asistanı

Bu döküman, Meta Reklam Hedefleme Asistanı'nın geliştirme aşamalarını ve görevlerini basit bir şekilde özetlemektedir.

## Aşama 1: Proje Kurulumu (1-2 Gün)

- [x] Proje dizin yapısını oluştur
- [x] Frontend repo kurulumu (Next.js)
- [x] Backend repo kurulumu (Express.js)
- [x] Gerekli paketlerin yüklenmesi
- [x] Temel konfigürasyon dosyalarının oluşturulması
- [x] Git repo kurulumu

## Aşama 2: Temel Frontend Geliştirme (3-5 Gün)

- [x] Tailwind CSS kurulumu
- [x] Temel bileşenlerin oluşturulması (Buton, Input, Chat Bubble)
- [x] Sohbet arayüzü tasarımı
- [x] Temel sayfa yapısı
- [x] State yönetimi için Zustand kurulumu
- [x] Basit yönlendirme (routing) ayarları

## Aşama 3: Temel Backend Geliştirme (3-5 Gün)

- [x] Express.js API yönlendirme (routing) yapısı
- [x] Temel controller'ların oluşturulması
- [x] Basit veritabanı şeması (Geçici olarak JSON dosyaları kullanılabilir)
- [x] Sektör listesi veri kaynağı oluşturma
- [x] Temel hata yönetimi

## Aşama 4: AI Entegrasyonu (2-3 Gün)

- [x] Mistral AI API entegrasyonu
- [x] Prompt şablonlarının hazırlanması 
- [x] Kullanıcı girdisine göre prompt oluşturma mantığı
- [x] AI yanıtlarını işleme ve formatlama

## Aşama 5: Sohbet Akışının Uygulanması (3-4 Gün)

- [x] Başlangıç mesajı ve "Başlat" butonu
- [x] Sektör seçimi adımı
- [x] Yaş aralığı giriş adımı
- [x] Hedefleme türü seçim adımı
- [x] Öneri sayısı giriş adımı
- [x] Sonuçların görüntülenmesi
- [x] "Biraz Daha Öner" özelliği
- [x] "Yeniden Başla" özelliği

## Aşama 6: UI İyileştirmeleri (2-3 Gün)

- [  ] Genel görünüm iyileştirmeleri
- [  ] Duyarlı (responsive) tasarım ayarlamaları
- [  ] Yükleme göstergeleri
- [  ] Hata mesajları
- [  ] Animasyonlar (opsiyonel)

## Aşama 7: Test ve Hata Ayıklama (2-3 Gün)

- [  ] Manuel kullanıcı testi
- [  ] Hata ayıklama
- [  ] Sohbet akışı optimizasyonu
- [  ] AI yanıtlarının kalitesini iyileştirme

## Aşama 8: Dağıtım (Deployment) (1-2 Gün)

- [  ] Frontend'i Vercel'e deploy etme
- [  ] Backend'i uygun bir servise deploy etme (Render, Heroku, vb.)
- [  ] Ortam değişkenlerinin ayarlanması
- [  ] Son kontroller

## Basitleştirme Notları

- Kimlik doğrulama (auth) ilk sürümde atlanabilir
- Öncelikle yerel JSON dosyalarıyla çalışıp, daha sonra veritabanına geçilebilir
- Kapsamlı test senaryoları yerine manuel testlerle başlanabilir
- Proje ilerledikçe gerektiğinde özellikler eklenebilir

## Mevcut Durum

- [x] Proje planlaması tamamlandı
- [x] Dökümanlar oluşturuldu
- [x] Geliştirme aşamasına başlandı 