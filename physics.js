const { Engine, Render, Runner, Bodies, Composite, Events } = Matter;

const engine = Engine.create();
const render = Render.create({
    canvas: document.getElementById('physics-canvas'),
    engine: engine,
    options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: 'transparent' // Critical: allows particles layer to show through
    }
});

// Create the floor
const ground = Bodies.rectangle(window.innerWidth / 2, window.innerHeight, window.innerWidth, 50, { 
    isStatic: true, 
    label: 'wall', 
    render: { fillStyle: '#111' } 
});
Composite.add(engine.world, [ground]);

// Click anywhere to shoot a rigid ball
window.addEventListener('mousedown', (e) => {
    const ball = Bodies.circle(e.clientX, 50, 15, { 
        label: 'projectile',
        restitution: 0.5, // Bounciness
        render: { fillStyle: '#ffffff' }
    });
    Composite.add(engine.world, [ball]);
});

// 1. Create a "Trash Can" to hold balls safely until the math is done
let ballsToDelete = [];

// 2. The Handshake: Tag balls for deletion and trigger the explosion
Events.on(engine, 'collisionStart', (event) => {
    event.pairs.forEach((pair) => {
        const bodyA = pair.bodyA;
        const bodyB = pair.bodyB;
        
        // Check if either colliding object is a projectile
        if (bodyA.label === 'projectile' || bodyB.label === 'projectile') {
            const projectile = bodyA.label === 'projectile' ? bodyA : bodyB;
            
            // Ensure we only process each ball once
            if (!ballsToDelete.includes(projectile)) {
                ballsToDelete.push(projectile);
                
                // Trigger the neon smoke safely
                if (window.triggerSmokeSplatter) {
                    window.triggerSmokeSplatter(projectile.position.x, projectile.position.y);
                }
            }
        }
    });
});

// 3. Safely empty the trash AFTER the physics engine finishes its frame
Events.on(engine, 'afterUpdate', () => {
    if (ballsToDelete.length > 0) {
        Composite.remove(engine.world, ballsToDelete);
        ballsToDelete = []; 
    }
});

Render.run(render);
Runner.run(Runner.create(), engine);
