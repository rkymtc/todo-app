# Not Uygulaması

Bu proje, kullanıcıların not ekleyip düzenleyebileceği, tamamlanma durumlarını değiştirebileceği ve tamamlanan/tamamlanmayan notlarını listeleyebileceği bir not uygulamasıdır.

## Özellikler

- Yeni not ekleme
- Notları düzenleme ve silme
- Tamamlanma durumu değiştirme
- Tamamlanan ve tamamlanmayan notları ayrı listelerde görüntüleme
- Liste boşsa bilgilendirme mesajı

---

## Gereksinimler

- Node.js
- npm
- Firebase projesi (Realtime Database etkinleştirilmiş olmalı)

---

## Kurulum

### 1. Depoyu Klonlayın

```bash
git clone https://github.com/rkymtc/todo-app
```

### 2. Backend Kurulumu

Backend dizinine geçin:

```bash
cd backend
```

Paketleri yükleyin:

```bash
npm install
```

---

### 3. Firebase Yapılandırması

`backend/models/firebaseConfig.js` dosyasını oluşturun ve Firebase servis hesabınızı şu şekilde ekleyin:

```javascript
const admin = require("firebase-admin");

const serviceAccount = {
  type: "service_account",
  project_id: "your-project-id",
  private_key_id: "your-private-key-id",
  private_key: "-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----",
  client_email: "firebase-adminsdk-xxxx@your-project-id.iam.gserviceaccount.com",
  client_id: "your-client-id",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xxxx%40your-project-id.iam.gserviceaccount.com",
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://your-project-id.firebaseio.com",
});

const db = admin.database();
module.exports = db;
```

---

### 4. Backend'i Başlatın

Backend sunucusunu çalıştırmak için aşağıdaki komutu kullanın:

```bash
npm run dev
```

Backend, `http://localhost:3000` adresinde çalışacaktır.

---

### 5. Frontend Kurulumu

1. Frontend dizinine geçin:

   ```bash
   cd ../frontend
   ```

2. `index.html` dosyasını bir tarayıcıda açarak frontend'i çalıştırabilirsiniz.

---

## Kullanım

1. **Not Ekleme:**
   - Başlık ve içerik alanlarını doldurun, ardından "Not Ekle" butonuna tıklayın.

2. **Not Düzenleme:**
   - Bir notun altındaki "Düzenle" butonuna tıklayın, başlık ve içerik düzenlenebilir hale gelecektir. Düzenledikten sonra "Güncelle" butonuna tıklayın.

3. **Not Silme:**
   - Bir notun altındaki "Sil" butonuna tıklayarak notu kaldırabilirsiniz.

4. **Tamamlandı Olarak İşaretleme:**
   - Checkbox'ı işaretleyerek bir notu tamamlananlar listesine taşıyabilirsiniz.

5. **Liste Boş Olduğunda:**
   - Tamamlanan veya tamamlanmayan notlar yoksa, ilgili liste altında "Henüz veri yoktur." mesajı görünür.

---

## Dizin Yapısı

```plaintext
todo-app/
├── backend/
│   ├── controllers/
│   │   └── notesController.js
│   ├── models/
│   │   └── firebaseConfig.js
│   ├── routes/
│   │   └── notes.js
│   ├── app.js
│   ├── package.json
│   └── README.md
├── frontend/
│   ├── assets/
│   │   └── js/
│   │       └── app.js
│   ├── styles.css
│   └── index.html
└── README.md
```

---

## API Endpoint'leri

- **POST** `/notes`: Yeni bir not ekler.
- **GET** `/notes`: Tüm notları döner.
- **PUT** `/notes/:id`: Belirtilen notu günceller.
- **DELETE** `/notes/:id`: Belirtilen notu siler.
- **PATCH** `/notes/:id/complete`: Belirtilen notun tamamlanma durumunu günceller.

---

## Katkıda Bulunma

Projeye katkıda bulunmak için:

1. Bu depoyu forklayın.
2. Yeni bir dal oluşturun: `git checkout -b yeni-ozellik`.
3. Değişikliklerinizi işleyin: `git commit -m 'Yeni özellik eklendi'`.
4. Dalınıza gönderin: `git push origin yeni-ozellik`.
5. Bir pull request açın.

---

## Lisans

Bu proje MIT Lisansı ile lisanslanmıştır. Daha fazla bilgi için [LICENSE](LICENSE) dosyasına göz atabilirsiniz.
