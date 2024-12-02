import { database, ref, push, set, remove, onValue, update } from './firebase';

// Yeni not ekleme
async function addNoteToRealtimeDB(title, content) {
  try {
    const notesRef = ref(database, 'notes'); // 'notes' referansı
    const newNoteRef = push(notesRef); // Yeni bir not için referans oluştur
    await set(newNoteRef, { title, content, completed: false }); // Veriyi ekle
    console.log('Note added:', newNoteRef.key); // Eklenen notun ID'sini yazdır
  } catch (error) {
    console.error('Error adding note:', error);
  }
}

// Not silme
async function deleteNoteFromRealtimeDB(id) {
  try {
    const noteRef = ref(database, `notes/${id}`); // Silinecek notun referansı
    await remove(noteRef); // Notu sil
    console.log('Note deleted:', id);
  } catch (error) {
    console.error('Error deleting note:', error);
  }
}

// Tüm notları getir
async function fetchNotesFromRealtimeDB() {
  try {
    const notesRef = ref(database, 'notes'); // Tüm notların referansı
    onValue(notesRef, (snapshot) => {
      const data = snapshot.val(); // Tüm veriyi al
      console.log('Fetched Notes:', data); // Konsola yazdır
      // Veriyi UI'ye eklemek için buradan devam edebilirsiniz
      renderNotes(data);
    });
  } catch (error) {
    console.error('Error fetching notes:', error);
  }
}

// Not güncelleme
async function updateNoteInRealtimeDB(id, title, content) {
  try {
    const noteRef = ref(database, `notes/${id}`); // Güncellenecek notun referansı
    await update(noteRef, { title, content }); // Güncelleme işlemi
    console.log('Note updated:', id);
  } catch (error) {
    console.error('Error updating note:', error);
  }
}

// Form gönderildiğinde yeni not ekle
document.getElementById('noteForm').addEventListener('submit', async (e) => {
  e.preventDefault(); // Sayfanın yeniden yüklenmesini engelle
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  // Yeni not ekle ve ardından notları yeniden al
  await addNoteToRealtimeDB(title, content);
  fetchNotesFromRealtimeDB();
});

// Verileri UI'ye ekleme (opsiyonel)
function renderNotes(notes) {
  const notesContainer = document.getElementById('notesList');
  notesContainer.innerHTML = ''; // Eski notları temizle

  if (notes) {
    Object.keys(notes).forEach((id) => {
      const note = notes[id];
      const noteElement = document.createElement('div');
      noteElement.className = 'note';
      noteElement.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.content}</p>
        <button onclick="deleteNoteFromRealtimeDB('${id}')">Delete</button>
        <button onclick="updateNoteInRealtimeDB('${id}', 'Updated Title', 'Updated Content')">Update</button>
        <label>
          <input type="checkbox" ${note.completed ? 'checked' : ''} onchange="toggleComplete('${id}', ${!note.completed})">
          Completed
        </label>
      `;
      notesContainer.appendChild(noteElement);
    });
  } else {
    notesContainer.innerHTML = '<p>No notes found.</p>';
  }
}

// Tamamlanma durumu değiştirme
async function toggleComplete(id, completed) {
  try {
    const noteRef = ref(database, `notes/${id}`);
    await update(noteRef, { completed });
    console.log('Note completion toggled:', id);
  } catch (error) {
    console.error('Error toggling note completion:', error);
  }
}

// Sayfa yüklendiğinde notları getir
fetchNotesFromRealtimeDB();
