function login() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();

  if (!user || !pass) {
    showError("A felhasználónév és jelszó nem maradhat üresen!");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users") || "[]");

  const validUser = users.find(u => u.username === user && u.password === pass);

  if (validUser || (user === 'teszt' && pass === 'teszt')) {
    window.location.href = "notes.html";
  } else {
    showError("Felhasználónév vagy jelszó nem megfelelő!");
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

function registerUser() {
  const username = document.getElementById("registerUsername").value.trim();
  const password = document.getElementById("registerPassword").value.trim();

  if (!username || !password) {
    showError("A felhasználónév és jelszó nem lehet üres!");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users") || "[]");

  const userExists = users.some(u => u.username === username);
  if (userExists) {
    showError("Ez a felhasználónév már foglalt!");
    return;
  }

  users.push({ username, password });
  localStorage.setItem("users", JSON.stringify(users));
  closeRegisterModal();
  showError("Sikeres regisztráció! Most már bejelentkezhetsz.");
}

