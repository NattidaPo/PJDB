import { useState, useEffect, useRef } from 'react';
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarController, BarElement, Title, Tooltip, Legend);

const MainPage = () => {
  const [data, setData] = useState([]);
  const chartRef = useRef(null);
  const priceChartRef = useRef(null); // ใช้ ref เพิ่มสำหรับกราฟ Price

  // ดึงข้อมูลจาก API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/data'); // แก้ไข URL ให้ตรงกับ API ของคุณ
        const result = await response.json();
        
        // สมมุติว่า result เป็น array ของข้อมูลที่คุณต้องการ
        const formattedData = result.map(item => ({
          stock: parseFloat(item.R10Year_Stock),
          bonds: parseFloat(item.R10Year_Bonds),
          excess: parseFloat(item.R10Year_Excess),
          price: parseFloat(item.Price) // ดึงข้อมูล Price
        }));
        
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // สร้างกราฟหลัก (Stock, Bonds, Excess)
  useEffect(() => {
    if (chartRef.current && data.length) {
      new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: data.map((_, index) => `Data ${index + 1}`),
          datasets: [
            {
              label: 'R10Year Stock',
              data: data.map(item => item.stock),
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
            {
              label: 'R10Year Bonds',
              data: data.map(item => item.bonds),
              backgroundColor: 'rgba(153, 102, 255, 0.6)',
            },
            {
              label: 'R10Year Excess',
              data: data.map(item => item.excess),
              backgroundColor: 'rgba(255, 159, 64, 0.6)',
            }
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Data Points'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Value'
              },
              beginAtZero: true,
            }
          }
        }
      });
    }
  }, [data]);

  // สร้างกราฟสำหรับ Price แยกออกมา
  useEffect(() => {
    if (priceChartRef.current && data.length) {
      new Chart(priceChartRef.current, {
        type: 'bar',
        data: {
          labels: data.map((_, index) => `Data ${index + 1}`),
          datasets: [
            {
              label: 'Price',
              data: data.map(item => item.price),
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
            }
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Data Points'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Price Value'
              },
              beginAtZero: true,
            }
          }
        }
      });
    }
  }, [data]);

  return (
    <div>
      <h1>กราฟแท่งเปรียบเทียบ R10Year Stock, Bonds, และ Excess</h1>
      <canvas ref={chartRef}></canvas>
      
      <h1>กราฟแท่งแสดง Price</h1>
      <canvas ref={priceChartRef}></canvas>
    </div>
  );
};

export default MainPage;
