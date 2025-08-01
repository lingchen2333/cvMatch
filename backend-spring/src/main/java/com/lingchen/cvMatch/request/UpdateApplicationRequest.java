package com.lingchen.cvMatch.request;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class UpdateApplicationRequest {

    private String jobUrl;
    private String companyName;
    private String jobTitle;
    private LocalDate dateApplied;
    private String statusName;
    private String notes;
}

