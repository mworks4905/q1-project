console.log('document is ready')
//module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    MouseConstraint = Matter.MouseConstraint,
    Composites = Matter.Composites,
    Constraint = Matter.Constraint,
    Events = Matter.Events;

// create a Matter.js engine
var engine = Engine.create(document.body, {
  render: {
    options: {
      showAngleIndicator: true,
      showVelocity: true,
      wireframes: false,
      showPositions: true
    }
  }
});

var mouse = MouseConstraint.create(engine,{
   constraint: { stiffness: 1 }//how much an obj adhears to the mouse
 });

// create two boxes and a ground
var boxA = Bodies.rectangle(600, 570, 40, 80);
var boxB = Bodies.rectangle(625, 50, 160, 20, {inertia: 100000});
var boxC = Bodies.rectangle(650, 400, 40, 80);
var boxD = Bodies.rectangle(660, 300, 25, 100);
var ground = Bodies.rectangle(400, 610, 810, 60, {isStatic: true});
// var car = Composites.car(100,100,40,40,30)

var rock = Bodies.polygon(170, 450, 12, 20),
    anchor = { x: 170, y: 450 },
    elastic = Constraint.create({
        pointA: anchor,
        bodyB: rock,
        stiffness: 0.1,
        render: {
            lineWidth: 5,
            strokeStyle: '#dfa417'
        }
    });

// add all of the bodies to the world
World.add(engine.world, [mouse, boxA, boxB, boxC, boxD, ground, car, rock, elastic]);

Events.on(engine,'tick', function(event) {
  if(rock.position.x > 190 || rock.position.y < 430){
    rock = Bodies.polygon(170, 450, 12, 20);
           World.add(engine.world, rock);
           elastic.bodyB = rock;
           console.log('You shot a rock!')
  }


})


// run the engine
Engine.run(engine);
