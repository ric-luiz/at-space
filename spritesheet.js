function Spritesheet(ctx,img,linhas,colunas){
			this.context = ctx;
			this.img = img;
			this.numLinhas = linhas;
			this.numColunas = colunas;
			this.intervalo = 0;
			this.linha = 0;
			this.coluna = 0;
			this.fimDoCiclo = null;
		}
		Spritesheet.prototype = {
			proximoQuadro: function(){
				//Momento atual
				var agora = new Date().getTime();
				//Se não tem o ultimo tempo
				if(!this.ultimoTempo) this.ultimoTempo = agora;

				//Já esta na hora de mudar a coluna?
				if(agora - this.ultimoTempo < this.intervalo){
					return;
				}

				if(this.coluna < this.numColunas - 1){
						this.coluna++;
				}
				else{
						this.coluna = 0;

						//Avisar que acabou o ciclo
						if (this.fimDoCiclo) this.fimDoCiclo();
				}

				//guardar ultima mudança
				this.ultimoTempo = agora;
			},
			desenhar: function(x,y){

				var larguraQuadro = this.img.width/this.numColunas;
				var alturaQuadro = this.img.height/this.numLinhas;

				this.context.drawImage(
					this.img,
					larguraQuadro * this.coluna,
					alturaQuadro * this.linha,
					larguraQuadro,
					alturaQuadro,
					x,
					y,
					larguraQuadro,
					alturaQuadro
				);
			},
			desenharNave: function (x,y,nave) {

				var larguraQuadro = this.img.width/this.numColunas;
				var alturaQuadro = this.img.height/this.numLinhas;
				var rotacao = nave.rotacaoPosicao(nave.rotacao);

				this.context.save();

				// translate contexto para centro da imagem
				//Aqui defino como referencia o centro do canvas
				this.context.translate(this.context.canvas.width/2,this.context.canvas.height/2);

				// Rotacionar a nave a partir dos graus especificados
				this.context.rotate(rotacao);
				// O desenho deve ser feito com aquele alturaQuadro/-2 e larguraQuadro/-2 Mesmo
				//Isso acontece para que o ponto de rotação seja o centro da nave
				this.context.drawImage(
					this.img,
					larguraQuadro * this.coluna,
					alturaQuadro * this.linha,
					larguraQuadro,
					alturaQuadro,
					larguraQuadro/-2,
					alturaQuadro/-2,
					larguraQuadro,
					alturaQuadro
				);
				this.context.restore();
			}
		};
