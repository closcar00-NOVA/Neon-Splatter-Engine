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

// The Handshake: Listen for the exact moment of impact
Events.on(engine, 'collisionStart', (event) => {
    event.pairs.forEach((pair) => {
        // Check if the ball hit the floor
        if (pair.bodyA.label === 'projectile' && pair.bodyB.label === 'wall') {
            
            // 1. Fire the tsParticles function using the ball's coordinates
            window.triggerSmokeSplatter(pair.bodyA.position.x, pair.bodyA.position.y);
            
            // 2. Erase the rigid ball instantly
            Composite.remove(engine.world, pair.bodyA);
        }
    });
});

Render.run(render);
Runner.run(Runner.create(), engine);
