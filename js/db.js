//prefixes of implementation that we want to test
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
//prefixes of window.IDB objects
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
if (!window.indexedDB) {
	window.alert("Tu navegador no soporta una versión estable de IndexedDB.")
}
const elementos = [{
	id: "1",
	numero: "1",
	nombre: "Hidrógeno",
	simbolo: "H",
	masaAtomica: "1.007",
	valencia: "1",
	ebullicion: "",
	fusion: "",
	densidad: "",
	confElectronica: "",
	grupo: "Metales Alcalinos",
	descubrimiento: "01-01-1800",
	descubridor: "",
	etimologia: ""
}, {
	id: "2",
	numero: "2",
	nombre: "Helio",
	simbolo: "He",
	masaAtomica: "0.0",
	valencia: "1",
	ebullicion: "",
	fusion: "",
	densidad: "",
	confElectronica: "",
	grupo: "Gases Nobles",
	descubrimiento: "01-01-1800",
	descubridor: "",
	etimologia: ""
}, {
	id: "3",
	numero: "3",
	nombre: "Litio",
	simbolo: "Li",
	masaAtomica: "6.941",
	valencia: "1",
	ebullicion: "1330 °C",
	fusion: "186 °C",
	densidad: "0.53 g/ml",
	confElectronica: "1s<sup>2</sup>2s<sup>1</sup>",
	grupo: "Metales Alcalinos",
	descubrimiento: "01-01-1817",
	descubridor: "Johann A. Arfvedson",
	etimologia: "Del griego 'lithos', piedra"
}, {
	id: "4",
	numero: "4",
	nombre: "Berilio",
	simbolo: "Be",
	masaAtomica: "9.0122",
	valencia: "2",
	ebullicion: "2770 °C",
	fusion: "1277 °C",
	densidad: "1.85 g/ml",
	confElectronica: "1s<sup>2</sup>2s<sup>2</sup>",
	grupo: "Metales Alcalinos",
	descubrimiento: "01-01-1797",
	descubridor: "Louis Nicolas Vauquelin (aislado por Friedrich Wöhler y Antoine Alexandre Brutus Bussy en 1828)",
	etimologia: "Del griego 'berylos', berilio, una de las principales menas de berilio"
}, ];
var db;
var request = window.indexedDB.open("TablaPeriodica", 1);
request.onerror = function(event) {
	console.log("Error: " + event);
};
request.onsuccess = function(event) {
	db = request.result;
	console.log("Success: " + db);
};
request.onupgradeneeded = function(event) {
	var db = event.target.result;
	var objectStore = db.createObjectStore("elementos", {
		keyPath: "id"
	});
	for (var i in elementos) {
		objectStore.add(elementos[i]);
	}
}
/*
function add()
{
	var request = db.transaction(["elementos"], "readwrite")
	.objectStore("elementos")
	.add({});
	request.onsuccess = function(event)
	{
		alert("Berilio Ha sido agregado a la base de datos.");
	};
	request.onerror = function(event)
	{
		alert("No se puede agregar el valor a la base de datos\r\nBerilio ya existe en la base de datos ");
	}
}
*/
function add(_numero, _nombre, _simbolo, _masaAtomica, _valencia, _ebullicion, _fusion, _densidad, _confElectronica, _grupo, _descubrimiento, _descubridor, _etimologia) {
	var request = db.transaction(["elementos"], "readwrite").objectStore("elementos").add({
		id: _numero.toString(),
		numero: _numero.toString(),
		nombre: _nombre.toString(),
		simbolo: _simbolo.toString(),
		masaAtomica: _masaAtomica.toString(),
		valencia: _valencia.toString(),
		ebullicion: _ebullicion.toString(),
		fusion: _fusion.toString(),
		densidad: _densidad.toString(),
		confElectronica: _confElectronica.toString(),
		grupo: _grupo.toString(),
		descubrimiento: _descubrimiento.toString(),
		descubridor: _descubridor.toString(),
		etimologia: _etimologia.toString()
	});
	request.onsuccess = function(event) {
		alert("El elemento ha sido agregado a la base de datos.");
	};
	request.onerror = function(event) {
		alert("No se puede agregar el elemento a la base de datos\r\nYa existe en la base de datos ");
	}
}

function read(id) {
	var transaction = db.transaction(["elementos"]);
	var objectStore = transaction.objectStore("elementos");
	var request = objectStore.get(id);
	request.onerror = function(event) {
		alert("¡No hay ningún elemento registrado!");
	};
	request.onsuccess = function(event) {
		// Do something with the request.result!
		if (request.result) {
			//alert("Numero: " + request.result.numero + ", Nombre: " + request.result.nombre + ", Simbolo: " + request.result.simbolo);
			var html = '';
			html += '<h1>' + request.result.numero + ' ' + request.result.nombre + ' ' + (request.result.simbolo) + '</h1>';
			html += '<p>';
			html += '<strong>Masa Atómica:</strong> ' + request.result.masaAtomica + '<br>';
			html += '<strong>Valencia:</strong> ' + request.result.valencia + '<br>';
			html += '<strong>Punto de Ebullición, ºC:</strong> ' + request.result.ebullicion + '<br>';
			html += '<strong>Punto de Fusión, ºC:</strong> ' + request.result.fusion + '<br>';
			html += '<strong>Densidad (g/ml):</strong> ' + request.result.densidad + '<br>';
			html += '<strong>Configuración Electrónica:</strong> ' + request.result.confElectronica + '<br>';
			html += '<strong>Grupo:</strong> ' + request.result.grupo + '<br>';
			html += '<strong>Fecha de Descubrimiento:</strong> ' + request.result.descubrimiento + '<br>';
			html += '<strong>Descubierto por:</strong> ' + request.result.descubridor + '<br>';
			html += '<strong>Etimología:</strong> ' + request.result.etimologia + '<br>';
			html += '</p>';
			//var message = "Numero: " + request.result.numero + ", Nombre: " + request.result.nombre + ", Simbolo: " + request.result.simbolo;
			document.getElementById("modal-content").innerHTML = html;
		} else {
			//alert("El elemento no pudo ser encontrado en la base de datos!");
			var html = '"¡El elemento no pudo ser encontrado en la base de datos!"';
			document.getElementById("modal-content").innerHTML = html;
		}
	};
}

function readAll() {
	var objectStore = db.transaction("elementos").objectStore("elementos");
	//Solo cuenta el número de elementos
	var countRequest = objectStore.count();
	countRequest.onsuccess = function() {
		var length = countRequest.result;
		console.log("Length: " + length);
	}
	objectStore.openCursor().onsuccess = function(event) {
		var cursor = event.target.result;
		if (cursor) {
			alert("id " + cursor.key + ", Numero " + cursor.value.numero + ", Nombre: " + cursor.value.nombre + ", Simbolo: " + cursor.value.simbolo);
			var message = "id " + cursor.key + ", Numero " + cursor.value.numero + ", Nombre: " + cursor.value.nombre + ", Simbolo: " + cursor.value.simbolo;
			console.log(message);
			cursor.continue();
		} else {
			alert("No hay más elementos!");
		}
	};
}

function remove(id) {
	var request = db.transaction(["elementos"], "readwrite").objectStore("elementos").delete(id);
	request.onsuccess = function(event) {
		alert("¡El elemento ha sido eliminado de la base de datos!");
	}
	request.onerror = function(event) {
		alert("¡No existe el elemento que se desea eliminar!");
	};
}
