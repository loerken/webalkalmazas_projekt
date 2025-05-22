let tempNoteText = "";

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
  document.getElementById("noteTitle").value = "";
  document.getElementById("modal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

function saveNote() {
  const title = document.getElementById("noteTitle").value.trim();
  if (!title) return;

  const notes = getNotes();
  notes.push({ title, content: tempNoteText });
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
    const titleSpan = document.createElement("span");
    titleSpan.textContent = note.title;
    titleSpan.onclick = () => {
      contentDiv.style.display = contentDiv.style.display === "none" ? "block" : "none";
    };

    const contentDiv = document.createElement("div");
    contentDiv.className = "note-content";
    contentDiv.textContent = note.content;

    const delBtn = document.createElement("button");
    delBtn.textContent = "Törlés";
    delBtn.onclick = (e) => {
      e.stopPropagation();
      deleteNote(index);
    };

    li.appendChild(titleSpan);
    li.appendChild(contentDiv);
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
