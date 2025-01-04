import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import dayjs from "dayjs";
import * as moment from 'jalali-moment'; // Import jalali-moment
import calendar from "dayjs/plugin/calendar"; // Import dayjs calendar plugin
import localeData from "dayjs/plugin/localeData"; // Import localeData plugin
import { Button, Modal, Table } from "antd";

dayjs.extend(calendar);
dayjs.extend(localeData);

interface SeizureDataItem {
  seizureDateTime: string;
  seizureDuration?: string;
}

interface SeizureChartProps {
  data: {
    seizures?: {
      list: SeizureDataItem[];
    };
  };
}

const SeizureChart: React.FC<SeizureChartProps> = ({ data }) => {
  const seizureList = data.seizures?.list ?? [];
  
  // Group seizures by date and calculate the number of seizures and average duration for each day
  const groupedData = seizureList.reduce((acc: any, item: SeizureDataItem) => {
    const date = dayjs(item.seizureDateTime).format("YYYY/MM/DD");
    if (!acc[date]) {
      acc[date] = { count: 0, totalDuration: 0 };
    }
    acc[date].count += 1;
    if (item.seizureDuration) {
      acc[date].totalDuration += parseFloat(item.seizureDuration); // Assuming duration is a number in seconds
    }
    return acc;
  }, {});
  const chartData = Object.keys(groupedData).map((date) => {
    const { count, totalDuration } = groupedData[date];
    const avgDuration = totalDuration / count;
    const datemiladi = moment.from(date, 'fa', 'YYYY/MM/DD').format('YYYY/MM/DD')
    return {
      date:  dayjs(datemiladi, "YYYY/MM/DD").valueOf(),
      count,
      avgDuration,
    };
  });
  // Prepare table data for the modal
  const tableData = Object.keys(groupedData).map((date, index) => {
    const { count, totalDuration } = groupedData[date];
    const avgDuration = totalDuration / count;
    return {
      key: `${date}-${index}`,
      date: dayjs(date, "YYYY/MM/DD").format("YYYY/MM/DD"), // Jalali date
      count,
      avgDuration: avgDuration.toFixed(2), // Show average duration with two decimal points
    };
  });

  const options: ApexOptions = {
    chart: {
      id: "seizure-column-chart",
      type: "bar", // Change to 'bar' to create a column chart
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
    plotOptions: {
      bar: {
        columnWidth: "50%", // Adjust the column width
      },
    },
    xaxis: {
        type: "datetime",
        labels: {
          formatter: (val: string) =>
            dayjs(parseInt(val)).locale("fa").format("YYYY/MM/DD"), // Format Jalali dates
        },
      },
      tooltip: {
        x: {
          formatter: (val: number) =>
            dayjs(val).locale("fa").format("YYYY/MM/DD"), // Show Jalali dates in tooltip
        },
      },
    yaxis: [
      {
        min: 0, // Ensure Y-Axis starts at 0
        max: Math.max(...chartData.map((item) => item.count)) + 1, // Dynamically set max value for Y-Axis
      },

    ],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 2,
    },
    fill: {
      opacity: 0.9,
    },
    colors: ["#FF5733", "#33B5FF"], // Different colors for seizures and duration
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
  //console.log(chartData)
  const series = [
    {
      name: "تعداد تشنج‌ها",
      data: chartData.map((item) => [item.date, item.count]),
    },
    {
      name: "مدت زمان متوسط(دقیقه)",
      data: chartData.map((item) => [item.date, item.avgDuration]),
    },
  ];

  const [isModalOpen, setModalOpen] = useState(false);

  const columns = [
    {
      title: "تاریخ",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "تعداد تشنج‌ها",
      dataIndex: "count",
      key: "count",
    },
    {
      title: "مدت زمان متوسط (ثانیه)",
      dataIndex: "avgDuration",
      key: "avgDuration",
    },
  ];

  return (
    <div style={{ direction: "rtl" }}>
      <div id="chart-timeline">
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={350}
        />
      </div>
      <Button size="large" onClick={() => setModalOpen(true)}>
        مشاهده لیست تشنج‌ها
      </Button>
      <Modal
        title="لیست تشنج‌ها"
        open={isModalOpen}
        onCancel={() => setModalOpen(false)}
        footer={
          <Button type="primary" onClick={() => setModalOpen(false)}>
            تایید
          </Button>
        }
      >
        <Table columns={columns} dataSource={tableData} pagination={{ pageSize: 10 }} />
      </Modal>
    </div>
  );
};

export default SeizureChart;
