import type React from "react"
import { Bar, Doughnut, Line } from "react-chartjs-2"
import EvaluationDashboard from "./EvaluationDashboard"

interface Props {
  aggregatedData: any
  evaluationData?: any
}

const OverallDashboard: React.FC<Props> = ({ aggregatedData, evaluationData }) => {
  // Placeholder data and options for the charts
  const placeholderBarData = {
    labels: ["Category 1", "Category 2", "Category 3", "Category 4", "Category 5", "Category 6"],
    datasets: [
      {
        label: "Data Set",
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderWidth: 1,
      },
    ],
  }

  const placeholderDoughnutData = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "Data Set",
        data: [300, 50, 100],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  }

  const placeholderLineData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Data Set",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Overall School Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Academic Performance Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Academic Performance</h3>
          <Bar data={placeholderBarData} options={chartOptions} height={300} />
        </div>

        {/* Student Demographics Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Student Demographics</h3>
          <Doughnut data={placeholderDoughnutData} options={chartOptions} height={300} />
        </div>

        {/* Attendance Trends Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Attendance Trends</h3>
          <Line data={placeholderLineData} options={chartOptions} height={300} />
        </div>

        {/* Teacher Qualifications Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Teacher Qualifications</h3>
          <Bar data={placeholderBarData} options={chartOptions} height={300} />
        </div>

        {/* Parent Involvement Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Parent Involvement</h3>
          <Doughnut data={placeholderDoughnutData} options={chartOptions} height={300} />
        </div>

        {/* IT Resources Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">IT Resources</h3>
          <Line data={placeholderLineData} options={chartOptions} height={300} />
        </div>
      </div>

      {/* Evaluation Dashboard Section */}
      {evaluationData && (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">School Evaluation Results</h3>
          <EvaluationDashboard evaluationData={evaluationData} />
        </div>
      )}
    </div>
  )
}

export default OverallDashboard

