package hu.jaro.peter.backend.repository;

import hu.jaro.peter.backend.model.Note;
import hu.jaro.peter.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NoteRepository extends JpaRepository<Note, Long> {
    List<Note> findByOwner(User owner);
}
