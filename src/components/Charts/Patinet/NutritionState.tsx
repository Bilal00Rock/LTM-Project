import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { Button, Modal, Table } from "antd";
import moment from "moment-jalaali";

interface NutritionStatusData {
  nutritionStatus: {
    list: {
      date: string;
      defaultIngredients: {
        id: string;
        label: {
          fa: string;
          en: string;
        };
        type: string;
      }[];
    }[];
  };
  seizures: {
    list: {
      seizureDateTime: string;
    }[];
  };
}

interface IState {
  series: {
    name: string;
    data: number[];
  }[];
  options: ApexOptions;
}

interface NutritionStateProps {
  data: NutritionStatusData;
}

const NutritionState: React.FC<NutritionStateProps> = ({ data }) => {
  const [isNutritionModalOpen, setNutritionModalOpen] = useState(false);

  const categories = [
    "غلات",
    "قند و چربی",
    "پروتئین",
    "سبزی",
    "میوه",
    "لبنیات",
    "نوشیدنی",
  ];

  const typeToCategoryMap: { [key: string]: string } = {
    Grains: "غلات",
    SugarAndFat: "قند و چربی",
    Protein: "پروتئین",
    Vegetables: "سبزی",
    Fruits: "میوه",
    Dairy: "لبنیات",
    Beverages: "نوشیدنی",
  };

  // Helper to format dates
  const formatDate = (date: string): string =>
    moment(date, "YYYY-MM-DD").format("jYYYY/jMM/jDD");

  // Create a set of seizure dates
  const seizureDates = new Set(
    data.seizures.list.map((item) => formatDate(item.seizureDateTime))
  );

  // Aggregate data for radar chart
  const aggregateData = (): number[] => {
    const counts: { [key: string]: number } = {};
    categories.forEach((category) => (counts[category] = 0));

    data.nutritionStatus.list.forEach((entry) => {
      entry.defaultIngredients.forEach((ingredient) => {
        const category = typeToCategoryMap[ingredient.type];
        if (category) counts[category]++;
      });
    });

    return categories.map((category) => counts[category] || 0);
  };

  // Prepare table data
  const allItems = data.nutritionStatus.list.flatMap((entry) =>
    entry.defaultIngredients.map((ingredient) => ({
      key: `${entry.date}-${ingredient.id}`, // Unique key
      date: formatDate(entry.date),
      faLabel: ingredient.label.fa,
      enLabel: ingredient.label.en,
      category: typeToCategoryMap[ingredient.type] || "نامشخص",
      seizureOccurred: seizureDates.has(formatDate(entry.date)), // Check seizure occurrence
    }))
  );

  const [state] = useState<IState>({
    series: [
      {
        name: "تعداد اقلام",
        data: aggregateData(),
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "radar",
      },
      xaxis: {
        categories,
      },
      plotOptions: {
        radar: {
          polygons: {
            strokeColors: "#e9e9e9",
            fill: {
              colors: ["#f3f3f3", "#fff"],
            },
          },
        },
      },
      yaxis: {
        tickAmount: 5,
      },
    },
  });

  const columns = [
    {
      title: "تاریخ",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "نام فارسی",
      dataIndex: "faLabel",
      key: "faLabel",
    },
    {
      title: "نام انگلیسی",
      dataIndex: "enLabel",
      key: "enLabel",
    },
    {
      title: "دسته‌بندی",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "وقوع تشنج",
      dataIndex: "seizureOccurred",
      key: "seizureOccurred",
      render: (occurred: boolean) => (occurred ? "بله" : "خیر"),
    },
  ];

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="radar"
          height={350}
        />
        <Button size="large" onClick={() => setNutritionModalOpen(true)}>
          لیست تغذیه
        </Button>
      </div>
      <Modal
        title="وضیعت تغذیه بیمار"
        open={isNutritionModalOpen}
        centered
        onCancel={() => setNutritionModalOpen(false)}
        footer={
          <Button type="primary" onClick={() => setNutritionModalOpen(false)}>
            تایید
          </Button>
        }
      >
        <div style={{ marginTop: "20px" }}>
          <Table
            columns={columns}
            dataSource={allItems}
            pagination={{ pageSize: 10 }}
            title={() => "لیست تمامی اقلام بر اساس تاریخ"}
          />
        </div>
      </Modal>
    </div>
  );
};

export default NutritionState;
