export interface TradeData {
    tradeName: string;
    levels: {
      level: string;
      classrooms: number;
      students: {
        boys: number;
        girls: number;
      };
    }[];
  }
  
  export interface Infrastructure {
    type: string;
    constructionYear: number;
    size: string;
    capacity: string;
    constructionMaterial: string;
    status: 'Good' | 'Moderate' | 'Poor';
  }
  
  export interface ITInfrastructure {
    computerLabs: {
      totalComputers: number;
      workingComputers: number;
      hasLAN: boolean;
    };
    projectors: {
      total: number;
      working: number;
    };
    internet: boolean;
    server: boolean;
    serverSpecs?: string;
    hasElearning: boolean;
    energySource: ('Solar' | 'Grid' | 'Renewable')[];
    equipment: {
      hasAssetRegister: boolean;
      status: 'Good' | 'Moderate' | 'Poor';
      available: boolean;
    };
  }