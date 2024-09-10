import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import ApexCharts from 'apexcharts';  // Import ApexCharts directly
import dayjs from 'dayjs';
import jalaliday from 'jalaliday';
import 'dayjs/locale/fa'; // Import Persian locale for dayjs
import { Color } from 'antd/es/color-picker';
import { Button, Row } from 'antd';

// Extend dayjs to use Jalali (Shamsi) calendar
dayjs.extend(jalaliday);

const ChartTimeline: React.FC = () => {
  // Function to convert date to Unix timestamp with optional seconds or milliseconds
  const toUnixTimestamp = (date: string | Date, inSeconds: boolean = false): number => {
    const timestamp = dayjs(date).calendar('jalali').valueOf(); // Get timestamp in milliseconds
    return inSeconds ? Math.floor(timestamp / 1000) : timestamp; // Return timestamp in seconds or milliseconds
  };

  const options: ApexOptions = {
    chart: {
      id: 'area-datetime',
      type: 'area',
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
        }
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
      type: 'datetime',
      min: dayjs('2023-01-20').calendar('jalali').valueOf(),
      tickAmount: 6,
      labels: {
        formatter: (val: string) => dayjs(parseInt(val)).calendar('jalali').locale('fa').format('YYYY/MM/DD'), // Format Jalali dates
      },
    },
    tooltip: {
      x: {
        formatter: (val: number) => dayjs(val).calendar('jalali').locale('fa').format('YYYY/MM/DD'), // Show Jalali dates in tooltip
      },
    },
    stroke: {
      curve: 'smooth', 
      colors: ['#FF5733'], 
      width: 3,  
    },
    fill: {
      colors: ['#FF5733'], 
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
    colors: ['#FF5733'],
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
  };

  const series = [
    {
      name: 'تشنج ها:',
      data: [
        [toUnixTimestamp('2023-02-08T13:00:00'), 30],
        [toUnixTimestamp('2023-03-08T14:00:00'), 31],
        [toUnixTimestamp('2023-04-08T15:00:00'), 31],
        [toUnixTimestamp('2023-05-08T13:00:00'), 30],
        [toUnixTimestamp('2023-06-08T14:00:00'), 31],
        [toUnixTimestamp('2023-07-08T15:00:00'), 31],
        [toUnixTimestamp('2023-08-08T16:00:00'), 31],
        [toUnixTimestamp('2023-09-08T17:00:00'), 23],
        [toUnixTimestamp('2024-01-08T18:00:00'), 12],
        [toUnixTimestamp('2024-02-08T17:00:00'), 32],
        [toUnixTimestamp('2024-03-08T16:00:00'), 35],
        [toUnixTimestamp('2024-04-08T15:00:00'), 31],
        [toUnixTimestamp('2024-05-08T14:00:00'), 23],
        [toUnixTimestamp('2024-06-08T13:00:00'), 24],
        [toUnixTimestamp('2024-07-08T12:00:00'), 25],
        [toUnixTimestamp('2024-08-08T18:00:00'), 31],
        [toUnixTimestamp('2024-09-08T12:00:00'), 31],
        [toUnixTimestamp('2024-10-08T13:00:00'), 30],
        [toUnixTimestamp('2024-11-08T14:00:00'), 23],
        [toUnixTimestamp('2024-12-08T11:00:00'), 31],
      ],
    },
  ];

  const resetCssClasses = (activeEl: any) => {
    const els = document.querySelectorAll('button');
    Array.prototype.forEach.call(els, function (el) {
      el.classList.remove('active');
    });
    activeEl.target.classList.add('active');
  };

  const handleZoom = (startDate: string, endDate: string, e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    resetCssClasses(e);

    const chart = ApexCharts.getChartByID('area-datetime');
    
    if (chart) {
      chart.zoomX(dayjs(startDate).calendar('jalali').valueOf(), dayjs(endDate).calendar('jalali').valueOf());
    } else {
      console.error('Chart not found');
    }
  };

  return (
    <div style={{ direction: 'rtl' }}> {/* Set direction to RTL */}
      <Row justify="space-evenly" style={{direction: 'ltr'}}
      >
        <Button id="one_month" onClick={(e) => handleZoom('2024-01-28', '2024-02-27', e)}>یک ماه</Button>
        <Button id="six_months" onClick={(e) => handleZoom('2023-09-27', '2024-02-27', e)}>شش ماه</Button>
        <Button id="one_year" onClick={(e) => handleZoom('2023-02-27', '2024-02-27', e)}>یک سال</Button>
        <Button id="all" onClick={(e) => handleZoom('2023-02-00', '2024-12-00', e)}>همه</Button>
      </Row>
      <div id="chart-timeline">
        <ReactApexChart options={options} series={series} type="area" height={350} />
      </div>
    </div>
  );
};

export default ChartTimeline;





