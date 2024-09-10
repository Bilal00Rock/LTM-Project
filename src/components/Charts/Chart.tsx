import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import ApexCharts from 'apexcharts';  // Import ApexCharts directly

const ChartTimeline: React.FC = () => {
  // Define the chart options and series
  const options: ApexOptions = {
    chart: {
      id: 'area-datetime',
      type: 'area',
      height: 350,
      zoom: {
        autoScaleYaxis: true,
      },
    },
    annotations: {
      yaxis: [
        {
          y: 30,
          borderColor: '#999',
          label: {
            text: 'Support',
            style: {
              color: '#fff',
              background: '#00E396',
            },
          },
        },
      ],
      xaxis: [
        {
          x: new Date('14 Nov 2012').getTime(),
          borderColor: '#999',
          label: {
            text: 'Rally',
            style: {
              color: '#fff',
              background: '#775DD0',
            },
          },
        },
      ],
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,  // Remove the incorrect `style` property
    },
    xaxis: {
      type: 'datetime',
      min: new Date('01 Mar 2012').getTime(),
      tickAmount: 6,
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy',
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
  };

  const series = [
    {
      name: 'Price',
      data: [
        [1327359600000, 30.95],
        [1327446000000, 31.34],
        [1327532400000, 31.18],
        [1327618800000, 31.05],
        [1327878000000, 31.0],
        [1327964400000, 30.95],
        [1328050800000, 31.24],
        // ... add the rest of the data here
      ],
    },
  ];

  // Reset CSS classes for buttons
  const resetCssClasses = (activeEl: any) => {
    const els = document.querySelectorAll('button');
    Array.prototype.forEach.call(els, function (el) {
      el.classList.remove('active');
    });

    activeEl.target.classList.add('active');
  };

  // Handlers for zooming the chart
  const handleZoom = (startDate: string, endDate: string, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    resetCssClasses(e);

    const chart = ApexCharts.getChartByID('area-datetime');
    
    if (chart) {
      // Only attempt to zoom if the chart is found
      chart.zoomX(new Date(startDate).getTime(), new Date(endDate).getTime());
    } else {
      console.error('Chart not found');
    }
  };

  return (
    <div>
      <div id="chart-timeline">
        <ReactApexChart options={options} series={series} type="area" height={350} />
      </div>
      <div className="buttons">
        <button id="one_month" onClick={(e) => handleZoom('28 Jan 2013', '27 Feb 2013', e)}>
          1M
        </button>
        <button id="six_months" onClick={(e) => handleZoom('27 Sep 2012', '27 Feb 2013', e)}>
          6M
        </button>
        <button id="one_year" onClick={(e) => handleZoom('27 Feb 2012', '27 Feb 2013', e)}>
          1Y
        </button>
        <button id="ytd" onClick={(e) => handleZoom('01 Jan 2013', '27 Feb 2013', e)}>
          YTD
        </button>
        <button id="all" onClick={(e) => handleZoom('23 Jan 2012', '27 Feb 2013', e)}>
          ALL
        </button>
      </div>
    </div>
  );
};

export default ChartTimeline;
