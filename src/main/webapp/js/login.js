var loginForm = document.getElementById("loginForm");
var usuariosArray = []; // Array to store the received data

loginForm.addEventListener("submit", function(event) {
	event.preventDefault();

	var url = "http://localhost:8081/api/login";
	var xhr = new XMLHttpRequest();

	var email = document.getElementById("email").value;
	var contrasena = document.getElementById("contrasena").value;

	var params = "email=" + encodeURIComponent(email) + "&contrasena=" + encodeURIComponent(contrasena);

	xhr.open('GET', url + "?" + params, true);

	xhr.onload = function() {

		try {
			var usuarios = JSON.parse(xhr.responseText);
			if (xhr.status == "202") {
				console.table(usuarios);
				usuariosArray.push(usuarios); // Add the received data to the array
				console.log(usuariosArray.length);
				console.log(usuariosArray[0].email);
				console.log(usuariosArray[0].contrasena);
				// Create a chart or perform any other operations with the data


			} else {
				console.error(usuarios);
				alert("Error email o contraseña");
			}

			if (usuariosArray[0].email === 'admin@gmail.com' && usuariosArray[0].contrasena === 'admin') {
				console.log('Inicio');
				window.location.href = "admin.html";
			}else{
				
				window.location.href = "acciones.html";
			}
		}
		catch (err) {
			alert("Error email o contraseña");
		}



	};

	xhr.send(null);





});
