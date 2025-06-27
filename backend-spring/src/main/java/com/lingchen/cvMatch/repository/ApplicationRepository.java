package com.lingchen.cvMatch.repository;

import com.lingchen.cvMatch.model.Application;
import com.lingchen.cvMatch.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

    Page<Application> findAllByUser(User user, Pageable pageDetails);
}
