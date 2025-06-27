package com.lingchen.cvMatch.data;

import com.lingchen.cvMatch.model.User;
import com.lingchen.cvMatch.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Transactional
@Component
@RequiredArgsConstructor
public class DataInitialiser implements ApplicationListener<ApplicationReadyEvent> {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
        if (userRepository.existsUserByEmail("test@gmail.com")) {
            return;
        }
        User user = new User();
        user.setEmail("test@gmail.com");
        user.setPassword(passwordEncoder.encode("123456"));
        user.setLastName("Smith");
        user.setFirstName("John");
        userRepository.save(user);
    }
}
