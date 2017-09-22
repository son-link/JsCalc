var operadores = document.querySelectorAll('.opera'); //Los botones con los operadores
var numeros = document.querySelectorAll('button:not(.opera):not(#result)'); // Los botones con los números
var entrada = document.querySelector('#display');
var result = document.querySelector('#result');
var clean = document.querySelector('#clean');
var txtResult = document.querySelector('#txtResult');
var del = document.querySelector('#delete');

var isResult = false;
var lastValue;
var regex = new RegExp(/\+|-|\*|\/|%/);
var regexLast = new RegExp(/[\+|-|\*|\/|%]$/);

for (i=0; i<operadores.length;i++){
	operadores[i].addEventListener('click', addToCalc);
}

for (i=0; i<numeros.length;i++){
	numeros[i].addEventListener('click', addToCalc);
}

function addToCalc(value){
	if (!value || typeof(value) == 'object') value = this.value

	if (isResult) {
		isResult = false;
		if (isNaN(value)) entrada.value = txtResult.value;
		else entrada.value = '';
		txtResult.value = '';
	}

	if (entrada.value < 1 || !isNaN(value)){
		entrada.value += value;
		lastValue = value;
	}else if (regex.test(value) && !regex.test(lastValue)) {
		entrada.value += value
		lastValue = value
	}else if(regex.test(lastValue) && value != lastValue){
		tmp = entrada.value.slice(0, -1);
		entrada.value = tmp+value;
		lastValue = value;
	}
}

function mostrarResult(){
	if(entrada.value.length > 0)
		if (regexLast.test(entrada.value)){
			tmp = entrada.value.slice(0, -1);
			entrada.value = tmp;
		}
		resultado = eval(entrada.value);

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
	entrada.value = '';
	txtResult.value = '';
	isResult = true;
	lastValue = '';
}

document.body.onkeyup = function(event){
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
