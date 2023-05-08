window.onload = function() {
    setInterval(executar, 1000 / 30);
  }

    var folhaDesenho = document.getElementById("folha");
    var areaDesenho = folhaDesenho.getContext("2d");

    var larguraCampo = 600;
    var alturaCampo = 500;
    var espessuraRede = 5;

    var diametroBola = 10;

    var espessuraRaquete = 11;
    var alturaRaquete = 100;

    //variáveis de efeitos que respondem ao mouse e inteligencias
    var efeitoRaquete = 0.3;
    var velocidadeJogador2 = 5;
    //fim das variaveis de efeito

    var posicaoJogador1 = posicaoJogador2 = 40
    var posicaoBolaX = posicaoBolaY = 10;
    var velocidadeBolaPosicaoX = velocidadeBolaPosicaoY = 5;
    var pontuacaoJogador1 = pontuacaoJogador2 = 0;

    //mouse respondendo comandos
    folhaDesenho.addEventListener ('mousemove', function(e){
      posicaoJogador1 = e.clientY - alturaRaquete /2;
    });

  function executar() {
    //todo o código do jogo
    areaDesenho.fillStyle = "#286080"; //cor azul
    areaDesenho.fillRect(0, 0, larguraCampo, alturaCampo); //desenho do campo

    areaDesenho.fillStyle = "#ffffff"; //cor branca

    //Rede ou linha
    areaDesenho.fillRect(larguraCampo/2 - espessuraRede/2, 0, espessuraRede, alturaCampo);

    //Bolinha
    areaDesenho.fillRect(posicaoBolaX - diametroBola/2, posicaoBolaY - diametroBola/2, diametroBola, diametroBola);

    //Raquete 1
    areaDesenho.fillRect(0, posicaoJogador1, espessuraRaquete, alturaRaquete);
    //Raquete 2
    areaDesenho.fillRect(larguraCampo - espessuraRaquete, posicaoJogador2, espessuraRaquete, alturaRaquete);

    //Escrever a pontuação do JOGO
    areaDesenho.fillText("Você - " + pontuacaoJogador1 + " pontos", 100, 100);
    areaDesenho.fillText("Computador - " + pontuacaoJogador2 + " pontos", larguraCampo - 200, 100);

    posicaoBolaX = posicaoBolaX + velocidadeBolaPosicaoX;
    posicaoBolaY = posicaoBolaY + velocidadeBolaPosicaoY;

    //Verifica lateral superior
    if (posicaoBolaY < 0 && velocidadeBolaPosicaoY < 0) {
      velocidadeBolaPosicaoY = -velocidadeBolaPosicaoY;
    }
    //Verifica lateral inferior
    if (posicaoBolaY > alturaCampo && velocidadeBolaPosicaoY > 0) {
      velocidadeBolaPosicaoY = -velocidadeBolaPosicaoY;
    }

    //Verifica se o Jogador 2 fez um ponto
    if (posicaoBolaX < 0) {
      if(posicaoBolaY > posicaoJogador1 && posicaoBolaY < posicaoJogador1 + alturaRaquete) {
        //mude a posicao da bola
        velocidadeBolaPosicaoX = -velocidadeBolaPosicaoX;

        //efeito na Bola
        var diferencaY = posicaoBolaY - (posicaoJogador1 + alturaRaquete / 2);
        velocidadeBolaPosicaoY = diferencaY*efeitoRaquete;
      } else {
        // pontos jogador 2
        pontuacaoJogador2++;
        //colocar a bola no centro
        posicaoBolaX = larguraCampo / 2;
        posicaoBolaY = alturaCampo / 2;
        velocidadeBolaPosicaoX = -velocidadeBolaPosicaoX;
        velocidadeBolaPosicaoY = 3;
        }
      }

      //Verifica se o Jogador 1 fez pontos
      if(posicaoBolaX > larguraCampo){
        if(posicaoBolaY > posicaoJogador2 && posicaoBolaY < posicaoJogador2 + alturaRaquete) {
        //Rebater a Bola
        velocidadeBolaPosicaoX = -velocidadeBolaPosicaoX;

        var diferencaY = posicaoBolaY - (posicaoJogador2 + alturaRaquete / 2);
        velocidadeBolaPosicaoY = diferencaY*efeitoRaquete;
      } else {
        //Pontos do jogador1
        pontuacaoJogador1++;
        //colocar a bola no centro
        posicaoBolaX = larguraCampo / 2;
        posicaoBolaY = alturaCampo / 2;
        velocidadeBolaPosicaoX = -velocidadeBolaPosicaoX;
        velocidadeBolaPosicaoY = 3;
      }
    }

    //atualiza posicao Jogador 2
    if (posicaoJogador2 + alturaRaquete/2 < posicaoBolaY) {
      posicaoJogador2 = posicaoJogador2 + velocidadeJogador2;
    } else {
      posicaoJogador2 = posicaoJogador2 - velocidadeJogador2;
    }
  }
