# Jegyzet alkalmazás

Egy egyszerű jegyzet alkalmazás a *Web-alkalmazás-fejlesztés projektmunkában* című tárgy teljesítéséhez.

## Funkciók

- Felhasználók regisztrációja és bejelentkeztetése
- JWT token alapú hitelesítés
- Jegyzetek létrehozása, megtekintése, szerkesztése és törlése
- Reszponzív felhasználói felület

## Felhasznált technológiák

- **Frontend**: HTML5, CSS3, JavaScript (fetch API)
- **Backend**: Java, Spring Boot, Spring Security, JWT, JPA, H2 adatbázis

## Alkalmazás futtatása

1. Klónozzuk a repot a saját gépünkre:

   ```bash
   git clone git@github.com:loerken/webalkalmazas_projekt.git
   ```

2. Indítsuk el a backend szervert:

   - Navigáljunk a `backend` könyvtárba
   - Futtatjuk a következő parancsot:

     ```bash
     mvn spring-boot:run
     ```

   - vagy tetszőleges IDE-ből futtatjuk a `BackendApplication.java` fájlt  
   - A backend szerver elindul a következő porton: `http://localhost:8080`

3. Indítsuk el a frontendet:

   - Navigálj a `frontend` könyvtárba
   - Indítsunk egy live szervert, például:

     ```bash
     live-server --port=5500
     ```

   - Ezután nyissuk meg böngészőben a következő címet: `http://localhost:5500`

---

Az alkalmazás mindezek után használatra kész, tesztelhető.