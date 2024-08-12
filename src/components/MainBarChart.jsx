import * as React from "react";
import { useEffect } from "react";
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  PieSeries,
  AccumulationDataLabel,
  Inject,
} from "@syncfusion/ej2-react-charts";
import { Browser } from "@syncfusion/ej2-base";
export let pointRender = (args) => {
  let selectedTheme = null;
  selectedTheme = selectedTheme ? selectedTheme : "material";
  if (selectedTheme === "fluent" || selectedTheme === "bootstrap5") {
    args.fill = seriesColor[args.point.index % 10];
  }
  if (selectedTheme.indexOf("dark") > -1) {
    if (selectedTheme.indexOf("material") > -1) {
      args.border.color = "#303030";
    } else if (selectedTheme.indexOf("bootstrap5") > -1) {
      args.border.color = "#212529";
    } else if (selectedTheme.indexOf("bootstrap") > -1) {
      args.border.color = "#1A1A1A";
    } else if (selectedTheme.indexOf("fabric") > -1) {
      args.border.color = "#201f1f";
    } else if (selectedTheme.indexOf("fluent") > -1) {
      args.border.color = "#252423";
    } else if (selectedTheme.indexOf("bootstrap") > -1) {
      args.border.color = "#1A1A1A";
    } else if (selectedTheme.indexOf("tailwind") > -1) {
      args.border.color = "#1F2937";
    } else {
      args.border.color = "#222222";
    }
  } else if (selectedTheme.indexOf("highcontrast") > -1) {
    args.border.color = "#000000";
  } else if (selectedTheme.indexOf("fluent2") > -1) {
    args.fill = seriesColor[args.point.index % 10];
  } else {
    args.border.color = "#FFFFFF";
  }
};
let seriesColor = [
  "#FFE066",
  "#FAB666",
  "#F68F6A",
  "#F3646A",
  "#CC555A",
  "#9C4649",
];
export let data1 = [
  { x: "Chrome", y: 61.3, text: "Chrome: 61.3%" },
  {
    x: "Safari",
    y: 24.6,
    text: Browser.isDevice ? "Safari: <br> 24.6%" : "Safari: 24.6%",
  },
  { x: "Edge", y: 5.0, text: "Edge: 5.0%" },
  {
    x: "Samsung Internet",
    y: 2.7,
    text: Browser.isDevice
      ? "Samsung <br> Internet: 2.7%"
      : "Samsung Internet: 2.7%",
  },
  {
    x: "Firefox",
    y: 2.6,
    text: Browser.isDevice ? "Firefox: <br> 2.6%" : "Firefox: 2.6%",
  },
  {
    x: "Others",
    y: 3.6,
    text: Browser.isDevice ? "Others: <br> 3.6%" : "Others: 3.6%",
  },
];
const MainBarChart = () => {
  const onChartLoad = (args) => {
    document.getElementById("pie-chart").setAttribute("title", "");
  };
  const load = (args) => {
    let selectedTheme = null;
    selectedTheme = selectedTheme ? selectedTheme : "Material3";
    args.accumulation.theme = (
      selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)
    )
      .replace(/-dark/i, "Dark")
      .replace(/light/i, "Light")
      .replace(/contrast/i, "Contrast")
      .replace(/-highContrast/i, "HighContrast");
  };
  return (
    <div className="control-pane">
      <div className="control-section">
        <AccumulationChartComponent
          id="pie-chart"
          centerLabel={{
            text: "Mobile<br>Browsers<br>Statistics",
            hoverTextFormat: "${point.x}<br>Browser Share<br>${point.y}%",
            textStyle: {
              fontWeight: "600",
              size: Browser.isDevice ? "7px" : "15px",
            },
          }}
          enableSmartLabels={true}
          load={load.bind(this)}
          loaded={onChartLoad.bind(this)}
          pointRender={pointRender}
          enableBorderOnMouseMove={false}
          legendSettings={{ visible: false }}
        >
          <Inject services={[PieSeries, AccumulationDataLabel]} />
          <AccumulationSeriesCollectionDirective>
            <AccumulationSeriesDirective
              dataSource={data1}
              xName="x"
              yName="y"
              innerRadius="65%"
              border={{ width: 1 }}
              startAngle={Browser.isDevice ? 30 : 62}
              dataLabel={{
                visible: true,
                position: "Outside",
                name: "text",
                font: { fontWeight: "600" },
                connectorStyle: { length: "20px", type: "Curve" },
              }}
              radius={Browser.isDevice ? "40%" : "70%"}
            />
          </AccumulationSeriesCollectionDirective>
        </AccumulationChartComponent>
      </div>
    </div>
  );
};
export default MainBarChart;
