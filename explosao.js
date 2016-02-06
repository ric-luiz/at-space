function Explosao(ctx,img,x,y) {
      this.ctx = ctx;
      this.img = img;
      this.spritesheet = new Spritesheet(ctx,img,1,5);
      this.spritesheet.intervalo = 75;
      this.x = x;
      this.y = y;
      var explosao = this;
      this.fimDaExplosao = null;
      this.spritesheet.fimDoCiclo = function() {
            explosao.animacao.excluirSprite(explosao);
            if (explosao.fimDaExplosao) explosao.fimDaExplosao();
      }

      //Definindo som da Explosao
	var SOM_TIRO = new Audio();
	SOM_TIRO.src = 'snd/explosao.mp3';
	SOM_TIRO.volume = 0.4;
	SOM_TIRO.load();
	SOM_TIRO.currentTime = 0.0;
	SOM_TIRO.play();
}
Explosao.prototype = {
      atualizar: function() {

      },
      desenhar: function() {
            this.spritesheet.desenhar(this.x,this.y);
            this.spritesheet.proximoQuadro();
      }
};
