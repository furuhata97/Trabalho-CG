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

    // add the shape to the layer
    layer.add(arrow1);
    layer.add(arrow2);

    /*var rect = new Konva.Rect({
      x: 160,
      y: 60,
      width: 100,
      height: 90,
      fill: 'red',
      name: 'rect',
      stroke: 'black',
      draggable: true
    });
    layer.add(rect);*/

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
              'x: ' + title.x(),
              'y: ' + title.y(),
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

function transform(){

    stage.on('dragmove', function (e) {
      if (verificaTransformation === 1) {
        if (e.target.hasName('triangle') || e.target.hasName('square') | e.target.hasName('circle') | e.target.hasName('line') | e.target.hasName('rectangle')) {
          updateText(e.target.x(), e.target.y(), e.target);
          //console.log(e.target);
        }
      }
      
    })
    stage.on('transform', function (e) {
      if (verificaTransformation === 1) {
        if (e.target.hasName('triangle') || e.target.hasName('square') | e.target.hasName('circle') | e.target.hasName('line') | e.target.hasName('rectangle')) {
          updateText(e.target.x(), e.target.y(), e.target);
          console.log('transform');
        }
      }
    });


      stage.on('click tap', function (e) {
      if (verificaTransformation === 1) {
        // if click on empty area - remove all transformers
      if (e.target === stage) {
        stage.find('Transformer').destroy();
        layer.draw();

        return;
      }
      // do nothing if clicked NOT on our rectangles
      if (e.target.hasName('triangle')) {
        stage.find('Transformer').destroy();
        var tr = new Konva.Transformer();
        layer.add(tr);
        tr.attachTo(e.target);
        layer.draw();
        e.target.draggable(true);
      }

      if (e.target.hasName('circle')) {
        stage.find('Transformer').destroy();
        var tr = new Konva.Transformer();
        layer.add(tr);
        tr.attachTo(e.target);
        layer.draw();
        e.target.draggable(true);
        return;
      }

      if (e.target.hasName('square')) {
        stage.find('Transformer').destroy();
        var tr = new Konva.Transformer();
        layer.add(tr);
        tr.attachTo(e.target);
        layer.draw();
        e.target.draggable(true);
        //e.target.rotate(45);

        return;
      }

      if (e.target.hasName('rectangle')) {
        stage.find('Transformer').destroy();
        var tr = new Konva.Transformer();
        layer.add(tr);
        tr.attachTo(e.target);
        layer.draw();
        e.target.draggable(true);
        //e.target.rotate(45);

        return;
      }

      if (e.target.hasName('line')) {
        stage.find('Transformer').destroy();
        var tr = new Konva.Transformer();
        layer.add(tr);
        tr.attachTo(e.target);
        layer.draw();
        e.target.draggable(true);
        //e.target.rotate(45);

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
    $("#rotacao").click(function () {
      squareActive = false, circleActive = false, lineActive = false, triangleActive = false, RecActive = false;

    });
});

$(function () {
    $("#translacao").click(function () {
      verificaTransformation = 0;
      squareActive = false, circleActive = false, lineActive = false, triangleActive = false, RecActive = false;
      stopDraggable();
      });
    });

$(function () {
    $("#escala").click(function () {
      squareActive = false, circleActive = false, lineActive = false, triangleActive = false, RecActive = false;
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

          if (pos.x > ponto2.x) {
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
          }
          var distancia = Math.abs(pos.x-ponto2.x);
          i = 0;
          //console.log(ponto2);
          console.log(Math.sqrt(Math.pow(Math.abs(ponto2.x-pos.x), 2)-Math.pow(Math.abs(ponto2.y-pos.y), 2)));
              var square = new Konva.Rect({
                x: xPos,
                y: yPos,
                width: distancia,
                height: distancia,
                fill: 'transparent',
                stroke: 'black',
                strokeWidth: 2,
                name: 'square',
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
          if (pos.x > ponto2.x) {
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
          }
          var largura = Math.abs(pos.x-ponto2.x);
          var altura = Math.abs(pos.y-ponto2.y);
          i = 0;
          console.log(ponto2);
          console.log(Math.sqrt(Math.pow(Math.abs(ponto2.x-pos.x), 2)-Math.pow(Math.abs(ponto2.y-pos.y), 2)));
              var rectangle = new Konva.Rect({
                x: xPos,
                y: yPos,
                width: largura,
                height: altura,
                fill: 'transparent',
                stroke: 'black',
                strokeWidth: 2,
                name: 'rectangle',
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
              strokeWidth: 3,
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