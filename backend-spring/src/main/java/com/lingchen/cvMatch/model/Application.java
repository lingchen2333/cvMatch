package com.lingchen.cvMatch.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String jobUrl;
    private String companyName;
    private String jobTitle;
    private LocalDate dateApplied;
    private String status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}