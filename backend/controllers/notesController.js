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
      res.json(notes || {});
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};


// Not düzenle
exports.updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const ref = db.ref(`notes/${id}`);
    await ref.update({ title, content });
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
  const { id } = req.params;
  try {
    await db.collection('notes').doc(id).update({ completed: true });
    res.send('Note marked as completed');
  } catch (error) {
    res.status(500).send(error.message);
  }
};
