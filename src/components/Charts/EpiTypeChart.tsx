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

class EpiTypeChart extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      series: [
        {
          name: "تعداد بیماران: ",
          data: [10, 41, 35, 51],
          
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "bar", // This is typed as 'line' from ApexOptions, no longer a generic string
          zoom: {
            autoScaleYaxis: true
          }

        },
        plotOptions: {
            bar: {
              barHeight: '100%',
              distributed: true,
              dataLabels: {
                position: 'bottom'
              },
            }
          },
        colors: ["#d4526e", "#f48024", "#69d2e7", "#546E7A"],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "straight",
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"],
            opacity: 0.5,
          },
        },
        
        xaxis: {
          categories: ["ژنرالیزه", "فوکال", " ژنرالیزه و فوکال", "ناشناخته"],
          
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
            type="bar"
            height={350}
          />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}

export default EpiTypeChart;
