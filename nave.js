function Nave(ctx,teclado,img,imgExplosao) {
	this.ctx = ctx;
	this.teclado = teclado;
	this.img = img;
	this.x = 0;
	this.y = 0;
	this.velocidade = 30;
	this.acabaramVidas = null;
	this.vidasExtras = 3;
	this.atingido = 0;
	this.spritesheet = new Spritesheet(ctx,img,3,2);
	this.spritesheet.linha = 0;
	this.spritesheet.intervalo = 100;
	this.imgExplosao = imgExplosao;
	this.rotacao = 0;
}
Nave.prototype = {
	atualizar: function() {

		var incremento = this.velocidade * this.animacao.decorrido/1000;

		if(this.teclado.pressionada(SETA_ESQUERDA))
			this.rotacao -= incremento;

		if(this.teclado.pressionada(SETA_DIREITA))
			this.rotacao += incremento;
	},
	desenhar: function() {

		if (this.teclado.pressionada(SETA_ESQUERDA))
			this.spritesheet.linha = 1;
		else if (this.teclado.pressionada(SETA_DIREITA))
			this.spritesheet.linha = 2;
		else
			this.spritesheet.linha = 0;

		//Reiniciando o angulo da rotação para 0 caso ela seja maior que 360 ou -360
		if(Math.abs(this.rotacao) >= 347){
			this.rotacao = 0;
		}

		this.spritesheet.desenharNave(this.x,this.y,this);
		this.spritesheet.proximoQuadro();
	},
	atirar: function() {
		var t = new Tiro(this.ctx,this);
		this.animacao.novoSprite(t);
		// this.colisor.novoSprite(t);
	},
	retangulosColisao: function() {
		var rets = [ {x: this.x+2, y: this.y+19, largura: 9, altura: 13},
					 {x: this.x+13, y: this.y+3, largura: 10, altura: 33},
					 {x: this.x+25, y: this.y+19, largura: 9, altura: 13}
				   ];

		//Desenhando os retangulos na nave para visualização
		// var ctx = this.ctx;

		// for (var i in rets){
		// 	ctx.save();
		// 	ctx.strokeStyle = 'yellow';
		// 	ctx.strokeRect(rets[i].x, rets[i].y,rets[i].largura,rets[i].altura);
		// 	ctx.restore();
		// }

		return rets;
	},
	colidiuCom: function(outro) {
		//Verifica se colidiu com um ovni...
		if(outro instanceof Ovni){
			this.animacao.excluirSprite(this);
			this.animacao.excluirSprite(outro);
			this.colisor.excluirSprite(this);
			this.colisor.excluirSprite(outro);

			var exp1 = new Explosao(this.ctx,this.imgExplosao,this.x,this.y);
			var exp2 = new Explosao(this.ctx,this.imgExplosao,this.x,this.y);

			this.animacao.novoSprite(exp1);
			this.animacao.novoSprite(exp2);

			var nave = this;
			exp1.fimDaExplosao = function() {
				nave.vidasExtras--;

				if (nave.vidasExtras < 0) {
					if (nave.acabaramVidas) nave.acabaramVidas();
				}
				else {
					//Recolocar a nave no engine
					nave.colisor.novoSprite(nave);
					nave.animacao.novoSprite(nave);

					nave.posicionar();
				}
			}

			// //Verifica se o ovni é diferente do ja atingido
			// if(this.atingido != outro && this.atingido != 0){
			// 	this.pontosVida--;
			// }
			// //Caso a vida se esgote, Game over
			// if(this.pontosVida == 1){
			// 	this.animacao.desligar();
			// 	alert('GAME OVER');
			// }
			//
			// this.atingido = outro;
		}
	},
	posicionar: function() {
		var canvas = this.ctx.canvas;
		this.x = canvas.width/2 - 18;
		this.y = canvas.height/2 - 48;
	},
	rotacaoPosicao: function(rotacao) {
		var rot = 0;

		if (rotacao >= 0){
			if((rotacao > 345 && rotacao <= 360) || (rotacao >= 0 && rotacao <= 15) ){
				rot = 0 * Math.PI / 180;
			} else if (rotacao > 15 && rotacao <= 45) {
				rot = 30 * Math.PI / 180;
			} else if (rotacao > 45 && rotacao <= 75) {
				rot = 60 * Math.PI / 180;
			} else if (rotacao > 75 && rotacao <= 105) {
				rot = 90 * Math.PI / 180;
			} else if (rotacao > 105 && rotacao <= 135) {
				rot = 120 * Math.PI / 180;
			} else if (rotacao > 135 && rotacao <= 165) {
				rot = 150 * Math.PI / 180;
			} else if (rotacao > 165 && rotacao <= 195) {
				rot = 180 * Math.PI / 180;
			} else if (rotacao > 195 && rotacao <= 225) {
				rot = 210 * Math.PI / 180;
			} else if (rotacao > 225 && rotacao <= 255) {
				rot = 240 * Math.PI / 180;
			} else if (rotacao > 255 && rotacao <= 285) {
				rot = 270 * Math.PI / 180;
			} else if (rotacao > 285 && rotacao <= 315) {
				rot = 300 * Math.PI / 180;
			} else if (rotacao > 315 && rotacao <= 345) {
				rot = 330 * Math.PI / 180;
			}
		} else {
			if((rotacao < -345 && rotacao >= -360) || (rotacao <= 0 && rotacao >= -15) ){
				rot = 330 * Math.PI / 180;
			} else if (rotacao < -15 && rotacao >= -45) {
				rot = 300 * Math.PI / 180;
			} else if (rotacao < -45 && rotacao >= -75) {
				rot = 270 * Math.PI / 180;
			} else if (rotacao < -75 && rotacao >= -105) {
				rot = 240 * Math.PI / 180;
			} else if (rotacao < -105 && rotacao >= -135) {
				rot = 210 * Math.PI / 180;
			} else if (rotacao < -135 && rotacao >= -165) {
				rot = 180 * Math.PI / 180;
			} else if (rotacao < -165 && rotacao >= -195) {
				rot = 150 * Math.PI / 180;
			} else if (rotacao < -195 && rotacao >= -225) {
				rot = 120 * Math.PI / 180;
			} else if (rotacao < -225 && rotacao >= -255) {
				rot = 90 * Math.PI / 180;
			} else if (rotacao < -255 && rotacao >= -285) {
				rot = 60 * Math.PI / 180;
			} else if (rotacao < -285 && rotacao >= -315) {
				rot = 30 * Math.PI / 180;
			} else if (rotacao < -315 && rotacao >= -345) {
				rot = 0 * Math.PI / 180;
			}
		}

		return rot
	}
};
