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

class SleepStat extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    
    this.state = {
      series: [
        {
          name: " خواب",
          data: [80, 50, 30, 40, 100],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "radar",
        },

        yaxis: {
          stepSize: 20,
        },
        xaxis: {
          categories: ["خیلی خوب", "خوب", "معمولی", "بد", "خیلی بد"],
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
            type="radar"
            height={350}
          />
        </div>
      </div>
    );
  }
}

export default SleepStat;
