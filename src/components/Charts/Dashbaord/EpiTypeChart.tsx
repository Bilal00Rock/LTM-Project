import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts"; // Import ApexOptions type
import { DashDataApi } from "../../../api";
import { useFetchData } from "../../../hooks";
import { Alert, Spin } from "antd";

const EpiTypeChart: React.FC = () => {
  const {
    data: chartdata,
    loading: chartloading,
    error: error,
  } = useFetchData(DashDataApi.getTypes);
  const series = [
    {
      name: "تعداد بیماران: ",
      data: chartdata ? chartdata.map((item: any) => item.count) : [],
    },
  ];
  const options: ApexOptions = {
    chart: {
      height: 350,
      type: "bar", // This is typed as 'line' from ApexOptions, no longer a generic string
      zoom: {
        autoScaleYaxis: true,
      },
    },
    plotOptions: {
      bar: {
        barHeight: "100%",
        distributed: true,
        dataLabels: {
          position: "bottom",
        },
      },
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
      categories: chartdata ? chartdata.map((item: any) => item.type) : [],
    },
    noData: {
      text: "داده ای وجود ندارد",
    },
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
    <div>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={380}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default EpiTypeChart;
