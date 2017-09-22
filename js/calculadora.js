var botones = document.querySelectorAll('button:not(#result)'); // Los botones
var entrada = document.querySelector('#display'); // El input donde se muestra lo que se va introduciendo
var result = document.querySelector('#result'); // El botón =
var clean = document.querySelector('#clean'); // El botón que limpia todo
var txtResult = document.querySelector('#txtResult'); // El input donde se muestra el resultado
var del = document.querySelector('#delete'); // El botón que borra lo ultimo introducido

var isResult = false;
var lastValue;
var regex = new RegExp(/\+|-|\*|\/|%/);
var regexLast = new RegExp(/[\+|-|\*|\/|%]$/);

// Indicamos a todos los botones que en cuanto se  pulsen llamen a la función addToCalc
for (i=0; i<botones.length;i++){
	botones[i].addEventListener('click', addToCalc);
}

function addToCalc(value){
	// Esta función se encarga de ir añadiendo los números y los operadores.

	// Comprobamos si value esta vacío o si es del tipo Object. En caso contrario value valdrá lo que se le pase por el botón pulsado.
	if (!value || typeof(value) == 'object') value = this.value

	// Si se mostro el resultado
	if (isResult) {
		isResult = false;
		if (isNaN(value)) entrada.value = txtResult.value; // Si se pulso en uno de los botones de operación se mueve el resultado a donde de muestra la operación
		else entrada.value = ''; // Si se pulso un numero se borra lo que haya donde se muestra la operación
		txtResult.value = '';
	}

	if (entrada.value < 1 || !isNaN(value)){
		// Si no hay nada en la entrada y es un numero lo añadimos. Así evitamos empezar con un operador.
		entrada.value += value;
		lastValue = value;
	}else if (regex.test(value) && !regex.test(lastValue)) {
		// Si es un operador permitido lo añadimos
		entrada.value += value
		lastValue = value
	}else if(regex.test(lastValue) && value != lastValue){
		// Si ya se añadio un operador en la anterior pulsación este se cambia por el que se haya pulsado ahora.
		tmp = entrada.value.slice(0, -1);
		entrada.value = tmp+value;
		lastValue = value;
	}
}

function mostrarResult(){
	// Esta función muestra el resultado de la operación

	// primero comprobamos si hay algo en la entrada.
	if(entrada.value.length > 0)
		// comprobamos si lo ultimo que se añadió a la operación es un operador. En ese caso lo borramos ya que de lo contrario los saltara un error
		if (regexLast.test(entrada.value)){
			tmp = entrada.value.slice(0, -1);
			entrada.value = tmp;
		}
		// Guardamos el resultado
		resultado = eval(entrada.value);

		// Si la operación salió bien mostramos el resultado.
		if (resultado){
			txtResult.value = resultado;
		}
		lastValue = ''
		isResult = true;
}

result.onclick = function(){
	mostrarResult();
}

clean.onclick = function(){
	// Borramos todo
	entrada.value = '';
	txtResult.value = '';
	isResult = true;
	lastValue = '';
}

document.body.onkeyup = function(event){
	// Este evento se activa cada vez que pulsamos y soltamos una tecla
	event = event || window.event;
 	var k = event.key;
	if (!isNaN(k) || regex.test(k)){
		addToCalc(k);
	}else if (event.keyCode == 8 && entrada.value.length > 0) {
		delLast();
	}else if (event.keyCode == 13) {
		mostrarResult();
	}
}

function delLast(){
	// Esta función borra el ultimo carácter. Si se estaba mostrando el resultado se borra todo
	if (!isResult){
		tmp = entrada.value.slice(0, -1);
		entrada.value = tmp;
	}else{
		entrada.value = '';
		txtResult.value = '';
		lastValue = '';
	}
}

del.onclick = delLast()
