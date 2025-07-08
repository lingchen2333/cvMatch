package com.lingchen.cvMatch.response.sankeyResponse;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SankeyResponse {
    private List<SankeyNode> nodes;
    private List<SankeyLink> links;
}
