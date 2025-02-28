import React, { FunctionComponent, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { Button, Modal, Table } from "antd";
import moment from "moment-jalaali";

import "moment/locale/fa";
import "antd/dist/reset.css";

interface IState {
  series: {
    name: string;
    data: number[];
  }[];
  options: ApexOptions;
}

interface MentalStateEntry {
  date: string;
  mentalStatuses: string[];
}

interface MentalStatusData {
  mentalStatus: {
    list: MentalStateEntry[];
    count: number;
  };
  seizures: {
    list: {
      seizureDateTime: string;
    }[];
    count: number;
  };
}

interface ComponentProps {
  data: MentalStatusData;
}

const MentalState: FunctionComponent<ComponentProps> = ({ data }) => {
  const categories = [
    "عادی", // Normal
    "شاد", // Happy
    "غمگین", // Sad
    "ترسیده", // Fear
    "شرمنده", // Shame
    "عصبانی", // Angry
    "هیجان‌زده", // Thrill
    "نگران", // Worry
  ];

  const stateToCategoryMap: { [key: string]: string } = {
    Normal: "عادی",
    Happy: "شاد",
    Sad: "غمگین",
    Fear: "ترسیده",
    Shame: "شرمنده",
    Angry: "عصبانی",
    Thrill: "هیجان‌زده",
    Worry: "نگران",
  };

  const formatDate = (date: string): string =>
    moment(date, "YYYY-MM-DD").format("jYYYY/jMM/jDD");

  const processData = (): number[] => {
    if (!data?.mentalStatus?.list) return Array(categories.length).fill(0);

    const counts: { [key: string]: number } = {};
    categories.forEach((category) => (counts[category] = 0));

    data.mentalStatus.list.forEach((entry) => {
      if (Array.isArray(entry.mentalStatuses)) {
        entry.mentalStatuses.forEach((state) => {
          const category = stateToCategoryMap[state];
          if (category) counts[category]++;
        });
      }
    });

    return categories.map((category) => counts[category] || 0);
  };

  // Safely create seizure dates set
  const seizureDates = new Set(
    (data.seizures.list || []).map((item) => {
      try {
        return moment(item.seizureDateTime, "YYYY-MM-DD").format("jYYYY/jMM/jDD");
      } catch (e) {
        console.error("Seizure date formatting error:", e);
        return "";
      }
    })
  );

  // Safely prepare table data
  const allItems = (data.mentalStatus.list || []).map((entry, index) => ({
    key: `${entry.date}-${index}`,
    date: formatDate(entry.date),
    states: Array.isArray(entry.mentalStatuses)
      ? entry.mentalStatuses
          .map((state) => stateToCategoryMap[state] || "نامشخص")
          .join(", ")
      : "نامشخص",
    seizureOccurred: seizureDates.has(formatDate(entry.date)) ? "بله" : "خیر",
  }));

  const columns = [
    {
      title: "تاریخ",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "وضعیت‌های ذهنی",
      dataIndex: "states",
      key: "states",
    },
    {
      title: "وقوع تشنج",
      dataIndex: "seizureOccurred",
      key: "seizureOccurred",
    },
  ];

  const [state] = useState<IState>({
    series: [
      {
        name: "وضعیت‌های ذهنی",
        data: processData(),
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
        categories: categories,
      },
    },
  });

  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="radar"
          height={350}
        />
      </div>
      <Button size="large" onClick={() => setModalOpen(true)}>
        مشاهده لیست وضعیت‌ها
      </Button>
      <Modal
        title="لیست وضعیت‌های ذهنی"
        open={isModalOpen}
        onCancel={() => setModalOpen(false)}
        footer={
          <Button type="primary" onClick={() => setModalOpen(false)}>
            تایید
          </Button>
        }
      >
        <Table columns={columns} dataSource={allItems} pagination={{ pageSize: 10 }} />
      </Modal>
    </div>
  );
};

export default MentalState;
