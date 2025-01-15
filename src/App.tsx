
import './App.css'
import { DataProvider } from './contexts/DataContext';
import { Table, BarChart } from './components';
import React from 'react';
import { Grid, Container} from '@mantine/core';


const App: React.FC = () => {
  return (
    <DataProvider>
      <Container size="xl" style={{ marginTop: '20px' }}>
        <Grid gutter="xl">
          {/* Bar Chart Section */}
          <Grid.Col span={12} > {/* Use span and md correctly */}
            <BarChart />
          </Grid.Col>

          {/* Table Section */}
          <Grid.Col span={12} > {/* Use span and md correctly */}
            <Table />
          </Grid.Col>
        </Grid>
      </Container>
    </DataProvider>
  );
};

export default App;
