function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (!user || !pass) {
    alert("TODO");
    return;
  }

  alert("Belépési kísérlet:\nFelhasználó: " + user + "\nJelszó: " + pass);
}

function register() {
  alert("TODO");
}

