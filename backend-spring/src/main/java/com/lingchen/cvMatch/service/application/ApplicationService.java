package com.lingchen.cvMatch.service.application;

import com.lingchen.cvMatch.dto.ApplicationDto;
import com.lingchen.cvMatch.exception.ResourceNotFoundException;
import com.lingchen.cvMatch.model.Application;
import com.lingchen.cvMatch.model.Status;
import com.lingchen.cvMatch.model.User;
import com.lingchen.cvMatch.repository.ApplicationRepository;
import com.lingchen.cvMatch.repository.StatusRepository;
import com.lingchen.cvMatch.repository.UserRepository;
import com.lingchen.cvMatch.request.AddApplicationRequest;
import com.lingchen.cvMatch.request.UpdateApplicationRequest;
import com.lingchen.cvMatch.response.ApplicationResponse;
import com.lingchen.cvMatch.response.ApplicationsMonthlyCountResponse;
import com.lingchen.cvMatch.response.sankeyResponse.SankeyLink;
import com.lingchen.cvMatch.response.sankeyResponse.SankeyNode;
import com.lingchen.cvMatch.response.sankeyResponse.SankeyResponse;
import com.lingchen.cvMatch.service.user.IUserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.YearMonth;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class ApplicationService implements IApplicationService {

    private final ApplicationRepository applicationRepository;
    private final IUserService userService;
    private final UserRepository userRepository;
    private final StatusRepository statusRepository;
    private final ModelMapper modelMapper;

    @Override
    public ApplicationResponse getUserApplications(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        User user = userService.getAuthenticatedUser();

        Sort.Direction direction = Sort.Direction.fromOptionalString(sortOrder).orElse(Sort.Direction.ASC);
        Sort sortByAndOrder = Sort.by(Sort.Order.by(sortBy).with(direction).ignoreCase());

        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);
        Page<Application> applicationPage = applicationRepository.findAllByUser(user, pageDetails);

        List<Application> applications = applicationPage.getContent();
        List<ApplicationDto> applicationDtos = applications.stream().map(this::convertToDto).toList();

        ApplicationResponse applicationResponse = new ApplicationResponse();
        applicationResponse.setContent(applicationDtos);
        applicationResponse.setPageNumber(applicationPage.getNumber());
        applicationResponse.setPageSize(applicationPage.getSize());
        applicationResponse.setTotalElements(applicationPage.getTotalElements());
        applicationResponse.setTotalPages(applicationPage.getTotalPages());
        applicationResponse.setLastPage(applicationPage.isLast());

        return applicationResponse;
    }


    @Override
    public ApplicationResponse getUserApplicationsByStatus(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder, String statusName) {
        User user = userService.getAuthenticatedUser();

        Sort.Direction direction = Sort.Direction.fromOptionalString(sortOrder).orElse(Sort.Direction.ASC);
        Sort sortByAndOrder = Sort.by(Sort.Order.by(sortBy).with(direction).ignoreCase());


        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);
        Page<Application> applicationPage = applicationRepository.findAllByUserAndStatusName(user, statusName, pageDetails);

        List<Application> applications = applicationPage.getContent();
        List<ApplicationDto> applicationDtos = applications.stream().map(this::convertToDto).toList();

        ApplicationResponse applicationResponse = new ApplicationResponse();
        applicationResponse.setContent(applicationDtos);
        applicationResponse.setPageNumber(applicationPage.getNumber());
        applicationResponse.setPageSize(applicationPage.getSize());
        applicationResponse.setTotalElements(applicationPage.getTotalElements());
        applicationResponse.setTotalPages(applicationPage.getTotalPages());
        applicationResponse.setLastPage(applicationPage.isLast());

        return applicationResponse;
    }

    @Override
    public Application getApplicationById(long id) {
        return applicationRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Application", "id", id));
    }

    @Override
    public Application addApplication(AddApplicationRequest request) {
        User user = userService.getAuthenticatedUser();
        Application application = new Application();
        application.setUser(user);

        application.setCompanyName(request.getCompanyName());
        application.setDateApplied(request.getDateApplied());
        application.setJobUrl(request.getJobUrl());
        application.setJobTitle(request.getJobTitle());
        application.setNotes(request.getNotes());

        Status status = statusRepository.getStatusByName(request.getStatusName())
                .orElseThrow(() -> new ResourceNotFoundException("Status", "name", request.getStatusName()));
        application.setStatus(status);

        return applicationRepository.save(application);
    }

    @Override
    public Application updateApplication(UpdateApplicationRequest request, Long id) {
        Application application = getApplicationById(id);

        User user = userService.getAuthenticatedUser();
        user.getApplications().stream().filter(app -> app.getId().equals(id)).findAny().orElseThrow(() -> new ResourceNotFoundException("Application", "id", id));

        application.setCompanyName(request.getCompanyName());
        application.setDateApplied(request.getDateApplied());
        application.setJobUrl(request.getJobUrl());
        application.setJobTitle(request.getJobTitle());
        application.setNotes(request.getNotes());

        Status status = statusRepository.getStatusByName(request.getStatusName())
                .orElseThrow(() -> new ResourceNotFoundException("Status", "name", request.getStatusName()));
        application.setStatus(status);

        Application updatedApplication = applicationRepository.save(application);

        user.getApplications().removeIf(app -> app.getId().equals(id));
        user.getApplications().add(updatedApplication);
        userRepository.save(user);

        return updatedApplication;
    }

    @Override
    public void deleteApplicationById(long id) {
        Application application = getApplicationById(id);

        User user = application.getUser();
        user.getApplications().removeIf(app -> app.getId().equals(id));
        userRepository.save(user);

        applicationRepository.delete(application);
    }

    @Override
    public Map<String, Long> getApplicationStatusCounts() {
        User user = userService.getAuthenticatedUser();
        return statusRepository.findAll().stream().collect(Collectors.toMap(
                status -> status.getName(),
                status -> applicationRepository.countByUserAndStatusName(user, status.getName())
        ));
    }

    @Override
    public List<ApplicationsMonthlyCountResponse> getApplicationsMonthlyCount() {
        User user = userService.getAuthenticatedUser();
        List<Object[]> results = applicationRepository.countApplicationsPerMonth(user);

        Map<String, Long> dbCounts = results.stream()
                .collect(Collectors.toMap(
                        row -> (String) row[0], // "YYYY-MM"
                        row -> (Long) row[1]
                ));

        YearMonth start = dbCounts.keySet().stream()
                .map(YearMonth::parse)
                .min(Comparator.naturalOrder())
                .orElse(YearMonth.now());

        YearMonth end = dbCounts.keySet().stream()
                .map(YearMonth::parse)
                .max(Comparator.naturalOrder())
                .orElse(YearMonth.now());

        List<ApplicationsMonthlyCountResponse> completeCounts = new ArrayList<>();
        YearMonth current = start;

        while (!current.isAfter(end)) {
            String month = current.toString(); // "YYYY-MM"
            Long count = dbCounts.getOrDefault(month, 0L);
            completeCounts.add(new ApplicationsMonthlyCountResponse(month, count));
            current = current.plusMonths(1);
        }

        return completeCounts;
    }

    @Override
    public SankeyResponse getApplicationSankeyData() {


        User user = userService.getAuthenticatedUser();
        long totalCount = applicationRepository.countByUser(user);
        long appliedCount = applicationRepository.countByUserAndStatusName(user, "applied");
        long interviewingCount = applicationRepository.countByUserAndStatusName(user, "interviewing");
        long rejectedCount = applicationRepository.countByUserAndStatusName(user, "rejected");
        long rejectWithoutInterviewCount = applicationRepository.countByUserAndStatusName(user, "rejected (no interview)");
        long offerCount = applicationRepository.countByUserAndStatusName(user, "offer");

        long replyCount = interviewingCount + rejectedCount + offerCount + rejectWithoutInterviewCount;
        long interviewCount = interviewingCount + rejectedCount + offerCount;

        List<SankeyLink> links = List.of(
                        new SankeyLink("Applications", "Replies", replyCount),
                        new SankeyLink("Applications", "No Replies", appliedCount),  // Applied → pending
                        new SankeyLink("Replies", "Interviews", interviewCount), // Interview scheduled → interviewing
                        new SankeyLink("Replies", "Rejected", rejectWithoutInterviewCount), // Interview scheduled → rejected
                        new SankeyLink("Interviews", "Pending", interviewingCount), // Interview scheduled → offer
                        new SankeyLink("Interviews", "Rejected", rejectedCount),  // Applied → reject
                        new SankeyLink("Interviews", "Offer", offerCount)   // Applied → reject
                )
                .stream().filter(link -> link.getValue() > 0).collect(Collectors.toList());

        List<SankeyNode> nodes = new ArrayList<>();

        addSankeyNode(nodes, "Applications", totalCount);
        addSankeyNode(nodes, "Replies", replyCount);
        addSankeyNode(nodes, "No Replies", appliedCount);
        addSankeyNode(nodes, "Interviews", interviewCount);
        addSankeyNode(nodes, "Rejected", rejectWithoutInterviewCount + rejectedCount);
        addSankeyNode(nodes, "Offer", offerCount);
        addSankeyNode(nodes, "Pending", interviewingCount);

        return new SankeyResponse(nodes, links);


    }

    private void addSankeyNode(List<SankeyNode> nodes, String nodeName, long count) {
        if (count > 0) {
            nodes.add(new SankeyNode(nodeName));
        }
    }


    @Override
    public ApplicationDto convertToDto(Application application) {
        return modelMapper.map(application, ApplicationDto.class);
    }
}
