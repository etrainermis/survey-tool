export interface SchoolSurveyData {
  school: {
    id: string;
    name: string;
    status: string;
    category: string;
    location: {
      province: string;
      district: string;
      sector: string;
      cell: string;
      village: string;
    };
    stats: {
      trades: number;
      students: number;
      teachers: number;
    };
    contact: {
      phone: string;
      email: string;
      headteacher: string;
    };
  };
  infrastructure: Array<{
    type: string;
    size: string;
    capacity: string;
    constructionYear?: string;
    materials: string[];
    status: string;
  }>;
  it: {
    computerLab: {
      totalComputers: string;
      workingComputers: string;
      hasLAN: boolean;
      hasProjectors: boolean;
    };
    energySources: string[];
    equipment: {
      hasAssetRegister: boolean;
      status: string;
    };
  };
  trades: Array<{
    id: string;
    name: string;
    levels: Array<{
      level: number;
      classrooms: number;
      students: {
        male: number;
        female: number;
      };
    }>;
  }>;
  status: string;
  createdBy: string;
  createdAt: string;
}