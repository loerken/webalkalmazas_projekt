function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (!user || !pass) {
    showError("A felhasználónév és jelszó nem maradhat üresen!");
    return;
  }

  if (user == 'teszt' && pass == 'teszt') {
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

function register() {
  showError("A regisztráció funkció még nem elérhető!");
}
