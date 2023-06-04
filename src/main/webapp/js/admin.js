function empresaPDF(event) {
	event.preventDefault(); 

	var url = "http://localhost:8081/api/grafica";
	var xhr = new XMLHttpRequest();
	xhr.open('get', url, true);
	xhr.onload = function() {
		var graficas = JSON.parse(xhr.responseText);
		if (xhr.status == 202) {
		

			var tableRows = [];

			for (var i = 0; i < graficas.length; i++) {
				var info = graficas[i];

				var row = [
					info.id,
					info.nombre,
					info.precioAccion
				];

	
				tableRows.push(row);
			}

			var docDefinition = {
				content: [
					'¡Hola, esto es un PDF generado con pdfmake!  Nicolas es una perrra',

					{
						table: {
							headerRows: 1,
							body: [
								['ID', 'Nombre', 'Precio Accion'],
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
	};
	xhr.send(null);
}

function usuariosPDF(event) {
	event.preventDefault(); 

	var url = "http://localhost:8081/api/usuario";
	var xhr = new XMLHttpRequest();
	xhr.open('get', url, true);
	xhr.onload = function() {
		var graficas = JSON.parse(xhr.responseText);
		if (xhr.status == 202) {
	
			var tableRows = [];

			for (var i = 0; i < graficas.length; i++) {
				var info = graficas[i];

		
				var row = [
					info.id,
					info.nombre,
					info.email,
					info.contrasena
				];

			
				tableRows.push(row);
			}

		
			var docDefinition = {
				content: [
					'¡Hola, esto es un PDF generado con pdfmake!  Nicolas es una perrra',

					{
						table: {
							headerRows: 1,
							body: [
								['ID', 'Nombre', 'Email', 'Contraseña'],
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
	};
	xhr.send(null);
}




function accionesPDF(event) {
	event.preventDefault();

	var url = "http://localhost:8081/api/acciones";
	var xhr = new XMLHttpRequest();
	xhr.open('get', url, true);
	xhr.onload = function() {
		var graficas = JSON.parse(xhr.responseText);
		if (xhr.status == 202) {
			console.table(graficas);

		
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
	};
	xhr.send(null);
}




function agregarEmpresa(event) {
	event.preventDefault(); 

	var nombre = document.getElementById("nombre").value;
	var precio = document.getElementById("precio").value;


	var url = "http://localhost:8081/api/grafica";
	var xhr = new XMLHttpRequest();


	var params = "nombre=" + encodeURIComponent(nombre) + "&precioAccion=" + encodeURIComponent(precio);

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

function eliminarEmpresa(event) {
	event.preventDefault(); 


	var idEliminar = document.getElementById("id_empresa").value;

	var url = "http://localhost:8081/api/grafica/" + idEliminar;
	var xhr = new XMLHttpRequest();

	xhr.open("DELETE", url, true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (xhr.status === 302) {
			
				alert("Eliminado");
			} else if (xhr.status === 404) {
			
				alert("not found");

			} else {
			
				alert("Error ");


			}
		}
	};
	xhr.send();
}

function actualizarEmpresa(event) {
	event.preventDefault(); 

	var nombreActualizar = document.getElementById("nombre_actualizar").value;
	var precioActualizar = document.getElementById("precio_actualizar").value;
	var idActualizar = document.getElementById("id_actualizar").value;

	var url = "http://localhost:8081/api/grafica";
	var xhr = new XMLHttpRequest();


	var params = "nombre=" + encodeURIComponent(nombreActualizar) + "&precioAccion=" + encodeURIComponent(precioActualizar) + "&id=" + encodeURIComponent(idActualizar);

	xhr.open('PUT', url + "?" + params, true);

	xhr.onload = function() {
		try {
			var success = xhr.responseText.toLowerCase() === 'true';
			if (xhr.status == '200') {
				alert("Actualizado");

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


function agregarUsuario(event) {
	event.preventDefault(); 
	
	var nombre = document.getElementById("nombre_usuario_agregar").value;
	var email = document.getElementById("email_usuario_agregar").value;
	var contrasena = document.getElementById("contrasena_usuario_agregar").value;

	var url = "http://localhost:8081/api/usuario";
	var xhr = new XMLHttpRequest();


	var params = "nombre=" + encodeURIComponent(nombre) + "&email=" + encodeURIComponent(email) + "&contrasena=" + encodeURIComponent(contrasena);

	xhr.open('POST', url + "?" + params, true);

	xhr.onload = function() {
		try {

			if (xhr.status == '202') {
				alert("Creado");

			} else {


				alert("Error");
			}
		} catch (err) {
			alert("Error: " + err);
		}
	};

	xhr.send(null);
}

function eliminarUsuario(event) {

	event.preventDefault();
	var email = document.getElementById("email_eliminar_usuario").value;
	var url = "http://localhost:8081/api/usuario/" + email;
	var xhr = new XMLHttpRequest();

	xhr.open("DELETE", url, true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (xhr.status === 302) {
				
				alert("Eliminado");
			} else if (xhr.status === 404) {
				
				alert("not found");

			} else {
				
				alert("Error ");


			}
		}
	};
	xhr.send();

}

function actualizarUsuario(event) {
	event.preventDefault(); 

	var id = document.getElementById("id_actualizar_usuario").value;
	var nombre = document.getElementById("nombre_actualizar_usuario").value;
	var email = document.getElementById("email_actualizar_usuario").value;
	var contrasena = document.getElementById("contrasena_actualizar_usuario").value;





	var url = "http://localhost:8081/api/usuario/" + id;
	var xhr = new XMLHttpRequest();


	var params = "nombre=" + encodeURIComponent(nombre) + "&email=" + encodeURIComponent(email) + "&contrasena=" + encodeURIComponent(contrasena);

	xhr.open('PUT', url + "?" + params, true);

	xhr.onload = function() {
		try {
			var success = xhr.responseText.toLowerCase() === 'true';
			if (xhr.status == '200') {
				alert("Actualizado");

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


function agregarAccion(event) {
	event.preventDefault(); 

	var id = document.getElementById("id_agregar_accion").value;
	var acciones = document.getElementById("acciones_agregar_accion").value;
	var nombreEmpresa = document.getElementById("nombre_agregar_accion").value;
	var fecha = document.getElementById("fecha_agregar_accion").value;
	var estado = document.getElementById("estado_agregar_accion").value;
	var valor = document.getElementById("valor_agregar_accion").value;


	var url = "http://localhost:8081/api/acciones";
	var xhr = new XMLHttpRequest();


	var params = "idCliente=" + encodeURIComponent(id) + "&acciones=" + encodeURIComponent(acciones) + "&nombreEmpresa=" + encodeURIComponent(nombreEmpresa) + "&fecha=" + encodeURIComponent(fecha) + "&estado=" + encodeURIComponent(estado) + "&valor=" + encodeURIComponent(valor);

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

function eliminarAccion(event) {



	event.preventDefault();
	var email = document.getElementById("id_eliminar_agregar_accion").value;
	var url = "http://localhost:8081/api/acciones/" + email;
	var xhr = new XMLHttpRequest();

	xhr.open("DELETE", url, true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (xhr.status === 302) {
			
				alert("Eliminado");
			} else if (xhr.status === 404) {
				
				alert("not found");

			} else {
		
				alert("Error ");


			}
		}
	};
	xhr.send();
}

function actualizarAccion(event) {
	event.preventDefault();

	var id = document.getElementById("id_actualizar_Accion").value;
	var idcliente = document.getElementById("idCliente_Accion_actualizar_Accion").value;
	var acciones = document.getElementById("acciones_actualizar_Accion").value;
	var nombreEmpresa = document.getElementById("nombre_actualizar_Accion").value;
	var fecha = document.getElementById("fecha_actualizar_Accion").value;
	var estado = document.getElementById("estado_actualizar_Accion").value;
	var valor = document.getElementById("valor_actualizar_accion").value;

	var url = "http://localhost:8081/api/acciones/" + id;
	var xhr = new XMLHttpRequest();


	var params = "idCliente=" + encodeURIComponent(idcliente) + "&acciones=" + encodeURIComponent(acciones) + "&nombreEmpresa=" + encodeURIComponent(nombreEmpresa) + "&fecha=" + encodeURIComponent(fecha) + "&estado=" + encodeURIComponent(estado) + "&valor=" + encodeURIComponent(valor);



	xhr.open('PUT', url + "?" + params, true);

	xhr.onload = function() {
		try {
			var success = xhr.responseText.toLowerCase() === 'true';
			if (xhr.status == '200') {
				alert("Actualizado");

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

