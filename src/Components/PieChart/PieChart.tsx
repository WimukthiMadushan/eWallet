import { Chart } from "react-google-charts";

interface PieChartProps {
  data: any[];
}

function PieChart({ data }: PieChartProps) {
  const options = {
    pieHole: 0.5, 
    pieStartAngle: 100,
    sliceVisibilityThreshold: 0.02,
    legend: {
      position: "bottom",
      alignment: "center",
      textStyle: {
        color: "#4a4a4a", // Softer color for better readability
        fontSize: 12,
        fontWeight: "500",
      },
    },
    pieSliceText: "none",
    chartArea: {
      left: 20,
      right: 20,
      top: 20,
      bottom: 20,
      width: "100%",
      height: "80%",
    },
    slices: [
      { color: "#6b5b95" },
      { color: "#feb236" },
      { color: "#d64161" },
      { color: "#ff7b25" },
      { color: "#86af49" },
    ], // Custom colors for slices
    tooltip: {
      textStyle: {
        color: "#333",
        fontSize: 12,
      },
      showColorCode: true,
    },
    animation: {
      startup: true,
      easing: "linear",
      duration: 1000,
    },
  };

  return (
    <div>
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={"100%"}
        height={"240px"}
      />
    </div>
  );
}

export default PieChart;
