package com.lingchen.cvMatch.data;

import com.lingchen.cvMatch.model.Status;
import com.lingchen.cvMatch.model.User;
import com.lingchen.cvMatch.repository.StatusRepository;
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
    private final StatusRepository statusRepository;

    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
        //add default user
        if (!userRepository.existsUserByEmail("test@gmail.com")) {
            User user = new User();
            user.setEmail("test@gmail.com");
            user.setPassword(passwordEncoder.encode("123456"));
            user.setLastName("Smith");
            user.setFirstName("John");
            userRepository.save(user);
        }


        //add defult status
        if (!statusRepository.existsByName("applied")) {
            statusRepository.save(new Status("applied"));
        }

        if (!statusRepository.existsByName("interviewing")) {
            statusRepository.save(new Status("interviewing"));
        }

        if (!statusRepository.existsByName("rejected (no interview)")) {
            statusRepository.save(new Status("rejected (no interview)"));
        }

        if (!statusRepository.existsByName("rejected")) {
            statusRepository.save(new Status("rejected"));
        }

        if (!statusRepository.existsByName("offer")) {
            statusRepository.save(new Status("offer"));
        }


    }
}
