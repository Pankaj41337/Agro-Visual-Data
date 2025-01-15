import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';



export interface YearlyData {
  Country: string;
  Year: string;
  "Crop Name": string;
  "Crop Production (UOM:t(Tonnes))": number | string;
  "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": number | string;
  "Area Under Cultivation (UOM:Ha(Hectares))": number | string;
}

interface DataContextProps {
  yearlyData: YearlyData[];
  setYearlyData: React.Dispatch<React.SetStateAction<YearlyData[]>>;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [yearlyData, setYearlyData] = useState<YearlyData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/indian_agriculture_data.json');
        if (response.ok) {
          const data = await response.json();
          setYearlyData(data);
        } else {
          console.error('Failed to fetch data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ yearlyData, setYearlyData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextProps => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export default DataContext;
