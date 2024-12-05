const db = require('../models/firebaseConfig');

exports.createNote = async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) return res.status(400).send('Title and Content are required');
  try {
    const ref = db.ref('notes');
    const newNoteRef = ref.push();
    await newNoteRef.set({ title, content, completed: false });
    res.status(201).send({ id: newNoteRef.key, title, content, completed: false });
  } catch (error) {
    res.status(500).send(error.message);
  }
};


exports.getAllNotes = async (req, res) => {
  try {
    const ref = db.ref('notes');
    ref.once('value', (snapshot) => {
      const notes = snapshot.val();
      const notesWithIds = Object.keys(notes || {}).map((key) => ({
        id: key,
        ...notes[key], 
      }));
      res.json(notesWithIds);
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};



// Not düzenle
exports.updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content, completed } = req.body;
  try {
    const ref = db.ref(`notes/${id}`);
    await ref.update({ title, content, completed, id });
    res.send('Note updated successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
};


// Not sil
exports.deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    const ref = db.ref(`notes/${id}`);
    await ref.remove();
    res.send('Note deleted successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
};


// Tamamlandı olarak işaretle
exports.markAsComplete = async (req, res) => {
  const { id } = req.params; // İlgili notun ID'si
  const { completed } = req.body; // Yeni tamamlanma durumu

  if (typeof completed !== "boolean") {
    return res.status(400).send("Invalid completed value");
  }

  try {
    const ref = db.ref(`notes/${id}`); // İlgili notun referansı
    await ref.update({ completed }); // Sadece `completed` alanını güncelle
    res.send({ id, completed }); // Güncellenmiş veriyi döndür
  } catch (error) {
    res.status(500).send(error.message); // Hata durumunda uygun yanıt gönder
  }
};

