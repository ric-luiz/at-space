function Painel(ctx,nave) {
      this.ctx = ctx;
      this.nave = nave;
      this.spritesheet = new Spritesheet(ctx,nave.img,3,2);
      this.spritesheet.linha = 0;
      this.spritesheet.coluna = 0;
      this.pontuacao = 0;
}
Painel.prototype = {
      atualizar: function() {

      },
      desenhar: function() {
            //Desenhar Vidas do Jogador
            this.ctx.scale(0.5,0.5);
            var x = 20;
            var y = 20;

            for (var i = 0; i < this.nave.vidasExtras; i++) {
                  this.spritesheet.desenhar(x,y);
                  x += 40;
            }
            this.ctx.scale(2.0,2.0);

            //Desenhar Pontuação
            var ctx = this.ctx;

            ctx.save();
            ctx.fillStyle = 'white';
            ctx.font = '18px sans-serif';
            ctx.fillText(this.pontuacao,100,27);
            ctx.restore();
      }
};
