import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DailyIncomeChart = ({height, width}) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchDailyIncome = async () => {
      try {
        const response = await axios.get("http://localhost:8080/payment/dailyIncome", "https://bkticketing-backend-production.up.railway.app/payment/dailyIncome");

        // Format data for the chart
        const labels = response.data.map((item) => item.date); // Dates as labels
        const incomeData = response.data.map((item) => item.totalIncome); // Total income as data points

        setChartData({
          labels,
          datasets: [
            {
              label: "Daily Income",
              data: incomeData,
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              tension: 0.4,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching daily income:", error);
      }
    };

    fetchDailyIncome();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Daily Income Chart",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Income",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: width, height: height }}>
      {chartData ? <Line data={chartData} options={options} /> : <p>Loading chart...</p>}
    </div>
  );
};

export default DailyIncomeChart;
