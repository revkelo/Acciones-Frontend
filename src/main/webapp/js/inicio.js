var url = "http://localhost:8081/api/grafica";
var xhr = new XMLHttpRequest();
xhr.open('get', url, true);
xhr.onload = function() {
    var graficas = JSON.parse(xhr.responseText);
    if (xhr.status == "202") {
        console.table(graficas);
        graficasData.push(...graficas);
        for (var i = 0; i < graficas.length; i++) {
            var info = graficas[i];
            createChart(info);
        }
    } else {
        console.error(graficas);
    }
}
xhr.send(null);

var graficasData = [];

function createChart(info) {
    var nombre = info.nombre;
    var precioAccion = info.precioAccion;

    var container = document.getElementById('acciones');

    // Create a div element to hold the chart and price
    var chartDiv = document.createElement('div');
    chartDiv.classList.add('myChart');
    container.appendChild(chartDiv);

    // Create a span element for the action price
    var priceSpan = document.createElement('span');
    priceSpan.textContent = 'Precio de acción: ' + precioAccion;
    chartDiv.appendChild(priceSpan);

    // Create a canvas element inside the chart div
    var canvas = document.createElement('canvas');
    chartDiv.appendChild(canvas);

    var ctx = canvas.getContext('2d');

    var myChart = new Chart(ctx, {
        type: 'line',
        data: generateChartData(nombre, precioAccion),
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

    setInterval(function() {
        console.log(graficasData); // Mostrar el contenido del arreglo en la consola
        updateData(myChart, priceSpan, nombre);
    }, 5000);
}

function generateChartData(nombre, precioAccion) {
    var data = {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60'],
        datasets: [{
            label: nombre,
            data: [Math.floor(Math.random() * 300) + 1],
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    };

    return data;
}

function updateData(chart, priceSpan, nombre) {
    var newData = [];
    var lastData = chart.data.datasets[0].data[chart.data.datasets[0].data.length - 1];
    var randomValue = Math.floor(Math.random() * 2) === 0 ? -1 : 1;

    newData.push(lastData + randomValue);

    // Push the new data to the existing dataset
    chart.data.datasets[0].data.push(...newData);

    // Limit the dataset length to 60 data points
    if (chart.data.datasets[0].data.length > 60) {
        chart.data.datasets[0].data.shift(); // Remove the oldest data point
    }

    // Update the price of the action
    var newPrice = parseFloat(priceSpan.textContent.split(':')[1].trim()) + randomValue;
    priceSpan.textContent = 'Precio de acción: ' + newPrice;

    // Update the price of the action in the graficasData array
    for (var i = 0; i < graficasData.length; i++) {
        if (graficasData[i].nombre === nombre) {
            graficasData[i].precioAccion = newPrice;
            break;
        }
    }

    chart.update();
}
