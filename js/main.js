/* =====================================================
   main.js — Leah Hoogstra personal website
   - Mobile nav toggle
   - Scroll-aware nav shadow
   - Active nav link highlighting
   ===================================================== */

(function () {
  'use strict';

  const nav = document.querySelector('.site-nav');
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-links a[href^="#"]');
  const sections = Array.from(links).map(l => document.querySelector(l.getAttribute('href')));

  // ----- Mobile nav toggle -----
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.classList.toggle('open');
      navLinks.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close mobile nav on link click
    navLinks.addEventListener('click', (e) => {
      if (e.target.matches('a')) {
        toggle.classList.remove('open');
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target)) {
        toggle.classList.remove('open');
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ----- Nav shadow on scroll -----
  function onScroll() {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 10);
    highlightActiveLink();
  }

  // ----- Active nav link -----
  function highlightActiveLink() {
    const scrollY = window.scrollY + 80; // offset for fixed nav

    let current = sections[0];
    sections.forEach(section => {
      if (section && section.offsetTop <= scrollY) {
        current = section;
      }
    });

    links.forEach(link => {
      link.classList.toggle(
        'active',
        current && link.getAttribute('href') === '#' + current.id
      );
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
})();
