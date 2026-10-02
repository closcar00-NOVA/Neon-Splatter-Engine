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
        const bodyA = pair.bodyA;
        const bodyB = pair.bodyB;
        
        // Check if either colliding object is a projectile
        if (bodyA.label === 'projectile' || bodyB.label === 'projectile') {
            const projectile = bodyA.label === 'projectile' ? bodyA : bodyB;
            
            // 1. DELETE FIRST: Ensure the ball vanishes instantly so they never pile up
            Composite.remove(engine.world, projectile);
            
            // 2. EXPLODE SECOND: Safely trigger the neon smoke without crashing the engine
            if (window.triggerSmokeSplatter) {
                try {
                    window.triggerSmokeSplatter(projectile.position.x, projectile.position.y);
                } catch (error) {
                    console.error("Explosion error:", error);
                }
            }
        }
    });
});

Render.run(render);
Runner.run(Runner.create(), engine);
