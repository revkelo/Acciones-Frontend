function usuariosPDF(event) {
	event.preventDefault(); // Avoid page reload

	var url = "http://localhost:8081/api/usuario";
	var xhr = new XMLHttpRequest();
	xhr.open('get', url, true);
	xhr.onload = function() {
		var graficas = JSON.parse(xhr.responseText);
		if (xhr.status == 202) {
			console.table(graficas);

			// Create an array to hold the table rows
			var tableRows = [];

			// Iterate over each item in the graficas array
			for (var i = 0; i < graficas.length; i++) {
				var info = graficas[i];

				// Create a new row object for each item
				var row = [
					info.id,
					info.nombre,
					info.email,
					info.contrasena
				];

				// Add the row object to the tableRows array
				tableRows.push(row);
			}

			// Define the document definition for pdfmake
			var docDefinition = {
				content: [
					'¡Hola, esto es un PDF generado con pdfmake!',
					{
						table: {
							headerRows: 1,
							body: [
								['ID', 'Nombre', 'Email', 'Contraseña'],
								...tableRows // Spread the tableRows array to insert all rows
							]
						}
					}
				]
			};

			// Generate the PDF using pdfmake
			pdfMake.createPdf(docDefinition).open();
		} else {
			console.error(graficas);
		}
	};
	xhr.send(null);
}


function accionesPDF(event) {
	event.preventDefault(); // Avoid page reload

	var url = "http://localhost:8081/api/acciones";
	var xhr = new XMLHttpRequest();
	xhr.open('get', url, true);
	xhr.onload = function() {
		var graficas = JSON.parse(xhr.responseText);
		if (xhr.status == 202) {
			console.table(graficas);

			// Create an array to hold the table rows
			var tableRows = [];

			// Iterate over each item in the graficas array
			for (var i = 0; i < graficas.length; i++) {
				var info = graficas[i];

				// Create a new row object for each item
				var row = [
					info.id,
					info.idCliente,
					info.accionesCompradas,
					info.nombreEmpresa,
				];

				// Add the row object to the tableRows array
				tableRows.push(row);
			}

			// Define the document definition for pdfmake
			var docDefinition = {
				content: [
					'¡Hola, esto es un PDF generado con pdfmake!',
					{
						table: {
							headerRows: 1,
							body: [
								['ID', 'IDcliente','accionesCompradas', 'nombreEmpresa'],
								...tableRows // Spread the tableRows array to insert all rows
							]
						}
					}
				]
			};

			// Generate the PDF using pdfmake
			pdfMake.createPdf(docDefinition).open();
		} else {
			console.error(graficas);
		}
	};
	xhr.send(null);
}
