package hu.jaro.peter.backend.controller;

import hu.jaro.peter.backend.model.User;
import hu.jaro.peter.backend.repository.UserRepository;
import hu.jaro.peter.backend.security.AuthenticationRequest;
import hu.jaro.peter.backend.security.JwtUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
     private final AuthenticationManager authenticationManager;
     private final UserDetailsService userDetailsService;
     private final JwtUtils jwtUtils;

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(AuthenticationManager authenticationManager, UserDetailsService userDetailsService, JwtUtils jwtUtils, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.jwtUtils = jwtUtils;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        // Ellenőrizzük, hogy létezik-e a felhasználónév
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Felhasználónév már létezik.");
        }

        // Jelszó titkosítása
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        return ResponseEntity.ok("Sikeres regisztráció.");
    }
    @PostMapping("/login")
    public String createAuthenticationToken(AuthenticationRequest authenticationRequest) {

        // AUTHENTIKÁLJUK A USERT
        // HIBAS CREDENTAILS ESETEN BadCredentailsException
        // HA A KOVETKEZO SOR LEMEGY SIKERESEN AKKOR TUDJUK HOGY AUTHENTIKALVA VAGYUNK
        Authentication authenticatedUser = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authenticationRequest.getUsername(), authenticationRequest.getPassword()));


        // UTIL SEGITSEGEVEL LEGENERALJUK A TOKENT
        final String jwt = jwtUtils.generateJwtToken(authenticatedUser);




        // TOKEN-T A RESPONSE-BAN VISSZAADJUK
        return jwt;
    }
}
