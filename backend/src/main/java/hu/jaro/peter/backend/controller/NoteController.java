package hu.jaro.peter.backend.controller;

import hu.jaro.peter.backend.model.Note;
import hu.jaro.peter.backend.model.User;
import hu.jaro.peter.backend.repository.NoteRepository;
import hu.jaro.peter.backend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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
    @PutMapping("/{id}")
    public ResponseEntity<Note> updateNote(
            @PathVariable Long id,
            @RequestBody Note updatedNote,
            Authentication authentication) {

        String username = authentication.getName();
        User user = userRepository.findByUsername(username).orElseThrow();

        return noteRepository.findById(id)
                .filter(note -> note.getOwner().getId().equals(user.getId()))
                .map(note -> {
                    note.setTitle(updatedNote.getTitle());
                    note.setContent(updatedNote.getContent());
                    return ResponseEntity.ok(noteRepository.save(note));
                })
                .orElse(ResponseEntity.notFound().build());
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNote(
            @PathVariable Long id,
            Authentication authentication) {

        String username = authentication.getName();
        User user = userRepository.findByUsername(username).orElseThrow();

        Optional<Note> noteOptional = noteRepository.findById(id);

        if (noteOptional.isPresent()) {
            Note note = noteOptional.get();

            if (!note.getOwner().getId().equals(user.getId())) {
                return ResponseEntity.status(403).build(); // nem a saját jegyzet
            }

            noteRepository.delete(note);
            return ResponseEntity.noContent().build(); // 204 No Content
        } else {
            return ResponseEntity.notFound().build(); // 404 Not Found
        }
    }





}
