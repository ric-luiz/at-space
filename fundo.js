function Fundo (ctx,img,teclado,nave) {
	this.ctx = ctx;
	this.img = img;
	this.nave = nave;
	this.velocidade = 0;
	this.x = 0;
	this.y = 0;
	this.teclado = teclado;
}
Fundo.prototype = {
	atualizar: function() {
		//Atualizar a possicao do fundo
		var incremento = this.velocidade * this.animacao.decorrido/1000;

		// if(this.teclado.pressionada(SETA_ESQUERDA)){
		// 	this.x -= incremento;
		// }
		//
		// if(this.teclado.pressionada(SETA_DIREITA)){
		// 	this.x += incremento;
		// }
		//
		if(this.teclado.pressionada(SETA_CIMA)){
			this.rotacaoPosicao(this.nave.rotacao,incremento);
		}
		//
		// if(this.teclado.pressionada(SETA_BAIXO)){
		// 	this.y += incremento;
		// }

		if(this.y < 0){
			 this.y = 500;
		}
		if(this.x < 0){
			 this.x = 500;
		}
		if (this.y > 500){
			 this.y = 0;
		}
		if (this.x > 500){
			 this.x = 0;
		}

	},
	desenhar: function() {
		var img = this.img;
		this.ctx.drawImage(
			img,
			this.x,this.y,500,500,
			0,0,ctx.canvas.width,ctx.canvas.height
		);

	},
	rotacaoPosicao: function(rotacao,incremento) {
		if (rotacao >= 0){
			if((rotacao > 345 && rotacao <= 360) || (rotacao >= 0 && rotacao <= 15) ){
				this.y -= incremento;
			} else if (rotacao > 15 && rotacao <= 45) {
				this.y -= incremento;
				this.x += incremento/2;
			} else if (rotacao > 45 && rotacao <= 75) {
				this.y -= incremento/2;
				this.x += incremento;
			} else if (rotacao > 75 && rotacao <= 105) {
				this.x += incremento;
			} else if (rotacao > 105 && rotacao <= 135) {
				this.y += incremento/2;
				this.x += incremento;
			} else if (rotacao > 135 && rotacao <= 165) {
				this.y += incremento;
				this.x += incremento/2;
			} else if (rotacao > 165 && rotacao <= 195) {
				this.y += incremento;
			} else if (rotacao > 195 && rotacao <= 225) {
				this.y += incremento;
				this.x -= incremento/2;
			} else if (rotacao > 225 && rotacao <= 255) {
				this.y += incremento/2;
				this.x -= incremento;
			} else if (rotacao > 255 && rotacao <= 285) {
				this.x -= incremento;
			} else if (rotacao > 285 && rotacao <= 315) {
				this.y -= incremento/2;
				this.x -= incremento;
			} else if (rotacao > 315 && rotacao <= 345) {
				this.y -= incremento;
				this.x -= incremento/2;
			}
		} else {
			if((rotacao < -345 && rotacao >= -360) || (rotacao <= 0 && rotacao >= -15) ){
				this.y -= incremento;
				this.x -= incremento/2;
			} else if (rotacao < -15 && rotacao >= -45) {
				this.y -= incremento/2;
				this.x -= incremento;
			} else if (rotacao < -45 && rotacao >= -75) {
				this.x -= incremento;
			} else if (rotacao < -75 && rotacao >= -105) {
				this.y += incremento/2;
				this.x -= incremento;
			} else if (rotacao < -105 && rotacao >= -135) {
				this.y += incremento;
				this.x -= incremento/2;
			} else if (rotacao < -135 && rotacao >= -165) {
				this.y += incremento;
			} else if (rotacao < -165 && rotacao >= -195) {
				this.y += incremento;
				this.x += incremento/2;
			} else if (rotacao < -195 && rotacao >= -225) {
				this.y += incremento/2;
				this.x += incremento;
			} else if (rotacao < -225 && rotacao >= -255) {
				this.x += incremento;
			} else if (rotacao < -255 && rotacao >= -285) {
				this.y -= incremento/2;
				this.x += incremento;
			} else if (rotacao < -285 && rotacao >= -315) {
				this.y -= incremento;
				this.x += incremento/2;
			} else if (rotacao < -315 && rotacao >= -345) {
				this.y -= incremento;
			}
		}
	}
};
