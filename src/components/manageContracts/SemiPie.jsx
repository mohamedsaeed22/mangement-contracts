import * as React from "react";
import { useEffect } from "react";
import { Browser } from "@syncfusion/ej2-base";
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  AccumulationDataLabel,
  PieSeries,
  Inject,
  AccumulationAnnotationsDirective,
  AccumulationAnnotationDirective,
  ChartAnnotation,
  AccumulationAnnotation,
  AccumulationTooltip,
} from "@syncfusion/ej2-react-charts";
export let data1 = [
  {
    x: "Chrome",
    y: 100,
    text: "Chrome (100M)<br>40%",
    tooltipMappingName: "40%",
  },

  {
    x: "Others",
    y: 25,
    text: "Others (25M)<br>10%",
    tooltipMappingName: "10%",
  },
];
let content = Browser.isDevice
  ? "<div style='font-Weight:700; font-size:11px;'>Browser<br>Market<br>Shares</div>"
  : "<div style='font-Weight:600; font-size:14px;'>Browser<br>Market<br>Shares</div>";
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }
    .pie-chart {
        align :center
    }`;
const SemiPie = () => {
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
      .replace(/contrast/i, "Contrast")
      .replace(/-highContrast/i, "HighContrast");
  };
  return (
    <div className="control-pane">
      <style>{SAMPLE_CSS}</style>
      <div className="control-section row">
        <AccumulationChartComponent
          id="pie-chart"
          ref={(pie) => (pie = pie)}
          legendSettings={{ visible: false }}
          enableBorderOnMouseMove={false}
          load={load.bind(this)}
          loaded={onChartLoad.bind(this)}
          tooltip={{
            enable: true,
            format:
              "<b>${point.x}</b><br>Browser Share: <b>${point.tooltip}</b>",
            header: "",
          }}
        >
          <Inject
            services={[
              AccumulationDataLabel,
              PieSeries,
              AccumulationTooltip,
              ChartAnnotation,
              AccumulationAnnotation,
            ]}
          />
          <AccumulationSeriesCollectionDirective>
            <AccumulationSeriesDirective
              dataSource={data1}
              tooltipMappingName="tooltipMappingName"
              xName="x"
              yName="y"
              startAngle={270}
              endAngle={90}
              explode={false}
              radius={Browser.isDevice ? "85%" : "100%"}
              innerRadius="40%"
              dataLabel={{
                visible: true,
                position: "Inside",
                enableRotation: true,
                connectorStyle: { length: "10%" },
                name: "text",
                font: {
                  fontWeight: "600",
                  size: Browser.isDevice ? "8px" : "11px",
                  color: "#ffffff",
                },
              }}
            />
          </AccumulationSeriesCollectionDirective>
          <AccumulationAnnotationsDirective>
            <AccumulationAnnotationDirective
              content={content}
              region="Series"
              x={Browser.isDevice ? "52%" : "50%"}
              y={Browser.isDevice ? "82%" : "85%"}
            />
          </AccumulationAnnotationsDirective>
        </AccumulationChartComponent>
      </div>
    </div>
  );
};
export default SemiPie;