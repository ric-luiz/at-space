function Animacao(context){
	this.context = context;
	this.sprites = [];
	this.ligado = false;
	this.processamentos = [];
	this.spritesExcluir = [];
	this.processamentosExcluir = [];
	this.ultimoCiclo = 0;
	this.decorrido = 0;
}

Animacao.prototype = {
	novoSprite: function(sprite) {
			this.sprites.push(sprite);
			sprite.animacao = this;
	},
	ligar: function() {
		this.ultimoCiclo = 0;
		this.ligado = true;
		this.proximoFrame();
	},
	desligar: function(){
		this.ligado = false;
	},
	proximoFrame: function(){
		//Verificar se a animação esta parada
		if(!this.ligado) return;

		//Verificar os ciclos de processamento por milisegundo
		var agora = new Date().getTime();
		if(this.ultimoCiclo == 0) this.ultimoCiclo = agora;
		this.decorrido = agora - this.ultimoCiclo;

		//Limpar a tela a cada ciclo
		// this.limparTela();

		//Atualizar os sprites na tela
		for (var i in this.sprites)
			this.sprites[i].atualizar();

		//redesenhamos os sprites na tela
		for (var i in this.sprites)
			this.sprites[i].desenhar();

		//Processamento geral do colisor
		for (var i in this.processamentos)
			this.processamentos[i].processar();

		//processar as exclusoes
		this.processarExclusoes();

		//Atualizar os ciclos
		this.ultimoCiclo = agora;

		//chamar o proximo ciclo
		var animacao = this;
		requestAnimationFrame(function() {
			animacao.proximoFrame();
		});
	},
	limparTela: function(){
		var ctx = this.context;
		ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
	},
	novoProcessamento: function(processamento) {
		this.processamentos.push(processamento);
		processamento.animacao = this;
	},
	excluirSprite: function(sprite){
		this.spritesExcluir.push(sprite);
	},
	excluirProcessamento: function(processamento) {
		this.processamentosExcluir.push(processamento);
	},
	processarExclusoes: function(){
		//Criar um novo array
		var novoSprites = [];
		var novoProcessamentos = [];

		//Add no novo array somente elementos nao excluidos
		for (var i in this.sprites){
			if (this.spritesExcluir.indexOf(this.sprites[i]) == -1)
				novoSprites.push(this.sprites[i]);
		}
		for (var i in this.processamentos){
			if(this.processamentosExcluir.indexOf(this.processamentos[i]) == -1)
				novoProcessamentos.push(this.processamentos[i]);
		}

		//Limpar o array de Exclusao
		this.spritesExcluir = [];
		this.processamentosExcluir = [];

		//Substituir o array velho pelo novo
		this.sprites = novoSprites;
		this.processamentos = novoProcessamentos;
	}
};
