//Constantes das teclas
var SETA_ESQUERDA = 37;
var SETA_DIREITA = 39;
var SETA_CIMA = 38;
var SETA_BAIXO = 40;
var ESPACO = 32;
var TECLA_C = 67;
var ENTER = 13;
var VIDA = 86;

function Teclado(elemento){
	this.elemento = elemento;

	//array das teclas pressionadas
	this.pressionadas=[];

	//Array de teclas disparadas
	this.disparadas=[];

	//funcões de pulo
	// this.funcoesPulo=[];

	//Funções de disparo
	this.funcoesDisparo=[];

	//estados das teclas no array
	var teclado = this;

	elemento.addEventListener('keydown',function(evento){
		var tecla = evento.keyCode;
		teclado.pressionadas[tecla] = true;

		//Disparar somente se o For o primeiro keydown da tecla
		if (teclado.funcoesDisparo[tecla] && !teclado.disparadas[tecla]){
			teclado.disparadas[tecla] = true;
			teclado.funcoesDisparo[tecla]();
		}
	});

	elemento.addEventListener('keyup',function(evento){
		teclado.pressionadas[evento.keyCode] = false;
		teclado.disparadas[evento.keyCode] = false;
	});
}

Teclado.prototype = {
	pressionada: function(tecla){
		return this.pressionadas[tecla];
	},
	disparou: function(tecla, callback){
		this.funcoesDisparo[tecla]=callback;
	},
	pulou: function(tecla,callback){
		this.funcoesPulo[tecla]=callback;
	}
};
