function Colisor() {
	this.sprites = [];
	this.aoColidir = null;
	this.spritesExcluir = [];
}
Colisor.prototype = {
	novoSprite: function(sprite) {
		this.sprites.push(sprite);
		sprite.colisor = this;
	},
	processar: function() {
		//iniciar o obejeto vazio
		var jaTestados = new Object();

		for(var i in this.sprites){
			for(var j in this.sprites){
				if(i == j) continue;

				// this.testarColisao(this.sprites[i],this.sprites[j]);
				
				//Gerar string unicas para os objetos
				var id1 = this.stringUnica(this.sprites[i]);
				var id2 = this.stringUnica(this.sprites[j]);

				//Criar os arrays se n existirem
				if(!jaTestados[id1]) jaTestados[id1]=[];
				if(!jaTestados[id2]) jaTestados[id2]=[];
				
				//Teste de repetição
				if(!(jaTestados[id1].indexOf(id2) >= 0 ||
					 jaTestados[id2].indexOf(id1) >= 0)){

					//abstrair colisao
					this.testarColisao(this.sprites[i],this.sprites[j]);

					//Registrar o teste
					jaTestados[id1].push(id2);
					jaTestados[id2].push(id1);
				}		
			}
		}

		this.processarExclusoes();
	},
	testarColisao: function(sprite1,sprite2){
		//Obter os retangulos de colisao de cada sprite
		var rests1 = sprite1.retangulosColisao();
		var rests2 = sprite2.retangulosColisao();

		//Testar as colisoes entre eles
		colisoes:
		for (var i in rests1){
			for(var j in rests2){
				if(this.retangulosColidem(rests1[i],rests2[j])){
					//eles devem ser notificados caso colidam
					sprite1.colidiuCom(sprite2);
					sprite2.colidiuCom(sprite1);

					//Tratador geral
					if(this.aoColidir) this.aoColidir(sprite1,sprite2);

					break colisoes;
				}
			}
		}
	},
	retangulosColidem: function(ret1,ret2){
		//Formula para verificar interseção entre os retangulos
		return (ret1.x + ret1.largura) > ret2.x &&
				ret1.x < (ret2.x + ret2.largura) &&
				(ret1.y + ret1.altura) > ret2.y &&
				ret1.y < (ret2.y + ret2.altura);
	},
	stringUnica: function(sprite){
		var str = '';
		var retangulos = sprite.retangulosColisao();

		for (var i in retangulos){
			str += 'x:'+retangulos[i].x+','+
				   'y:'+retangulos[i].y+','+
				   'l:'+retangulos[i].largura+','+
				   'a:'+retangulos[i].altura+'\n';
		}

		return str;
	},
	excluirSprite: function(sprite){
		this.spritesExcluir.push(sprite);
	},
	processarExclusoes: function(){
		//Criar um novo array
		var novoArray = [];

		//Add no novo array somente elementos nao excluidos
		for (var i in this.sprites){
			if (this.spritesExcluir.indexOf(this.sprites[i]) == -1)
				novoArray.push(this.sprites[i]);
		}

		//Limpar o array de Exclusao
		this.spritesExcluir = [];

		//Substituir o array velho pelo novo
		this.sprites = novoArray;
	}
};