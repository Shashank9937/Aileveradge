import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Theme Toggle Logic ---
  const themeToggleGrp = document.getElementById('theme-toggle');
  const htmlEl = document.documentElement;

  // Check saved theme or default to dark
  const savedTheme = localStorage.getItem('founder-os-theme') || 'dark';
  htmlEl.setAttribute('data-theme', savedTheme);

  themeToggleGrp.addEventListener('click', () => {
    const currentTheme = htmlEl.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlEl.setAttribute('data-theme', newTheme);
    localStorage.setItem('founder-os-theme', newTheme);
  });


  // --- 2. Intersection Observer for Scroll Animations ---
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.section-reveal').forEach(section => {
    observer.observe(section);
  });


  // --- 3. Dynamic Multi-Agent Architecture Animation (Canvas) ---
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Nodes representing agents
  const nodes = [];
  const numNodes = width > 768 ? 60 : 30;

  for (let i = 0; i < numNodes; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 1.5 + 0.5
    });
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    const isLightMode = htmlEl.getAttribute('data-theme') === 'light';
    const nodeColor = isLightMode ? 'rgba(17, 24, 39, 0.4)' : 'rgba(255, 255, 255, 0.4)';
    const lineColor = isLightMode ? 'rgba(17, 24, 39, ' : 'rgba(255, 255, 255, ';

    // Update and draw nodes
    for (let i = 0; i < numNodes; i++) {
      let node = nodes[i];

      node.x += node.vx;
      node.y += node.vy;

      // Bounce off walls
      if (node.x < 0 || node.x > width) node.vx *= -1;
      if (node.y < 0 || node.y > height) node.vy *= -1;

      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = nodeColor;
      ctx.fill();

      // Draw connections
      for (let j = i + 1; j < numNodes; j++) {
        let node2 = nodes[j];
        let dx = node.x - node2.x;
        let dy = node.y - node2.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(node2.x, node2.y);
          // Opacity based on distance
          const opacity = 1 - (dist / 120);
          ctx.strokeStyle = `${lineColor}${opacity * 0.2})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  draw();

  // --- 4. Terminal Mockup Auto-Type (optional micro-interaction) ---
  // Just keeping it static for now as requested by markup, or we could add simple type logic
});
