import React from 'react';
import { useData } from '../contexts/DataContext';
import { Table as MantineTable, Text, ScrollArea,Pagination,Loader } from '@mantine/core';
import { YearlyData } from '../contexts/DataContext';


const Table: React.FC = () => {
  const { yearlyData } = useData();
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;

  const renderCell = (value: string | number | undefined, fallback: string = "N/A") => (
    <Text color={value ? 'black' : 'red'}>{value || fallback}</Text>
  );

  const headers: { label: string; key: keyof YearlyData }[] = [
    { label: 'Year', key: 'Year' },
    { label: 'Crop Name', key: 'Crop Name' },
    { label: 'Crop Production (Tonnes)', key: 'Crop Production (UOM:t(Tonnes))' },
    { label: 'Yield (Kg/Ha)', key: 'Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))' },
    { label: 'Area Under Cultivation (Ha)', key: 'Area Under Cultivation (UOM:Ha(Hectares))' },
  ];

  const paginatedData = yearlyData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <div>
      {yearlyData.length === 0 ? (
        <Loader />
      ) : (
        <>
          <ScrollArea>
            <MantineTable striped highlightOnHover style={{ width: '100%' }}>
              <thead>
                <tr>
                  {headers.map(({ label }) => (
                    <th key={label} style={{ borderBottom: '2px solid #ddd', padding: '8px' }}>
                      <Text fw={500}>{label}</Text>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((row, index) => (
                  <tr key={index}>
                    {headers.map(({ key }) => (
                      <td key={key} style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
                        {renderCell(row[key])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </MantineTable>
          </ScrollArea>

          <Pagination
            value={page} // Use 'value' instead of 'page' to track the current page
            onChange={setPage} // 'onChange' function remains the same
            total={Math.ceil(yearlyData.length / rowsPerPage)}
            style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
          />
        </>
      )}
    </div>
  );
};

export default Table;
