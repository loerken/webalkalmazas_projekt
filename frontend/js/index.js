async function login() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();

  if (!user || !pass) {
    showError("A felhasználónév és jelszó nem maradhat üresen!");
    return;
  }

  try {
    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: user, password: pass })
    });

    if (response.ok) {
      const token = await response.text();
      localStorage.setItem("jwt", token); // Token elmentése
      window.location.href = "notes.html";
    } else {
      const err = await response.text();
      showError(err || "Hibás bejelentkezés.");
    }
  } catch (e) {
    console.error(e);
    showError("Nem sikerült kapcsolódni a szerverhez.");
  }
}


function showError(message) {
  document.getElementById("errorMessage").textContent = message;
  document.getElementById("errorModal").classList.remove("hidden");
}

function closeErrorModal() {
  document.getElementById("errorModal").classList.add("hidden");
}

function openRegisterModal() {
  document.getElementById("registerUsername").value = "";
  document.getElementById("registerPassword").value = "";
  document.getElementById("registerModal").classList.remove("hidden");
}

function closeRegisterModal() {
  document.getElementById("registerModal").classList.add("hidden");
}

async function registerUser() {
  const username = document.getElementById("registerUsername").value.trim();
  const password = document.getElementById("registerPassword").value.trim();

  if (!username || !password) {
    showError("A felhasználónév és jelszó nem lehet üres!");
    closeRegisterModal();
    return;
  }

  try {
    const response = await fetch("http://localhost:8080/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    if (response.ok) {
      showError("Sikeres regisztráció! Most már bejelentkezhetsz.");
      closeRegisterModal();
    } else {
      let errorText = await response.text();
      closeRegisterModal();
      showError(errorText);
    }
  } catch (error) {
    console.error(error);
    showError("Nem sikerült kapcsolódni a szerverhez.");
  }
}
