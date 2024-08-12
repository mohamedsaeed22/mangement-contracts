// /**
//  * Sample for Column series
//  */
// import * as React from "react";
// import { useEffect } from "react";
// import {
//   ChartComponent,
//   SeriesCollectionDirective,
//   SeriesDirective,
//   Inject,
//   Legend,
//   Category,
//   Tooltip,
//   ColumnSeries,
//   DataLabel,
//   Highlight,
// } from "@syncfusion/ej2-react-charts";
// import { Browser } from "@syncfusion/ej2-base";
// export let data1 = [
//   { x: "GBR", y: 27, toolTipMappingName: "Great Britain" },
//   { x: "CHN", y: 26, toolTipMappingName: "China" },
//   { x: "AUS", y: 8, toolTipMappingName: "Australia" },
//   { x: "RUS", y: 19, toolTipMappingName: "Russia" },
//   { x: "GER", y: 17, toolTipMappingName: "Germany" },
//   { x: "UA", y: 2, toolTipMappingName: "Ukraine" },
//   { x: "ES", y: 7, toolTipMappingName: "Spain" },
//   { x: "UZB", y: 4, toolTipMappingName: "Uzbekistan" },
//   { x: "JPN", y: 12, toolTipMappingName: "Japan" },
//   { x: "NL", y: 8, toolTipMappingName: "NetherLand" },
//   { x: "USA", y: 46, toolTipMappingName: "United States" },
// ];
// export let data2 = [
//   { x: "GBR", y: 23, toolTipMappingName: "Great Britain" },
//   { x: "CHN", y: 18, toolTipMappingName: "China" },
//   { x: "AUS", y: 11, toolTipMappingName: "Australia" },
//   { x: "RUS", y: 17, toolTipMappingName: "Russia" },
//   { x: "GER", y: 10, toolTipMappingName: "Germany" },
//   { x: "UA", y: 5, toolTipMappingName: "Ukraine" },
//   { x: "ES", y: 4, toolTipMappingName: "Spain" },
//   { x: "UZB", y: 2, toolTipMappingName: "Uzbekistan" },
//   { x: "JPN", y: 8, toolTipMappingName: "Japan" },
//   { x: "NL", y: 7, toolTipMappingName: "NetherLand" },
//   { x: "USA", y: 37, toolTipMappingName: "United States" },
// ];
// export let data3 = [
//   { x: "GBR", y: 17, toolTipMappingName: "Great Britain" },
//   { x: "CHN", y: 26, toolTipMappingName: "China" },
//   { x: "AUS", y: 10, toolTipMappingName: "Australia" },
//   { x: "RUS", y: 20, toolTipMappingName: "Russia" },
//   { x: "GER", y: 15, toolTipMappingName: "Germany" },
//   { x: "UA", y: 24, toolTipMappingName: "Ukraine" },
//   { x: "ES", y: 6, toolTipMappingName: "Spain" },
//   { x: "UZB", y: 7, toolTipMappingName: "Uzbekistan" },
//   { x: "JPN", y: 8, toolTipMappingName: "Japan" },
//   { x: "NL", y: 4, toolTipMappingName: "NetherLand" },
//   { x: "USA", y: 38, toolTipMappingName: "United States" },
// ];
// const SAMPLE_CSS = `
//     .control-fluid {
//         padding: 0px !important;
//     }`;
// const MainColChart = () => {
//   const loaded = (args) => {
//     let chart = document.getElementById("charts");
//     chart.setAttribute("title", "");
//   };
//   const load = (args) => {
//     let selectedTheme = null;
//         selectedTheme = selectedTheme ? selectedTheme : 'Material3';
//         args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
//         if (selectedTheme === 'highcontrast') {
//             args.chart.series[0].marker.dataLabel.font.color = '#000000';
//             args.chart.series[1].marker.dataLabel.font.color = '#000000';
//             args.chart.series[2].marker.dataLabel.font.color = '#000000';
//         }
//   };
//   return (
//     <div className="control-pane">
//       <style>{SAMPLE_CSS}</style>
//       <div className="control-section">
//         <ChartComponent
//           id="charts"
//           style={{ textAlign: "center" }}
//           legendSettings={{ enableHighlight: true }}
//           primaryXAxis={{
//             labelIntersectAction: Browser.isDevice ? "None" : "Trim",
//             labelRotation: Browser.isDevice ? -45 : 0,
//             valueType: "Category",
//             interval: 1,
//             majorGridLines: { width: 0 },
//             majorTickLines: { width: 0 },
//           }}
//           primaryYAxis={{
//             title: "Medal Count",
//             majorTickLines: { width: 0 },
//             lineStyle: { width: 0 },
//             maximum: 50,
//             interval: 10,
//           }}
//           chartArea={{ border: { width: 0 } }}
//           load={load.bind(this)}
//           tooltip={{
//             enable: true,
//             header: "<b>${point.tooltip}</b>",
//             shared: true,
//           }}
//           width={Browser.isDevice ? "100%" : "75%"}
//           title="Olympic Medal Counts - RIO"
//           loaded={loaded.bind(this)}
//         >
//           <Inject
//             services={[
//               ColumnSeries,
//               Legend,
//               Tooltip,
//               Category,
//               DataLabel,
//               Highlight,
//             ]}
//           />
//           <SeriesCollectionDirective>
//             <SeriesDirective
//               dataSource={data1}
//               tooltipMappingName="toolTipMappingName"
//               xName="x"
//               columnSpacing={0.1}
//               yName="y"
//               name="Gold"
//               type="Column"
//             />
//             <SeriesDirective
//               dataSource={data2}
//               tooltipMappingName="toolTipMappingName"
//               xName="x"
//               columnSpacing={0.1}
//               yName="y"
//               name="Silver"
//               type="Column"
//             />
//             <SeriesDirective
//               dataSource={data3}
//               tooltipMappingName="toolTipMappingName"
//               xName="x"
//               columnSpacing={0.1}
//               yName="y"
//               name="Bronze"
//               type="Column"
//             />
//           </SeriesCollectionDirective>
//         </ChartComponent>
//       </div>
//     </div>
//   );
// };
// export default MainColChart;
