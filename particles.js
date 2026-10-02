tsParticles.load("tsparticles", {
    fpsLimit: 60,
    particles: {
        number: { value: 0 }, 
        color: { value: ["#ff00ff", "#00ffff", "#39ff14"] }, // Neon Hot Pink, Cyan, Lime
        shape: { type: "circle" },
        opacity: { 
            value: 0.9,
            animation: { enable: true, speed: 2, startValue: "max", destroy: "min" } // Fades out like smoke
        },
        size: { 
            value: { min: 15, max: 45 }, // Large fluid blobs
            animation: { enable: true, speed: 15, startValue: "max", destroy: "min" } // Shrinks as it dissipates
        },
        move: {
            enable: true,
            speed: { min: 8, max: 30 }, // Explosive outward force
            direction: "none",
            outModes: "destroy"
        }
    }
});

window.triggerSmokeSplatter = function(x, y) {
    const container = tsParticles.domItem(0);
    if (container) {
        // Manually inject 100 particles at the exact pixel impact coordinates
        for (let i = 0; i < 100; i++) {
            container.particles.addParticle({ x: x, y: y });
        }
    }
};
