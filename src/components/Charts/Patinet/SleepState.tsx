import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import dayjs from "dayjs";
import jalali from "jalali-moment"; // Import jalali-moment
import calendar from "dayjs/plugin/calendar"; // Import dayjs calendar plugin
import localeData from "dayjs/plugin/localeData"; // Import localeData plugin
import { Button, Modal, Table } from "antd";
import moment from "moment";

dayjs.extend(calendar);
dayjs.extend(localeData);

interface ChartDataItem {
  date: string;
  sleepStatus: string;
}

interface SleepStateProps {
  data: {
    sleepStatuse?: {
      list: ChartDataItem[];
    };
    seizures: {
      list: { seizureDateTime: string }[];
    };
  };
}


const SleepState: React.FC<SleepStateProps> = ({ data }) => {
  
  const sleepStatusList = data.sleepStatuse?.list ?? [];
  const seizureDates = new Set(
    data.seizures?.list.map((item) =>
      dayjs(item.seizureDateTime, "YYYY-MM-DD").format("YYYY/MM/DD")
    )
  );
 // console.log(sleepStatusList)
  const statusToValue: { [key: string]: number } = {
    VeryBad: 0,
    Bad: 1,
    Normal: 2,
    Good: 3,
    VeryGood: 4,
  };
  const statusToEmoji: { [key: string]: string } = {
    VeryBad: "😔 خیلی بد",
    Bad: "🙁 بد",
    Normal: "😐 معمولی",
    Good: "🙂 خوب",
    VeryGood: "😄 خیلی خوب",
  };
  // Prepare chart data
  const chartData = sleepStatusList.map((item: ChartDataItem) => ({
    date: dayjs(item.date, "YYYY/MM/DD").valueOf(), // Convert date to timestamp using dayjs
    value: statusToValue[item.sleepStatus] || 0, // Map the value to a number, default to 0 if not found
  }));
  const tableData = sleepStatusList.map((item, index) => ({
    key: `${item.date}-${index}`,
    date: jalali(item.date, "YYYY/MM/DD").format("jYYYY/jMM/jDD"), // Jalali format using jalali-moment
    status: `${statusToEmoji[item.sleepStatus] || ""} ${item.sleepStatus}`,
    seizureOccurred: seizureDates.has( dayjs(item.date, "YYYY-MM-DD").format("YYYY/MM/DD"))
      ? "بله" 
      : "خیر",
  }));
  
  
  const options: ApexOptions = {
    chart: {
      id: "area-datetime",
      type: "line",
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
        offsetX: -10,
        formatter: (val: number) => {
          const emojiMap: { [key: number]: string } = {
            0: "😔", // VeryBad
            1: "🙁", // Bad
            2: "😐", // Normal
            3: "🙂", // Good
            4: "😄", // VeryGood
          };
          return emojiMap[val] || ""; // Default to empty string if not found
        },
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
    stroke: {
      curve: "smooth",
      colors: ["#3E7B27"],
      width: 3,
    },
    fill: {
      colors: ["#3E7B27"],
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
    colors: ["#3E7B27"],
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
      name: ":وضیعت خواب",
      data: chartData.map((item) => [item.date, item.value]),
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
      title: "وضعیت خواب",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "وقوع تشنج",
      dataIndex: "seizureOccurred",
      key: "seizureOccurred",
    },
  ];

  return (
    <div style={{ direction: "rtl" }}>
      <div id="chart-timeline">
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={350}
        />
     </div>
      <Button size="large" onClick={() => setModalOpen(true)}>
        مشاهده لیست وضعیت‌ها
      </Button>
      <Modal
        title="لیست وضعیت‌های خواب"
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

export default SleepState;
