import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';

interface InfrastructureSectionProps {
  data: any[];
}

const InfrastructureSection: React.FC<InfrastructureSectionProps> = ({ data }) => {
  const processedData = React.useMemo(() => {
    if (!data?.length) return null;

    const infrastructureStatusMap = new Map();
    const materialsCountMap = new Map();

    data.forEach(survey => {
      const infrastructure = survey.processedData.infrastructure;
      infrastructure.forEach((item: any) => {
        // Count infrastructure by status
        if (!infrastructureStatusMap.has(item.type)) {
          infrastructureStatusMap.set(item.type, {
            good: 0,
            moderate: 0,
            poor: 0
          });
        }
        infrastructureStatusMap.get(item.type)[item.status]++;

        // Count materials usage
        item.materials.forEach((material: string) => {
          materialsCountMap.set(material, (materialsCountMap.get(material) || 0) + 1);
        });
      });
    });

    return {
      infrastructureStatus: Array.from(infrastructureStatusMap.entries()),
      materialsCount: Array.from(materialsCountMap.entries())
    };
  }, [data]);

  const infrastructureStatus = {
    labels: processedData?.infrastructureStatus.map(([type]) => type) || [],
    datasets: [
      {
        label: 'Good',
        data: processedData?.infrastructureStatus.map(([, counts]) => counts.good) || [],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'Moderate',
        data: processedData?.infrastructureStatus.map(([, counts]) => counts.moderate) || [],
        backgroundColor: 'rgba(255, 206, 86, 0.5)',
      },
      {
        label: 'Poor',
        data: processedData?.infrastructureStatus.map(([, counts]) => counts.poor) || [],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const constructionMaterials = {
    labels: processedData?.materialsCount.map(([material]) => material) || [],
    datasets: [
      {
        data: processedData?.materialsCount.map(([, count]) => count) || [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          'rgba(199, 199, 199, 0.5)',
          'rgba(83, 102, 255, 0.5)',
          'rgba(40, 159, 64, 0.5)',
          'rgba(210, 199, 199, 0.5)',
        ],
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Infrastructure Status */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Infrastructure Status</h3>
          <Bar
            data={infrastructureStatus}
            options={{
              scales: {
                x: { stacked: true },
                y: { stacked: true },
              },
            }}
          />
        </div>

        {/* Construction Materials */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Construction Materials Distribution</h3>
          <Doughnut data={constructionMaterials} />
        </div>
      </div>
    </div>
  );
};

export default InfrastructureSection;