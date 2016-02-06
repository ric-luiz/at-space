function Tiro(ctx,nave) {
	this.ctx = ctx;
	this.nave = nave;

	//Posicionar o tiro no bico da nave
	this.largura = 3;
	this.altura = 10;
	this.x = nave.x + 18;
	this.y = nave.y - this.altura;
	this.velocidadey = 500;
	this.cor = 'yellow';

	//Definindo som do tiro
	var SOM_TIRO = new Audio();
	SOM_TIRO.src = 'snd/tiro.mp3';
	SOM_TIRO.volume = 0.2;
	SOM_TIRO.load();
	SOM_TIRO.currentTime = 0.0;
	SOM_TIRO.play();
}
Tiro.prototype = {
	atualizar: function() {
		var incremento = this.velocidadey * this.animacao.decorrido/1000;
		this.y -= incremento;

		//Excluir quando sumir da tela
		if(this.y < -this.altura){
			this.animacao.excluirSprite(this);
			this.colisor.excluirSprite(this);
		}
	},
	desenhar: function() {
		var ctx = this.ctx;
		ctx.save();
		ctx.fillStyle = this.cor;
		ctx.fillRect(this.x,this.y,this.largura,this.altura);
		ctx.restore();
	},
	retangulosColisao: function() {
		return [ {x: this.x, y: this.y, largura: this.largura, altura: this.altura} ];
	},
	colidiuCom: function(outro) {

	}
};
