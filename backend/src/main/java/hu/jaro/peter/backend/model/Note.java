package hu.jaro.peter.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
public class Note {
    @Id
    @GeneratedValue
    private Long id;

    private String title;
    private String content;

    @ManyToOne
    @JsonIgnore
    private User owner;

    public Note() {
    }

    public Note(Long id, String title, String content, User owner) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.owner = owner;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }
}

/*src
├── main
│   ├── java
│   │   └── hu.yourname.backend
│   │       ├── controller       // REST végpontok
│   │       ├── service          // üzleti logika
│   │       ├── repository       // adatbázis hozzáférés
│   │       ├── model            // entitások (User, Note)
│   │       └── config           // biztonsági beállítások
│   └── resources
│       └── application.properties
*/
