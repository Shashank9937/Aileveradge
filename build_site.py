import json

css = """
:root {
  --void: #020408;
  --deep: #040c14;
  --panel: #0a1a2e;
  --accent: #00b4ff;
  --accent-hot: #00e5ff;
  --amber: #ffaa00;
  --green: #00ff9d;
  --purple: #9b5cff;
  --red: #ff3d5a;
  --text: #c8dff0;
  --text-dim: rgba(200,223,240,0.5);
  --text-bright: #ffffff;
}
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: 'Inter', sans-serif;
  background-color: var(--void);
  color: var(--text);
  line-height: 1.7;
  overflow-x: hidden;
  font-weight: 300;
  cursor: none; /* custom cursor */
}
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: var(--void); }
::-webkit-scrollbar-thumb { background: rgba(0,180,255,0.3); border-radius: 5px; }
::-webkit-scrollbar-thumb:hover { background: var(--accent); }

h1, h2, h3, h4, h5, h6 { font-family: 'Syne', sans-serif; font-weight: 800; color: var(--text-bright); }
.mono { font-family: 'Space Mono', monospace; text-transform: uppercase; letter-spacing: 0.15em; }

#starfield { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: -1; pointer-events: none; }

.cursor-dot {
  position: fixed; top: 0; left: 0; width: 8px; height: 8px; background: var(--accent-hot);
  border-radius: 50%; pointer-events: none; z-index: 9999;
  transform: translate(-50%, -50%); box-shadow: 0 0 10px var(--accent-hot);
}
.cursor-ring {
  position: fixed; top: 0; left: 0; width: 36px; height: 36px; border: 1px solid var(--accent-hot);
  border-radius: 50%; pointer-events: none; z-index: 9998;
  transform: translate(-50%, -50%); box-shadow: 0 0 15px rgba(0,229,255,0.3);
  transition: width 0.2s, height 0.2s;
}

nav {
  position: fixed; top: 0; width: 100%; display: flex; justify-content: space-between; align-items: center;
  padding: 1rem 2rem; background: rgba(2,4,8,0.8); backdrop-filter: blur(8px);
  z-index: 100; border-bottom: 1px solid rgba(200,223,240,0.1);
}
.logo { font-size: 1.2rem; font-weight: 800; color: var(--text-bright); }
.logo span { color: var(--accent); }
.nav-links { display: flex; gap: 2rem; }
.nav-links a { color: var(--text); text-decoration: none; font-size: 0.6rem; transition: color 0.3s; }
.nav-links a:hover { color: var(--accent-hot); }
.btn {
  background: var(--accent); color: var(--void); padding: 0.8rem 1.5rem; text-decoration: none;
  border-radius: 4px; font-weight: 700; transition: all 0.3s; display: inline-block; border: 1px solid var(--accent);
}
.btn:hover { background: var(--accent-hot); box-shadow: 0 0 15px var(--accent-hot); transform: translateY(-2px); }
.btn-ghost { background: transparent; color: var(--accent); border: 1px solid var(--accent); }
.btn-ghost:hover { background: rgba(0,180,255,0.1); color: var(--accent-hot); border-color: var(--accent-hot); }

section { padding: 6rem 2rem; max-width: 1200px; margin: 0 auto; position: relative; }
.alt-bg { background-color: var(--deep); max-width: 100%; border-top: 1px solid rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.05); }
.alt-bg-inner { max-width: 1200px; margin: 0 auto; padding: 6rem 2rem; }

.hero { min-height: 100vh; display: flex; flex-direction: column; justify-content: center; position: relative; }
.hero h1 { font-size: clamp(3.5rem, 9vw, 9rem); line-height: 1; margin-bottom: 1rem; }
.hero-gradient { background: linear-gradient(90deg, var(--accent), var(--purple)); -webkit-background-clip: text; color: transparent; }
.hero p { font-size: 1.25rem; max-width: 600px; margin-bottom: 2.5rem; color: var(--text-dim); }
.hero-buttons { display: flex; gap: 1rem; margin-bottom: 4rem; }
.stats-row { display: flex; gap: 3rem; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 2rem; flex-wrap: wrap; }
.stat strong { color: var(--text-bright); display: block; font-size: 2rem; font-family: 'Syne'; }
.stat span { font-size: 0.75rem; color: var(--accent); }
.orb { position: absolute; border-radius: 50%; filter: blur(60px); opacity: 0.4; z-index: -1; animation: float 10s infinite alternate; }
.orb-1 { width: 300px; height: 300px; background: var(--accent); top: 10%; right: 10%; }
.orb-2 { width: 250px; height: 250px; background: var(--purple); bottom: 20%; left: 5%; animation-delay: -5s; }
.orb-3 { width: 200px; height: 200px; background: var(--deep); top: 40%; left: 40%; }
@keyframes float { 100% { transform: translate(30px, 30px); } }

.ticker-wrap { width: 100%; overflow: hidden; border-top: 1px solid var(--text-dim); border-bottom: 1px solid var(--text-dim); padding: 1rem 0; background: var(--deep); }
.ticker { white-space: nowrap; font-family: 'Space Mono'; font-size: 0.8rem; color: var(--accent); display: inline-block; animation: ticker 20s linear infinite; }
.ticker.reverse { animation-direction: reverse; color: var(--purple); }
.ticker span { margin: 0 2rem; }
@keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
.grid-auto { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; }

.card { background: var(--panel); border: 1px solid rgba(255,255,255,0.05); padding: 2rem; border-radius: 8px; position: relative; transition: all 0.3s; overflow: hidden; }
.card:hover { border-color: var(--accent); transform: translateY(-4px); box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
.card::before, .card::after { content: ''; position: absolute; left: 0; width: 100%; height: 2px; background: var(--accent); transform: scaleX(0); transition: transform 0.4s ease; }
.card-top-line::before { top: 0; transform-origin: left; }
.card-top-line:hover::before { transform: scaleX(1); }
.card-bottom-line::after { bottom: 0; transform-origin: right; }
.card-bottom-line:hover::after { transform: scaleX(1); }

.pill { display: inline-block; padding: 0.25rem 0.75rem; border-radius: 50px; font-size: 0.65rem; font-family: 'Space Mono'; color: var(--void); font-weight: bold; }
.pill-green { background: var(--green); }
.pill-amber { background: var(--amber); }
.pill-red { background: var(--red); border: 1px solid var(--red); color: var(--text-bright); background: transparent; }

h2 { font-size: clamp(2.5rem, 5vw, 4rem); margin-bottom: 3rem; }
.section-desc { font-size: 1.2rem; margin-bottom: 3rem; max-width: 800px; color: var(--text-dim); }

table { width: 100%; border-collapse: collapse; margin-top: 2rem; }
th, td { text-align: left; padding: 1rem; border-bottom: 1px solid rgba(200,223,240,0.1); }
th { font-family: 'Space Mono'; color: var(--accent); font-size: 0.8rem; }
td { font-size: 0.95rem; }

.timeline { border-left: 2px solid rgba(200,223,240,0.1); padding-left: 2rem; position: relative; margin-top: 3rem; }
.timeline-item { position: relative; margin-bottom: 3rem; }
.timeline-dot { position: absolute; left: -2.6rem; top: 0; width: 1rem; height: 1rem; background: var(--void); border: 2px solid var(--accent); border-radius: 50%; transition: all 0.3s; }
.timeline-item:hover .timeline-dot { background: var(--accent); box-shadow: 0 0 10px var(--accent); }

.ghost-num { position: absolute; top: 1rem; right: 1rem; font-size: 4rem; font-weight: 800; color: rgba(255,255,255,0.03); font-family: 'Syne'; line-height: 1; point-events: none;}

.chip { background: var(--panel); border: 1px solid rgba(255,255,255,0.1); padding: 1rem; border-radius: 6px; }
.chip-cat { color: var(--purple); font-size: 0.6rem; display: block; margin-bottom: 0.5rem; }

.prompt-block { background: var(--panel); border-left: 3px solid var(--accent); padding: 2rem; margin-bottom: 1.5rem; position: relative; }
pre { background: #010204; padding: 1.5rem; border-radius: 6px; overflow-x: auto; color: #a8c7fa; font-size: 0.9rem; margin-top: 1rem; }
.c-amber { color: var(--amber); }
.c-cyan { color: var(--accent-hot); }

.mistake-card { border: 1px solid rgba(255,61,90,0.15); }
.mistake-fix { margin-top: 1rem; padding-top: 1rem; border-top: 1px dotted rgba(255,255,255,0.1); color: var(--green); font-size: 0.85rem; }

footer { display: flex; justify-content: space-between; padding: 3rem 2rem; border-top: 1px solid rgba(255,255,255,0.1); margin-top: 4rem; }

.reveal { opacity: 0; transform: translateY(32px); transition: opacity 0.7s ease, transform 0.7s ease; }
.reveal.visible { opacity: 1; transform: translateY(0); }

@media (max-width: 768px) {
  .nav-links { display: none; }
  .grid-2, .grid-3 { grid-template-columns: 1fr; }
  .hero-buttons { flex-direction: column; }
  section { padding: 4rem 1rem; }
  .alt-bg-inner { padding: 4rem 1rem; }
  .timeline { padding-left: 1.5rem; }
  .timeline-dot { left: -1.9rem; }
}
"""

js = """
// Custom Cursor
const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;
let isHovering = false;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX; mouseY = e.clientY;
  dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
});

const interactiveElements = document.querySelectorAll('a, button, .card');
interactiveElements.forEach(el => {
  el.addEventListener('mouseenter', () => isHovering = true);
  el.addEventListener('mouseleave', () => isHovering = false);
});

function animateCursor() {
  ringX += (mouseX - ringX) * 0.15;
  ringY += (mouseY - ringY) * 0.15;
  ring.style.transform = `translate(calc(${ringX}px - 50%), calc(${ringY}px - 50%))`;
  if (isHovering) {
    ring.style.width = '50px'; ring.style.height = '50px';
  } else {
    ring.style.width = '36px'; ring.style.height = '36px';
  }
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Starfield Canvas
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;
const stars = [];

for(let i=0; i<200; i++) {
  stars.push({
    x: Math.random() * w, y: Math.random() * h,
    r: Math.random() * 1.5, o: Math.random(),
    s: Math.random() * 0.05
  });
}

window.addEventListener('resize', () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; });

let counter = 0;
function drawStars() {
  ctx.clearRect(0,0,w,h);
  const scrollY = window.scrollY;
  counter += 0.05;
  
  stars.forEach(star => {
    let py = star.y - scrollY * 0.15;
    if (py < 0) py = h - (-py % h);
    if (py > h) py = py % h;
    
    star.x -= star.s;
    if(star.x < 0) star.x = w;
    
    ctx.beginPath();
    ctx.arc(star.x, py, star.r, 0, Math.PI*2);
    ctx.fillStyle = `rgba(255,255,255,${star.o * (0.5 + Math.sin(counter + star.x)*0.5)})`;
    ctx.fill();
  });
  requestAnimationFrame(drawStars);
}
drawStars();

// Scroll Reveals
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

reveals.forEach((el, i) => {
  el.style.transitionDelay = `${(i % 5) * 60}ms`;
  observer.observe(el);
});
"""

def make_panel(num, title, desc, icon):
    return f"""<div class="card card-top-line reveal">
        <div class="mono" style="margin-bottom:1rem;color:var(--accent);">0{num}</div>
        <h3>{title}</h3>
        <p style="margin-top:1rem;font-size:0.9rem;">{desc}</p>
        <div style="position:absolute;bottom:1.5rem;right:1.5rem;font-size:1.5rem;">{icon}</div>
    </div>"""

def make_agent(diff, diff_class, icon, type_label, name, desc, points):
    lis = "".join([f"<li>→ {p}</li>" for p in points])
    return f"""<div class="card card-bottom-line reveal">
    <div style="display:flex;justify-content:space-between;align-items:start;">
        <span class="pill pill-{diff_class}">{diff}</span>
        <span style="font-size:1.5rem;">{icon}</span>
    </div>
    <div class="mono" style="font-size:0.6rem;color:var(--purple);margin:1rem 0;">{type_label}</div>
    <h3 style="margin-bottom:0.5rem;">{name}</h3>
    <p style="font-size:0.85rem;margin-bottom:1rem;">{desc}</p>
    <ul style="list-style:none;font-size:0.8rem;color:var(--text-dim);">{lis}</ul>
    </div>"""

def make_biz(model_num, title, price, sub, color, desc, steps):
    span_class = ""
    if model_num == 5: span_class = 'style="grid-column: 1 / -1"'
    lis = "".join([f"<li style='margin-bottom:0.5rem;font-size:0.85rem;'>{i+1}. {s}</li>" for i,s in enumerate(steps)])
    return f"""<div class="card reveal" {span_class} style="border-left:4px solid {color}">
    <div class="mono" style="color:var(--text-dim);font-size:0.75rem;margin-bottom:0.5rem;">MODEL 0{model_num}</div>
    <h3 style="margin-bottom:1rem;">{title}</h3>
    <div style="color:{color};font-size:2rem;font-family:'Syne';font-weight:800;line-height:1;">{price}</div>
    <div style="font-size:0.75rem;color:var(--text-dim);margin-bottom:1rem;">{sub}</div>
    <p style="font-size:0.9rem;margin-bottom:1.5rem;">{desc}</p>
    <ul style="list-style:none;padding-top:1rem;border-top:1px solid rgba(255,255,255,0.1);">{lis}</ul>
    </div>"""

def make_tool(cat, name, desc):
    return f"""<div class="chip reveal">
    <span class="chip-cat mono">{cat}</span>
    <h4 style="margin-bottom:0.5rem;font-size:1.1rem;">{name}</h4>
    <p style="font-size:0.8rem;color:var(--text-dim);">{desc}</p>
    </div>"""

def make_error(num, title, desc, fix):
    return f"""<div class="card mistake-card reveal">
    <div style="display:flex;justify-content:space-between;">
        <span class="mono" style="color:var(--red);">ERROR {num}</span>
        <span>⚠️</span>
    </div>
    <h4 style="margin:1rem 0 0.5rem;">{title}</h4>
    <p style="font-size:0.85rem;">{desc}</p>
    <div class="mistake-fix">
        <span class="mono" style="display:block;margin-bottom:0.2rem;">FIX:</span>
        {fix}
    </div>
    </div>"""

agents_data = [
  ("BEGINNER", "green", "📧", "COMMUNICATIONS", "Email Triage Agent", "Sorts, categorizes, and drafts responses to inbound email based on priority and context.", ["Gmail/Outlook API", "Classification Prompt", "Drafting Logic"]),
  ("BEGINNER", "green", "🔍", "DATA COLLECTION", "Research Agent", "Takes a topic, searches the web, reads multiple sources, and synthesizes a structured report.", ["Search API (Tavily/SerpAPI)", "Scraping", "Summarization"]),
  ("INTERMEDIATE", "amber", "✍️", "CREATIVE", "Content Engine", "Repurposes a long-form video or audio transcript into multiple platform-native social posts.", ["Transcription", "Platform specific prompts", "Scheduling API"]),
  ("INTERMEDIATE", "amber", "🎯", "SALES", "Lead Qualification", "Engages inbound leads via chat or email, asks qualifying questions, and books meetings.", ["Webhook Web-chat", "Conversation Memory", "Calendar API"]),
  ("INTERMEDIATE", "amber", "📊", "ANALYTICS", "Marketing Intelligence", "Pulls ad data daily, analyzes CAC/ROAS anomalies, and sends Slack alerts with recommendations.", ["Ads API", "Data Analysis Prompt", "Slack Webhook"]),
  ("INTERMEDIATE", "amber", "💰", "FINANCE", "Financial Reporting", "Extracts data from receipts, invoices, and bank statements to auto-categorize expenses in Xero/QBO.", ["OCR (Vision)", "Accounting API", "Categorization DB"]),
  ("ADVANCED", "red", "🤝", "OPERATIONS", "Customer Onboarding", "Manages the entire post-sale setup: creates accounts, sends welcome sequences, answers technical queries.", ["CRM API", "Multi-step workflow", "Knowledge Base RAG"]),
  ("ADVANCED", "red", "🧑‍💼", "HR", "Hiring Pipeline", "Screens resumes, conducts initial asynchronous AI interviews, and ranks candidates based on criteria.", ["ATS Integration", "Scoring Logic", "Async Video/Audio Parsing"]),
  ("ADVANCED", "red", "📞", "SALES", "AI SDR", "Autonomous outbound prospector. Identifies targets, personalizes outreach at scale, handles objections.", ["LinkedIn/Apollo API", "Multi-channel sequence", "Objection Handling Matrix"]),
  ("EXPERT", "red", "🧠", "ORCHESTRATION", "Multi-Agent System", "A supervisor agent that breaks down a complex goal and delegates parts to specialized sub-agents.", ["LangGraph / CrewAI", "State Management", "Inter-agent Communication"])
]

html_parts = []
html_parts.append(f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ANTI-GRAVITY | AI Agent Business OS</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@700;800&display=swap" rel="stylesheet">
    <style>{css}</style>
</head>
<body>
    <div class="cursor-dot"></div><div class="cursor-ring"></div>
    <canvas id="starfield"></canvas>

    <nav>
        <div class="logo">ANTI<span>-</span>GRAVITY</div>
        <div class="nav-links">
            <a href="#learn">LEARN</a>
            <a href="#agents">AGENTS</a>
            <a href="#roadmap">ROADMAP</a>
            <a href="#business">BUSINESS</a>
            <a href="#tools">TOOLS</a>
            <a href="#prompts">PROMPTS</a>
        </div>
        <a href="#cta" class="btn mono" style="font-size:0.7rem;padding:0.6rem 1.2rem;">Start Building →</a>
    </nav>

    <section class="hero" id="home">
        <div class="orb orb-1"></div><div class="orb-2 orb"></div><div class="orb-3 orb"></div>
        <div class="reveal">
            <h1><span class="hero-gradient">ANTI</span><br>GRAVITY</h1>
            <p>Master AI Agents. Build Your Business. The elite blueprint for turning multi-agent systems into scalable leverage.</p>
            <div class="hero-buttons">
                <a href="#agents" class="btn">Explore Agents</a>
                <a href="#learn" class="btn btn-ghost">View Curriculum</a>
            </div>
            <div class="stats-row">
                <div class="stat"><strong>12+</strong><span class="mono">AGENT TYPES</span></div>
                <div class="stat"><strong>7</strong><span class="mono">CORE AUTOMATIONS</span></div>
                <div class="stat"><strong>90</strong><span class="mono">DAY ROADMAP</span></div>
                <div class="stat"><strong>5x</strong><span class="mono">OUTPUT LEVERAGE</span></div>
            </div>
        </div>
    </section>

    <div class="ticker-wrap"><div class="ticker">
        <span>AI SDRs</span>→<span>AUTOMATION</span>→<span>MULT-AGENT SWARMS</span>→<span>RAG ARCHITECTURE</span>→<span>LANGCHAIN</span>→<span>CREWAI</span>→<span>AUTOGPT</span>→<span>AI SDRs</span>
    </div></div>
""")

html_parts.append("""
    <section id="what">
        <div class="reveal">
            <h2 class="mono" style="font-size:1rem;color:var(--accent);margin-bottom:1rem;">01 // PARADIGM SHIFT</h2>
            <h2>What Are AI Agents?</h2>
            <p class="section-desc">Traditional software requires human operation. AI Chatbots require human prompting. <strong>AI Agents are autonomous systems that perceive their environment, make decisions, use tools, and execute actions to achieve a specific goal without human intervention.</strong></p>
        </div>
        
        <div class="grid-2">
""")
html_parts.append(make_panel(1, "Perception", "The ability to read inputs: emails, API payloads, vision (images), database changes, or user messages.", "👁️"))
html_parts.append(make_panel(2, "Brain", "The LLM routing engine that breaks down goals, plans steps, reasons about the current state, and decides what to do next.", "🧠"))
html_parts.append(make_panel(3, "Memory", "Vector databases and context window management to remember past interactions, rules, and user preferences.", "💾"))
html_parts.append(make_panel(4, "Tools", "The ability to act on the world: execute code, send emails, query databases, or call external APIs.", "🛠️"))

html_parts.append("""
        </div>

        <div class="reveal" style="margin-top:4rem;">
            <h3>Traditional Software vs AI Agents</h3>
            <table>
                <tr><th>Attribute</th><th>Traditional SaaS</th><th>AI Agent System</th></tr>
                <tr><td><strong>Input</strong></td><td>Strictly formatted data</td><td>Natural language, unstructured data</td></tr>
                <tr><td><strong>Execution</strong></td><td>Hardcoded If-Then-Else logic</td><td>Dynamic reasoning & planning</td></tr>
                <tr><td><strong>Outcome</strong></td><td>Deterministic</td><td>Probabilistic, adaptive</td></tr>
                <tr><td><strong>Human Role</strong></td><td>Operator</td><td>Supervisor / Approver</td></tr>
            </table>
        </div>
    </section>

    <div class="alt-bg"><div class="alt-bg-inner" id="learn">
        <div class="reveal">
            <h2 class="mono" style="font-size:1rem;color:var(--accent);margin-bottom:1rem;">02 // LEARNING SYSTEM</h2>
            <h2>How to Master Agents</h2>
            <p class="section-desc">Building autonomous systems requires a shift from writing code to engineering context and defining boundaries.</p>
        </div>
        <div class="grid-3">
""")

phases = [
  ("1", "Wk 1-2", "Prompt Engineering", ["Context Injection", "Chain of Thought", "Output Formatting"]),
  ("2", "Wk 3-4", "Basic Automation", ["No-code Tools (Make/n8n)", "API Fundamentals", "Webhooks"]),
  ("3", "Wk 5-6", "Agent Fundamentals", ["LLM Tool Calling", "Function Calling logic", "Error Handling"]),
  ("4", "Wk 7-8", "Memory & RAG", ["Vector Databases", "Embedding models", "Context Retrieval"]),
  ("5", "Wk 9-10", "Frameworks", ["LangChain Basics", "LangGraph routing", "State management"]),
  ("6", "Wk 11-12", "Multi-Agent Systems", ["CrewAI orchestration", "Supervisor models", "Delegation protocols"])
]
for p in phases:
    lis = "".join([f"<li>→ {item}</li>" for item in p[3]])
    html_parts.append(f"""<div class="card reveal"><div class="ghost-num">{p[0]}</div><div class="pill pill-green mono" style="margin-bottom:1rem;">{p[1]}</div><h3>{p[2]}</h3><ul style="list-style:none;font-size:0.9rem;margin-top:1rem;color:var(--text-dim);">{lis}</ul></div>""")

html_parts.append("""
        </div>
    </div></div>

    <section id="agents">
        <div class="reveal">
            <h2 class="mono" style="font-size:1rem;color:var(--accent);margin-bottom:1rem;">03 // ARCHITECTURE LAB</h2>
            <h2>Agent Types Archive</h2>
            <p class="section-desc">The 10 foundational agent architectures you need to understand to build AI automation businesses.</p>
        </div>
        <div class="grid-2">
""")
for a in agents_data:
    html_parts.append(make_agent(*a))

html_parts.append("""
        </div>
    </section>

    <div class="alt-bg"><div class="alt-bg-inner" id="roadmap">
        <div class="reveal">
            <h2 class="mono" style="font-size:1rem;color:var(--accent);margin-bottom:1rem;">04 // EXECUTION</h2>
            <h2>90-Day Roadmap</h2>
        </div>
        <div class="timeline">
""")
roadmap = [
    ("M1 W1", "Skill Acquisition: The API Layer", "Understand JSON, REST APIs, Postman. Set up OpenAI/Anthropic API keys."),
    ("M1 W2-3", "The Workflow Layer", "Build 3 complex automations in Make.com integrating Gmail, Sheets, and OpenAI."),
    ("M1 W4", "First Single-Task Agent", "Build an agent using Python/Node that extracts data and decides next steps without a hardcoded path."),
    ("M2 W1-2", "RAG & Memory Integration", "Connect your agent to a Pinecone vector database to give it long-term memory of company documents."),
    ("M2 W3-4", "Tool Calling Mastery", "Give your agent access to 5 custom tools (Search, Calendar API, Slack API, Calculator, Database Query)."),
    ("M3 W1-2", "Multi-Agent Orchestration", "Build a team of 3 agents (Researcher, Writer, Editor) using CrewAI or LangGraph to write a weekly newsletter autonomously."),
    ("M3 W3", "Productization", "Wrap your agent system in a clean UI (Streamlit, Vercel, or Chatbot widget) for non-technical users."),
    ("M3 W4", "Monetization Launch", "Pitch your first client on an AI-as-a-Service retainer or launch your SaaS wrapper.")
]
for r in roadmap:
    html_parts.append(f"""<div class="timeline-item reveal"><div class="timeline-dot"></div><div class="pill pill-amber mono" style="margin-bottom:0.5rem;">{r[0]}</div><h3 style="margin-bottom:0.5rem;">{r[1]}</h3><p style="font-size:0.9rem;color:var(--text-dim);">{r[2]}</p></div>""")

html_parts.append("""
        </div>
    </div></div>

    <section id="business">
        <div class="reveal">
            <h2 class="mono" style="font-size:1rem;color:var(--accent);margin-bottom:1rem;">05 // REVENUE</h2>
            <h2>Build a Business</h2>
        </div>
        <div class="grid-3">
""")
html_parts.append(make_biz(1, "AI-as-a-Service (AaaS)", "£1k-3k", "Per month / Retainer", "var(--accent)", "Manage and monitor custom AI systems for a client on an ongoing basis.", ["Audit client workflow", "Build bespoke Make/Agent flow", "Maintain and tweak prompts monthly"]))
html_parts.append(make_biz(2, "White-Label AI", "£500-2k", "Setup + Seat License", "var(--purple)", "Build an agent system once, sell it via a SaaS interface to a specific industry.", ["Find industry pain point", "Build specialized agent", "Sell software access"]))
html_parts.append(make_biz(3, "Consulting", "£200+", "Per hour", "var(--green)", "Architect strategy for larger businesses looking to integrate AI.", ["Executive AI Strategy", "Team training on prompt engineering", "Tech stack recommendations"]))
html_parts.append(make_biz(4, "Productized Systems", "£5k-15k", "Per build", "var(--amber)", "Done-for-you specific agent builds (e.g. 'We build your AI SDR').", ["Standardized offering", "Fixed timeline", "High margin delivery"]))
html_parts.append(make_biz(5, "Internal Leverage (The Ultimate Game)", "Priceless", "Infinite ROI", "var(--text-bright)", "Build agents for your own traditional business (e-commerce, agency) to vastly decrease costs and increase output.", ["Replace an admin role with an agent", "Automate lead generation", "Scale content 10x without hiring"]))

html_parts.append("""
        </div>
    </section>

    <div class="alt-bg"><div class="alt-bg-inner" id="tools">
        <div class="reveal">
            <h2 class="mono" style="font-size:1rem;color:var(--accent);margin-bottom:1rem;">06 // STACK</h2>
            <h2>Tools Stack</h2>
        </div>
        <div class="grid-auto">
""")
tools = [
 ("MODELS", "Claude 3.5 Sonnet", "Best overall reasoning and coding model currently available."),
 ("MODELS", "GPT-4o", "Excellent for specific multi-modal tasks and general API usage."),
 ("NO-CODE", "Make.com", "The superior visual automation builder for complex API logic."),
 ("NO-CODE", "n8n", "Self-hostable, developer-friendly automation tool."),
 ("FRAMEWORKS", "LangChain/LangGraph", "The industry standard for building context-aware agentic applications."),
 ("FRAMEWORKS", "CrewAI", "Framework for orchestrating role-playing, autonomous AI agents."),
 ("DATA", "Pinecone", "Managed vector database for fast similarity search applications."),
 ("DATA", "Supabase", "Open source Firebase alternative with great pgvector support."),
 ("TOOLS", "Firecrawl", "Turns entire websites into LLM-ready markdown data."),
 ("TOOLS", "Apify", "Platform for web scraping, data extraction, and web RPA tools."),
 ("OBSERVABILITY", "Helicone", "Open-source LLM observability platform to track API costs and latency.")
]
for t in tools: html_parts.append(make_tool(*t))

html_parts.append("""
        </div>
    </div></div>

    <section id="prompts">
        <div class="reveal">
            <h2 class="mono" style="font-size:1rem;color:var(--accent);margin-bottom:1rem;">07 // RESOURCES</h2>
            <h2>Prompt Library</h2>
        </div>
        
        <div class="prompt-block reveal"><div class="pill pill-green mono" style="margin-bottom:1rem;">SYSTEM PROMPT</div><h3>Agent Persona Definition</h3>
<pre><code>You are an elite <span class="c-amber">[ROLE]</span> expert.
Your primary objective is to <span class="c-amber">[GOAL]</span>.
You have access to the following tools:
<span class="c-cyan">- search_web</span>
<span class="c-cyan">- read_file</span>

Rules:
1. ALWAYS think step by step before acting.
2. If you lack context, ask the user or use a tool.
3. Your final output must be in <span class="c-amber">[FORMAT]</span> format only.</code></pre>
        </div>

        <div class="prompt-block reveal"><div class="pill pill-amber mono" style="margin-bottom:1rem;">CHAIN OF THOUGHT</div><h3>Complex Reasoning Guardrails</h3>
<pre><code>Before providing the final answer, create a section enclosed in &lt;thinking&gt; tags.
In this section:
1. Analyze the <span class="c-amber">[INPUT_DATA]</span>
2. Identify potential edge cases where automation might fail.
3. Outline the steps required.
4. Draft the <span class="c-amber">[DESIRED_OUTPUT]</span> structure.
Then, output the final result outside the tags.</code></pre>
        </div>
    </section>

    <div class="alt-bg"><div class="alt-bg-inner" id="mistakes">
        <div class="reveal">
            <h2 class="mono" style="font-size:1rem;color:var(--accent);margin-bottom:1rem;">08 // VULNERABILITIES</h2>
            <h2>Common Mistakes</h2>
        </div>
        <div class="grid-3">
""")
html_parts.append(make_error("01", "Over-Engineering the LLM", "Trying to make the LLM do math, regex, or deterministic logic.", "Use Python code or API tools for deterministic tasks. The LLM should only route and reason."))
html_parts.append(make_error("02", "Infinite Loops", "Agents getting stuck using the same tool over and over without progressing.", "Implement max_iterations limit and add a 'human_fallback' tool when unsure."))
html_parts.append(make_error("03", "Prompt Injection Risk", "Allowing user inputs to override system instructions.", "Sanitize inputs, use strong delimiters (XML tags), and consider a secondary LLM as a firewall/evaluator."))
html_parts.append(make_error("04", "Context Window Bloat", "Stuffing too much text into the prompt, causing the LLM to 'forget' instructions in the middle.", "Use strict chunking, RAG (Retrieval-Augmented Generation), and summarize past conversation history."))

html_parts.append("""
        </div>
    </div></div>

    <section id="cta" style="text-align:center; padding:8rem 2rem;">
        <div class="reveal">
            <h1 style="font-size:clamp(3rem, 6vw, 6rem);margin-bottom:1.5rem;" class="hero-gradient">Start Building Today.</h1>
            <p style="font-size:1.2rem;color:var(--text-dim);margin:0 auto 3rem;max-width:600px;">The AI leverage window is open. Those who build the automated systems will own the margin. Those who rely on manual execution will be priced out.</p>
            <div style="display:flex; gap:1rem; justify-content:center;">
                <a href="#" class="btn" style="padding:1rem 3rem;">Begin Phase 1</a>
            </div>
            
            <div style="margin-top:5rem;display:flex;justify-content:center;gap:2rem;flex-wrap:wrap;">
                <span class="mono" style="font-size:0.7rem;color:var(--text-dim);">RULE 01: Automate slowly.</span>
                <span class="mono" style="font-size:0.7rem;color:var(--text-dim);">RULE 02: Keep humans in the loop.</span>
                <span class="mono" style="font-size:0.7rem;color:var(--text-dim);">RULE 03: API over UI.</span>
                <span class="mono" style="font-size:0.7rem;color:var(--text-dim);">RULE 04: Own the data.</span>
            </div>
        </div>
    </section>

    <footer>
        <div class="logo">ANTI<span>-</span>GRAVITY</div>
        <div class="mono" style="font-size:0.7rem;color:var(--text-dim);">© 2026 AI LEVERAGE ARCHITECT.</div>
        <div class="nav-links">
            <a href="#home">HOME</a>
            <a href="#agents">AGENTS</a>
            <a href="#learn">LEARN</a>
        </div>
    </footer>

    <script>{js}</script>
</body>
</html>
""")

with open("anti-gravity.html", "w") as f:
    f.write("".join(html_parts))
print("Successfully generated anti-gravity.html")
