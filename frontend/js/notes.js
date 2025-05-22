window.onload = function() {
  loadNotes();
};

function addNote() {
  const noteContent = document.getElementById("noteText").value.trim();
  if (!noteContent) return;

  const noteName = prompt("Add meg a jegyzet nevét:");
  if (!noteName) {
    alert("A jegyzet név nem lehet üres!");
    return;
  }

  const notes = getNotes();
  notes.push({ name: noteName, content: noteContent });
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
    li.textContent = note.name;
    li.style.cursor = "pointer";
    li.title = "Kattints a teljes jegyzet megtekintéséhez";

    li.onclick = () => {
      alert(`Jegyzet: ${note.name}\n\n${note.content}`);
    };

    const delBtn = document.createElement("button");
    delBtn.textContent = "Törlés";
    delBtn.onclick = (e) => {
      e.stopPropagation(); // megakadályozza, hogy a szülő li kattintása is lefusson
      deleteNote(index);
    };
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

