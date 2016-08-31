$(document).ready(function() {

    $('.startBtn').on('click', function() {

        startGame()
    })


    function startGame() {
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

        var mouse = MouseConstraint.create(engine, {
            constraint: {
                stiffness: 1
            } //how much an obj adhears to the mouse
        });


        // creating structure objects
        var hill1 = Bodies.rectangle(650, 500, 450, 40, {
            isStatic: true
        });
        var hill2 = Bodies.rectangle(647, 300, 350, 20, {
            isStatic: true
        });
        var hill3 = Bodies.rectangle(345, 570, 50, 50, {
            isStatic: true
        });
        var box1 = Bodies.rectangle(705, 275, 30, 30, {
            isStatic: true
        });
        var box2 = Bodies.rectangle(700, 455, 50, 50, {
            isStatic: true
        });
        var ground = Bodies.rectangle(400, 625, 810, 60, {
            isStatic: true
        });

        var ramp = Bodies.rectangle(695, 267, 200, 15);

        var objective1 = Bodies.rectangle(780, 257, 20, 20)
        var objective2 = Bodies.rectangle(700, 425, 20, 20)
        var objective3 = Bodies.rectangle(780, 575, 20, 20)

        var objPos1 = objective1.position
        var objPos2 = objective2.position
        var objPos3 = objective3.position

        var wall1 = Bodies.rectangle(500, 100, 40, 100);
        var wall2 = Bodies.rectangle(500, 225, 40, 100);
        var wall3 = Bodies.rectangle(450, 415, 40, 125);
        var wall4 = Bodies.rectangle(450, 300, 40, 125);
        var wall5 = Bodies.rectangle(540, 155, 40, 50);
        var wall6 = Bodies.rectangle(540, 225, 40, 100);
        var wall7 = Bodies.rectangle(490, 490, 40, 50);
        var wall8 = Bodies.rectangle(490, 405, 40, 50);
        var wall9 = Bodies.rectangle(490, 365, 40, 50);

        // creating the first rock and the elastic to shoot rocks with
        var rock = Bodies.polygon(170, 450, 12, 20),
            anchor = {
                x: 170,
                y: 450
            },
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
        World.add(engine.world, [mouse, ground, hill1, hill2, hill3, rock, elastic]);
        World.add(engine.world, [wall1, wall2, wall3, wall4, wall5, wall6, wall7, wall8, wall9])
        World.add(engine.world, [objective1, objective2, objective3]);
        World.add(engine.world, [box1, box2, ramp])


        Events.on(mouse, 'mouseup', function(event) {
            var mousePosition = event.mouse.position;
            //console.log('mouseup at ' + mousePosition.x + ' ' + mousePosition.y);
            if (mousePosition.x < 250 && mousePosition.y > 315) {
                setTimeout(rockPosition, 0145)
            }
        })

        function rockPosition() {
            if (rock.position.x > 170 || rock.position.y < 450) {
                createRock()
            }
        }

        function createRock() {
            rock = Bodies.polygon(170, 450, 12, 20);
            World.add(engine.world, rock);
            elastic.bodyB = rock;
            //console.log('You shot a rock!')
        }

        var event1
        var event2
        var event3

        Events.on(engine, 'tick', function(event) {
            if (objPos1.x > 785 || objPos1.x < 775) {
                console.log('You moved the box 1!');
                event1 = true
                endGame()
            }
        })

        Events.on(engine, 'tick', function(event) {
            if (objPos2.x > 705 || objPos2.x < 695) {
                console.log('You moved the box 2!');
                event2 = true
                endGame()
            }
        })

        Events.on(engine, 'tick', function(event) {
            if (objPos3.x > 785 || objPos3.x < 775) {
                console.log('You moved the box 3!');
                event3 = true
                endGame()
            }
        })

        // run the engine
        Engine.run(engine);

        function endGame() {
          console.log(event1);
          console.log(event2);
          console.log(event3);

          if (event1 == true && event2 == true && event3 == true) {
            alert('YOU WON!')
            Events.off(engine)
            var again = confirm('Do you want to play again?')
            if(again === true){
              startGame()
            }
          } else {
            return false
          }
        }
    }
})

// set up a function with a button for start game. This button will call a function that will, when ran will start the engine affectively starting the game over
