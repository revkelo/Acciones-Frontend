
var url = "http://localhost:8081/miguelapi/operacion";
var xhr = new XMLHttpRequest();
xhr.open('GET', url, true);
xhr.onload = function() {
	var operaciones = JSON.parse(xhr.responseText);
	if (xhr.status == "202") {
		console.table(operaciones);
		for (info in operaciones){
			document.write(operaciones[info].id+"<br>")
			document.write(operaciones[info].numero1+"<br>");
		}
	} else {
		console.error(operaciones);
	}
}
xhr.send(null);


