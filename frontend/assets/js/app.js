const API_URL = "http://localhost:3000/notes";
const incompleteNotesContainer = document.getElementById("incompleteNotes");
const completedNotesContainer = document.getElementById("completedNotes");
const noteForm = document.getElementById("noteForm");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");

let isEditing = false;
let currentEditId = null;

async function fetchNotes() {
  try {
    const response = await fetch(API_URL);
    const notes = await response.json();
    renderNotes(notes);
  } catch (error) {
    console.error("Notlar yüklenirken bir hata oluştu:", error);
  }
}

function renderNotes(notes) {
  incompleteNotesContainer.innerHTML = "";
  completedNotesContainer.innerHTML = "";

  let hasIncompleteNotes = false;
  let hasCompletedNotes = false;

  for (const id in notes) {
    const note = notes[id];
    const noteCard = document.createElement("div");
    noteCard.className = "col-md-4";
    noteCard.innerHTML = `
      <div class="card shadow">
        <div class="card-body">
          <h5 class="card-title">${note.title}</h5>
          <p class="card-text">${note.content}</p>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="checkbox-${id}"
              ${note.completed ? "checked" : ""}
            />
            <label class="form-check-label" for="checkbox-${id}">Tamamlandı</label>
          </div>
          <button class="btn btn-warning btn-sm mt-2 edit-btn">Düzenle</button>
          <button class="btn btn-danger btn-sm mt-2 delete-btn">Sil</button>
        </div>
      </div>
    `;

    // Event Listener: Checkbox
    const checkbox = noteCard.querySelector(`#checkbox-${id}`);
    checkbox.addEventListener("change", () =>
      toggleComplete(note.id, !note.completed,note.title, note.content)
    );

    // Event Listener: Düzenle Butonu
    const editButton = noteCard.querySelector(".edit-btn");
    editButton.addEventListener("click", () =>
      startEdit(note.id, note.title, note.content,note.completed)
    );

    
    // Event Listener: Sil Butonu
    const deleteButton = noteCard.querySelector(".delete-btn");
    deleteButton.addEventListener("click", () => deleteNote(note.id));

    // Tamamlanan ve tamamlanmayanlara göre listeye ekle
    if (note.completed) {
      hasCompletedNotes = true;
      completedNotesContainer.appendChild(noteCard);
    } else {
      hasIncompleteNotes = true;
      incompleteNotesContainer.appendChild(noteCard);
    }
  }

  // Eğer tamamlanmayanlar boşsa mesaj göster
  if (!hasIncompleteNotes) {
    incompleteNotesContainer.innerHTML = `
      <div class="col-12 text-center">
        <p class="text-muted">Henüz veri yoktur.</p>
      </div>
    `;
  }

  // Eğer tamamlananlar boşsa mesaj göster
  if (!hasCompletedNotes) {
    completedNotesContainer.innerHTML = `
      <div class="col-12 text-center">
        <p class="text-muted">Henüz veri yoktur.</p>
      </div>
    `;
  }
}



noteForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const noteData = {
    title: titleInput.value,
    content: contentInput.value,
    completed: false,
  };

  if (isEditing) {
    try {
      await fetch(`${API_URL}/${currentEditId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(noteData),
      });
      resetForm();
      fetchNotes();
    } catch (error) {
      console.error("Not güncellenirken bir hata oluştu:", error);
    }
  } else {
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(noteData),
      });
      resetForm();
      fetchNotes();
    } catch (error) {
      console.error("Not eklenirken bir hata oluştu:", error);
    }
  }
});

function startEdit(id, title, content) {
  isEditing = true;
  currentEditId = id;
  titleInput.value = title;
  contentInput.value = content;
  document.querySelector("button[type='submit']").innerText = "Güncelle";
}

function resetForm() {
  isEditing = false;
  currentEditId = null;
  titleInput.value = "";
  contentInput.value = "";
  document.querySelector("button[type='submit']").innerText = "Not Ekle";
}

async function deleteNote(id) {
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchNotes();
  } catch (error) {
    console.error("Not silinirken bir hata oluştu:", error);
  }
}

async function toggleComplete(id, completed) {
  try {
    // Backend'e PATCH isteği gönder
    const response = await fetch(`${API_URL}/${id}/complete`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }), // "completed" alanını backend'e gönderiyoruz
    });

    if (!response.ok) {
      throw new Error("Tamamlanma durumu güncellenemedi.");
    }

    // Not listesini yeniden çek
    fetchNotes();
  } catch (error) {
    console.error("Tamamlanma durumu değiştirilirken bir hata oluştu:", error);
  }
}




fetchNotes();
