class BouncingElement {
    constructor(element, containerWidth, containerHeight) {
        this.element = element;
        this.containerWidth = containerWidth;
        this.containerHeight = containerHeight;
        this.radius = 10; // Half of element size
        
        // Random initial position (avoiding walls)
        this.x = Math.random() * (containerWidth - this.radius * 2) + this.radius;
        this.y = Math.random() * (containerHeight - this.radius * 2) + this.radius;
        
        // Random initial velocity
        this.vx = (Math.random() - 0.5) * 6;
        this.vy = (Math.random() - 0.5) * 6;
        
        // Minimum speed to keep things moving
        if (Math.abs(this.vx) < 1) this.vx = this.vx > 0 ? 0.01 : -0.01;
        if (Math.abs(this.vy) < 1) this.vy = this.vy > 0 ? 0.01 : -0.01;
        
        this.updatePosition();
    }
    
    updatePosition() {
        this.element.style.left = (this.x - this.radius) + 'px';
        this.element.style.top = (this.y - this.radius) + 'px';
    }
    
    move() {
        this.x += this.vx;
        this.y += this.vy;
        
        // Wall collision detection
        if (this.x - this.radius <= 0 || this.x + this.radius >= this.containerWidth) {
            this.vx = -this.vx;
            this.x = Math.max(this.radius, Math.min(this.containerWidth - this.radius, this.x));
        }
        
        if (this.y - this.radius <= 0 || this.y + this.radius >= this.containerHeight) {
            this.vy = -this.vy;
            this.y = Math.max(this.radius, Math.min(this.containerHeight - this.radius, this.y));
        }
        
        this.updatePosition();
    }
    
    checkCollision(other) {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDistance = this.radius + other.radius;
        
        if (distance < minDistance) {
            // Collision detected - separate elements first
            const overlap = minDistance - distance;
            const separationX = (dx / distance) * overlap * 0.5;
            const separationY = (dy / distance) * overlap * 0.5;
            
            this.x += separationX;
            this.y += separationY;
            other.x -= separationX;
            other.y -= separationY;
            
            // Calculate new velocities (elastic collision)
            const normalX = dx / distance;
            const normalY = dy / distance;
            
            const relativeVelocityX = this.vx - other.vx;
            const relativeVelocityY = this.vy - other.vy;
            
            const speed = (relativeVelocityX * normalX + relativeVelocityY * normalY) / 100;
            
            if (speed < 0) return; // Objects moving apart
            
            this.vx -= speed * normalX;
            this.vy -= speed * normalY;
            other.vx += speed * normalX;
            other.vy += speed * normalY;
            
            // Add some randomness to prevent objects getting stuck
            this.vx += (Math.random() - 0.5) * 1;
            this.vy += (Math.random() - 0.5) * 1;
            other.vx += (Math.random() - 0.5) * 1;
            other.vy += (Math.random() - 0.5) * 1;
            
            // Ensure minimum speed
            if (Math.abs(this.vx) < 0.5) this.vx = this.vx > 0 ? 0.001 : -0.001;
            if (Math.abs(this.vy) < 0.5) this.vy = this.vy > 0 ? 0.001 : -0.001;
            if (Math.abs(other.vx) < 0.5) other.vx = other.vx > 0 ? 0.001 : -0.001;
            if (Math.abs(other.vy) < 0.5) other.vy = other.vy > 0 ? 0.001 : -0.001;
        }
    }
}

// Initialize the simulation
const container = document.querySelector('.about-section .img');
const elements = document.querySelectorAll('.about-section .img span');
const bouncingElements = [];
console.log(container)
const containerWidth = container.clientWidth;
const containerHeight = container.clientHeight;

// Create bouncing element objects
elements.forEach(element => {
    bouncingElements.push(new BouncingElement(element, containerWidth, containerHeight));
});

// Animation loop
export function animate() {
    // Move all elements
    bouncingElements.forEach(element => {
        element.move();
    });
    
    // Check collisions between all pairs
    for (let i = 0; i < bouncingElements.length; i++) {
        for (let j = i + 1; j < bouncingElements.length; j++) {
            bouncingElements[i].checkCollision(bouncingElements[j]);
        }
    }
    
    requestAnimationFrame(animate);
}
        

