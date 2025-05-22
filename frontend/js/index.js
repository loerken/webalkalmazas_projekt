function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (!user || !pass) {
    alert("A felhasználónév és jelszó nem maradhat üresen!");
    return;
  }

  if (user == 'teszt' && pass == 'teszt') {
    window.location.href = "notes.html";
  }

  alert("Felhasználónév vagy jelszó nem megfelelő!");
}

function register() {
  alert("TODO");
}

