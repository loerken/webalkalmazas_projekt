package hu.jaro.peter.backend.controller;

import hu.jaro.peter.backend.model.Note;
import hu.jaro.peter.backend.model.User;
import hu.jaro.peter.backend.repository.NoteRepository;
import hu.jaro.peter.backend.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
public class NoteController {

    private final NoteRepository noteRepository;
    private final UserRepository userRepository;

    public NoteController(NoteRepository noteRepository, UserRepository userRepository) {
        this.noteRepository = noteRepository;
        this.userRepository = userRepository;
    }

    // Jegyzetek lekérdezése (csak a bejelentkezett felhasználónak)
    @GetMapping("/all")
    public List<Note> getUserNotes(Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username).orElseThrow();
        return noteRepository.findByOwner(user);
    }

    // Jegyzet létrehozása
    @PostMapping("/new")
    public Note createNote(@RequestBody Note note, Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username).orElseThrow();
        note.setOwner(user);
        return noteRepository.save(note);
    }
}
