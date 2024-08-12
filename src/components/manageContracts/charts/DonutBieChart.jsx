import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';

const DonutBieChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const options = {
      series: [44, 55, 41, 17, 15],
      chart: {
        type: 'donut',
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    };

    const chart = new ApexCharts(chartRef.current, options);

    chart.render();

    // Clean up function to destroy the chart when component unmounts
    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div id="chart" ref={chartRef}></div>
  );
};

export default DonutBieChart;
