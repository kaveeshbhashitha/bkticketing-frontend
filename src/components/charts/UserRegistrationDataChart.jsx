import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import moment from 'moment';

export default function UserRegistrationDataChart() {
    const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/user/allUsers', 'https://bkticketing-backend-production.up.railway.app/user/allUsers');

        // Check if response.data is an array and is not empty
        if (Array.isArray(response.data) && response.data.length > 0) {
          const userCountByDate = response.data.reduce((acc, user) => {
            const date = moment(user.dateRegistered).format('YYYY-MM-DD');
            acc[date] = (acc[date] || 0) + 1;
            return acc;
          }, {});

          // Prepare data for the bar chart
          const chartData = {
            labels: Object.keys(userCountByDate), // Dates as labels on x-axis
            datasets: [
              {
                label: 'User Registrations',
                data: Object.values(userCountByDate), // User count as y-axis values
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
            ],
          };

          setChartData(chartData);
          setLoading(false);
        } else {
          throw new Error('No data available');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError(error.message || 'Error fetching data');
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h4>User Registration Count by Date</h4>
      <Bar
        data={chartData}
        options={{
          scales: {
            x: {
              title: {
                display: true,
                text: 'Registration Date',
              },
            },
            y: {
              title: {
                display: true,
                text: 'User Count',
              },
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
}

