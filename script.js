    var width = window.innerWidth;
    var height = window.innerHeight;

    var stage = new Konva.Stage({
      container: 'container',
      width: width,
      height: height,
      name: 'stage'
    });

    var layer = new Konva.Layer();
    stage.add(layer);


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

    layer.add(arrow1);
    layer.add(arrow2);


    var text = new Konva.Text({
      x: 5,
      y: 100,
    });

    var yC = new Konva.Text({
      x: 20,
      y: 75,
    });

    var xC = new Konva.Text({
      x: 70,
      y: 20,
    });
    layer.add(text);
    layer.add(yC);
    layer.add(xC);
    yC.text('Y');
    xC.text('X');
    updateText();


    // create new transformer
   /* var tr = new Konva.Transformer();
    layer.add(tr);
    tr.attachTo(rect);
    layer.draw();

    rect.on('transformstart', function () {
      console.log('transform start');
    });

    rect.on('dragmove', function () {
      updateText();
    })
    rect.on('transform', function () {
      updateText();
      console.log('transform');
    });

    rect.on('transformend', function () {
      console.log('transform end');
    });*/

    stage.container().style.cursor = 'crosshair';

    stage.on('mousemove', function () {
      var mousePos = stage.getPointerPosition();
      updateText(mousePos.x, mousePos.y, stage);
    });

    function updateText(X, Y, title) {
      var lines = [];
      if (title === undefined) {
        console.log('Nada aqui');
        }else{
          if (title === stage) {
            lines = [
              'x: ' + X,
              'y: ' + Y,
              'width: ' + stage.width(),
              'height: ' + stage.height(),
              ];
            }else{
              lines = [
              title.name(),
              'x: ' + X,
              'y: ' + Y,
              'width: ' + title.width(),
              'height: ' + title.height(),
              'scaleX: ' + title.scaleX(),
              'scaleY: ' + title.scaleY(),
              'rotation: ' + title.rotation(),
              ];
            }
        }
      text.text(lines.join('\n'))
      layer.batchDraw();
    }

    var xPos, yPos, pos, ponto2;
    var squareActive = false, circleActive = false, lineActive = false, triangleActive = false, RecActive = false;
    var i = 0;

$(function () {
    $("#clear").click(function () {
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
    });
});


$(function () {
    $("#circulo").click(function () {
      squareActive = false, circleActive = true, lineActive = false, triangleActive = false, RecActive = false;
    });
});


$(function () {
    $("#quadrado").click(function () {
      squareActive = true, circleActive = false, lineActive = false, triangleActive = false, RecActive = false;
    });
});

$(function () {
    $("#retangulo").click(function () {
      squareActive = false, circleActive = false, lineActive = false, triangleActive = false, RecActive = true;
    });
});

$(function () {
    $("#linha").click(function () {
      squareActive = false, circleActive = false, lineActive = true, triangleActive = false, RecActive = false;
    });
});


$(function () {
    $("#triangulo").click(function () {
      squareActive = false, circleActive = false, lineActive = false, triangleActive = true, RecActive = false;
    });
});

var verificaTransformation = 0;
var selecoes = [];

function transform(){

    stage.on('dragmove', function (e) {
      if (verificaTransformation === 1) {
        if (e.target.hasName('triangle') || e.target.hasName('square') | e.target.hasName('circle') | e.target.hasName('line') | e.target.hasName('rectangle')) {
          var mousePos = stage.getPointerPosition();
          updateText(mousePos.x, mousePos.y, e.target);
        }
      }
      
    });


      stage.on('click', function (e) {
      if (verificaTransformation === 1) {
        // if click on empty area - remove all transformers
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
      
      if (e.target.hasName('triangle')) {

        e.target.stroke('red');
        layer.draw();
        console.log(e.target);
        return;
      }

      if (e.target.hasName('circle')) {


        e.target.stroke('red');
        layer.draw();

        return;
      }

      if (e.target.hasName('square')) {

        e.target.stroke('red');
        layer.draw();

        return;
      }

      if (e.target.hasName('rectangle')) {

        e.target.stroke('red');
        layer.draw();

        return;
      }

      if (e.target.hasName('line')) {

        e.target.stroke('red');
        layer.draw();

        return;
      }
    }
      
    });
}

function stopDraggable(){
  stage.find('Transformer').destroy();
  var circles = stage.find('.circle');
  var squares = stage.find('.square');
  var lines = stage.find('.line');
  var rectangles = stage.find('.rectangle');
  var triangles = stage.find('.triangle');

  console.log(squares);

  circles.each(function(shape) {
        shape.draggable(false); 
  });

  squares.each(function(shape) {
        //console.log(shape);
        shape.draggable(false);           
  });

  lines.each(function(shape) {
        //console.log(shape);
        shape.draggable(false);           
  });

  rectangles.each(function(shape) {
        //console.log(shape);
        shape.draggable(false);           
  });

  triangles.each(function(shape) {
        //console.log(shape);
        shape.draggable(false);           
  });
}

$(function () {
  $("#rotacao").click(function() {
    verificaTransformation = 0;
    squareActive = false, circleActive = false, lineActive = false, triangleActive = false, RecActive = false;
    stopDraggable();
  });
});

$(function () {
    $("#rot_ok").click(function () {
      verificaTransformation = 3;
      squareActive = false, circleActive = false, lineActive = false, triangleActive = false, RecActive = false;
      stopDraggable();
      var grau = document.getElementById('grau').value;
      if (verificaTransformation === 3) {
        stage.on('click', function (e) {
          if (e.target.hasName('rectangle') && verificaTransformation === 3) {
            grau = document.getElementById('grau').value;
            pontos = e.target.points();
            const mObj = math.matrix([[pontos[0], pontos[2], pontos[4], pontos[6]], [pontos[1], pontos[3], pontos[5], pontos[7]], [1, 1, 1, 1]]);
            const mT = math.matrix([[1, 0, pontos[0]], [0, 1, pontos[1]], [0, 0, 1]]);
            const rT = math. matrix([[Math.cos(grau * Math.PI / 180.0), -Math.sin(grau * Math.PI / 180.0), 0], [Math.sin(grau * Math.PI / 180.0), Math.cos(grau * Math.PI / 180.0), 0], [0, 0, 1]]);
            const mTNeg = math.matrix([[1, 0, -pontos[0]], [0, 1, -pontos[1]], [0, 0, 1]]);
            const matrix1 = math.multiply(mT, rT);
            const matrix2 = math.multiply(matrix1, mTNeg);
            const matrix3 = math.multiply(matrix2, mObj);
            var max = matrix3.valueOf();
            e.target.destroy();
            console.log("Girar quadrado " + max[0][0] + " " + max[1][0]);
            layer.add(new Konva.Line({
              points: [max[0][0], max[1][0], max[0][1], max[1][1], max[0][2], max[1][2], max[0][3], max[1][3]],
              fill: 'transparent',
              stroke: 'black',
              strokeWidth: 2,
              closed : true,
              name: 'rectangle',
              draggable: false,
            }));

            stage.draw();
            verificaTransformation = 0;
            return;
          }
          if (e.target.hasName('line') && verificaTransformation === 3) {
            grau = document.getElementById('grau').value;
            pontos = e.target.points();
            const mObj = math.matrix([[pontos[0], pontos[2]], [pontos[1], pontos[3]], [1, 1]]);
            const mT = math.matrix([[1, 0, pontos[0]], [0, 1, pontos[1]], [0, 0, 1]]);
            const rT = math. matrix([[Math.cos(grau * Math.PI / 180.0), -Math.sin(grau * Math.PI / 180.0), 0], [Math.sin(grau * Math.PI / 180.0), Math.cos(grau * Math.PI / 180.0), 0], [0, 0, 1]]);
            const mTNeg = math.matrix([[1, 0, -pontos[0]], [0, 1, -pontos[1]], [0, 0, 1]]);
            const matrix1 = math.multiply(mT, rT);
            const matrix2 = math.multiply(matrix1, mTNeg);
            const matrix3 = math.multiply(matrix2, mObj);
            var max = matrix3.valueOf();

            e.target.destroy();

            layer.add(new Konva.Line({
              points: [max[0][0], max[1][0], max[0][1], max[1][1]],
              stroke: 'black',
              strokeWidth: 3,
              lineCap: 'round',
              lineJoin: 'round',
              name: 'line',
              draggable: false
            }));

            stage.draw();
            verificaTransformation = 0;
            return;
          }

          if (e.target.hasName('circle') && verificaTransformation === 3) {
            grau = document.getElementById('grau').value;
            const mObj = math.matrix([[e.target.x()], [e.target.y()], [1]]);
            const mT = math.matrix([[1, 0, e.target.x()], [0, 1, e.target.y()], [0, 0, 1]]);
            const rT = math. matrix([[Math.cos(grau * Math.PI / 180.0), -Math.sin(grau * Math.PI / 180.0), 0], [Math.sin(grau * Math.PI / 180.0), Math.cos(grau * Math.PI / 180.0), 0], [0, 0, 1]]);
            const mTNeg = math.matrix([[1, 0, -e.target.x()], [0, 1, -e.target.y()], [0, 0, 1]]);
            //const matrix1 = math.multiply(mT, rT);
            //const matrix2 = math.multiply(matrix1, mTNeg);
            const matrix3 = math.multiply(rT, mObj);
            var rad = e.target.radius();
            var max = matrix3.valueOf();

            e.target.destroy();

            layer.add(new Konva.Circle({
              x: max[0][0],
              y: max[1][0],
              radius: rad,
              stroke: 'black',
              strokeWidth: 2,
              name: 'circle',
              draggable: false
            }));

            stage.draw();
            verificaTransformation = 0;
            return;
          }


          if (e.target.hasName('triangle') && verificaTransformation === 3) {
            grau = document.getElementById('grau').value;
            pontos = e.target.points();
            const mObj = math.matrix([[pontos[0], pontos[2], pontos[4]], [pontos[1], pontos[3], pontos[5]], [1, 1, 1]]);
            const mT = math.matrix([[1, 0, pontos[0]], [0, 1, pontos[1]], [0, 0, 1]]);
            const rT = math. matrix([[Math.cos(grau * Math.PI / 180.0), -Math.sin(grau * Math.PI / 180.0), 0], [Math.sin(grau * Math.PI / 180.0), Math.cos(grau * Math.PI / 180.0), 0], [0, 0, 1]]);
            const mTNeg = math.matrix([[1, 0, -pontos[0]], [0, 1, -pontos[1]], [0, 0, 1]]);
            const matrix1 = math.multiply(mT, rT);
            const matrix2 = math.multiply(matrix1, mTNeg);
            const matrix3 = math.multiply(matrix2, mObj);
            var max = matrix3.valueOf();
            e.target.destroy();

            layer.add(new Konva.Line({
              points: [max[0][0], max[1][0], max[0][1], max[1][1], max[0][2], max[1][2]],
              fill: 'transparent',
              stroke: 'black',
              strokeWidth: 2,
              closed : true,
              name: 'triangle',
              draggable: false,
            }));

            stage.draw();
            verificaTransformation = 0;
            return;
          }

          if (e.target.hasName('square') && verificaTransformation === 3) {
            grau = document.getElementById('grau').value;
            pontos = e.target.points();
            const mObj = math.matrix([[pontos[0], pontos[2], pontos[4], pontos[6]], [pontos[1], pontos[3], pontos[5], pontos[7]], [1, 1, 1, 1]]);
            const mT = math.matrix([[1, 0, pontos[0]], [0, 1, pontos[1]], [0, 0, 1]]);
            const rT = math. matrix([[Math.cos(grau * Math.PI / 180.0), -Math.sin(grau * Math.PI / 180.0), 0], [Math.sin(grau * Math.PI / 180.0), Math.cos(grau * Math.PI / 180.0), 0], [0, 0, 1]]);
            const mTNeg = math.matrix([[1, 0, -pontos[0]], [0, 1, -pontos[1]], [0, 0, 1]]);
            const matrix1 = math.multiply(mT, rT);
            const matrix2 = math.multiply(matrix1, mTNeg);
            const matrix3 = math.multiply(matrix2, mObj);
            var max = matrix3.valueOf();
            e.target.destroy();
            console.log("Girar quadrado " + max[0][0] + " " + max[1][0]);
            layer.add(new Konva.Line({
              points: [max[0][0], max[1][0], max[0][1], max[1][1], max[0][2], max[1][2], max[0][3], max[1][3]],
              fill: 'transparent',
              stroke: 'black',
              strokeWidth: 2,
              closed : true,
              name: 'square',
              draggable: false,
            }));

            stage.draw();
            verificaTransformation = 0;
            return;
          }
        });
      }
    });
});

$(function () {
  $("#translacao").click(function() {
    verificaTransformation = 0;
    squareActive = false, circleActive = false, lineActive = false, triangleActive = false, RecActive = false;
    stopDraggable();
  });
});

$(function () {
    $("#trans_ok").click(function () {
      verificaTransformation = 2;
      squareActive = false, circleActive = false, lineActive = false, triangleActive = false, RecActive = false;
      stopDraggable();
      var xS = document.getElementById('Xs').value;
      var yS = document.getElementById('Ys').value;
      if (verificaTransformation === 2) {
        stage.on('click', function (e) {
          if (e.target.hasName('rectangle') && verificaTransformation === 2) {
            var xS = document.getElementById('Xs').value;
            var yS = document.getElementById('Ys').value;
            pontos = e.target.points();
            var dx = parseInt(xS, 10) - pontos[0];
            var dy = parseInt(yS, 10) - pontos[1];
            const mObj = math.matrix([[pontos[0], pontos[2], pontos[4], pontos[6]], [pontos[1], pontos[3], pontos[5], pontos[7]], [1, 1, 1, 1]]);
            const mT = math.matrix([[1, 0, dx], [0, 1, dy], [0, 0, 1]]);
            const matrix1 = math.multiply(mT, mObj);
            var max = matrix1.valueOf();
            e.target.destroy();
            console.log("Transladar quadrado " + max[0][0] + " " + max[1][0]);
            layer.add(new Konva.Line({
              points: [max[0][0], max[1][0], max[0][1], max[1][1], max[0][2], max[1][2], max[0][3], max[1][3]],
              fill: 'transparent',
              stroke: 'black',
              strokeWidth: 2,
              closed : true,
              name: 'rectangle',
              draggable: false,
            }));

            stage.draw();
            verificaTransformation = 0;
            return;
          }

          if (e.target.hasName('triangle') && verificaTransformation === 2) {
            var xS = document.getElementById('Xs').value;
            var yS = document.getElementById('Ys').value;
            pontos = e.target.points();
            const mObj = math.matrix([[pontos[0], pontos[2], pontos[4]], [pontos[1], pontos[3], pontos[5]], [1, 1, 1]]);
            var dx = parseInt(xS, 10) - pontos[0];
            var dy = parseInt(yS, 10) - pontos[1];
            console.log(dx);
            console.log(dy);
            const mT = math.matrix([[1, 0, dx], [0, 1, dy], [0, 0, 1]]);
            const matrix1 = math.multiply(mT, mObj);
            console.log(matrix1);
            var max = matrix1.valueOf();
            e.target.destroy();

            layer.add(new Konva.Line({
              points: [max[0][0], max[1][0], max[0][1], max[1][1], max[0][2], max[1][2]],
              fill: 'transparent',
              stroke: 'black',
              strokeWidth: 2,
              closed : true,
              name: 'triangle',
              draggable: false,
            }));

            stage.draw();
            verificaTransformation = 0;
            return;
          }


          if (e.target.hasName('circle') && verificaTransformation === 2) {
            var xS = document.getElementById('Xs').value;
            var yS = document.getElementById('Ys').value;
            var dx = parseInt(xS, 10) - e.target.x();
            var dy = parseInt(yS, 10) - e.target.y();
            const mObj = math.matrix([[e.target.x()], [e.target.y()], [1]]);
            const mT = math.matrix([[1, 0, dx], [0, 1, dy], [0, 0, 1]]);
            const matrix3 = math.multiply(mT, mObj);
            var rad = e.target.radius();
            var max = matrix3.valueOf();

            e.target.destroy();

            layer.add(new Konva.Circle({
              x: max[0][0],
              y: max[1][0],
              radius: rad,
              stroke: 'black',
              strokeWidth: 2,
              name: 'circle',
              draggable: false
            }));

            stage.draw();
            verificaTransformation = 0;
            return;
          }


          if (e.target.hasName('line') && verificaTransformation === 2) {
            var xS = document.getElementById('Xs').value;
            var yS = document.getElementById('Ys').value;
            pontos = e.target.points();
            const mObj = math.matrix([[pontos[0], pontos[2]], [pontos[1], pontos[3]], [1, 1]]);
            var dx = parseInt(xS, 10) - pontos[0];
            var dy = parseInt(yS, 10) - pontos[1];
            const mT = math.matrix([[1, 0, dx], [0, 1, dy], [0, 0, 1]]);
            const matrix1 = math.multiply(mT, mObj);
            console.log(matrix1);
            var max = matrix1.valueOf();
            e.target.destroy();

            layer.add(new Konva.Line({
              points: [max[0][0], max[1][0], max[0][1], max[1][1], max[0][2], max[1][2]],
              fill: 'transparent',
              stroke: 'black',
              strokeWidth: 2,
              closed : true,
              name: 'line',
              draggable: false,
            }));

            stage.draw();
            verificaTransformation = 0;
            return;
          }

          if (e.target.hasName('square') && verificaTransformation === 2) {
            var xS = document.getElementById('Xs').value;
            var yS = document.getElementById('Ys').value;
            pontos = e.target.points();
            var dx = parseInt(xS, 10) - pontos[0];
            var dy = parseInt(yS, 10) - pontos[1];
            const mObj = math.matrix([[pontos[0], pontos[2], pontos[4], pontos[6]], [pontos[1], pontos[3], pontos[5], pontos[7]], [1, 1, 1, 1]]);
            const mT = math.matrix([[1, 0, dx], [0, 1, dy], [0, 0, 1]]);
            const matrix1 = math.multiply(mT, mObj);
            var max = matrix1.valueOf();
            e.target.destroy();
            console.log("Transladar quadrado " + max[0][0] + " " + max[1][0]);
            layer.add(new Konva.Line({
              points: [max[0][0], max[1][0], max[0][1], max[1][1], max[0][2], max[1][2], max[0][3], max[1][3]],
              fill: 'transparent',
              stroke: 'black',
              strokeWidth: 2,
              closed : true,
              name: 'square',
              draggable: false,
            }));

            stage.draw();
            verificaTransformation = 0;
            return;
          }

        });
      }
      });
    });


$(function () {
    $("#escala").click(function () {
      verificaTransformation = 0;
      squareActive = false, circleActive = false, lineActive = false, triangleActive = false, RecActive = false;
      stopDraggable();
      });
    });


$(function () {
    $("#escala_ok").click(function () {
      verificaTransformation = 4;
      squareActive = false, circleActive = false, lineActive = false, triangleActive = false, RecActive = false;
      stopDraggable();
      var xS = document.getElementById('scaleX').value;
      var yS = document.getElementById('scaleY').value;
      if (verificaTransformation === 4) {
        stage.on('click', function (e) {
          if (e.target.hasName('rectangle') && verificaTransformation === 4) {
            var xS = document.getElementById('scaleX').value;
            var yS = document.getElementById('scaleY').value;
            pontos = e.target.points();
            const mObj = math.matrix([[pontos[0], pontos[2], pontos[4], pontos[6]], [pontos[1], pontos[3], pontos[5], pontos[7]], [1, 1, 1, 1]]);
            const mT = math.matrix([[1, 0, pontos[0]], [0, 1, pontos[1]], [0, 0, 1]]);
            const mTNeg = math.matrix([[1, 0, -pontos[0]], [0, 1, -pontos[1]], [0, 0, 1]]);
            const mS = math.matrix([[parseFloat(xS, 10), 0, 0], [0, parseFloat(yS, 10), 0], [0, 0, 1]]);
            const matrix1 = math.multiply(mT, mS);
            const matrix2 = math.multiply(matrix1, mTNeg);
            const matrix3 = math.multiply(matrix2, mObj);
            var max = matrix3.valueOf();
            e.target.destroy();
            console.log("Escala quadrado " + max[0][0] + " " + max[1][0]);
            layer.add(new Konva.Line({
              points: [max[0][0], max[1][0], max[0][1], max[1][1], max[0][2], max[1][2], max[0][3], max[1][3]],
              fill: 'transparent',
              stroke: 'black',
              strokeWidth: 2,
              closed : true,
              name: 'rectangle',
              draggable: false,
            }));

            stage.draw();
            verificaTransformation = 0;
            return;
          }

          if (e.target.hasName('triangle') && verificaTransformation === 4) {
            var xS = document.getElementById('scaleX').value;
            var yS = document.getElementById('scaleY').value;
            pontos = e.target.points();
            const mObj = math.matrix([[pontos[0], pontos[2], pontos[4]], [pontos[1], pontos[3], pontos[5]], [1, 1, 1]]);
            const mT = math.matrix([[1, 0, pontos[0]], [0, 1, pontos[1]], [0, 0, 1]]);
            const mTNeg = math.matrix([[1, 0, -pontos[0]], [0, 1, -pontos[1]], [0, 0, 1]]);
            const mS = math.matrix([[parseFloat(xS, 10), 0, 0], [0, parseFloat(yS, 10), 0], [0, 0, 1]]);
            const matrix1 = math.multiply(mT, mS);
            const matrix2 = math.multiply(matrix1, mTNeg);
            const matrix3 = math.multiply(matrix2, mObj);
            var max = matrix3.valueOf();
            e.target.destroy();

            layer.add(new Konva.Line({
              points: [max[0][0], max[1][0], max[0][1], max[1][1], max[0][2], max[1][2]],
              fill: 'transparent',
              stroke: 'black',
              strokeWidth: 2,
              closed : true,
              name: 'triangle',
              draggable: false,
            }));

            stage.draw();
            verificaTransformation = 0;
            return;
          }

          if (e.target.hasName('circle') && verificaTransformation === 4) {
            var xS = document.getElementById('scaleX').value;
            var yS = document.getElementById('scaleY').value;
            var rad = e.target.radius()*parseFloat(xS, 10);
            var XC = e.target.x();
            var YC = e.target.y();

            e.target.destroy();

            layer.add(new Konva.Circle({
              x: XC,
              y: YC,
              radius: rad,
              stroke: 'black',
              strokeWidth: 2,
              name: 'circle',
              draggable: false
            }));

            stage.draw();
            verificaTransformation = 0;
            return;
          }

          if (e.target.hasName('square') && verificaTransformation === 4) {
            var xS = document.getElementById('scaleX').value;
            var yS = document.getElementById('scaleY').value;
            pontos = e.target.points();
            const mObj = math.matrix([[pontos[0], pontos[2], pontos[4], pontos[6]], [pontos[1], pontos[3], pontos[5], pontos[7]], [1, 1, 1, 1]]);
            const mT = math.matrix([[1, 0, pontos[0]], [0, 1, pontos[1]], [0, 0, 1]]);
            const mTNeg = math.matrix([[1, 0, -pontos[0]], [0, 1, -pontos[1]], [0, 0, 1]]);
            const mS = math.matrix([[parseFloat(xS, 10), 0, 0], [0, parseFloat(yS, 10), 0], [0, 0, 1]]);
            const matrix1 = math.multiply(mT, mS);
            const matrix2 = math.multiply(matrix1, mTNeg);
            const matrix3 = math.multiply(matrix2, mObj);
            var max = matrix3.valueOf();
            e.target.destroy();
            console.log("Escala quadrado " + max[0][0] + " " + max[1][0]);
            layer.add(new Konva.Line({
              points: [max[0][0], max[1][0], max[0][1], max[1][1], max[0][2], max[1][2], max[0][3], max[1][3]],
              fill: 'transparent',
              stroke: 'black',
              strokeWidth: 2,
              closed : true,
              name: 'square',
              draggable: false,
            }));

            stage.draw();
            verificaTransformation = 0;
            return;
          }


          if (e.target.hasName('line') && verificaTransformation === 4) {
            var xS = document.getElementById('scaleX').value;
            var yS = document.getElementById('scaleY').value;
            pontos = e.target.points();
            const mObj = math.matrix([[pontos[0], pontos[2]], [pontos[1], pontos[3]], [1, 1]]);
            const mT = math.matrix([[1, 0, pontos[0]], [0, 1, pontos[1]], [0, 0, 1]]);
            const mS = math.matrix([[parseFloat(xS, 10), 0, 0], [0, parseFloat(yS, 10), 0], [0, 0, 1]]);
            const mTNeg = math.matrix([[1, 0, -pontos[0]], [0, 1, -pontos[1]], [0, 0, 1]]);
            const matrix1 = math.multiply(mT, mS);
            const matrix2 = math.multiply(matrix1, mTNeg);
            const matrix3 = math.multiply(matrix2, mObj);
            var max = matrix3.valueOf();

            e.target.destroy();

            layer.add(new Konva.Line({
              points: [max[0][0], max[1][0], max[0][1], max[1][1]],
              stroke: 'black',
              strokeWidth: 3,
              lineCap: 'round',
              lineJoin: 'round',
              name: 'line',
              draggable: false
            }));

            stage.draw();
            verificaTransformation = 0;
            return;
          }
        });
      }
      });
    });


$(function () {
    $("#select").click(function () {
      verificaTransformation = 1;
      squareActive = false, circleActive = false, lineActive = false, triangleActive = false, RecActive = false;
      transform();
      });
    });

$(function () {
    $("#zoom").click(function () {
      squareActive = false, circleActive = false, lineActive = false, triangleActive = false, RecActive = false;
      });
    });


$(function () {
    $("#zoom_ok").click(function () {
      squareActive = false, circleActive = false, lineActive = false, triangleActive = false, RecActive = false;
      var altura = document.getElementById('altura').value;
      var largura = document.getElementById('largura').value;
      stage.width(parseInt(largura, 10));
      stage.height(parseInt(altura, 10));
      stage.draw();
      console.log('Altura: ' + stage.height());
      });
    });



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
              var square = new Konva.Line({
                points: [pos.x, pos.y, ponto2.x, pos.y, ponto2.x, (distancia+pos.y), pos.x, (distancia+pos.y)],
                fill: 'transparent',
                stroke: 'black',
                strokeWidth: 2,
                name: 'square',
                closed : true,
                draggable: false
              });  
              layer.add(square);
              layer.draw();

              var auxes = layer.find('.aux');
              auxes.each(function(shape) {
                    shape.destroy(); 
              });
              stage.draw();
          }
    }

    if (RecActive) {
        if (i === 0) {
          pos = stage.getPointerPosition();
          clickSquare(pos.x, pos.y);
          i = 1;
          console.log(pos);
        }else{
          ponto2 = stage.getPointerPosition();
          clickSquare(ponto2.x, ponto2.y);
          var aux;
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
          //var largura = Math.abs(pos.x-ponto2.x);
          i = 0;
          var altura = 0;
          if (ponto2.y < pos.y) {
            altura = -Math.abs(pos.y-ponto2.y);
          }else{
            altura = Math.abs(pos.y-ponto2.y);
          }
              var rectangle = new Konva.Line({
                points: [pos.x, pos.y, ponto2.x, pos.y, ponto2.x, (altura+pos.y), pos.x, (altura+pos.y)],
                fill: 'transparent',
                stroke: 'black',
                strokeWidth: 2,
                name: 'rectangle',
                closed : true,
                draggable: false
              });  
              layer.add(rectangle);
              layer.draw();

              var auxes = layer.find('.aux');
              auxes.each(function(shape) {
                    shape.destroy(); 
              });
              stage.draw();
          }
    }

    if (circleActive) {
          if (i === 0) {
            pos = stage.getPointerPosition();
            clickSquare(pos.x, pos.y);
            i = 1;
            console.log(pos);
          }else{
            ponto2 = stage.getPointerPosition();
            clickSquare(ponto2.x, ponto2.y);
            i = 0;
            console.log(ponto2);
            console.log(Math.sqrt(Math.pow(Math.abs(ponto2.x-pos.x), 2)-Math.pow(Math.abs(ponto2.y-pos.y), 2)));
              var circle = new Konva.Circle({
                x: pos.x,
                y: pos.y,
                fill: 'transparent',
                stroke: 'black',
                strokeWidth: 2,
                radius: Math.sqrt(Math.pow(Math.abs(ponto2.x-pos.x), 2)+Math.pow(Math.abs(ponto2.y-pos.y), 2)),
                name: 'circle',
                draggable: false
              });  
              layer.add(circle);
              layer.draw();

              var auxes = layer.find('.aux');
              auxes.each(function(shape) {
                    shape.destroy(); 
              });
              stage.draw();
          }
    }

    if (lineActive) {
      if (i === 0) {
            pos = stage.getPointerPosition();
            clickSquare(pos.x, pos.y);
            i = 1;
            console.log(pos);
          }else{
            ponto2 = stage.getPointerPosition();
            clickSquare(ponto2.x, ponto2.y);
            i = 0;
              var Line = new Konva.Line({
              points: [pos.x, pos.y, ponto2.x, ponto2.y],
              stroke: 'black',
              strokeWidth: 3,
              lineCap: 'round',
              lineJoin: 'round',
              name: 'line',
              draggable: false
            });
            layer.add(Line);
            layer.draw();

            var auxes = layer.find('.aux');
              auxes.each(function(shape) {
                    shape.destroy(); 
              });
              stage.draw();
          }
    }

    if (triangleActive) {
      if (i === 0) {
            pos = stage.getPointerPosition();
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


            var triangle = new Konva.Line({
              points: [pos.x, pos.y, ponto2.x, ponto2.y, ponto3.x, ponto3.y],
              fill: 'transparent',
              stroke: 'black',
              strokeWidth: 2,
              closed : true,
              name: 'triangle',
              draggable: false
            });

            layer.add(triangle);
            stage.draw();
            
            var auxes = layer.find('.aux');
              auxes.each(function(shape) {
                    shape.destroy(); 
              });
              stage.draw();
            }
          }      
    }
  });