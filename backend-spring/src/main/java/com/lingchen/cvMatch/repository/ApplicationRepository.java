package com.lingchen.cvMatch.repository;

import com.lingchen.cvMatch.model.Application;
import com.lingchen.cvMatch.model.Status;
import com.lingchen.cvMatch.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

    Page<Application> findAllByUser(User user, Pageable pageDetails);

    List<Application> getApplicationsByStatus(Status status);

    Page<Application> findAllByStatus(Status status, Pageable pageDetails);

    Page<Application> findAllByUserAndStatusName(User user, String statusName, Pageable pageDetails);


    @Query("SELECT TO_CHAR(a.dateApplied, 'YYYY-MM'), COUNT(a) " +
            "FROM Application a WHERE a.user = :user GROUP BY TO_CHAR(a.dateApplied, 'YYYY-MM')")
    List<Object[]> countApplicationsPerMonth(User user);


    long countByUserAndStatusName(User user, String name);

    long countByUser(User user);
}
