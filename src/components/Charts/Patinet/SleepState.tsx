import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import ApexCharts from "apexcharts"; // Import ApexCharts directly
import dayjs from "dayjs";
import jalaliday from "jalaliday";
import "dayjs/locale/fa"; // Import Persian locale for dayjs
import { Alert, Button, DatePicker, Row, Spin } from "antd";
import { useFetchData } from "../../../hooks";
import { DashDataApi } from "../../../api";
import moment from "moment-jalaali"; // Jalali Moment

// Extend dayjs to use Jalali (Shamsi) calendar
dayjs.extend(jalaliday);
interface ChartDataItem {
  date: string;
  value: number;
}

interface IState {
  series: {
    name: string;
    data: number[];
  }[];
  options: ApexOptions;
}

const SleepState: React.FC = () => {
  const {
    data: chartdata,
    loading: chartloading,
    error: error,
  } = useFetchData(DashDataApi.getSeizureCount);
  const [state, setState] = useState<IState>({
  options:{
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      },
      toolbar: {
        tools: {
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
      },
    },
    yaxis: {
      labels: {
        offsetX: -10, // Add space between Y-axis labels and the chart
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    xaxis: {
      type: "datetime",
      // min: dayjs("2023-01-20").calendar("jalali").valueOf(),
      tickAmount: 6,
      labels: {
        formatter: (val: string) =>
          dayjs(parseInt(val))
            .calendar("jalali")
            .locale("fa")
            .format("YYYY/MM/DD"), // Format Jalali dates
      },
    },
    tooltip: {
      x: {
        formatter: (val: number) =>
          dayjs(val).calendar("jalali").locale("fa").format("YYYY/MM/DD"), // Show Jalali dates in tooltip
      },
     },
    // stroke: {
    //   curve: "smooth",
    //   colors: ["#FF5733"],
    //   width: 3,
    //  },
    // fill: {
    //   colors: ["#FF5733"],
    //   type: "gradient",
    //   gradient: {
    //     shadeIntensity: 1,
    //     opacityFrom: 0.7,
    //     opacityTo: 0.9,
    //     stops: [0, 100],
    //   },
    // },
    // colors: ["#FF5733"],
    // grid: {
    //   row: {
    //     colors: ["#f3f3f3", "transparent"],
    //     opacity: 0.5,
    //   },
    // },

    noData: {
      text: "داده ای وجود ندارد",
    },
  },

  series:  [
    {
      name: "تشنج ها:",
      data:
        chartdata?.map((item: ChartDataItem) => [
          dayjs(item.date).calendar("jalali").valueOf(), // Convert Gregorian date to Jalali timestamp
          item.value,
        ]) || [],
    },
  ]
});
  // Get the earliest and latest dates from the chart data (in Gregorian format)
  const firstDate = dayjs(chartdata?.[0]?.date || new Date()); // Keep as Gregorian
  const lastDate = dayjs(chartdata?.[chartdata.length - 1]?.date || new Date()); // Keep as Gregorian

  //loading styles
  const contentStyle: React.CSSProperties = {
    padding: 50,
    background: "rgba(0, 0, 0, 0.05)",
    borderRadius: 4,
  };
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
  const content = <div style={contentStyle} />;
  //error handling 
  if (error)
    return (
      <Alert
        message="Error"
        description={error.toString()}
        type="error"
        showIcon
      />
    );

  return chartloading ? (
    <div>
      <Spin tip="Loading" size="large">
        {content}
      </Spin>
    </div>
  ) : (
    <div style={{ direction: "rtl" }}>
      {/* Jalali Date Range Picker */}
      <div className="date-picker">
        <DatePicker.RangePicker
          onChange={handleDateChange}
          format="jYYYY/jMM/jDD" // Jalali format
          placeholder={["تاریخ شروع", "تاریخ پایان"]}
        />
      </div>
  
      <div id="chart-timeline">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="line"
          height={350}
        />
      </div>
    </div>
  );
};

export default SleepState;
