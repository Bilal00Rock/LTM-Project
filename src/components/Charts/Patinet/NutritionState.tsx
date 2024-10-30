import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { DatePicker } from "antd"; // Ant Design DatePicker
import moment from "moment-jalaali"; // Jalali Moment

// Ensure the date picker uses Persian locale
import "moment/locale/fa"; 
import "antd/dist/reset.css"; // Import Ant Design styles

interface IState {
  series: {
    name: string;
    data: number[];
  }[];
  options: ApexOptions;
}

const NutritionState: React.FC = () => {
  // Set default series and chart options
  const [state, setState] = useState<IState>({
    series: [
      {
        name: "تغذیه",
        data: [0.1, 1.4, 4.6, 10, 3.6, 8.4, 5.4],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "radar",
      },
      plotOptions: {
        radar: {
          polygons: {
            fill: {
              colors: ["#f8f8f8", "#fff"],
            },
          },
        },
      },
      yaxis: {
        tickAmount: 5,
      },
      xaxis: {
        categories: ["غلات", "قند و چربی", "پروتئین", "سبزی", "میوه", "لبنیات", "نوشیدنی"],
      },
    },
  });

  // Date state for range picker (default to start to now)
  const [dates, setDates] = useState<[moment.Moment, moment.Moment]>([
    moment().startOf('jYear'), // Start of the Jalali year
    moment(), // Current date
  ]);

  const handleDateChange = (date: any, dateString: [string, string]) => {
    setDates(date);
    if (date && date.length === 2) {
      const start = date[0].format('jYYYY/jMM/jDD');
      const end = date[1].format('jYYYY/jMM/jDD');
      console.log("Selected Date Range:", start, " - ", end);

      // Example: Update chart data based on the selected dates (you can change logic as needed)
      setState({
        ...state,
        series: [
          {
            name: "تغذیه",
            data: [2.2, 3.1, 5.5, 6.3, 7.5, 8.7, 3.6], // New data after selecting date
          },
        ],
      });
    }
  };

  return (
    <div>
      {/* Jalali Date Range Picker */}
      <div className="date-picker">
        <DatePicker.RangePicker
          onChange={handleDateChange}
          format="jYYYY/jMM/jDD" // Jalali format
          placeholder={["تاریخ شروع", "تاریخ پایان"]}
        />
      </div>

      {/* Display the selected date range */}
      <div>
        <p>محدوده تاریخ انتخاب شده: {dates[0].format("jYYYY/jMM/jDD")} - {dates[1].format("jYYYY/jMM/jDD")}</p>
      </div>

      {/* Render the chart */}
      <div id="chart">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="radar"
          height={350}
        />
      </div>
    </div>
  );
};

export default NutritionState;
