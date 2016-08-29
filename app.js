console.log('document is ready')
//module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    MouseConstraint = Matter.MouseConstraint,
    Composites = Matter.Composites;

// // create an Engine
// var engine = Engine.create();
//
// // create a renderer
// var render = Render.create({
//   element: document.body,
//   engine: engine
// });

// create a Matter.js engine
var engine = Engine.create(document.body, {
  render: {
    options: {
      showAngleIndicator: true,
      showVelocity: true,
      wireframes: true
    }
  }
});

var mouseConstraint = MouseConstraint.create(engine);
World.add(engine.world, mouseConstraint);

var car = Composites.car(100,100,40,40,30)

// create two boxes and a ground
var boxA = Bodies.rectangle(600, 570, 40, 80);
var boxB = Bodies.rectangle(625, 50, 160, 20);
var boxC = Bodies.rectangle(650, 400, 40, 80);
var boxD = Bodies.rectangle(660, 300, 25, 100);
var ground = Bodies.rectangle(400, 610, 810, 60, {isStatic: true});

// add all of the bodies to the world
World.add(engine.world, [boxA, boxB, boxC, boxD, ground, car]);

// run the engine
Engine.run(engine);

// run the renderer
// Render.run(render);
