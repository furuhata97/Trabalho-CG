    //Obtém o valor da janela para aplicar ao canvas
    var width = window.innerWidth;
    var height = window.innerHeight - 52;
    var shapeForTransformation;
    var grau, pontos, dx, dy, p1, p2;
    var formaAntiga = [];
    var formaAtual = [];

    //Cria um novo stage (canvas)
    var stage = new Konva.Stage({
      container: 'container',
      width: width,
      height: height,
      name: 'stage'
    });

    //Cria uma camada onde as formas serão inseridas
    var layer = new Konva.Layer();
    stage.add(layer);

    //Cria a flecha do eixo Y
    var arrow1 = new Konva.Arrow({
      x: 10,
      y: 10,
      points: [0,0, 0, 75],
      pointerLength: 10,
      pointerWidth : 10,
      fill: 'black',
      stroke: 'black',
      strokeWidth: 4
    });

    //Cria a flecha do eixo X
    var arrow2 = new Konva.Arrow({
      x: 8,
      y: 10,
      points: [0,0, 75, 0],
      pointerLength: 10,
      pointerWidth : 10,
      fill: 'black',
      stroke: 'black',
      strokeWidth: 4
    });

    //Adiciona as flechas na camada
    layer.add(arrow1);
    layer.add(arrow2);

    // Cria o texto de coordenadas
    var text = new Konva.Text({
      x: 5,
      y: 100,
      name: 'texto',
    });

    //Cria um texto contendo Y para ser colocado ao lado da flecha
    var yC = new Konva.Text({
      x: 20,
      y: 75,
    });

    //Cria um texto contendo X para ser colocado ao lado da flecha
    var xC = new Konva.Text({
      x: 70,
      y: 20,
    });

    //Adiciona os textos na camada e atribui seus valores
    layer.add(text);
    layer.add(yC);
    layer.add(xC);
    yC.text('Y');
    xC.text('X');

    //Atualiza o texto de coordenadas
    updateText();

    //Define o estilo do cursor do mouse
    stage.container().style.cursor = 'crosshair';

  //Função que obtem as coordenadas X e Y quando o cursor do mouse se movimenta e chama a função para alterar
  // as coordenadas no canvas
  stage.on('mousemove', function () {
      var mousePos = stage.getPointerPosition();
      updateText(mousePos.x, mousePos.y, stage);
    });

  //Função que recebe as coordenadas X e Y a altera as mesmas para exibição ao usuário. Também exibe informaçãos de ações realizadas
    function updateText(X, Y, title) {
      var lines = [];
      if (title === undefined) {
        console.log('Nada aqui');
        }else{
            lines = [
              'x: ' + X,
              'y: ' + Y,
              'width: ' + stage.width(),
              'height: ' + stage.height(),
              ];

              lines.push('');

              if (squareActive) {
                lines.push('Desenhando quadrado');
              }
              if (RecActive) {
                lines.push('Desenhando retângulo');
              }
              if (circleActive) {
                lines.push('Desenhando círculo');
              }
              if (lineActive) {
                lines.push('Desenhando reta');
              }
              if (triangleActive) {
                lines.push('Desenhando triângulo');
              }
              if (verificaTransformation === 1) {
                lines.push('Fazendo seleção');
              }
              if (verificaTransformation === 2) {
                lines.push('Clique na figura que deseja transladar');
              }
              if (verificaTransformation === 3) {
                lines.push('Clique na figura que deseja rotacionar');
              }
              if (verificaTransformation === 4) {
                lines.push('Clique na figura que deseja alterar a escala');
              }
              if (verificaTransformation === 6) {
                lines.push('Rotacionando quadrado/retângulo \n Clique no ponto sobre o qual deseja realizar a rotação');
              }
              if (verificaTransformation === 7) {
                lines.push('Rotacionando reta \n Clique no ponto sobre o qual deseja realizar a rotação');
              }
              if (verificaTransformation === 8) {
                lines.push('Rotacionando círculo \n Clique no ponto sobre o qual deseja realizar a rotação');
              }
              if (verificaTransformation === 9) {
                lines.push('Rotacionando triângulo \n Clique no ponto sobre o qual deseja realizar a rotação');
              }
              if (verificaTransformation === 10) {
                lines.push('Transladando quadrado/retângulo \n Clique sobre o ponto onde deseja transladar a figura');
              }
              if (verificaTransformation === 11) {
                lines.push('Transladando triângulo \n Clique sobre o ponto onde deseja transladar a figura');
              }
              if (verificaTransformation === 12) {
                lines.push('Transladando círculo \n Clique sobre o ponto onde deseja transladar a figura');
              }
              if (verificaTransformation === 13) {
                lines.push('Transladando reta \n Clique sobre o ponto onde deseja transladar a figura');
              }
              if (verificaTransformation === 14) {
                lines.push('Alterando escala de quadrado/retângulo \n Clique sobre o ponto onde deseja realizar a escala');
              }
              if (verificaTransformation === 15) {
                lines.push('Alterando escala de triângulo \n Clique sobre o ponto onde deseja realizar a escala');
              }
              if (verificaTransformation === 16) {
                lines.push('Alterando escala de círculo \n Clique sobre o ponto onde deseja realizar a escala');
              }
              if (verificaTransformation === 18) {
                lines.push('Alterando escala de reta \n Clique sobre o ponto onde deseja realizar a escala');
              }
              if (verificaTransformation === 19) {
                lines.push('Clique sobre o ponto que deseja dar zoom');
              }
              if (verificaTransformation === 20) {
                lines.push('Clique sobre a figura que deseja apagar');
              }
        }
      text.text(lines.join('\n'));
      layer.batchDraw();
    }

    //A variável pos define o ponto onde houve o primeiro clique na tela, a váriavel ponto2 define o ponto onde houve o segundo
    // clique na tela 
    var pos, ponto2;

    //Variáveis que definem quando uma das formas está ativa para ser desenhada
    var squareActive = false, circleActive = false, lineActive = false, triangleActive = false, RecActive = false;
    var i = 0;

// Função clear, que exclui da camada todas as formas desenhadas
$(function () {
    $("#clear").click(function () {
      formaAntiga.push(layer.clone());
      squareActive = false, circleActive = true, lineActive = false, triangleActive = false, RecActive = false;
      layer.destroy();
      layer = new Konva.Layer();
      stage.add(layer);
      layer.add(arrow1);
      layer.add(arrow2);
      layer.add(text);
      layer.add(yC);
      layer.add(xC);
      layer.draw();
      formaAtual.push(layer.clone());
    });
});

//As demais funções abaixo ouvem quando um dos botões de formas é clicado e seta a forma escolhida para verdadeiro
$(function () {
    $("#circulo").click(function () {
      verificaTransformation = 0;
      squareActive = false, circleActive = true, lineActive = false, triangleActive = false, RecActive = false;
    });
});


$(function () {
    $("#quadrado").click(function () {
      verificaTransformation = 0;
      squareActive = true, circleActive = false, lineActive = false, triangleActive = false, RecActive = false;
    });
});

$(function () {
    $("#retangulo").click(function () {
      verificaTransformation = 0;
      squareActive = false, circleActive = false, lineActive = false, triangleActive = false, RecActive = true;
    });
});

$(function () {
    $("#linha").click(function () {
      verificaTransformation = 0;
      squareActive = false, circleActive = false, lineActive = true, triangleActive = false, RecActive = false;
    });
});


$(function () {
    $("#triangulo").click(function () {
      verificaTransformation = 0;
      squareActive = false, circleActive = false, lineActive = false, triangleActive = true, RecActive = false;
    });
});

//Variável que verifica o tipo de transformação: 0 - nada, 1 - seleção, 2 para translação, 3 para rotação, 4 para escala,
// 6 para rotação de quadrado e retangulo, 7 para rotação de reta, 8 para rotação de círculo, 9 para rotação de triangulo,
// 10 para translação de quadrado e retangulo, 11 para translação de triangulo, 12 para translação de circulo, 13 para translação de reta
// 14 para escala de quadrado e retangulo, 15 para escala de triangulo, 16 para escala de circulo, 18 para escala de reta,
// 19 para zoom e 20 para apagar
var verificaTransformation = 0;
var selecoes = [];

//função que ouve quando uma forma é clicada
function transform(){
      stage.on('click', function (e) {
      if (verificaTransformation === 1) {
      
      // se é clicado em uma área vazia, as formas são descelecionadas
      if (e.target === stage) {

        var circles = stage.find('.circle');
        var squares = stage.find('.square');
        var lines = stage.find('.line');
        var rectangles = stage.find('.rectangle');
        var triangles = stage.find('.triangle');

        circles.each(function(shape) {
              shape.stroke('black');
              layer.draw(); 
        });

        squares.each(function(shape) {
              shape.stroke('black');
              layer.draw();          
        });

        lines.each(function(shape) {
              shape.stroke('black');
              layer.draw();           
        });

        rectangles.each(function(shape) {
              shape.stroke('black');
              layer.draw();           
        });

        triangles.each(function(shape) {
              shape.stroke('black');
              layer.draw();           
        });

        return;
      }
      
      // se alguma das formas de desenho possíveis são clicadas, estas são selecionadas (ficam vermelhas)
      if (e.target.hasName('triangle') || e.target.hasName('circle') || e.target.hasName('square') || e.target.hasName('rectangle') || e.target.hasName('line')) {

        e.target.stroke('red');
        layer.draw();
        return;
      }
    }
      
    });
}

//Função que permite selecionar apenas uma opção ao escolher os pontos onde deseja-se realizar a transformação.
$(function () {
  $('.sev_check').click(function(e) {
    $('.sev_check').not(this).prop('checked', false);
  });
});


// Função para realizar as transformações apropriadas na forma apropriada
stage.on('click', function (e) {
  if (e.target === stage || e.target.hasName('square') || e.target.hasName('rectangle') || e.target.hasName('triangle') || e.target.hasName('circle') || e.target.hasName('line')) {
    var posClicked = stage.getPointerPosition();
    // realiza a rotação de quadrado e retângulo
    if (verificaTransformation === 6) {
      const mObj = math.matrix([[pontos[0], pontos[2], pontos[4], pontos[6]], [pontos[1], pontos[3], pontos[5], pontos[7]], [1, 1, 1, 1]]);
      const mT = math.matrix([[1, 0, posClicked.x], [0, 1, posClicked.y], [0, 0, 1]]);
      const rT = math.matrix([[Math.cos(grau * Math.PI / 180.0), -Math.sin(grau * Math.PI / 180.0), 0], [Math.sin(grau * Math.PI / 180.0), Math.cos(grau * Math.PI / 180.0), 0], [0, 0, 1]]);
      const mTNeg = math.matrix([[1, 0, -posClicked.x], [0, 1, -posClicked.y], [0, 0, 1]]);
      const matrix1 = math.multiply(mT, rT);
      const matrix2 = math.multiply(matrix1, mTNeg);
      const matrix3 = math.multiply(matrix2, mObj);
      var max = matrix3.valueOf();
      shapeForTransformation.points([max[0][0], max[1][0], max[0][1], max[1][1], max[0][2], max[1][2], max[0][3], max[1][3]]);
      shapeForTransformation.stroke('black');
      stage.draw();
      formaAtual.push(layer.clone());
      verificaTransformation = 0;
    }

    // realiza a rotação de reta
    if (verificaTransformation === 7) {
      const mObj = math.matrix([[pontos[0], pontos[2]], [pontos[1], pontos[3]], [1, 1]]);
      const mT = math.matrix([[1, 0, posClicked.x], [0, 1, posClicked.y], [0, 0, 1]]);
      const rT = math.matrix([[Math.cos(grau * Math.PI / 180.0), -Math.sin(grau * Math.PI / 180.0), 0], [Math.sin(grau * Math.PI / 180.0), Math.cos(grau * Math.PI / 180.0), 0], [0, 0, 1]]);
      const mTNeg = math.matrix([[1, 0, -posClicked.x], [0, 1, -posClicked.y], [0, 0, 1]]);
      const matrix1 = math.multiply(mT, rT);
      const matrix2 = math.multiply(matrix1, mTNeg);
      const matrix3 = math.multiply(matrix2, mObj);
      var max = matrix3.valueOf();
      shapeForTransformation.points([max[0][0], max[1][0], max[0][1], max[1][1]]);
      shapeForTransformation.stroke('black');
      stage.draw();
      formaAtual.push(layer.clone());
      verificaTransformation = 0;
    }

    // realiza a rotação de círculo
    if (verificaTransformation === 8) {
      const mObj = math.matrix([[pontos[0]], [pontos[1]], [1]]);
      const mT = math.matrix([[1, 0, posClicked.x], [0, 1, posClicked.y], [0, 0, 1]]);
      const rT = math.matrix([[Math.cos(grau * Math.PI / 180.0), -Math.sin(grau * Math.PI / 180.0), 0], [Math.sin(grau * Math.PI / 180.0), Math.cos(grau * Math.PI / 180.0), 0], [0, 0, 1]]);
      const mTNeg = math.matrix([[1, 0, -posClicked.x], [0, 1, -posClicked.y], [0, 0, 1]]);
      const matrix1 = math.multiply(mT, rT);
      const matrix2 = math.multiply(matrix1, mTNeg);
      const matrix3 = math.multiply(matrix2, mObj);
      var max = matrix3.valueOf();
      shapeForTransformation.x(max[0][0]);
      shapeForTransformation.y(max[1][0]);
      shapeForTransformation.stroke('black');
      stage.draw();
      formaAtual.push(layer.clone());
      verificaTransformation = 0;
    }

    // realiza a rotação de triângulo
    if (verificaTransformation === 9) {
      const mObj = math.matrix([[pontos[0], pontos[2], pontos[4]], [pontos[1], pontos[3], pontos[5]], [1, 1, 1]]);
      const mT = math.matrix([[1, 0, posClicked.x], [0, 1, posClicked.y], [0, 0, 1]]);
      const rT = math.matrix([[Math.cos(grau * Math.PI / 180.0), -Math.sin(grau * Math.PI / 180.0), 0], [Math.sin(grau * Math.PI / 180.0), Math.cos(grau * Math.PI / 180.0), 0], [0, 0, 1]]);
      const mTNeg = math.matrix([[1, 0, -posClicked.x], [0, 1, -posClicked.y], [0, 0, 1]]);
      const matrix1 = math.multiply(mT, rT);
      const matrix2 = math.multiply(matrix1, mTNeg);
      const matrix3 = math.multiply(matrix2, mObj);
      var max = matrix3.valueOf();
      shapeForTransformation.points([max[0][0], max[1][0], max[0][1], max[1][1], max[0][2], max[1][2]]);
      shapeForTransformation.stroke('black');
      stage.draw();
      formaAtual.push(layer.clone());
      verificaTransformation = 0;
    }

    // realiza a translação de quadrado e retângulo
    if (verificaTransformation === 10) {
      /*var px1, py1;
      if (pontos[0] > pontos[4]) {
        px1 = pontos[0]/2;
        console.log(pontos[0]);
        console.log(px1 + " " + pontos[0]);
      }else{
        px1 = pontos[4]/2;
        console.log(pontos[4]);
        console.log(px1+ " " + pontos[4]);
      }
      if (pontos[1] > pontos[5]) {
        py1 = pontos[1]/2;
        console.log(pontos[1]);
        console.log(py1 + " " + pontos[1]);
      }else{
        py1 = pontos[5]/2;
        console.log(pontos[5]);
        console.log(py1 + " " + pontos[5]);
      }*/
      
      dx = posClicked.x - pontos[0];
      dy = posClicked.y - pontos[1];
      const mObj = math.matrix([[pontos[0], pontos[2], pontos[4], pontos[6]], [pontos[1], pontos[3], pontos[5], pontos[7]], [1, 1, 1, 1]]);
      const mT = math.matrix([[1, 0, dx], [0, 1, dy], [0, 0, 1]]);
      console.log(mT);
      const matrix1 = math.multiply(mT, mObj);
      var max = matrix1.valueOf();
      shapeForTransformation.points([max[0][0], max[1][0], max[0][1], max[1][1], max[0][2], max[1][2], max[0][3], max[1][3]]);
      shapeForTransformation.stroke('black');
      stage.draw();
      formaAtual.push(layer.clone());
      verificaTransformation = 0;          
    }

    // realiza a translação de triângulo
    if (verificaTransformation === 11) {
      dx = posClicked.x - pontos[0];
      dy = posClicked.y - pontos[1];
      const mObj = math.matrix([[pontos[0], pontos[2], pontos[4]], [pontos[1], pontos[3], pontos[5]], [1, 1, 1]]);
      const mT = math.matrix([[1, 0, dx], [0, 1, dy], [0, 0, 1]]);
      console.log(mT);
      const matrix1 = math.multiply(mT, mObj);
      var max = matrix1.valueOf();
      shapeForTransformation.points([max[0][0], max[1][0], max[0][1], max[1][1], max[0][2], max[1][2]]);
      shapeForTransformation.stroke('black');
      stage.draw();
      formaAtual.push(layer.clone());
      verificaTransformation = 0;          
    }

    // realiza a translação de círculo
    if (verificaTransformation === 12) {
      dx = posClicked.x - pontos[0];
      dy = posClicked.y - pontos[1];
      const mObj = math.matrix([[pontos[0]], [pontos[1]], [1]]);
      const mT = math.matrix([[1, 0, dx], [0, 1, dy], [0, 0, 1]]);
      console.log(mT);
      const matrix1 = math.multiply(mT, mObj);
      var max = matrix1.valueOf();
      shapeForTransformation.x(max[0][0]);
      shapeForTransformation.y(max[1][0]);
      shapeForTransformation.stroke('black');
      stage.draw();
      formaAtual.push(layer.clone());
      verificaTransformation = 0;          
    }

    // realiza a translação de linha
    if (verificaTransformation === 13) {
      dx = posClicked.x - pontos[0];
      dy = posClicked.y - pontos[1];
      const mObj = math.matrix([[pontos[0], pontos[2]], [pontos[1], pontos[3]], [1, 1]]);
      const mT = math.matrix([[1, 0, dx], [0, 1, dy], [0, 0, 1]]);
      console.log(mT);
      const matrix1 = math.multiply(mT, mObj);
      var max = matrix1.valueOf();
      shapeForTransformation.points([max[0][0], max[1][0], max[0][1], max[1][1]]);
      shapeForTransformation.stroke('black');
      stage.draw();
      formaAtual.push(layer.clone());
      verificaTransformation = 0;          
    }

    // realiza a escala de quadrado e retângulo
    if (verificaTransformation === 14) {
      const mObj = math.matrix([[pontos[0], pontos[2], pontos[4], pontos[6]], [pontos[1], pontos[3], pontos[5], pontos[7]], [1, 1, 1, 1]]);
      const mT = math.matrix([[1, 0, posClicked.x], [0, 1, posClicked.y], [0, 0, 1]]);
      const mTNeg = math.matrix([[1, 0, -posClicked.x], [0, 1, -posClicked.y], [0, 0, 1]]);
      const mS = math.matrix([[parseFloat(p1, 10), 0, 0], [0, parseFloat(p2, 10), 0], [0, 0, 1]]);
      console.log(p1 + " " + p2);
      const matrix1 = math.multiply(mT, mS);
      const matrix2 = math.multiply(matrix1, mTNeg);
      const matrix3 = math.multiply(matrix2, mObj);
      var max = matrix3.valueOf();
      shapeForTransformation.points([max[0][0], max[1][0], max[0][1], max[1][1], max[0][2], max[1][2], max[0][3], max[1][3]]);
      shapeForTransformation.stroke('black');
      stage.draw();
      formaAtual.push(layer.clone());
      verificaTransformation = 0;
    }

    // realiza a escala de triângulo
    if (verificaTransformation === 15) {
      const mObj = math.matrix([[pontos[0], pontos[2], pontos[4]], [pontos[1], pontos[3], pontos[5]], [1, 1, 1]]);
      const mT = math.matrix([[1, 0, posClicked.x], [0, 1, posClicked.y], [0, 0, 1]]);
      const mTNeg = math.matrix([[1, 0, -posClicked.x], [0, 1, -posClicked.y], [0, 0, 1]]);
      const mS = math.matrix([[parseFloat(p1, 10), 0, 0], [0, parseFloat(p2, 10), 0], [0, 0, 1]]);
      console.log(p1 + " " + p2);
      const matrix1 = math.multiply(mT, mS);
      const matrix2 = math.multiply(matrix1, mTNeg);
      const matrix3 = math.multiply(matrix2, mObj);
      var max = matrix3.valueOf();
      shapeForTransformation.points([max[0][0], max[1][0], max[0][1], max[1][1], max[0][2], max[1][2]]);
      shapeForTransformation.stroke('black');
      stage.draw();
      formaAtual.push(layer.clone());
      verificaTransformation = 0;
    }

    // realiza a escala de círculo
    if (verificaTransformation === 16) {
      var rad1 = shapeForTransformation.radius().x*parseFloat(p1, 10);
      var rad2 = shapeForTransformation.radius().y*parseFloat(p2, 10);
      const mObj = math.matrix([[pontos[0]], [pontos[1]], [1]]);
      const mT = math.matrix([[1, 0, posClicked.x], [0, 1, posClicked.y], [0, 0, 1]]);
      const mTNeg = math.matrix([[1, 0, -posClicked.x], [0, 1, -posClicked.y], [0, 0, 1]]);
      const mS = math.matrix([[parseFloat(p1, 10), 0, 0], [0, parseFloat(p2, 10), 0], [0, 0, 1]]);
      console.log(p1 + " " + p2);
      const matrix1 = math.multiply(mT, mS);
      const matrix2 = math.multiply(matrix1, mTNeg);
      const matrix3 = math.multiply(matrix2, mObj);
      var max = matrix3.valueOf();
      shapeForTransformation.x(max[0][0]);
      shapeForTransformation.y(max[1][0]);
      shapeForTransformation.radius({x: rad1, y: rad2});
      shapeForTransformation.stroke('black');
      stage.draw();
      formaAtual.push(layer.clone());
      verificaTransformation = 0;
    }

    // realiza a escala de reta
    if (verificaTransformation === 18) {
      const mObj = math.matrix([[pontos[0], pontos[2]], [pontos[1], pontos[3]], [1, 1]]);
      const mT = math.matrix([[1, 0, posClicked.x], [0, 1, posClicked.y], [0, 0, 1]]);
      const mTNeg = math.matrix([[1, 0, -posClicked.x], [0, 1, -posClicked.y], [0, 0, 1]]);
      const mS = math.matrix([[parseFloat(p1, 10), 0, 0], [0, parseFloat(p2, 10), 0], [0, 0, 1]]);
      const matrix1 = math.multiply(mT, mS);
      const matrix2 = math.multiply(matrix1, mTNeg);
      const matrix3 = math.multiply(matrix2, mObj);
      var max = matrix3.valueOf();
      shapeForTransformation.points([max[0][0], max[1][0], max[0][1], max[1][1]]);
      shapeForTransformation.stroke('black');
      stage.draw();
      formaAtual.push(layer.clone());
      verificaTransformation = 0;
    }

    // dá zoom
    if (verificaTransformation === 19) {
      formaAntiga.push(layer.clone());
      var circles = stage.find('.circle');
      var squares = stage.find('.square');
      var lines = stage.find('.line');
      var rectangles = stage.find('.rectangle');
      var triangles = stage.find('.triangle');

      const mT = math.matrix([[1, 0, posClicked.x], [0, 1, posClicked.y], [0, 0, 1]]);
      const mTNeg = math.matrix([[1, 0, -posClicked.x], [0, 1, -posClicked.y], [0, 0, 1]]);
      const mS = math.matrix([[grau, 0, 0], [0, grau, 0], [0, 0, 1]]);
      const matrix1 = math.multiply(mT, mS);
      const SclTr = math.multiply(matrix1, mTNeg);

      squares.each(function(shape) {
        const mObj = math.matrix([[shape.points()[0], shape.points()[2], shape.points()[4], shape.points()[6]], [shape.points()[1], shape.points()[3], shape.points()[5], shape.points()[7]], [1, 1, 1, 1]]);
        const matrix3 = math.multiply(SclTr, mObj);
        console.log(matrix3);
        var max = matrix3.valueOf();

        shape.destroy();

        layer.add(new Konva.Line({
                points: [max[0][0], max[1][0], max[0][1], max[1][1], max[0][2], max[1][2], max[0][3], max[1][3]],
                fill: 'transparent',
                stroke: 'black',
                strokeWidth: 2,
                name: 'square',
                closed : true,
                draggable: false
            })
        );

        stage.draw();
      });

      rectangles.each(function(shape) {
        const mObj = math.matrix([[shape.points()[0], shape.points()[2], shape.points()[4], shape.points()[6]], [shape.points()[1], shape.points()[3], shape.points()[5], shape.points()[7]], [1, 1, 1, 1]]);

        const matrix3 = math.multiply(SclTr, mObj);
        console.log(matrix3);
        var max = matrix3.valueOf();

        shape.destroy();

        layer.add(new Konva.Line({
                points: [max[0][0], max[1][0], max[0][1], max[1][1], max[0][2], max[1][2], max[0][3], max[1][3]],
                fill: 'transparent',
                stroke: 'black',
                strokeWidth: 2,
                name: 'rectangle',
                closed : true,
                draggable: false
            })
        );

        stage.draw();
      });


      triangles.each(function(shape) {
        const mObj = math.matrix([[shape.points()[0], shape.points()[2], shape.points()[4]], [shape.points()[1], shape.points()[3], shape.points()[5]], [1, 1, 1]]);
        const matrix3 = math.multiply(SclTr, mObj);
        console.log(matrix3);
        var max = matrix3.valueOf();

        shape.destroy();

        layer.add(new Konva.Line({
                points: [max[0][0], max[1][0], max[0][1], max[1][1], max[0][2], max[1][2]],
                fill: 'transparent',
                stroke: 'black',
                strokeWidth: 2,
                name: 'triangle',
                closed : true,
                draggable: false
            })
        );

        stage.draw();
      });


      lines.each(function(shape) {
        const mObj = math.matrix([[shape.points()[0], shape.points()[2]], [shape.points()[1], shape.points()[3]], [1, 1]]);
        const matrix3 = math.multiply(SclTr, mObj);
        console.log(matrix3);
        var max = matrix3.valueOf();

        shape.destroy();

        layer.add(new Konva.Line({
                points: [max[0][0], max[1][0], max[0][1], max[1][1]],
                fill: 'transparent',
                stroke: 'black',
                strokeWidth: 2,
                name: 'line',
                closed : true,
                draggable: false
            })
        );

        stage.draw();
      });


      circles.each(function(shape) {
        const mObj = math.matrix([[shape.x()], [shape.y()], [1]]);
        const matrix3 = math.multiply(SclTr, mObj);
        var max = matrix3.valueOf();
        var rx = shape.radius().x;
        var ry = shape.radius().y;
        shape.destroy();

        layer.add(new Konva.Ellipse({
                x: max[0][0],
                y: max[1][0],
                fill: 'transparent',
                stroke: 'black',
                strokeWidth: 2,
                radius: {
                  x: grau * rx,
                  y: grau * ry
                },
                name: 'circle',
                draggable: false
        }));

        stage.draw();
      });
      formaAtual.push(layer.clone());
      stage.draw();
      verificaTransformation = 0;
    }

    //exclui objetos selecionados
    if (verificaTransformation === 20) {
      if (e.target !== stage) {
        formaAntiga.push(layer.clone());
        e.target.destroy();
        stage.draw();
        formaAtual.push(layer.clone());
      }
    }
  }
});

//------------------------------------------------------------------------------------
//ROTAÇÃO

// Seta as opções de desenho de formas como falsas quando o botão Rotação é clicado
$(function () {
  $("#rotacao").click(function() {
    verificaTransformation = 0;
    squareActive = false, circleActive = false, lineActive = false, triangleActive = false, RecActive = false;
    
  });
});

// Função que ouve quando o botão para aplicar a transformação de rotação é clicado, agurda que a figura a ser rotacionada seja clicada
$(function () {
    $("#rot_ok").click(function () {
      verificaTransformation = 3;
      squareActive = false, circleActive = false, lineActive = false, triangleActive = false, RecActive = false;
      grau = document.getElementById('grau').value;
      if (verificaTransformation === 3) {
        // Ouve o clique em uma forma
        stage.on('click', function (e) {
          //Se a forma clicada possuir o nome rectangle ou square, então o retângulo ou quadrado será rotacionado
          if ((e.target.hasName('rectangle') || e.target.hasName('square')) && verificaTransformation === 3) {
            //Obtém o grau a ser girado o retângulo ou quadrado
            grau = document.getElementById('grau').value;
            // Obtém todos os 4 pontos do retângulo ou quadrado
            pontos = e.target.points();
            // Obtém o retângulo ou quadrado
            shapeForTransformation = e.target;
            formaAntiga.push(layer.clone());
            //Deixa o contorno na cor vermelha
            shapeForTransformation.stroke('red');
            stage.draw();
            // Seta a variável com valor 6 para representar a rotação do retângulo ou quadrado
            verificaTransformation = 6;
            return;
          }

          //Se a forma clicada possuir o nome line, então a reta será rotacionada
          if (e.target.hasName('line') && verificaTransformation === 3) {
            //Obtém o grau a ser girada a reta
            grau = document.getElementById('grau').value;
            // Obtém todos os 2 pontos da reta
            pontos = e.target.points();
            // Obtém a reta
            shapeForTransformation = e.target;
            formaAntiga.push(layer.clone());
            //Deixa o contorno na cor vermelha
            shapeForTransformation.stroke('red');
            stage.draw();
            // Seta a variável com valor 7 para representar a rotação da reta
            verificaTransformation = 7;
            return;
          }

          //Se a forma clicada possuir o nome circle, então o círculo será rotacionado
          if (e.target.hasName('circle') && verificaTransformation === 3) {
            //Obtém o grau a ser girado o círculo
            grau = document.getElementById('grau').value;
            // Obtém os pontos do centro do círculo
            pontos = [];
            pontos[0] = e.target.x();
            pontos[1] = e.target.y();
            // Obtém o círculo
            shapeForTransformation = e.target;
            formaAntiga.push(layer.clone());
            //Deixa o contorno na cor vermelha
            shapeForTransformation.stroke('red');
            stage.draw();
            // Seta a variável com valor 8 para representar a rotação do círculo
            verificaTransformation = 8;
            return;
          }

          //Se a forma clicada possuir o nome triangle, então o triângulo será rotacionado
          if (e.target.hasName('triangle') && verificaTransformation === 3) {
            //Obtém o grau a ser girado o triângulo
            grau = document.getElementById('grau').value;
            // Obtém todos os 3 pontos do triângulo
            pontos = e.target.points();
            // Obtém o triângulo
            shapeForTransformation = e.target;
            formaAntiga.push(layer.clone());
            //Deixa o contorno na cor vermelha
            shapeForTransformation.stroke('red');
            stage.draw();
            // Seta a variável com valor 9 para representar a rotação do triângulo
            verificaTransformation = 9;
            return;
          }
        });
      }
    });
});

//-------------------------------------------------------------------------------------------------------------------
// TRANSLAÇÃO

// Função que ouve quando o botão para aplicar a transformação de translação é clicado, agurda que a figura a ser transladada seja clicada
$(function () {
    $("#translacao").click(function () {
      verificaTransformation = 2;
      squareActive = false, circleActive = false, lineActive = false, triangleActive = false, RecActive = false;
      

      if (verificaTransformation === 2) {
        stage.on('click', function (e) {
          if ((e.target.hasName('rectangle') || e.target.hasName('square')) && verificaTransformation === 2) {
            // Obtém todos os 4 pontos do retângulo ou quadrado
            pontos = e.target.points();

            // Obtém o retângulo ou quadrado
            shapeForTransformation = e.target;
            formaAntiga.push(layer.clone());
            //Deixa o contorno na cor vermelha
            shapeForTransformation.stroke('red');
            stage.draw();
            // Seta a variável com valor 10 para representar a translação do retângulo ou quadrado
            verificaTransformation = 10;
            return;
          }

          if (e.target.hasName('triangle') && verificaTransformation === 2) {
            // Obtém todos os 3 pontos do triângulo
            pontos = e.target.points();

            // Obtém o triângulo
            shapeForTransformation = e.target;
            formaAntiga.push(layer.clone());
            //Deixa o contorno na cor vermelha
            shapeForTransformation.stroke('red');
            stage.draw();
            // Seta a variável com valor 11 para representar a translação do triângulo
            verificaTransformation = 11;
            return;
          }


          if (e.target.hasName('circle') && verificaTransformation === 2) {
            // Obtém todos o ponto do centro do círculo
            pontos = [];
            pontos[0] = e.target.x();
            pontos[1] = e.target.y();

            // Obtém o triângulo
            shapeForTransformation = e.target;
            formaAntiga.push(layer.clone());
            //Deixa o contorno na cor vermelha
            shapeForTransformation.stroke('red');
            stage.draw();
            // Seta a variável com valor 12 para representar a translação do círculo
            verificaTransformation = 12;
            return;
          }


          if (e.target.hasName('line') && verificaTransformation === 2) {
            // Obtém todos os 2 pontos da reta
            pontos = e.target.points();

            // Obtém a reta
            shapeForTransformation = e.target;
            formaAntiga.push(layer.clone());
            //Deixa o contorno na cor vermelha
            shapeForTransformation.stroke('red');
            stage.draw();
            // Seta a variável com valor 13 para representar a translação da reta
            verificaTransformation = 13;
            return;
          }

        });
      }
      });
    });

//--------------------------------------------------------------------------------------------------------------
//ESCALA
$(function () {
    $("#escala").click(function () {
      verificaTransformation = 0;
      squareActive = false, circleActive = false, lineActive = false, triangleActive = false, RecActive = false;
      
    });
});


$(function () {
    $("#escala_ok").click(function () {
      verificaTransformation = 4;
      squareActive = false, circleActive = false, lineActive = false, triangleActive = false, RecActive = false;
      
      p1 = document.getElementById('scaleX').value;
      p2 = document.getElementById('scaleY').value;
      if (verificaTransformation === 4) {
        stage.on('click', function (e) {
          if ((e.target.hasName('rectangle') || e.target.hasName('square')) && verificaTransformation === 4) {
            //Obtém os valores de escala
            p1 = document.getElementById('scaleX').value;
            p2 = document.getElementById('scaleY').value;
            // Obtém todos os 4 pontos do retângulo ou quadrado
            pontos = e.target.points();

            // Obtém o retângulo ou quadrado
            shapeForTransformation = e.target;
            formaAntiga.push(layer.clone());
            //Deixa o contorno na cor vermelha
            shapeForTransformation.stroke('red');
            stage.draw();
            // Seta a variável com valor 14 para representar a escala do retângulo ou quadrado
            verificaTransformation = 14;
            return;
          }

          if (e.target.hasName('triangle') && verificaTransformation === 4) {
            //Obtém os valores de escala
            p1 = document.getElementById('scaleX').value;
            p2 = document.getElementById('scaleY').value;
            // Obtém todos os 3 pontos do triângulo
            pontos = e.target.points();

            // Obtém o triângulo
            shapeForTransformation = e.target;
            formaAntiga.push(layer.clone());
            //Deixa o contorno na cor vermelha
            shapeForTransformation.stroke('red');
            stage.draw();
            // Seta a variável com valor 15 para representar a escala do triângulo
            verificaTransformation = 15;
            return;
          }

          if (e.target.hasName('circle') && verificaTransformation === 4) {
            //Obtém os valores de escala
            p1 = document.getElementById('scaleX').value;
            p2 = document.getElementById('scaleY').value;
            // Obtém todos os pontos do centro do círculo
            pontos = [];
            pontos[0] = e.target.x();
            pontos[1] = e.target.y();

            // Obtém o círculo
            shapeForTransformation = e.target;
            formaAntiga.push(layer.clone());
            //Deixa o contorno na cor vermelha
            shapeForTransformation.stroke('red');
            stage.draw();
            // Seta a variável com valor 16 para representar a escala do círculo
            verificaTransformation = 16;
            return;
          }


          if (e.target.hasName('line') && verificaTransformation === 4) {
            //Obtém os valores de escala
            p1 = document.getElementById('scaleX').value;
            p2 = document.getElementById('scaleY').value;
            // Obtém todos os 2 pontos da reta
            pontos = e.target.points();

            // Obtém o triângulo
            shapeForTransformation = e.target;
            formaAntiga.push(layer.clone());
            //Deixa o contorno na cor vermelha
            shapeForTransformation.stroke('red');
            stage.draw();
            // Seta a variável com valor 18 para representar a escala da reta
            verificaTransformation = 18;
            return;
          }
        });
      }
      });
    });


//----------------------------------------------------------------------------------------------------------------------
//SELECT

// função para selecionar as formas. A formas ficam com traçado vermelho quando clicadas e preto quando clicado no fundo
$(function () {
    $("#select").click(function () {
      verificaTransformation = 1;
      squareActive = false, circleActive = false, lineActive = false, triangleActive = false, RecActive = false;
      transform();
      });
    });

//----------------------------------------------------------------------------------------------------------------
// DELETE
$(function () {
    $("#delete").click(function () {
      verificaTransformation = 20;
      squareActive = false, circleActive = false, lineActive = false, triangleActive = false, RecActive = false;
      });
    });

//----------------------------------------------------------------------------------------------------------------
// DESFAZER
$(function () {
    $("#undo").click(function () {
      if (formaAtual.length !== formaAntiga.length) {
        formaAntiga = [];
        formaAtual = [];
        return;
      }
      if (formaAtual.length !== 0) {
        if (formaAtual[formaAtual.length-1] instanceof Konva.Layer) {
          layer.destroy();
          formaAtual.splice(formaAtual.length-1, 1);
        }else{
          formaAtual[formaAtual.length-1].destroy();
          formaAtual.splice(formaAtual.length-1, 1);
        } 
      }
      if (formaAntiga.length !== 0) {
        if (formaAntiga[formaAntiga.length-1] instanceof Konva.Layer) {
          layer = formaAntiga[formaAntiga.length-1].clone();
          stage.add(layer);
          layer.find('.texto').destroy();
          layer.add(text);
          formaAntiga.splice(formaAntiga.length-1, 1);
        }else{
          layer.add(formaAntiga[formaAntiga.length-1]);
          formaAntiga.splice(formaAntiga.length-1, 1);
        }
        
      }
      stage.draw();
      return;
      });
    });


//----------------------------------------------------------------------------------------------------------------
// ZOOM
$(function () {
    $("#zoom_n").click(function () {
      verificaTransformation = 0;
      squareActive = false, circleActive = false, lineActive = false, triangleActive = false, RecActive = false;
      });
});

$(function () {
  $("#zoomN_ok").click(function () {
    grau = document.getElementById('zN').value;
    verificaTransformation = 19;
    return;
  })
});

//----------------------------------------------------------------------------------------------------------------
// ZOOM EXTEND
$(function () {
    $("#zoom").click(function () {
      verificaTransformation = 0;
      squareActive = false, circleActive = false, lineActive = false, triangleActive = false, RecActive = false;
      });
});


$(function () {
    $("#zoom_ok").click(function () {
      formaAntiga.push(layer.clone());
      var circles = stage.find('.circle');
      var squares = stage.find('.square');
      var lines = stage.find('.line');
      var rectangles = stage.find('.rectangle');
      var triangles = stage.find('.triangle');

      var xMin = Number.MAX_VALUE, yMin = Number.MAX_VALUE, xMax = Number.MIN_VALUE, yMax = Number.MIN_VALUE;

      circles.each(function(shape) {
        var radx = shape.radius().x;
        var rady = shape.radius().y;
        var x = shape.x();
        var y = shape.y();
        var minRad = x - radx;
        var maxRad = x + radx;
        if (minRad <= xMin) {
          xMin = minRad;
        }
        if (maxRad > xMax) {
          xMax = maxRad;
        }
        var minRady = y - rady;
        var maxRady = y + rady;
        if (minRady <= yMin) {
          yMin = minRady;
        }
        if (maxRady > yMax) {
          yMax = maxRady;
        }
      });

      squares.each(function(shape) {
        for (var i = 0; i < shape.points().length; i = i+2) {
          if (shape.points()[i] <= xMin) {
            xMin = shape.points()[i];
          }
        }

        for (var i = 1; i < shape.points().length; i = i+2) {
          if (shape.points()[i] <= yMin) {
            yMin = shape.points()[i];
          }
        }

        for (var i = 0; i < shape.points().length; i = i+2) {
          if (shape.points()[i] > xMax) {
            xMax = shape.points()[i];
          }
        }

        for (var i = 1; i < shape.points().length; i = i+2) {
          if (shape.points()[i] > yMax) {
            yMax = shape.points()[i];
          }
        }             
      });
      

      lines.each(function(shape) {
        for (var i = 0; i < shape.points().length; i = i+2) {
          if (shape.points()[i] <= xMin) {
            xMin = shape.points()[i];
          }
        }

        for (var i = 1; i < shape.points().length; i = i+2) {
          if (shape.points()[i] <= yMin) {
            yMin = shape.points()[i];
          }
        }

        for (var i = 0; i < shape.points().length; i = i+2) {
          if (shape.points()[i] > xMax) {
            xMax = shape.points()[i];
          }
        }

        for (var i = 1; i < shape.points().length; i = i+2) {
          if (shape.points()[i] > yMax) {
            yMax = shape.points()[i];
          }
        }          
      });

      rectangles.each(function(shape) {
        for (var i = 0; i < shape.points().length; i = i+2) {
          if (shape.points()[i] <= xMin) {
            xMin = shape.points()[i];
          }
        }

        for (var i = 1; i < shape.points().length; i = i+2) {
          if (shape.points()[i] <= yMin) {
            yMin = shape.points()[i];
          }
        }

        for (var i = 0; i < shape.points().length; i = i+2) {
          if (shape.points()[i] > xMax) {
            xMax = shape.points()[i];
          }
        }

        for (var i = 1; i < shape.points().length; i = i+2) {
          if (shape.points()[i] > yMax) {
            yMax = shape.points()[i];
          }
        }           
      });

      triangles.each(function(shape) {
        for (var i = 0; i < shape.points().length; i = i+2) {
          if (shape.points()[i] <= xMin) {
            xMin = shape.points()[i];
          }
        }

        for (var i = 1; i < shape.points().length; i = i+2) {
          if (shape.points()[i] <= yMin) {
            yMin = shape.points()[i];
          }
        }

        for (var i = 0; i < shape.points().length; i = i+2) {
          if (shape.points()[i] > xMax) {
            xMax = shape.points()[i];
          }
        }

        for (var i = 1; i < shape.points().length; i = i+2) {
          if (shape.points()[i] > yMax) {
            yMax = shape.points()[i];
          }
        }           
      });

      console.log("Xmin "+xMin);
      console.log("Xmax "+xMax);
      console.log("Ymin "+yMin);
      console.log("Ymax "+yMax);

      /*if (xMin < 0) {
        xMin = 0;
      }

      if (yMin < 0) {
        yMin = 0;
      }

      if (xMax > width) {
        xMax = width;
      }

      if (yMax > height) {
        yMax = height;
      }*/

      var uMax = stage.width();
      var uMin = 0;
      var vMax = stage.height();
      var vMin = 0;

      var Sx = (uMax-uMin)/(xMax-xMin);
      var Sy = (vMax-vMin)/(yMax-yMin);

      var Rw = (xMax-xMin)/(yMax-yMin);
      var Rv = (uMax-uMin)/(vMax-vMin);

      var vMaxNovo = ((uMax-uMin)/Rw)+vMin;
      var uMaxNovo = Rw*(vMax-vMin)+uMin;

      var nU = uMax, nV = vMax;

      if (Rw > Rv) {
          vMax = vMaxNovo;
      }else{
        uMax = uMaxNovo;
      }

      Sx = (uMax-uMin)/(xMax-xMin);
      Sy = (vMax-vMin)/(yMax-yMin);

      const viewPort = math.matrix([[1, 0, uMin], [0, 1, vMin], [0, 0, 1]]);
      const scaleV = math.matrix([[Sx, 0, 0], [0, Sy, 0], [0, 0, 1]]);
      const transV = math.matrix([[1, 0, -xMin], [0, 1, -yMin], [0, 0, 1]]);

      const Tv = math.matrix([[1, 0, 0], [0, 1, (nV - vMaxNovo)/2], [0, 0, 1]]);
      const Th = math.matrix([[1, 0, (nU - uMaxNovo)/2], [0, 1, 0], [0, 0, 1]]);

      var vpScl = null, SclTr = null;
      if (Rw > Rv) {
        vpScl = math.multiply(Tv, scaleV);
        SclTr = math.multiply(vpScl, transV);
      }else{
        if (Rw < Rv) {
          vpScl = math.multiply(Th, scaleV);
          SclTr = math.multiply(vpScl, transV);
        }else{
          vpScl = math.multiply(viewPort, scaleV);
          SclTr = math.multiply(vpScl, transV);
        }
      }

      squares.each(function(shape) {
        const mObj = math.matrix([[shape.points()[0], shape.points()[2], shape.points()[4], shape.points()[6]], [shape.points()[1], shape.points()[3], shape.points()[5], shape.points()[7]], [1, 1, 1, 1]]);
        const matrix3 = math.multiply(SclTr, mObj);
        console.log(matrix3);
        var max = matrix3.valueOf();

        shape.destroy();

        layer.add(new Konva.Line({
                points: [max[0][0], max[1][0], max[0][1], max[1][1], max[0][2], max[1][2], max[0][3], max[1][3]],
                fill: 'transparent',
                stroke: 'black',
                strokeWidth: 2,
                name: 'square',
                closed : true,
                draggable: false
            })
        );

        stage.draw();
      });

      rectangles.each(function(shape) {
        const mObj = math.matrix([[shape.points()[0], shape.points()[2], shape.points()[4], shape.points()[6]], [shape.points()[1], shape.points()[3], shape.points()[5], shape.points()[7]], [1, 1, 1, 1]]);

        const matrix3 = math.multiply(SclTr, mObj);
        console.log(matrix3);
        var max = matrix3.valueOf();

        shape.destroy();

        layer.add(new Konva.Line({
                points: [max[0][0], max[1][0], max[0][1], max[1][1], max[0][2], max[1][2], max[0][3], max[1][3]],
                fill: 'transparent',
                stroke: 'black',
                strokeWidth: 2,
                name: 'rectangle',
                closed : true,
                draggable: false
            })
        );

        stage.draw();
      });


      triangles.each(function(shape) {
        const mObj = math.matrix([[shape.points()[0], shape.points()[2], shape.points()[4]], [shape.points()[1], shape.points()[3], shape.points()[5]], [1, 1, 1]]);
        const matrix3 = math.multiply(SclTr, mObj);
        console.log(matrix3);
        var max = matrix3.valueOf();

        shape.destroy();

        layer.add(new Konva.Line({
                points: [max[0][0], max[1][0], max[0][1], max[1][1], max[0][2], max[1][2]],
                fill: 'transparent',
                stroke: 'black',
                strokeWidth: 2,
                name: 'triangle',
                closed : true,
                draggable: false
            })
        );

        stage.draw();
      });


      lines.each(function(shape) {
        const mObj = math.matrix([[shape.points()[0], shape.points()[2]], [shape.points()[1], shape.points()[3]], [1, 1]]);
        const matrix3 = math.multiply(SclTr, mObj);
        console.log(matrix3);
        var max = matrix3.valueOf();

        shape.destroy();

        layer.add(new Konva.Line({
                points: [max[0][0], max[1][0], max[0][1], max[1][1]],
                fill: 'transparent',
                stroke: 'black',
                strokeWidth: 2,
                name: 'line',
                closed : true,
                draggable: false
            })
        );

        stage.draw();
      });


      circles.each(function(shape) {
        const mObj = math.matrix([[shape.x()], [shape.y()], [1]]);
        const matrix3 = math.multiply(SclTr, mObj);
        var max = matrix3.valueOf();
        var rx = shape.radius().x;
        var ry = shape.radius().y;
        shape.destroy();
        console.log('Escala ' + Sx + " " + Sy);
        layer.add(new Konva.Ellipse({
                x: max[0][0],
                y: max[1][0],
                fill: 'transparent',
                stroke: 'black',
                strokeWidth: 2,
                radius: {
                  x: Sx * rx,
                  y: Sy * ry
                },
                name: 'circle',
                draggable: false
        }));

        stage.draw();
      });

      formaAtual.push(layer.clone());

          });
    });


//---------------------------------------------------------------------------------------------------------------------
// CRIAÇÃO DE FORMAS
function clickSquare(X, Y){
layer.add(new Konva.Rect({
                x: X,
                y: Y,
                width: 5,
                height: 5,
                fill: 'red',
                name: 'aux',
                draggable: false
              }));
stage.draw();
console.log(X + ' ' + Y);
return;
}

var listLayer = [];
        
  stage.on('click', function () {

    if (squareActive) {
        if (i === 0) {
          pos = stage.getPointerPosition();
          formaAntiga.push(layer.clone());
          clickSquare(pos.x, pos.y);
          i = 1;
          console.log(pos);
        }else{
          ponto2 = stage.getPointerPosition();
          clickSquare(ponto2.x, ponto2.y);

          /*if (pos.x > ponto2.x) {
            if (pos.y < ponto2.y) {
              xPos = ponto2.x;
              yPos = pos.y;
            }else{
              xPos = ponto2.x;
              yPos = ponto2.y;
            }
          }else{
            if (pos.y > ponto2.y) {
              xPos = pos.x;
              yPos = ponto2.y;
            }else{
              xPos = pos.x;
              yPos = pos.y;
            }
          }*/
          i = 0;
          var distancia = 0;
          if (ponto2.y < pos.y) {
            distancia = -Math.abs(pos.x-ponto2.x);
          }else{
            distancia = Math.abs(pos.x-ponto2.x);
          }
          layer.add(new Konva.Line({
                points: [pos.x, pos.y, ponto2.x, pos.y, ponto2.x, (distancia+pos.y), pos.x, (distancia+pos.y)],
                fill: 'transparent',
                stroke: 'black',
                strokeWidth: 2,
                name: 'square',
                closed : true,
                draggable: false
              }));
          layer.draw();
          var auxes = layer.find('.aux');
          auxes.each(function(shape) {
                shape.destroy(); 
          });
          formaAtual.push(layer.clone());
          stage.draw();
        }
    }

    if (RecActive) {
        if (i === 0) {
          pos = stage.getPointerPosition();
          formaAntiga.push(layer.clone());
          clickSquare(pos.x, pos.y);
          i = 1;
          console.log(pos);
        }else{
          ponto2 = stage.getPointerPosition();
          clickSquare(ponto2.x, ponto2.y);
          var aux;
          i = 0;
          var altura = 0;
          if (ponto2.y < pos.y) {
            altura = -Math.abs(pos.y-ponto2.y);
          }else{
            altura = Math.abs(pos.y-ponto2.y);
          } 
          layer.add(new Konva.Line({
            points: [pos.x, pos.y, ponto2.x, pos.y, ponto2.x, (altura+pos.y), pos.x, (altura+pos.y)],
            fill: 'transparent',
            stroke: 'black',
            strokeWidth: 2,
            name: 'rectangle',
            closed : true,
            draggable: false
          }));
          layer.draw();

          var auxes = layer.find('.aux');
          auxes.each(function(shape) {
             shape.destroy(); 
          });
          formaAtual.push(layer.clone());
          stage.draw();
          }
    }

    if (circleActive) {
          if (i === 0) {
            pos = stage.getPointerPosition();
            formaAntiga.push(layer.clone());
            clickSquare(pos.x, pos.y);
            i = 1;
            console.log(pos);
          }else{
            ponto2 = stage.getPointerPosition();
            clickSquare(ponto2.x, ponto2.y);
            i = 0;
            console.log(ponto2);
            console.log(Math.sqrt(Math.pow(Math.abs(ponto2.x-pos.x), 2)-Math.pow(Math.abs(ponto2.y-pos.y), 2)));
              layer.add(new Konva.Ellipse({
                x: pos.x,
                y: pos.y,
                fill: 'transparent',
                stroke: 'black',
                strokeWidth: 2,
                radius: {
                  x: Math.sqrt(Math.pow(Math.abs(ponto2.x-pos.x), 2)+Math.pow(Math.abs(ponto2.y-pos.y), 2)),
                  y: Math.sqrt(Math.pow(Math.abs(ponto2.x-pos.x), 2)+Math.pow(Math.abs(ponto2.y-pos.y), 2))
                }, 
                name: 'circle',
                draggable: false
              }));
              layer.draw();

              var auxes = layer.find('.aux');
              auxes.each(function(shape) {
                    shape.destroy(); 
              });
              formaAtual.push(layer.clone());
              stage.draw();
          }
    }

    if (lineActive) {
      if (i === 0) {
            pos = stage.getPointerPosition();
            formaAntiga.push(layer.clone());
            clickSquare(pos.x, pos.y);
            i = 1;
            console.log(pos);
          }else{
            ponto2 = stage.getPointerPosition();
            clickSquare(ponto2.x, ponto2.y);
            i = 0;
            layer.add(new Konva.Line({
              points: [pos.x, pos.y, ponto2.x, ponto2.y],
              stroke: 'black',
              strokeWidth: 3,
              lineCap: 'round',
              lineJoin: 'round',
              name: 'line',
              draggable: false
            }));
            layer.draw();

            var auxes = layer.find('.aux');
              auxes.each(function(shape) {
                    shape.destroy(); 
              });
              formaAtual.push(layer.clone());
              stage.draw();
          }
    }

    if (triangleActive) {
      if (i === 0) {
            pos = stage.getPointerPosition();
            formaAntiga.push(layer.clone());
            console.log('Forma antiga');
            console.log(formaAntiga);
            clickSquare(pos.x, pos.y);
            i = 1;
            //console.log(pos);
          }else{
            if (i === 1) {
              ponto2 = stage.getPointerPosition();
              clickSquare(ponto2.x, ponto2.y);
              layer.draw();
              i = 2;
              console.log(ponto2);
            }else{
              var ponto3 = stage.getPointerPosition();
              clickSquare(ponto3.x, ponto3.y);
              i = 0;

            layer.add(new Konva.Line({
              points: [pos.x, pos.y, ponto2.x, ponto2.y, ponto3.x, ponto3.y],
              fill: 'transparent',
              stroke: 'black',
              strokeWidth: 2,
              closed : true,
              name: 'triangle',
              draggable: false
            }));
            stage.draw();
            
            var auxes = layer.find('.aux');
            auxes.each(function(shape) {
                  shape.destroy(); 
            });
            formaAtual.push(layer.clone());
            stage.draw();
            }
          }      
    }
  });