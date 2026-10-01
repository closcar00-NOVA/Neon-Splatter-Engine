// Initialize the empty particle container
tsParticles.load("tsparticles", {
    fpsLimit: 60,
    particles: {
        number: { value: 0 }, 
        color: { value: ["#ff00ff", "#00ffff", "#39ff14"] }, // Hot Pink, Cyan, Neon Green
        shape: { type: "circle" },
        opacity: { value: 0.8, random: true },
        size: { value: 8, random: true },
        move: {
            enable: true,
            speed: 12,
            direction: "none",
            random: true,
            outModes: "destroy" // Particles disappear when off-screen
        }
    }
});

// The global function to fire a neon explosion at specific coordinates
window.triggerSmokeSplatter = function(x, y) {
    const container = tsParticles.domItem(0);
    if (container) {
        // Convert exact pixel coordinates to percentages for tsParticles
        let percentX = (x / window.innerWidth) * 100;
        let percentY = (y / window.innerHeight) * 100;

        // Eject a burst of 50 particles that fade out
        container.addEmitter({
            direction: "none",
            life: { count: 1, duration: 0.1, delay: 0 },
            rate: { delay: 0.1, quantity: 50 },
            position: { x: percentX, y: percentY }
        });
    }
};
