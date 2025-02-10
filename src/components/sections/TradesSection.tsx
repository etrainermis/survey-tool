import React from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const TradesSection = () => {
  const tradeData = {
    labels: ['Automobile Technology','Water and Irrigation','Agriculture','Food Processing','Animal Health',"Leather Technology","Forestry","Wood Technology","Food and Beverage Operations","Tourism","Front Office and Housekeeping Operations","Electronics and Telecommunication","Electrical Technology","Renewable Energy","Building Construction","Public Works","Land Surveying","Plumbing Technology","Interior Design","Computer Systems and Architecture","Networking and Internet Technologies","Software Development","Multimedia Production","Software Programming and Embedded Systems","Fashion Design","Fine and Plastic Arts","Mining Technology","Beaty and aesthetics"],
    datasets: [
      {
        label: 'Boys',
        data: [65, 59, 80, 81,62, 55, 83, 23,45, 52, 12, 86,60, 58, 81, 90,89, 14, 43, 16,90, 94, 93, 81,65, 59, 80, 81],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Girls',
        data: [65, 59, 80, 81,65, 59, 80, 81,65, 59, 80, 81,65, 59, 80, 81,65, 59, 80, 81,65, 59, 80, 81,65, 59, 80, 81],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const genderData = {
    labels: ['Boys', 'Girls'],
    datasets: [
      {
        data: [300, 200],
        backgroundColor: ['rgba(54, 162, 235, 0.5)', 'rgba(255, 99, 132, 0.5)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const gender = {
    labels: ["Boys", "Girls"],
    datasets: [
      {
        data: [300, 200],
        backgroundColor: ["rgba(54, 162, 235, 0.5)", "rgba(255, 99, 132, 0.5)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const levelData = {
    labels: ["Level 1", "Level 2", "Level 3", "Level 4", "Level 5"],
    datasets: [
      {
        label: "Students per Level",
        data: [65, 75, 70, 55, 45],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="space-y-6">
            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Students by Trade and Gender</h3>
                <Bar 
                 data={tradeData} 
                 options={{
                   responsive: true,
                   animation: {
                     duration: 1000,
                     easing: 'easeInOutQuart'
                   },
                   scales: {
                     y: {
                       beginAtZero: true,
                       title: {
                         display: true,
                         text: 'Number of Students'
                       }
                     },
                     x: {
                       title: {
                         display: true,
                         text: 'Trade'
                       }
                     }
                   },
                   plugins: {
                     tooltip: {
                       callbacks: {
                         label: function(context) {
                           return `${context.dataset.label}: ${context.raw} students`;
                         }
                       }
                     },
                     legend: {
                       position: 'top',
                     }
                   },
                   onHover: (event, elements) => {
                     if (elements && elements.length) {
                       const element = elements[0];
                       element.element.options.animation = {
                         duration: 200,
                         easing: 'easeInOut',
                         from: element.element.y,
                         to: element.element.y - 10
                       };
                     }
                   }
                 }}
               />
             </div>
      

      <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
        {/* Gender Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Overall Gender Distribution</h3>
          <Pie data={gender} />
        </div>

        {/* Students per Level */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Students per Level</h3>
          <Line data={levelData} />
        </div>
      </div>
    </div>
  );
};

export default TradesSection;
