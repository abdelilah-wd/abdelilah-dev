const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = { x: null, y: null };

document.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

class Particle {
    constructor(initial) {
        this.size = Math.random() * 17 + 3; // بين 3 و 20
        this.x = Math.random() * canvas.width;
        this.vy = Math.random() * 0.6 + 0.2; // سرعة بطيئة (0.2–0.8)
        this.color = Math.random() < 0.35 ? "#00d9ff53" : Math.random() < 0.6 ? "#e400e05d" : "#ffcc0066";

        if (initial) {
            // البداية: موزعة عشوائيًا في منتصف الشاشة
            let spread = canvas.height / 3;
            this.y = canvas.height / 2 + (Math.random() * spread - spread / 2);
        } else {
            // التوليد الطبيعي: من أسفل
            this.y = canvas.height + this.size;
        }
    }

    update() {
        this.y -= this.vy;
        // إعادة توليد من أسفل لما يخرج فوق
        if (this.y + this.size < 0) {
            this.size = Math.random() * 17 + 3;
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + this.size;
            this.vy = Math.random() * 1 + 0.2;
            this.color = Math.random() < 0.35 ? "#00d9ff53" : Math.random() < 0.6 ? "#e400e05d" : "#ffcc0066";
        }
    }
    
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}
function drawStar(ctx, x, y, spikes, outerRadius, innerRadius, color) {
    let rot = Math.PI / 2 * 3;
    let step = Math.PI / spikes;
    ctx.beginPath();
    ctx.moveTo(x, y - outerRadius);
    for (let i = 0; i < spikes; i++) {
        ctx.lineTo(x + Math.cos(rot) * outerRadius, y + Math.sin(rot) * outerRadius);
        rot += step;
        ctx.lineTo(x + Math.cos(rot) * innerRadius, y + Math.sin(rot) * innerRadius);
        rot += step;
    }
    ctx.lineTo(x, y - outerRadius);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
}

let particles = [];
const numParticles = 25;

// أول إنشاء: موزعة في المنتصف
for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle(true));
}

function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            let dx = particles[i].x - particles[j].x;
            let dy = particles[i].y - particles[j].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 130) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = "rgba(255,255,255,0.1)";
                ctx.stroke();
            }
        }

        // خط مع الماوس
        if (mouse.x && mouse.y) {
            let dx = particles[i].x - mouse.x;
            let dy = particles[i].y - mouse.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 180) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.strokeStyle = "rgba(255,255,255,0.25)";
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
        p.update();
        if (i % 2) {
            p.draw(1);
        } else if (i % 3) {
            p.draw(2);
        } else {
            p.draw(3);
        }
    });

    connectParticles();

    requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
