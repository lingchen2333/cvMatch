package com.lingchen.cvMatch.repository;

import com.lingchen.cvMatch.model.Status;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StatusRepository extends JpaRepository<Status, Long> {
    Optional<Status> getStatusByName(String name);
}
