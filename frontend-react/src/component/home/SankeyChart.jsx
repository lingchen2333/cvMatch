import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSankeyData } from "../../store/features/applicationSlice";
import { sankey, sankeyCenter, sankeyLinkHorizontal } from "d3-sankey";
import useDimensions from "../../service/useDimensions";

const SankeyChart = () => {
  const dispatch = useDispatch();
  const sankeyData = useSelector((state) => state.application.sankeyData);
  const [containerRef, { width, height }] = useDimensions();
  const [chartDimensions, setChartDimensions] = useState({
    width: 0,
    height: 0,
  });

  // Color palette for different link types
  const linkColors = [
    "#4b369d", // indigo
    "#ffcc00", // yellow
    "#e81416", // Red
    "#99cc33", // Green
    "#ff9900", // orange
    "#465362", // gray
    "#990066", // violet
    "#487de7", // Blue
  ];

  useEffect(() => {
    dispatch(getSankeyData());
  }, [dispatch]);

  // Update chart dimensions when container size changes
  useEffect(() => {
    if (width > 0 && height > 0) {
      // Calculate responsive dimensions with padding
      const padding = 40;
      const chartWidth = Math.max(width - padding * 2, 300); // Minimum width of 300px
      const chartHeight = Math.max(height - padding * 2, 200); // Minimum height of 200px

      setChartDimensions({
        width: chartWidth,
        height: chartHeight,
      });
    }
  }, [width, height]);

  console.log("Container dimensions:", { width, height });
  console.log("Chart dimensions:", chartDimensions);

  if (
    !sankeyData?.nodes?.length ||
    !sankeyData?.links?.length ||
    chartDimensions.width === 0 ||
    chartDimensions.height === 0
  ) {
    return (
      <section className="mb-24 flex flex-col items-center justify-center space-y-6">
        <h4 className="text-2xl capitalize">Application Flow</h4>
        <div
          ref={containerRef}
          className="flex h-96 min-h-[300px] w-full items-center justify-center"
        >
          <p className="text-gray-500">Loading Sankey chart...</p>
        </div>
      </section>
    );
  }

  const MARGIN_X = 60;
  const MARGIN_Y = 20;

  const sankeyGenerator = sankey()
    .nodeWidth(20) // Responsive node width
    .nodePadding(Math.max(chartDimensions.height / 3, 50)) // Responsive padding
    .extent([
      [MARGIN_X, MARGIN_Y],
      [chartDimensions.width - MARGIN_X, chartDimensions.height - MARGIN_Y],
    ])
    .nodeId((node) => node.name)
    .nodeAlign(sankeyCenter);

  const graph = JSON.parse(JSON.stringify(sankeyData));
  const { nodes, links } = sankeyGenerator(graph);

  // Responsive font size based on container width
  const getFontSize = () => {
    if (chartDimensions.width < 400) return 10;
    if (chartDimensions.width < 600) return 11;
    if (chartDimensions.width < 800) return 12;
    return 14;
  };

  const fontSize = getFontSize();

  const allNodes = nodes.map((node) => {
    return (
      <g key={node.index}>
        <rect
          height={node.y1 - node.y0}
          width={sankeyGenerator.nodeWidth()}
          x={node.x0}
          y={node.y0}
          fill="#1d4ed8"
          fillOpacity={0.5}
          rx={2}
        />
      </g>
    );
  });

  const allLinks = links.map((link, i) => {
    const linkGenerator = sankeyLinkHorizontal();
    const path = linkGenerator(link);

    // Get color based on link index, cycling through the color palette
    const colorIndex = i % linkColors.length;
    const linkColor = linkColors[colorIndex];

    return (
      <path
        key={i}
        d={path}
        stroke={linkColor}
        fill="none"
        strokeOpacity={0.4}
        strokeWidth={Math.max(link.width, 1)} // Ensure minimum stroke width
      />
    );
  });

  const allLabels = nodes.map((node, i) => {
    const isLeftSide = node.x0 < chartDimensions.width / 2;
    const labelX = isLeftSide ? node.x1 + 8 : node.x0 - 8;

    return (
      <text
        key={i}
        x={labelX}
        y={(node.y1 + node.y0) / 2}
        dy="0.35rem"
        textAnchor={isLeftSide ? "start" : "end"}
        fontSize={fontSize}
        fill="#374151"
        fontWeight="500"
      >
        {node.name}: {node.value}
      </text>
    );
  });

  return (
    <section className="flex flex-col items-center justify-center space-y-6">
      <h4 className="text-2xl capitalize">Application Flow</h4>
      <div
        ref={containerRef}
        className="mx-auto h-96 min-h-[300px] w-full max-w-6xl"
      >
        <svg
          width={chartDimensions.width}
          height={chartDimensions.height}
          className="mx-auto"
          viewBox={`0 0 ${chartDimensions.width} ${chartDimensions.height}`}
          preserveAspectRatio="xMidYMid meet"
        >
          {allNodes}
          {allLinks}
          {allLabels}
        </svg>
      </div>
    </section>
  );
};

export default SankeyChart;
