let tempNoteText = "";
let editingIndex = null;

window.onload = function () {
  loadNotes();

  const textarea = document.getElementById("noteText");
  textarea.addEventListener("input", () => {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  });
};

function openModal() {
  const text = document.getElementById("noteText").value.trim();
  if (!text) return;

  tempNoteText = text;
  editingIndex = null; // új jegyzet
  document.getElementById("noteTitle").value = "";
  document.getElementById("modal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

function saveNote() {
  const title = document.getElementById("noteTitle").value.trim();
  if (!title) return;

  if (title.length > 40) {
    alert("A jegyzet neve legfeljebb 40 karakter hosszú lehet.");
    return;
  }

  const notes = getNotes();

  if (editingIndex !== null) {
    // meglévő jegyzet frissítése
    notes[editingIndex] = { title, content: tempNoteText };
  } else {
    // új jegyzet hozzáadása
    notes.push({ title, content: tempNoteText });
  }

  saveNotes(notes);
  document.getElementById("noteText").value = "";
  document.getElementById("noteText").style.height = "auto";
  closeModal();
  loadNotes();
}

function loadNotes() {
  const notes = getNotes();
  const list = document.getElementById("noteList");
  list.innerHTML = "";

  notes.forEach((note, index) => {
    const li = document.createElement("li");

    li.onclick = () => {
      openContentModal(note.title, note.content, index);
    };

    const titleSpan = document.createElement("span");
    titleSpan.textContent = note.title;
    titleSpan.style.userSelect = "none";

    const delBtn = document.createElement("button");
    delBtn.textContent = "Törlés";
    delBtn.onclick = (e) => {
      e.stopPropagation();
      deleteNote(index);
    };

    li.appendChild(titleSpan);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

function deleteNote(index) {
  const notes = getNotes();
  notes.splice(index, 1);
  saveNotes(notes);
  loadNotes();
}

function getNotes() {
  return JSON.parse(localStorage.getItem("notes") || "[]");
}

function saveNotes(notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
}

// ----- Teljes tartalom megtekintése/szerkesztése -----

function openContentModal(title, content, index) {
  editingIndex = index;
  document.getElementById("contentModalTitle").textContent = title;
  const textarea = document.getElementById("contentModalBody");
  textarea.value = content;
  textarea.setAttribute("readonly", true);
  document.getElementById("contentModal").classList.remove("hidden");
}

function enableEdit() {
  const textarea = document.getElementById("contentModalBody");
  textarea.removeAttribute("readonly");
  textarea.focus();
}

function saveEdit() {
  const notes = getNotes();
  const newContent = document.getElementById("contentModalBody").value;
  notes[editingIndex].content = newContent;
  saveNotes(notes);
  loadNotes();
  // closeContentModal();
  const textarea = document.getElementById("contentModalBody");
  textarea.setAttribute("readonly", true);
}

function closeContentModal() {
  document.getElementById("contentModal").classList.add("hidden");
}

