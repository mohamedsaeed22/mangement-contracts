import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  TimeSeriesScale,
} from "chart.js";
import "chartjs-adapter-date-fns";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  TimeSeriesScale,
  ChartDataLabels
);

const BudgetChart = ({ data }) => {
  const parseData = (budgets, key) => {
    return budgets.map((budget) => ({
      date: new Date(budget[key]).toISOString().split("T")[0], // Extracting the date part only
      value: budget[key === "spentDate" ? "spent" : "budget"],
    }));
  };

  // Check if either spentBudgets or assindBudgets exist and have data
  const hasSpentBudgets = data.spentBudgets && data.spentBudgets.length > 0;
  const hasAssignedBudgets =
    data.assindBudgets && data.assindBudgets.length > 0;

  if (!hasSpentBudgets && !hasAssignedBudgets) {
    return null;
  }

  const spentBudgets = hasSpentBudgets
    ? parseData(data.spentBudgets, "spentDate")
    : [];
  const assignedBudgets = hasAssignedBudgets
    ? parseData(data.assindBudgets, "assindDate")
    : [];

  const labels = Array.from(
    new Set([...spentBudgets, ...assignedBudgets].map((item) => item.date))
  ).sort();

  const spentData = labels.map((date) => {
    const budget = spentBudgets.find((b) => b.date === date);
    return budget ? budget.value : 0;
  });

  const assignedData = labels.map((date) => {
    const budget = assignedBudgets.find((b) => b.date === date);
    return budget ? budget.value : 0;
  });

  const chartData = {
    labels,
    datasets: [
      ...(hasSpentBudgets
        ? [
            {
              label: "المنصرف",
              data: spentData,
              borderColor: "firebrick",
              backgroundColor: "rgba(178,34,34,0.2)",
              fill: true,
            },
          ]
        : []),
      ...(hasAssignedBudgets
        ? [
            {
              label: "الميزانيات المخصصة",
              data: assignedData,
              borderColor: "royalblue",
              backgroundColor: "rgba(65,105,225,0.2)",
              fill: true,
            },
          ]
        : []),
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "المنصرف مقابل الميزانيات المخصصة على مدار الوقت",
      },
      datalabels: {
        display: true,
        align: "top",
        formatter: (value, context) => {
          const date = context.chart.data.labels[context.dataIndex];
          return `${date}\n${value?.toLocaleString()}`;
        },
        color: "black",
        font: {
          size: 10,
          weight: "bold",
        },
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
        },
        title: {
          display: true,
          text: "التاريخ",
        },
      },
      y: {
        title: {
          display: true,
          text: "المبلغ",
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <Line data={chartData} options={options} style={{ maxWidth: "100%" }} />
    </div>
  );
};

export default BudgetChart;
