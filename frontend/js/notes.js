let tempNoteText = "";

window.onload = function () {
  loadNotes();

  const textarea = document.getElementById("noteText");
  textarea.addEventListener("input", () => {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  });
};

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

      notes.forEach((note) => {
        const li = document.createElement("li");

        li.onclick = () => {
          openContentModal(note.title, note.content, note.id);
        };

        const titleSpan = document.createElement("span");
        titleSpan.textContent = note.title;
        titleSpan.style.userSelect = "none";

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
      alert("Nem sikerült lekérni a jegyzeteket.");
    }
  } catch (e) {
    console.error("Hiba:", e);
  }
}

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
      body: JSON.stringify({ title: title, content: tempNoteText })
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

function openContentModal(title, content, noteId) {
  document.getElementById("contentModalTitle").textContent = title;
  const textarea = document.getElementById("contentModalBody");
  textarea.value = content;
  textarea.setAttribute("readonly", true);
  textarea.dataset.noteId = noteId;
  document.getElementById("contentModal").classList.remove("hidden");
}

function enableEdit() {
  const textarea = document.getElementById("contentModalBody");
  textarea.removeAttribute("readonly");
  textarea.focus();
}

async function saveEdit() {
  const textarea = document.getElementById("contentModalBody");
  const noteId = textarea.dataset.noteId;
  const newContent = textarea.value;
  const title = document.getElementById("contentModalTitle").textContent;
  const token = localStorage.getItem("jwt");

  if (!noteId) {
    alert("Hiányzik a jegyzet azonosítója.");
    return;
  }

  try {
    const response = await fetch(`http://localhost:8080/api/notes/${noteId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({
        title: title,
        content: newContent
      })
    });

    if (response.ok) {
      textarea.setAttribute("readonly", true);
      closeContentModal();
      loadNotes();
    } else {
      alert("Nem sikerült frissíteni a jegyzetet.");
    }
  } catch (e) {
    console.error("Hiba:", e);
  }
}

async function deleteNote(noteId) {
  const token = localStorage.getItem("jwt");

  try {
    const response = await fetch(`http://localhost:8080/api/notes/${noteId}`, {
      method: "DELETE",
      headers: { "Authorization": "Bearer " + token }
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
  localStorage.removeItem("jwt");
  window.location.href = "index.html";
}
