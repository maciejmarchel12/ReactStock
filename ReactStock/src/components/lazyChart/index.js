// LazyChart.js
import React from 'react';
import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom';

const LazyChart = ({ chartId }) => {
  React.useEffect(() => {
    const sdk = new ChartsEmbedSDK({
      baseUrl: 'https://charts.mongodb.com/charts-reactstock-ydgxe',
    });

    const chartDiv = document.createElement('div');
    chartDiv.style.width = '50%';
    chartDiv.style.height = '300px';
    document.getElementById('charts-container').appendChild(chartDiv);

    sdk.createChart({
      chartId: chartId,
    }).render(chartDiv);

    return () => {
      // Clean up the chart when the component unmounts
      chartDiv.innerHTML = '';
    };
  }, [chartId]);

  return null;
};

export default LazyChart;
