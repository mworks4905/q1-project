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

// creating structure objects
var boxA = Bodies.rectangle(600, 540, 20, 80, {isStatic: true});
var boxB = Bodies.rectangle(700, 475, 20, 80);
var boxC = Bodies.rectangle(650, 400, 160, 50);
var objective = Bodies.rectangle(650, 500, 20, 20);
var ground = Bodies.rectangle(400, 610, 810, 60, {isStatic: true});

// creating the first rock and the elastic to shoot rocks with
var rock = Bodies.polygon(170, 450, 12, 20, {
  //density: .5
}),
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
World.add(engine.world, [mouse, boxA, boxB, boxC, objective, ground, rock, elastic]);

// Events.on(engine,'tick', function(event) {
//   //var mousePosition = event.mouse.position;
//   if(rock.position.x > 190 || rock.position.y < 430){
//         createRock()
//   }
// })

//
Events.on(mouse, 'mouseup', function(event) {
  var mousePosition = event.mouse.position;
  console.log('mouseup at ' + mousePosition.x + ' ' + mousePosition.y);

  if(mousePosition.x < 250 && mousePosition.y > 315){
    setTimeout(rockPosition, 0145)
  }
})
function rockPosition(){
  if(rock.position.x > 190 || rock.position.y < 430){
    createRock()
  }
}

function createRock(){
  rock = Bodies.polygon(170, 450, 12, 20, {
    //density: .5
  });
         World.add(engine.world, rock);
         elastic.bodyB = rock;
         console.log('You shot a rock!')
}

Events.on(engine, 'tick', function(event){
  if(objective.position.x > 660){
    console.log('You moved the box!');
  }
})

// run the engine
Engine.run(engine);
