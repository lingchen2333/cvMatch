package com.lingchen.cvMatch.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
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

    @Size(max = 50)
    private String jobUrl;

    @Size(max = 20)
    private String companyName;

    @Size(max = 50)
    private String jobTitle;

    private LocalDate dateApplied;

    @Size(max = 20)
    private String status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}