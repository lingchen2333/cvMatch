package com.lingchen.cvMatch.response.sankeyResponse;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SankeyLink {
    private String source;
    private String target;
    private long value;
}
