import './style.css';
import { createIcons, icons } from 'lucide';
import Lenis from 'lenis';
import { pages } from './pages';

// Layout Structure
const sidebarNavItems = [
    { id: 'home', icon: 'layout-dashboard', label: 'Dashboard' },
    { id: 'learningRoadmap', icon: 'map', label: 'Learning Roadmap' },
    { id: 'agentLab', icon: 'flask-conical', label: 'Agent Lab' },
    { id: 'agentIdeas', icon: 'list', label: '50 Agent Ideas' },
    { id: 'startupEngine', icon: 'rocket', label: 'Startup Idea Engine' },
    { id: 'unicornModels', icon: 'gem', label: 'Unicorn Models' },
    { id: 'founderHabits', icon: 'activity', label: 'Founder Habits' },
    { id: 'executionSystem', icon: 'calendar-check', label: 'Execution System' },
    { id: 'weeklyReview', icon: 'rotate-cw', label: 'Weekly Review' },
    { id: 'library', icon: 'book', label: 'Founder Library' },
    { id: 'admin', icon: 'shield', label: 'Admin Panel', adminOnly: true }
];

document.addEventListener('DOMContentLoaded', () => {
    const contentArea = document.getElementById('content-area');
    const pageTitle = document.getElementById('page-title');
    const sidebarNav = document.getElementById('sidebar-nav');

    // Initialize smooth scrolling
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        wrapper: document.getElementById('main-scroll'),
        content: document.getElementById('main-scroll').firstElementChild,
        infinite: false,
        syncTouch: true
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    let activePage = 'home';

    // Render Sidebar
    function renderSidebar() {
        sidebarNav.innerHTML = '';

        // Grouping: you could optionally add group headers, but keeping it simple for Stripe/Vercel feel
        sidebarNavItems.forEach(item => {
            const btn = document.createElement('button');
            btn.className = `saas-nav-item w-full text-left ${activePage === item.id ? 'active' : ''}`;
            btn.innerHTML = `<i data-lucide="${item.icon}" class="w-4 h-4"></i> <span>${item.label}</span>`;

            btn.addEventListener('click', () => {
                loadPage(item.id);
                // Update active class
                document.querySelectorAll('.saas-nav-item').forEach(el => el.classList.remove('active'));
                btn.classList.add('active');

                // Reset scroll
                lenis.scrollTo(0, { immediate: true });
            });

            sidebarNav.appendChild(btn);
        });

        createIcons({ icons });
    }

    // Load Page Content
    function loadPage(pageId) {
        const pageData = pages[pageId];
        if (!pageData) return;

        activePage = pageId;
        pageTitle.textContent = pageData.title;

        // Animate out previous content (simple fade logic inside css keyframes)
        contentArea.innerHTML = pageData.render();

        // Re-initialize icons inside new content
        createIcons({ icons });

        // Fire mount events if any (e.g. charts)
        if (pageData.onMount) {
            setTimeout(pageData.onMount, 50); // small delay to ensure DOM is ready
        }
    }

    // Initial load
    renderSidebar();
    loadPage('home');
});
