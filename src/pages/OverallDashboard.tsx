import React from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { SchoolSurveyData } from '../types';

interface Props {
  aggregatedData: any;
}

const OverallDashboard: React.FC<Props> = ({ aggregatedData }) => {
  return (
    <div className="space-y-8">
      {/* Key Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-600 text-sm">Total Schools</h3>
          <p className="text-3xl font-bold mt-2">{aggregatedData.totalSchools}</p>
          <p className="text-sm text-gray-500 mt-1">Across all provinces</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-600 text-sm">Total Students</h3>
          <p className="text-3xl font-bold mt-2">{aggregatedData.totalStudents}</p>
          <p className="text-sm text-gray-500 mt-1">Enrolled students</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-600 text-sm">Total Teachers</h3>
          <p className="text-3xl font-bold mt-2">{aggregatedData.totalTeachers}</p>
          <p className="text-sm text-gray-500 mt-1">Active teachers</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-600 text-sm">Total Trades</h3>
          <p className="text-3xl font-bold mt-2">{aggregatedData.totalTrades}</p>
          <p className="text-sm text-gray-500 mt-1">Available courses</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gender Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Overall Gender Distribution</h3>
          <Doughnut 
            data={aggregatedData.genderDistribution}
            options={{
              plugins: {
                legend: {
                  position: 'bottom'
                }
              }
            }}
          />
        </div>

        {/* Infrastructure Status */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Infrastructure Overview</h3>
          <Bar 
            data={aggregatedData.infrastructureStatus}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'Number of Facilities'
                  }
                }
              },
              plugins: {
                legend: {
                  position: 'bottom'
                }
              }
            }}
          />
        </div>

        {/* Students per Trade */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Top Trades by Enrollment</h3>
          <Bar 
            data={aggregatedData.tradesDistribution}
            options={{
              indexAxis: 'y',
              plugins: {
                legend: {
                  position: 'bottom'
                }
              }
            }}
          />
        </div>

        {/* IT Resources */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">IT Resources Overview</h3>
          <Bar 
            data={aggregatedData.itResources}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'Number of Schools'
                  }
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default OverallDashboard;