package hu.jaro.peter.backend.security;

import hu.jaro.peter.backend.model.User;
import hu.jaro.peter.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DefaultUserDetailsService implements UserDetailsService {

    public final UserRepository userRepository;

    public DefaultUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByUsername(usernameOrEmail);

        if (user.isEmpty()) {
            user = userRepository.findByUsername(usernameOrEmail);

            if (user.isEmpty()) {
                throw new UsernameNotFoundException("User not found with this username or email.");
            }

        }

        return new SecurityUser(user.get());
    }
}