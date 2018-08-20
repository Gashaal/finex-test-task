import React from 'react';
import { Doughnut } from 'react-chartjs-2';

let colors = {};
const randomColorGenerator = function () {
  return '#' + (Math.random().toString(16) + '0000000').slice(2, 8);
};

function getChartData(data) {
  const labels = [];
  const dataset = [];
  const currentColors = [];

  Object.keys(data).forEach((id) => {
    labels.push(data[id].name);
    dataset.push(data[id].quantity * data[id].price);

    if (!colors[id]) {
      colors[id] = randomColorGenerator();
    }
    currentColors.push(colors[id]);
  });

  return {
    labels: labels,
    datasets: [{
      data: dataset,
      backgroundColor: currentColors,
      hoverBackgroundColor: currentColors,
    }]
  }
}

export default (props) => {
  const chartData = getChartData(props.data);

  const options = {
    tooltips: {
      callbacks: {
        afterLabel: function(tooltipItem, data) {
          const dataset = data['datasets'][0];
          const percent = Math.round((dataset['data'][tooltipItem['index']] / dataset["_meta"][0]['total']) * 100)
          return  `(${percent})`;
        }
      }
    }
  };

  return (
    <Doughnut data={chartData} options={options}/>
  )
}