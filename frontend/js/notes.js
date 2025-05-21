// Jegyzetek betöltése localStorage-ból
window.onload = function() {
  loadNotes();
};

function addNote() {
  const noteText = document.getElementById("noteText").value.trim();
  if (!noteText) return;

  const notes = getNotes();
  notes.push(noteText);
  saveNotes(notes);
  document.getElementById("noteText").value = "";
  loadNotes();
}

function loadNotes() {
  const notes = getNotes();
  const list = document.getElementById("noteList");
  list.innerHTML = "";

  notes.forEach((note, index) => {
    const li = document.createElement("li");
    li.textContent = note;

    const delBtn = document.createElement("button");
    delBtn.textContent = "Törlés";
    delBtn.onclick = () => deleteNote(index);
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

