function Tiro(ctx,nave) {
	this.ctx = ctx;
	this.nave = nave;

	//Para onde vai o tiro????
	this.direcaoX = 0;
	this.direcaoY = 0;
	//------------------------

	//Posicionar o tiro no bico da nave---------------------------
	//Definindo variaveis principais
	this.largura = 3;
	this.altura = 10;
	this.x = 0;
	this.y = 0;
	this.velocidade = 500;
	this.cor = 'yellow';
	this.rotacao = this.nave.rotacao;
	//Definindo previamente a posição do tiro em ralação a nave e sua direção
	this.rotacaoPosicao();
	//------------------------------------------------------------

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
		//velocidade do tiro a cada segundo
		var incremento = this.velocidade * this.animacao.decorrido/1000;

		//Verifca para onde vai o tiro. ver this.rotacaoPosicao()--
		if(this.direcaoY != 0){
			this.y += incremento/this.direcaoY;
		}

		if(this.direcaoX != 0){
			this.x += incremento/this.direcaoX;
		}
		//----------------------------------------------------------

		//Excluir quando sumir da tela
		if(this.y < -this.ctx.canvas.height  || this.x > this.ctx.canvas.width*2 ||
		   this.y > this.ctx.canvas.height*2 || this.x < -this.ctx.canvas.width
		  )
		{
			this.animacao.excluirSprite(this);
			// this.colisor.excluirSprite(this);
		}

	},
	desenhar: function() {
		this.ctx.save();

		// transporta o ponto de rotação para os itens especificados
		// uso ele para levar o tiro para frente
		this.ctx.translate(this.x,this.y);

		// Rotacionar a nave a partir dos graus especificados
		this.ctx.rotate(this.rotacao);

		this.ctx.fillStyle = this.cor;
		this.ctx.fillRect(0 , 30, this.largura, this.altura);
		this.ctx.restore();
	},
	retangulosColisao: function() {
		return [ {x: this.x, y: this.y, largura: this.largura, altura: this.altura} ];
	},
	colidiuCom: function(outro) {

	},
	rotacaoPosicao: function() {
		var rot = 0;
		var rotacao = this.nave.rotacao;
		if (rotacao >= 0){
			//Posicao de rotacionamento Horario
			if((rotacao > 345 && rotacao <= 360) || (rotacao >= 0 && rotacao <= 15) ){
				//Definindo o angulo de rotação da img d tiro
				rot = 0 * Math.PI / 180;

				//Posição dos ponto de rotação do metodo rotate() do canvas
				this.x = this.nave.x + 16;
				this.y = this.nave.y - 20;

				//Definindo a direção do tiro
				this.direcaoY = -1;
				this.direcaoX = 0;

			} else if (rotacao > 15 && rotacao <= 45) {
				rot = 30 * Math.PI / 180;

				this.x = this.nave.x + 50;
				this.y = this.nave.y - this.altura;

				this.direcaoY = -1;
				this.direcaoX = 1.7;

			} else if (rotacao > 45 && rotacao <= 75) {
				rot = 60 * Math.PI / 180;

				this.x = this.nave.x + 70;
				this.y = this.nave.y + 15;

				this.direcaoY = -1.7;
				this.direcaoX = 1;

			} else if (rotacao > 75 && rotacao <= 105) {
				rot = 90 * Math.PI / 180;

				this.x = this.nave.x + 80;
				this.y = this.nave.y + 45;

				this.direcaoY = 0;
				this.direcaoX = 1;

			} else if (rotacao > 105 && rotacao <= 135) {
				rot = 120 * Math.PI / 180;

				this.x = this.nave.x + 70;
				this.y = this.nave.y + 75;

				this.direcaoY = 1.7;
				this.direcaoX = 1;

			} else if (rotacao > 135 && rotacao <= 165) {
				rot = 150 * Math.PI / 180;

				this.x = this.nave.x + 50;
				this.y = this.nave.y + 100;

				this.direcaoY = 1;
				this.direcaoX = 1.7;

			} else if (rotacao > 165 && rotacao <= 195) {
				rot = 180 * Math.PI / 180;

				this.x = this.nave.x + 19;
				this.y = this.nave.y + 110;

				this.direcaoY = 1;
				this.direcaoX = 0;

			} else if (rotacao > 195 && rotacao <= 225) {
				rot = 210 * Math.PI / 180;

				this.x = this.nave.x - 12;
				this.y = this.nave.y + 100;

				this.direcaoY = 1;
				this.direcaoX = -1.7;

			} else if (rotacao > 225 && rotacao <= 255) {
				rot = 240 * Math.PI / 180;

				this.x = this.nave.x - 30;
				this.y = this.nave.y + 78;

				this.direcaoY = 1.7;
				this.direcaoX = -1;

			} else if (rotacao > 255 && rotacao <= 285) {
				rot = 270 * Math.PI / 180;

				this.x = this.nave.x - 45;
				this.y = this.nave.y + 50;

				this.direcaoY = 0;
				this.direcaoX = -1;

			} else if (rotacao > 285 && rotacao <= 315) {
				rot = 300 * Math.PI / 180;

				this.x = this.nave.x - 38;
				this.y = this.nave.y + 18;

				this.direcaoY = -1.7;
				this.direcaoX = -1;

			} else if (rotacao > 315 && rotacao <= 345) {
				rot = 330 * Math.PI / 180;

				this.x = this.nave.x - 18;
				this.y = this.nave.y - 10;

				this.direcaoY = -1;
				this.direcaoX = -1.7;
			}
		} else {
			//Posicao de rotacionamento Anti-horario
			if((rotacao < -345 && rotacao >= -360) || (rotacao <= 0 && rotacao >= -15) ){
				rot = 330 * Math.PI / 180;

				this.x = this.nave.x - 18;
				this.y = this.nave.y - 10;

				this.direcaoY = -1;
				this.direcaoX = -1.7;

			} else if (rotacao < -15 && rotacao >= -45) {
				rot = 300 * Math.PI / 180;

				this.x = this.nave.x - 38;
				this.y = this.nave.y + 18;

				this.direcaoY = -1.7;
				this.direcaoX = -1;

			} else if (rotacao < -45 && rotacao >= -75) {
				rot = 270 * Math.PI / 180;

				this.x = this.nave.x - 45;
				this.y = this.nave.y + 50;

				this.direcaoY = 0;
				this.direcaoX = -1;

			} else if (rotacao < -75 && rotacao >= -105) {
				rot = 240 * Math.PI / 180;

				this.x = this.nave.x - 30;
				this.y = this.nave.y + 78;

				this.direcaoY = 1.7;
				this.direcaoX = -1;

			} else if (rotacao < -105 && rotacao >= -135) {
				rot = 210 * Math.PI / 180;

				this.x = this.nave.x - 12;
				this.y = this.nave.y + 100;

				this.direcaoY = 1;
				this.direcaoX = -1.7;

			} else if (rotacao < -135 && rotacao >= -165) {
				rot = 180 * Math.PI / 180;

				this.x = this.nave.x + 19;
				this.y = this.nave.y + 110;

				this.direcaoY = 1;
				this.direcaoX = 0;

			} else if (rotacao < -165 && rotacao >= -195) {
				rot = 150 * Math.PI / 180;

				this.x = this.nave.x + 50;
				this.y = this.nave.y + 100;

				this.direcaoY = 1;
				this.direcaoX = 1.7;

			} else if (rotacao < -195 && rotacao >= -225) {
				rot = 120 * Math.PI / 180;

				this.x = this.nave.x + 70;
				this.y = this.nave.y + 75;

				this.direcaoY = 1.7;
				this.direcaoX = 1;

			} else if (rotacao < -225 && rotacao >= -255) {
				rot = 90 * Math.PI / 180;

				this.x = this.nave.x + 80;
				this.y = this.nave.y + 45;

				this.direcaoY = 0;
				this.direcaoX = 1;

			} else if (rotacao < -255 && rotacao >= -285) {
				rot = 60 * Math.PI / 180;

				this.x = this.nave.x + 70;
				this.y = this.nave.y + 15;

				this.direcaoY = -1.7;
				this.direcaoX = 1;

			} else if (rotacao < -285 && rotacao >= -315) {
				rot = 30 * Math.PI / 180;

				this.x = this.nave.x + 50;
				this.y = this.nave.y - this.altura;

				this.direcaoY = -1;
				this.direcaoX = 1.7;

			} else if (rotacao < -315 && rotacao >= -345) {
				rot = 0 * Math.PI / 180;

				this.x = this.nave.x + 16;
				this.y = this.nave.y - 20;

				this.direcaoY = -1;
				this.direcaoX = 0;
			}
		}

		//Seta a rotação do tiro
		this.rotacao = rot;
	}
};
