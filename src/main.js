import './style.css';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. LENIS SMOOTH SCROLL (120FPS feel)
  // ==========================================
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom ease out
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Sync GSAP ScrollTrigger with Lenis
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0, 0);

  // ==========================================
  // 2. THEME TOGGLE
  // ==========================================
  const themeToggleGrp = document.getElementById('theme-toggle');
  const htmlEl = document.documentElement;
  const savedTheme = localStorage.getItem('founder-os-theme') || 'dark';
  htmlEl.setAttribute('data-theme', savedTheme);

  themeToggleGrp.addEventListener('click', () => {
    const currentTheme = htmlEl.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlEl.setAttribute('data-theme', newTheme);
    localStorage.setItem('founder-os-theme', newTheme);
  });

  // ==========================================
  // 3. GSAP SCROLL REVEALS
  // ==========================================
  const revealElements = document.querySelectorAll('.section-reveal');

  // Set initial state
  gsap.set(revealElements, {
    y: 40,
    opacity: 0,
    visibility: 'visible'
  });

  revealElements.forEach((el) => {
    gsap.to(el, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      }
    });
  });

  // ==========================================
  // 4. MAGNETIC 3D HOVER (Institutional Polish)
  // ==========================================
  const interactiveCards = document.querySelectorAll('.interactive-card, .architect-card, .cta-card');

  interactiveCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element.
      const y = e.clientY - rect.top;  // y position within the element.

      // Pass coordinates to CSS custom properties for radial glow
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // 3D Tilt calculation (subtle, ~5 degrees max)
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;

      gsap.to(card, {
        rotationX: rotateX,
        rotationY: rotateY,
        duration: 0.5,
        ease: 'power2.out',
        transformPerspective: 1000,
        transformOrigin: "center center"
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.3)'
      });
    });
  });

  // ==========================================
  // 5. CANVAS BACKGROUND (Subtle Node network)
  // ==========================================
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  // Debounce resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }, 200);
  });

  const nodes = [];
  const numNodes = width > 768 ? 50 : 25;

  for (let i = 0; i < numNodes; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 1.5 + 0.5
    });
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    const isLightMode = htmlEl.getAttribute('data-theme') === 'light';
    const nodeColor = isLightMode ? 'rgba(17, 24, 39, 0.3)' : 'rgba(237, 237, 237, 0.2)';
    const lineColor = isLightMode ? 'rgba(17, 24, 39, ' : 'rgba(237, 237, 237, ';

    for (let i = 0; i < numNodes; i++) {
      let node = nodes[i];

      node.x += node.vx;
      node.y += node.vy;

      if (node.x < 0 || node.x > width) node.vx *= -1;
      if (node.y < 0 || node.y > height) node.vy *= -1;

      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = nodeColor;
      ctx.fill();

      for (let j = i + 1; j < numNodes; j++) {
        let node2 = nodes[j];
        let dx = node.x - node2.x;
        let dy = node.y - node2.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(node2.x, node2.y);
          const opacity = 1 - (dist / 150);
          ctx.strokeStyle = `${lineColor}${opacity * 0.15})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }

  draw();

  // Terminal Typing effect setup
  const terminalLines = document.querySelectorAll('.terminal-body code span:not(.comment)');
  gsap.from(terminalLines, {
    opacity: 0,
    y: 10,
    stagger: 0.1,
    duration: 0.5,
    ease: "power2.out",
    scrollTrigger: {
      trigger: '.terminal-mockup',
      start: 'top 80%',
    }
  });

});
