import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import ApexCharts from "apexcharts"; // Import ApexCharts directly
import dayjs from "dayjs";
import jalaliday from "jalaliday";
import "dayjs/locale/fa"; // Import Persian locale for dayjs
import { Alert, Button, Row, Spin } from "antd";
import { useFetchData } from "../../../hooks";
import { DashDataApi } from "../../../api";

// Extend dayjs to use Jalali (Shamsi) calendar
dayjs.extend(jalaliday);
interface ChartDataItem {
  date: string;
  value: number;
}

const ChartTimeline: React.FC = () => {
  const {
    data: chartdata,
    loading: chartloading,
    error: error,
  } = useFetchData(DashDataApi.getSeizureCount);

  const options: ApexOptions = {
    chart: {
      id: "area-datetime",
      type: "area",
      height: 350,
      zoom: {
        autoScaleYaxis: true,
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
            // .locale("fa")
            // .format("YYYY/MM/DD"), // Format Jalali dates
      },
    },
    tooltip: {
      x: {
       // formatter: (val: number) =>
        //  dayjs(val).calendar("jalali").locale("fa").format("YYYY/MM/DD"), // Show Jalali dates in tooltip
      },
    },
    stroke: {
      curve: "smooth",
      colors: ["#FF5733"],
      width: 3,
    },
    fill: {
      colors: ["#FF5733"],
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
    colors: ["#FF5733"],
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },

    noData: {
      text: "داده ای وجود ندارد",
    },
  };

  const series = [
    {
      name: "تشنج ها:",
      data:
        chartdata?.map((item: ChartDataItem) => [
          dayjs(item.date).calendar("jalali").valueOf(), // Convert Gregorian date to Jalali timestamp
          item.value,
        ]) || [],
    },
  ];

  const resetCssClasses = (activeEl: any) => {
    const els = document.querySelectorAll("button");
    Array.prototype.forEach.call(els, function (el) {
      el.classList.remove("active");
    });
    activeEl.target.classList.add("active");
  };

  const handleZoom = (
    startDate: string,
    endDate: string,
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    resetCssClasses(e);

    const chart = ApexCharts.getChartByID("area-datetime");

    // if (chart) {
    //   chart.zoomX(
    //     dayjs(startDate).calendar("jalali").valueOf(),
    //     dayjs(endDate).calendar("jalali").valueOf()
    //   );
    // } else {
    //   console.error("Chart not found");
    // }
  };

  // Get the earliest and latest dates from the chart data (in Gregorian format)
  const firstDate = dayjs(chartdata?.[0]?.date || new Date()); // Keep as Gregorian
  const lastDate = dayjs(chartdata?.[chartdata.length - 1]?.date || new Date()); // Keep as Gregorian

  const handleLastMonth = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const endDate = lastDate;
    const startDate = lastDate.subtract(1, "month");
    handleZoom(startDate.format("YYYY/MM/DD"), endDate.format("YYYY/MM/DD"), e);
  };

  const handleLastSixMonths = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    const endDate = lastDate;
    const startDate = lastDate.subtract(6, "month");

    handleZoom(startDate.format("YYYY/MM/DD"), endDate.format("YYYY/MM/DD"), e);
  };

  const handleLastYear = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const endDate = lastDate;
    const startDate = lastDate.subtract(1, "year");

    handleZoom(startDate.format("YYYY/MM/DD"), endDate.format("YYYY/MM/DD"), e);
  };

  const handleAllData = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    handleZoom(
      firstDate.format("YYYY/MM/DD"),
      lastDate.format("YYYY/MM/DD"),
      e
    );
  };
  //loading styles
  const contentStyle: React.CSSProperties = {
    padding: 50,
    background: "rgba(0, 0, 0, 0.05)",
    borderRadius: 4,
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
      {" "}
      {/* Set direction to RTL */}
      <Row justify="space-evenly" style={{ direction: "ltr" }}>
        <Button id="one_month" onClick={handleLastMonth}>
          یک ماه
        </Button>
        <Button id="six_months" onClick={handleLastSixMonths}>
          شش ماه
        </Button>
        <Button id="one_year" onClick={handleLastYear}>
          یک سال
        </Button>
        <Button id="all" onClick={handleAllData}>
          همه
        </Button>
      </Row>
      <div id="chart-timeline">
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height={350}
        />
      </div>
    </div>
  );
};

export default ChartTimeline;
