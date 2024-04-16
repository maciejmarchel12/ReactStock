import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Container, Grid } from '@mui/material';
import { useTheme } from '../contexts/themeContext';

const LazyChart = lazy(() => import('../components/lazyChart'));

const HomePage = () => {
  const [isChartsLoaded, setIsChartsLoaded] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const loadCharts = async () => {
      await import('@mongodb-js/charts-embed-dom');
      setIsChartsLoaded(true);
    };

    loadCharts();

    return () => {
      setIsChartsLoaded(false);
    };
  }, []);

  return (
    <div style={{ backgroundColor: theme.palette.background.bkg, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
    <Container style={{ marginTop: '60px', paddingTop: 64 }}>
      <h1>Dashboard</h1>
      <h2>SouthEast Supplements - Powered by ReactStock</h2>
      <Grid container spacing={2} id="charts-container" >
        {isChartsLoaded ? (
          <Suspense fallback={<div>Loading...</div>}>
            <LazyChart chartId="660d858d-9934-4799-8f5b-73fda0582586" />
            <LazyChart chartId="660d8779-8f76-499b-87c8-4fc6570ba770" />
            <LazyChart chartId="660d881c-cd05-4c28-8083-959223ce2143" />
            <LazyChart chartId="660d88c4-73af-4bc8-8165-df0e254572f4" />
          </Suspense>
        ) : (
          <div>Loading...</div>
        )}
      </Grid>
    </Container>
    </div>
  );
};

export default HomePage;
