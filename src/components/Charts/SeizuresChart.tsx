import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts"; // Import ApexOptions type

interface IState {
  series: {
    name: string;
    data: number[];
  }[];
  options: ApexOptions; // Use ApexOptions to type the options object
}

class SeizuresChart extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      series: [
        {
          name: "تعداد بیماران",
          data: [10, 41, 35, 51, 49, 62, 69],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "line", // This is typed as 'line' from ApexOptions, no longer a generic string
          zoom: {
            autoScaleYaxis: true
          }

          
        },
        
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: "smooth",
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"],
            opacity: 0.5,
          },
        },
        tooltip: {
            x: {
              format: "yyyy",
            },
            fixed: {
              enabled: false,
              position: 'topRight'
            }
          },
        xaxis: {
          categories: [
            "شنبه",
            "یکشنبه",
            "دوشنبه",
            "سه‌شنبه",
            "چهارشنبه",
            "پنچ‌شنبه",
            "جمعه",
          ],
        },
        yaxis: {
          min: 0,
        },
      },
    };
  }

  render() {
    return (
      <div>
        <div id="chart">
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="line"
            height={350}
          />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}

export default SeizuresChart;
