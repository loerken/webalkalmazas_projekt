let tempNoteText = "";
let editingIndex = null;

window.onload = function() {
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

async function saveNote() {
  const title = document.getElementById("noteTitle").value.trim();
  if (!title) return;

  if (title.length > 40) {
    alert("A jegyzet neve legfeljebb 40 karakter hosszú lehet.");
    return;
  }

  const token = localStorage.getItem("jwt");

  try {
    const response = await fetch("http://localhost:8080/api/notes/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({
        title: title,
        content: tempNoteText
      })
    });

    if (response.ok) {
      closeModal();
      document.getElementById("noteText").value = "";
      document.getElementById("noteText").style.height = "auto";
      loadNotes();
    } else {
      alert("Nem sikerült elmenteni a jegyzetet.");
    }
  } catch (e) {
    console.error("Hiba:", e);
  }
}



async function loadNotes() {
  const token = localStorage.getItem("jwt");
  if (!token) {
    alert("Nem vagy bejelentkezve!");
    window.location.href = "index.html";
    return;
  }

  try {
    const response = await fetch("http://localhost:8080/api/notes/all", {
      headers: { "Authorization": "Bearer " + token }
    });

    if (response.ok) {
      const notes = await response.json();
      const list = document.getElementById("noteList");
      list.innerHTML = "";

      notes.forEach((note, index) => {
        const li = document.createElement("li");
        li.onclick = () => openContentModal(note.title, note.content, note.id);

        const titleSpan = document.createElement("span");
        titleSpan.textContent = note.title;

        const delBtn = document.createElement("button");
        delBtn.textContent = "Törlés";
        delBtn.onclick = (e) => {
          e.stopPropagation();
          deleteNote(note.id);
        };

        li.appendChild(titleSpan);
        li.appendChild(delBtn);
        list.appendChild(li);
      });
    } else {
      console.error("Hiba a jegyzetek betöltésekor");
    }
  } catch (e) {
    console.error("Hiba:", e);
  }
}


async function deleteNote(id) {
  const token = localStorage.getItem("jwt");

  try {
    const response = await fetch(`http://localhost:8080/api/notes/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": "Bearer " + token
      }
    });

    if (response.ok) {
      loadNotes();
    } else {
      alert("Nem sikerült törölni a jegyzetet.");
    }
  } catch (e) {
    console.error("Hiba:", e);
  }
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

function logout() {
  document.getElementById("logoutModal").classList.remove("hidden");
}

function closeLogoutModal() {
  document.getElementById("logoutModal").classList.add("hidden");
}

function confirmLogout() {
  window.location.href = "index.html";
}

