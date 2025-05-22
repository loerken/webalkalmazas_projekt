// Jegyzetek betöltése localStorage-ból
window.onload = function() {
  loadNotes();
};

// Jegyzet hozzáadása név bekérésével
function addNote() {
  const noteContent = document.getElementById("noteText").value.trim();
  if (!noteContent) return;

  const noteName = prompt("Add meg a jegyzet nevét:");
  if (!noteName || noteName.trim() === "") {
    alert("A jegyzet név nem lehet üres!");
    return;
  }

  const notes = getNotes();
  notes.push({ name: noteName.trim(), content: noteContent });
  saveNotes(notes);

  document.getElementById("noteText").value = "";
  autoResize.call(document.getElementById("noteText"));
  loadNotes();
}

// Jegyzetek listázása
function loadNotes() {
  const notes = getNotes();
  const list = document.getElementById("noteList");
  list.innerHTML = "";

  notes.forEach((note, index) => {
    const li = document.createElement("li");
    li.textContent = note.name;

    // Jegyzet tartalom megjelenítése kattintásra
    li.onclick = () => alert(note.content);

    const delBtn = document.createElement("button");
    delBtn.textContent = "Törlés";
    delBtn.onclick = (e) => {
      e.stopPropagation();
      deleteNote(index);
    };
    li.appendChild(delBtn);

    list.appendChild(li);
  });
}

// Jegyzet törlése index alapján
function deleteNote(index) {
  const notes = getNotes();
  notes.splice(index, 1);
  saveNotes(notes);
  loadNotes();
}

// Jegyzetek lekérése localStorage-ból
function getNotes() {
  return JSON.parse(localStorage.getItem("notes") || "[]");
}

// Jegyzetek mentése localStorage-ba
function saveNotes(notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Dinamikus textarea magasság
const textarea = document.getElementById("noteText");
if (textarea) {
  textarea.addEventListener("input", autoResize);
}

function autoResize() {
  this.style.height = "auto";
  this.style.height = this.scrollHeight + "px";
}

