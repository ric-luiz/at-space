function Ovni(ctx,img,imgExplosao) {
	this.ctx = ctx;
	this.img = img;
	this.x = 0;
	this.y = 0;
	this.velocidade = 0;
	this.imgExplosao = imgExplosao;
}
Ovni.prototype = {
	atualizar: function() {
		var incremento = this.velocidade * this.animacao.decorrido/1000;
		this.y += incremento;

		//Excluir quando sumir da tela
		if(this.y > this.ctx.canvas.height){
			this.animacao.excluirSprite(this);
			this.colisor.excluirSprite(this);
		}
	},
	desenhar: function() {
		this.ctx.drawImage(this.img, this.x, this.y, this.img.width, this.img.height);
	},
	retangulosColisao: function() {
		var rets = [
					  {x: this.x+20, y: this.y+1, largura: 25, altura: 10},
					  {x: this.x+2, y: this.y+11, largura: 60, altura: 12},
					  {x: this.x+20, y: this.y+23, largura: 25, altura: 7}
				   ];

		//Desenhando os retangulos nos ovnis para visualização
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
		//Verifica se colidiu com um tiro, e os dois desaparecem
		if(outro instanceof Tiro){
			this.animacao.excluirSprite(this);
			this.colisor.excluirSprite(this);
			this.animacao.excluirSprite(outro);
			this.colisor.excluirSprite(outro);

			var explosao = new Explosao(this.ctx,this.imgExplosao,this.x,this.y);
			this.animacao.novoSprite(explosao);
		}
	}
};
