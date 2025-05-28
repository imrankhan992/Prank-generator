import React, { useEffect, useRef } from 'react';
import '../styles/components/Confetti.css';

const Confetti = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Confetti parameters
    const confettiCount = 200;
    const gravity = 0.5;
    const terminalVelocity = 5;
    const drag = 0.075;
    const colors = [
      { front: '#4E67E8', back: '#364FC7' },
      { front: '#49CC5C', back: '#2B9348' },
      { front: '#F87171', back: '#DC2626' },
      { front: '#FBBF24', back: '#D97706' },
      { front: '#A78BFA', back: '#7C3AED' }
    ];
    
    // Confetti class
    class Confetto {
      constructor() {
        this.randomize();
      }
      
      randomize() {
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.dimensions = {
          x: Math.random() * 10 + 5,
          y: Math.random() * 5 + 5
        };
        this.position = {
          x: Math.random() * canvas.width,
          y: -Math.random() * canvas.height - 20
        };
        this.rotation = Math.random() * 2 * Math.PI;
        this.scale = { x: 1, y: 1 };
        this.velocity = {
          x: Math.random() * 25 - 12.5,
          y: Math.random() * 10 + 3
        };
      }
      
      update() {
        // Apply forces
        this.velocity.x -= this.velocity.x * drag;
        this.velocity.y = Math.min(this.velocity.y + gravity, terminalVelocity);
        this.velocity.y -= this.velocity.y * drag;
        
        // Update position
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        
        // Rotation
        this.rotation += 0.01;
        
        // Reset if out of bounds
        if (
          this.position.y >= canvas.height ||
          this.position.x <= -100 ||
          this.position.x >= canvas.width + 100
        ) {
          this.randomize();
          this.position.y = -20;
        }
      }
      
      draw() {
        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.rotation);
        
        // Draw confetto
        const width = this.dimensions.x * this.scale.x;
        const height = this.dimensions.y * this.scale.y;
        
        ctx.fillStyle = this.color.front;
        ctx.fillRect(-width / 2, -height / 2, width, height);
        
        ctx.restore();
      }
    }
    
    // Create confetti
    const confetti = Array.from({ length: confettiCount }, () => new Confetto());
    
    // Animation loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      confetti.forEach(confetto => {
        confetto.update();
        confetto.draw();
      });
      
      animationFrameId = window.requestAnimationFrame(render);
    };
    
    render();
    
    // Cleanup
    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="confetti-canvas"></canvas>;
};

export default Confetti;