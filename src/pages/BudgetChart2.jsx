import React from "react";
import CanvasJSReact from "@canvasjs/react-charts";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const BudgetChart2 = ({ spentBudgets, assindBudgets }) => {
  const spentDataPoints = spentBudgets
    ?.map((budget) => ({
      x: new Date(budget.spentDate),
      y: budget.spent,
      indexLabel: "$" + budget.spent?.toLocaleString(), // Format label as currency
    }))
    .sort((a, b) => a.x - b.x); // Sort by date

  // Map and sort assigned data points
  const assindDataPoints = assindBudgets
    ?.map((budget) => ({
      x: new Date(budget.assindDate),
      y: budget.budget,
      indexLabel: "$" + budget.budget?.toLocaleString(), // Format label as currency
    }))
    .sort((a, b) => a.x - b.x); // Sort by date

  const options = {
    animationEnabled: true,
    title: {
      text: "الميزانيات مقابل المنصرف على مدار الوقت",
      fontSize: 20,
      fontFamily: "Cairo",
      fontWeight: "bold",
      fontColor: "#4F81BC",
      padding: 10,
    },
    axisX: {
      valueFormatString: "MMM YYYY", // Display month and year
      labelFontColor: "#4F81BC",
      labelFontSize: 14,
      lineThickness: 2,
      tickThickness: 2,
      labelFontFamily: "Cairo",
    },
    axisY: {
      //   title: "Sales (in USD)",
      titleFontColor: "#4F81BC",
      titleFontSize: 16,
      labelFontColor: "#4F81BC",
      labelFontSize: 14,
      prefix: "$",
      lineThickness: 2,
      tickThickness: 2,
      labelFontFamily: "Cairo",
    },
    data: [
      {
        name: "المنصرف",
        fontFamily: "Cairo",
        showInLegend: true,
        yValueFormatString: "$#,###.00",
        xValueFormatString: "MMMM",
        type: "spline",
        dataPoints: spentDataPoints,
        indexLabelFontSize: 12,
        indexLabelFontColor: "#4F81BC",
        indexLabelPlacement: "outside",
        lineColor: "#4F81BC",
        markerType: "circle",
        markerSize: 8,
        markerColor: "#4F81BC",
      },
      {
        name: "المخصصات",
        fontFamily: "Cairo",
        showInLegend: true,
        yValueFormatString: "$#,###.00",
        xValueFormatString: "MMMM",
        type: "spline",
        dataPoints: assindDataPoints,
        indexLabelFontSize: 12,
        indexLabelFontColor: "#C0504E",
        indexLabelPlacement: "outside",
        lineColor: "#C0504E",
        markerType: "circle",
        markerSize: 8,
        markerColor: "#C0504E",
      },
    ],
    legend: {
      cursor: "pointer",
      itemclick: (e) => {
        if (
          typeof e.dataSeries.visible === "undefined" ||
          e.dataSeries.visible
        ) {
          e.dataSeries.visible = false;
        } else {
          e.dataSeries.visible = true;
        }
        e.chart.render();
      },
    },
  };

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default BudgetChart2;
