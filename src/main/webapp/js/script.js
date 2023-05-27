var charts = [];

var ctxGameStop = document.getElementById('chartGameStop').getContext('2d');
var chartGameStop = createChart(ctxGameStop, 'GameStop');

var ctxApple = document.getElementById('chartApple').getContext('2d');
var chartApple = createChart(ctxApple, 'Apple');

var ctxTesla = document.getElementById('chartTesla').getContext('2d');
var chartTesla = createChart(ctxTesla, 'Tesla');

var ctxMicrosoft = document.getElementById('chartMicrosoft').getContext('2d');
var chartMicrosoft = createChart(ctxMicrosoft, 'Microsoft');

var ctxGoogle = document.getElementById('chartGoogle').getContext('2d');
var chartGoogle = createChart(ctxGoogle, 'Google');

var ctxOpera = document.getElementById('chartOpera').getContext('2d');
var chartOpera = createChart(ctxOpera, 'Opera');

var ctxDiscord = document.getElementById('chartDiscord').getContext('2d');
var chartDiscord = createChart(ctxDiscord, 'Discord');

var ctxSamsung = document.getElementById('chartSamsung').getContext('2d');
var chartSamsung = createChart(ctxSamsung, 'Samsung');

charts.push(chartGameStop, chartApple, chartTesla, chartMicrosoft, chartGoogle, chartOpera, chartDiscord, chartSamsung);

setInterval(updateData, 1000);

function createChart(ctx, label) {
  var newData = [];
  var hour = [];
  for (var i = 1; i <= 60; i++) {
    hour.push(i.toString());
  }
  for (var i = 0; i < 12; i++) {
    newData.push(Math.floor(Math.random() * 300) + 1);
  }

  var chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: hour,
      datasets: [{
        label: label,
        data: newData,
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: false
          }
        }]
      }
    }
  });

  return chart;
}

function updateData() {
  var hour = [];
  for (var i = 1; i <= 60; i++) {
    hour.push(i.toString());
  }

  for (var j = 0; j < charts.length; j++) {
    var chart = charts[j];

    var newData = [];
    for (var i = 0; i < 12; i++) {
      newData.push(Math.floor(Math.random() * 300) + 1);
    }

    var lastHourIndex = chart.data.labels.length - 1;
    var lastHourName = chart.data.labels[lastHourIndex];
    var nextHourIndex = hour.indexOf(lastHourName) + 1;
    if (nextHourIndex >= hour.length) {
      nextHourIndex = 0;
    }
    chart.data.labels.push(hour[nextHourIndex]);
    chart.data.datasets[0].data.push(newData[0]);
    chart.update();
  }
}

var newChartForm = document.getElementById('newChartForm');
newChartForm.addEventListener('submit', function(event) {
  event.preventDefault();
  var chartNameInput = document.getElementById('chartName');
  var chartName = chartNameInput.value;

  if (chartName !== '') {
    var canvas = document.createElement('canvas');
    var chartId = 'chart' + (charts.length + 1);
    canvas.id = chartId;
    document.body.insertBefore(canvas, newChartForm);

    var ctx = canvas.getContext('2d');
    var newChart = createChart(ctx, chartName);
    charts.push(newChart);
  }

  chartNameInput.value = '';
});


