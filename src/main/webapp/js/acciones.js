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

document.getElementById('generarPdfLink').addEventListener('click', generarPdf);

document.getElementById('tendenciaPdfLink').addEventListener('click', tendenciaPdf);


function generarPdf(event) {
	event.preventDefault();

	var usuarioArray = [];

	var url = "http://localhost:8081/api/inicio";
	var xhr = new XMLHttpRequest();
	xhr.open('get', url, true);


	xhr.onload = function() {
		var usuario = JSON.parse(xhr.responseText);


		usuarioArray.push(usuario.id);
		id = usuarioArray[0];
		console.log(id);
		pdf(id);

	}
	xhr.send(null);


}

function tendenciaPdf(event) {
	event.preventDefault();



	var url = "http://localhost:8081/api/tendencia";
	var xhr = new XMLHttpRequest();
	xhr.open('get', url, true);


	xhr.onload = function() {

		try {
			// Code that might throw an exception

			var empresa = JSON.parse(xhr.responseText);
			if (xhr.status == 202) {


				var tableRows = [];


				for (var i = 0; i < empresa.length; i++) {
					var info = empresa[i];


					var row = [
						info.nombreEmpresa,
						info.promedio,
						info.movimientos,

					];


					tableRows.push(row);
				}

				var docDefinition = {
					content: [
						'¡Hola, esto es un PDF generado con pdfmake!',
						{
							table: {
								headerRows: 1,
								body: [
									['nombre', 'promedio', 'movimientos'],
									...tableRows
								]
							}
						}
					]
				};


				pdfMake.createPdf(docDefinition).open();




			} else {
				console.error(empresa);
			}
		} catch (error) {
			alert("Error");
		}

	}
	xhr.send(null);


}


function pdf(id) {


	var url = "http://localhost:8081/api/historial?idCliente=" + id;
	var xhr = new XMLHttpRequest();
	xhr.open('get', url, true);
	xhr.onload = function() {

		try {
			// Code that might throw an exception

			var graficas = JSON.parse(xhr.responseText);
			if (xhr.status == 202) {


				var tableRows = [];


				for (var i = 0; i < graficas.length; i++) {
					var info = graficas[i];


					var row = [
						info.id,
						info.idCliente,
						info.acciones,
						info.nombreEmpresa,
						info.fecha,
						info.estado,
						info.valor,
					];


					tableRows.push(row);
				}

				var docDefinition = {
					content: [
						'¡Hola, esto es un PDF generado con pdfmake!',
						{
							table: {
								headerRows: 1,
								body: [
									['ID', 'IDcliente', 'Acciones', 'Nombre Empresa', 'Fecha', 'Estado', 'valor'],
									...tableRows
								]
							}
						}
					]
				};


				pdfMake.createPdf(docDefinition).open();




			} else {
				console.error(graficas);
			}
		} catch (error) {
			alert("No se puede generar pdf, porque no tienes ninguna compra o venta");
		}
	};
	xhr.send(null);
}


function enviar(idcliente, acciones, nombre, fecha, estado, valor) {

	console.log(idcliente, acciones, nombre, fecha, estado, valor);

	var url = "http://localhost:8081/api/acciones";
	var xhr = new XMLHttpRequest();


	var params = "idCliente=" + encodeURIComponent(idcliente) + "&acciones=" + encodeURIComponent(acciones) + "&nombreEmpresa=" + encodeURIComponent(nombre) + "&fecha=" + encodeURIComponent(fecha) + "&estado=" + encodeURIComponent(estado) + "&valor=" + encodeURIComponent(valor);

	xhr.open('POST', url + "?" + params, true);

	xhr.onload = function() {
		try {
			var success = xhr.responseText.toLowerCase() === 'true';
			if (xhr.status == '200') {
				alert("Creado");

			} else {
				console.error("Error");

				alert("Error");
			}
		} catch (err) {
			alert("Error: " + err);
		}
	};

	xhr.send(null);


}
function comprarAccion(event) {
	event.preventDefault();

	var usuarioArray = [];

	var url = "http://localhost:8081/api/inicio";
	var xhr = new XMLHttpRequest();
	xhr.open('get', url, true);
	var id;

	var nombre = document.getElementById('nombreEmpresa').value;
	var cantidad = parseInt(document.getElementById('cantidadAcciones').value);

	var precioActual = 0;
	for (var i = 0; i < graficasData.length; i++) {
		if (graficasData[i].nombre === nombre) {
			precioActual = graficasData[i].precioAccion;
			break;
		}
	}

	xhr.onload = function() {
		var usuario = JSON.parse(xhr.responseText);
		var valor = cantidad * precioActual;
		console.log(valor);
		var fechaActual = new Date();
		var anio = fechaActual.getFullYear();
		var mes = fechaActual.getMonth() + 1;
		var dia = fechaActual.getDate();
		var fecha = anio + '-' + (mes < 10 ? '0' : '') + mes + '-' + (dia < 10 ? '0' : '') + dia;
		console.log(fecha);
		usuarioArray.push(usuario.id);
		id = usuarioArray[0];
		console.log(id);
		enviar(id, cantidad, nombre, fecha, "Compra", valor);

	}
	xhr.send(null);


}

function venderAccion(event) {

	var usuarioArray = [];

	var url = "http://localhost:8081/api/inicio";
	var xhr = new XMLHttpRequest();
	xhr.open('get', url, true);
	var id;

	event.preventDefault();
	var nombre = document.getElementById('nombreEmpresaVenta').value;
	var cantidad = parseInt(document.getElementById('cantidadAccionesVenta').value);

	var precioActual = 0;
	for (var i = 0; i < graficasData.length; i++) {
		if (graficasData[i].nombre === nombre) {
			precioActual = graficasData[i].precioAccion;
			break;
		}
	}

	xhr.onload = function() {
		var usuario = JSON.parse(xhr.responseText);
		var valor = cantidad * precioActual;
		console.log(valor);
		var fechaActual = new Date();
		var anio = fechaActual.getFullYear();
		var mes = fechaActual.getMonth() + 1;
		var dia = fechaActual.getDate();
		var fecha = anio + '-' + (mes < 10 ? '0' : '') + mes + '-' + (dia < 10 ? '0' : '') + dia;
		console.log(fecha);
		usuarioArray.push(usuario.id);
		id = usuarioArray[0];
		console.log(id);
		enviar(id, cantidad, nombre, fecha, "Venta", valor);

	}
	xhr.send(null);
}


function createChart(info) {
	var nombre = info.nombre;
	var precioAccion = info.precioAccion;

	var container = document.getElementById('acciones');


	var chartDiv = document.createElement('div');
	chartDiv.classList.add('myChart');
	container.appendChild(chartDiv);


	var priceSpan = document.createElement('span');
	priceSpan.textContent = 'Precio de acción: ' + precioAccion;
	chartDiv.appendChild(priceSpan);

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

		updateData(myChart, priceSpan, nombre);
	}, 10000);
}

function generateChartData(nombre, precioAccion) {
	var data = {
		labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60'],
		datasets: [{
			label: nombre,
			data: [precioAccion],
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
	chart.data.datasets[0].data.push(...newData);

	if (chart.data.datasets[0].data.length > 60) {
		chart.data.datasets[0].data.shift();
	}

	var newPrice = parseFloat(priceSpan.textContent.split(':')[1].trim()) + randomValue;
	priceSpan.textContent = 'Precio de acción: ' + newPrice;

	// Save the current price to the database using XMLHttpRequest
	var url = 'http://localhost:8081/api/tendencia';
	var xhr = new XMLHttpRequest();
	var params = 'nombreEmpresa=' + encodeURIComponent(nombre) + '&valor=' + encodeURIComponent(newPrice);

	xhr.open('POST', url + '?' + params, true);

	xhr.onload = function() {
		try {
			var success = xhr.responseText.toLowerCase() === 'true';
			if (xhr.status == '200') {

				console.log('Creado');
			} else {
				console.error('Error');

			}
		} catch (err) {
			console.log('Error: ' + err);
		}
	};

	xhr.send(null);

	chart.update();
}
