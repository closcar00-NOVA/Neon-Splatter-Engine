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
        let percentX = (x / window.innerWidth) * 100;
        let percentY = (y / window.innerHeight) * 100;

        container.addEmitter({
            direction: "none",
            life: { count: 1, duration: 0.1, delay: 0 },
            rate: { delay: 0, quantity: 150 }, // Massive burst of 150 particles per impact
            position: { x: percentX, y: percentY }
        });
    }
};
