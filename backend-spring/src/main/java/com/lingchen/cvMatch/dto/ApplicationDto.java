package com.lingchen.cvMatch.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class ApplicationDto {
    private Long id;
    private String jobUrl;
    private String companyName;
    private String jobTitle;
    private LocalDate dateApplied;
    private String notes;

    private StatusDto status;
}
