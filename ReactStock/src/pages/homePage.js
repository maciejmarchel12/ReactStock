import React, { useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom';

const HomePage = () => {
  useEffect(() => {
    const sdk = new ChartsEmbedSDK({
      baseUrl: 'https://charts.mongodb.com/charts-reactstock-ydgxe', 
    });

    // Array of chart IDs
    const chartIds = [
      '660d858d-9934-4799-8f5b-73fda0582586', 
      '660d8779-8f76-499b-87c8-4fc6570ba770', 
      '660d881c-cd05-4c28-8083-959223ce2143', 
      '660d88c4-73af-4bc8-8165-df0e254572f4'
    ];

    // Get the container to embed the charts
    const container = document.getElementById('charts-container');

    // Embed each chart
    chartIds.forEach((chartId, index) => {
      const chartDiv = document.createElement('div');
      chartDiv.style.width = '50%'; 
      chartDiv.style.height = '300px';
      container.appendChild(chartDiv);
      
      sdk.createChart({
        chartId: chartId,
      }).render(chartDiv);
    });
  }, []);

  return (
    <Container style={{ marginTop: '60px', paddingTop: 64 }}>
      <Grid container spacing={2} id="charts-container">
        <Grid item xs={6}>
          <div id="chart1"></div>
        </Grid>
        <Grid item xs={6}>
          <div id="chart2"></div>
        </Grid>
        <Grid item xs={6}>
          <div id="chart3"></div>
        </Grid>
        <Grid item xs={6}>
          <div id="chart4"></div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;