/* ============================================================
   MISSED CALLS TO CASH — Salon Demo Script
   ============================================================ */

// ── STICKY NAV ──
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ── MOBILE NAV ──
const navToggle = document.getElementById('nav-toggle');
const navMenu   = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  document.body.style.overflow = open ? 'hidden' : '';
});
navMenu.querySelectorAll('.nav-link').forEach(l => {
  l.addEventListener('click', () => {
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── SCROLL REVEAL ──
const revealTargets = document.querySelectorAll(
  '.problem-item, .solution-step, .feature-card, .chat-example, ' +
  '.ba-card, .revenue-item, .revenue-math, .faq-item, ' +
  '.callout-card, .demo-try-card, .chat-widget-placeholder, ' +
  '.section-label, .section-title, .section-intro'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 55);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

revealTargets.forEach(el => revealObserver.observe(el));

// ── FAQ ACCORDION ──
document.querySelectorAll('.faq-trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const isOpen = trigger.getAttribute('aria-expanded') === 'true';
    // close all
    document.querySelectorAll('.faq-trigger').forEach(t => {
      t.setAttribute('aria-expanded', 'false');
      t.nextElementSibling?.classList.remove('open');
    });
    // open clicked if it was closed
    if (!isOpen) {
      trigger.setAttribute('aria-expanded', 'true');
      trigger.nextElementSibling?.classList.add('open');
    }
  });
});

// ── CTA FORM ──
const ctaForm = document.getElementById('cta-form');
if (ctaForm) {
  ctaForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = ctaForm.querySelector('button[type="submit"]');
    const orig = btn.textContent;
    btn.textContent = 'Request Submitted! We\'ll Be in Touch ✦';
    btn.style.background = 'linear-gradient(135deg,#4ade80,#22c55e)';
    btn.style.color = '#fff';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = orig;
      btn.style.background = '';
      btn.style.color = '';
      btn.disabled = false;
      ctaForm.reset();
    }, 4000);
  });
}

// ── TRUST BAR DUPLICATE (for seamless loop) ──
const trustInner = document.querySelector('.trust-inner');
if (trustInner) {
  trustInner.innerHTML += trustInner.innerHTML;
}

// ── COUNTER ANIMATION ──
function animateCounter(el, target, duration = 1800) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { start = target; clearInterval(timer); }
    el.textContent = Math.floor(start).toLocaleString();
  }, 16);
}

// ── CHAT TYPING INDICATOR (demo enhancement) ──
// Adds a subtle pulsing dot to the last AI bubble every few seconds
function pulseAIBubble() {
  const bubbles = document.querySelectorAll('.cwp-bubble.ai');
  if (!bubbles.length) return;
  const last = bubbles[bubbles.length - 1];
  last.style.opacity = '0.7';
  setTimeout(() => { last.style.opacity = '1'; }, 500);
}
setInterval(pulseAIBubble, 4000);
