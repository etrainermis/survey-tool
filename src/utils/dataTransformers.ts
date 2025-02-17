import { SchoolSurveyData } from '../types';

export const parseSchoolData = (jsonData: string) => {
  try {
    return JSON.parse(jsonData) as SchoolSurveyData;
  } catch (error) {
    console.error('Error parsing school data:', error);
    return null;
  }
};

export const getInfrastructureData = (schoolData: SchoolSurveyData) => {
  const infrastructureTypes = [
    'administration block',
    'classroom block',
    'computer lab',
    'library',
    'kitchen',
    'refectory',
    'smart classroom',
    'dormitories',
    'washrooms',
    'playgrounds',
    'school garden'
  ];

  const statusCounts = {
    good: Array(infrastructureTypes.length).fill(0),
    moderate: Array(infrastructureTypes.length).fill(0),
    poor: Array(infrastructureTypes.length).fill(0)
  };

  const materialCounts: Record<string, number> = {};

  schoolData.infrastructure.forEach(item => {
    const index = infrastructureTypes.indexOf(item.type);
    if (index !== -1 && item.status) {
      statusCounts[item.status as keyof typeof statusCounts][index]++;
    }

    item.materials.forEach(material => {
      materialCounts[material] = (materialCounts[material] || 0) + 1;
    });
  });

  return {
    infrastructureStatus: {
      labels: infrastructureTypes.map(type => 
        type.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
      ),
      datasets: [
        {
          label: 'Good',
          data: statusCounts.good,
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
        {
          label: 'Moderate',
          data: statusCounts.moderate,
          backgroundColor: 'rgba(255, 206, 86, 0.5)',
        },
        {
          label: 'Poor',
          data: statusCounts.poor,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    },
    constructionMaterials: {
      labels: Object.keys(materialCounts),
      datasets: [{
        data: Object.values(materialCounts),
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
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(199, 199, 199, 1)',
          'rgba(83, 102, 255, 1)',
          'rgba(40, 159, 64, 1)',
          'rgba(210, 199, 199, 1)',
        ],
      }],
    },
  };
};

export const getITData = (schoolData: SchoolSurveyData) => {
  const { computerLab, energySources } = schoolData.it;
  
  const totalComputers = parseInt(computerLab.totalComputers) || 0;
  const workingComputers = parseInt(computerLab.workingComputers) || 0;
  const nonWorkingComputers = totalComputers - workingComputers;

  return {
    computerStatus: {
      labels: ['Working Computers', 'Non-working Computers'],
      datasets: [{
        data: [workingComputers, nonWorkingComputers],
        backgroundColor: ['rgba(75, 192, 192, 0.5)', 'rgba(255, 99, 132, 0.5)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
      }],
    },
    connectivityData: {
      labels: ['Internet (LAN)', 'Projectors'],
      datasets: [
        {
          label: 'Available',
          data: [computerLab.hasLAN ? 1 : 0, computerLab.hasProjectors ? 1 : 0],
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
        {
          label: 'Not Available',
          data: [computerLab.hasLAN ? 0 : 1, computerLab.hasProjectors ? 0 : 1],
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    },
    energySourceData: {
      labels: energySources,
      datasets: [{
        data: energySources.map(() => 1),
        backgroundColor: [
          'rgba(255, 206, 86, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(75, 192, 192, 0.5)',
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
        ],
      }],
    },
  };
};

export const getTradesData = (schoolData: SchoolSurveyData) => {
  const tradeData = {
    labels: schoolData.trades.map(trade => trade.name),
    datasets: [
      {
        label: 'Male Students',
        data: schoolData.trades.map(trade => 
          trade.levels.reduce((sum, level) => sum + level.students.male, 0)
        ),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Female Students',
        data: schoolData.trades.map(trade => 
          trade.levels.reduce((sum, level) => sum + level.students.female, 0)
        ),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const totalMale = schoolData.trades.reduce((sum, trade) => 
    sum + trade.levels.reduce((levelSum, level) => levelSum + level.students.male, 0), 0
  );
  const totalFemale = schoolData.trades.reduce((sum, trade) => 
    sum + trade.levels.reduce((levelSum, level) => levelSum + level.students.female, 0), 0
  );

  const genderData = {
    labels: ['Male Students', 'Female Students'],
    datasets: [{
      data: [totalMale, totalFemale],
      backgroundColor: ['rgba(54, 162, 235, 0.5)', 'rgba(255, 99, 132, 0.5)'],
      borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
      borderWidth: 1,
    }],
  };

  const levelData: Record<number, { male: number; female: number }> = {};
  schoolData.trades.forEach(trade => {
    trade.levels.forEach(level => {
      if (!levelData[level.level]) {
        levelData[level.level] = { male: 0, female: 0 };
      }
      levelData[level.level].male += level.students.male;
      levelData[level.level].female += level.students.female;
    });
  });

  const levels = Object.keys(levelData).sort((a, b) => Number(a) - Number(b));

  const levelChartData = {
    labels: levels.map(level => `Level ${level}`),
    datasets: [
      {
        label: 'Total Students',
        data: levels.map(level => levelData[Number(level)].male + levelData[Number(level)].female),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return {
    tradeData,
    genderData,
    levelChartData,
  };
};

export const aggregateSchoolsData = (schools: any[]) => {
  if (!schools?.length) return null;

  const initialData = {
    totalSchools: 0,
    totalStudents: 0,
    totalTeachers: 0,
    totalTrades: 0,
    genderCounts: { male: 0, female: 0 },
    infrastructureCounts: {
      good: 0,
      moderate: 0,
      poor: 0
    },
    tradesCounts: {} as Record<string, number>,
    itResourcesCounts: {
      computers: 0,
      workingComputers: 0,
      projectors: 0,
      lan: 0
    }
  };

  const aggregated = schools.reduce((acc, school) => {
    if (!school.schoolSurveyData) return acc;

    try {
      const data = JSON.parse(school.schoolSurveyData);
      
      // Basic counts
      acc.totalSchools++;
      acc.totalStudents += data.school.stats.students;
      acc.totalTeachers += data.school.stats.teachers;
      acc.totalTrades += data.school.stats.trades;

      // Gender distribution
      data.trades.forEach((trade: any) => {
        trade.levels.forEach((level: any) => {
          acc.genderCounts.male += level.students.male;
          acc.genderCounts.female += level.students.female;
        });
      });

      // Infrastructure status
      data.infrastructure.forEach((item: any) => {
        if (item.status) {
          acc.infrastructureCounts[item.status as keyof typeof acc.infrastructureCounts]++;
        }
      });

      // Trades distribution
      data.trades.forEach((trade: any) => {
        const totalStudents = trade.levels.reduce((sum: number, level: any) => 
          sum + level.students.male + level.students.female, 0);
        acc.tradesCounts[trade.name] = (acc.tradesCounts[trade.name] || 0) + totalStudents;
      });

      // IT resources
      if (data.it?.computerLab) {
        acc.itResourcesCounts.computers += parseInt(data.it.computerLab.totalComputers);
        acc.itResourcesCounts.workingComputers += parseInt(data.it.computerLab.workingComputers);
        if (data.it.computerLab.hasProjectors) acc.itResourcesCounts.projectors++;
        if (data.it.computerLab.hasLAN) acc.itResourcesCounts.lan++;
      }

      return acc;
    } catch (error) {
      console.error('Error processing school data:', error);
      return acc;
    }
  }, initialData);

  // Format data for charts
  const chartData = {
    ...aggregated,
    genderDistribution: {
      labels: ['Male Students', 'Female Students'],
      datasets: [{
        data: [aggregated.genderCounts.male, aggregated.genderCounts.female],
        backgroundColor: ['rgba(54, 162, 235, 0.5)', 'rgba(255, 99, 132, 0.5)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
      }]
    },
    infrastructureStatus: {
      labels: ['Good', 'Moderate', 'Poor'],
      datasets: [{
        label: 'Number of Facilities',
        data: [
          aggregated.infrastructureCounts.good,
          aggregated.infrastructureCounts.moderate,
          aggregated.infrastructureCounts.poor
        ],
        backgroundColor: [
          'rgba(75, 192, 192, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(255, 99, 132, 0.5)'
        ]
      }]
    },
    tradesDistribution: {
      labels: Object.keys(aggregated.tradesCounts).slice(0, 10), // Top 10 trades
      datasets: [{
        label: 'Number of Students',
        data: Object.values(aggregated.tradesCounts).slice(0, 10),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      }]
    },
    itResources: {
      labels: ['Total Computers', 'Working Computers', 'Schools with Projectors', 'Schools with LAN'],
      datasets: [{
        label: 'Count',
        data: [
          aggregated.itResourcesCounts.computers,
          aggregated.itResourcesCounts.workingComputers,
          aggregated.itResourcesCounts.projectors,
          aggregated.itResourcesCounts.lan
        ],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      }]
    }
  };

  return chartData;
};