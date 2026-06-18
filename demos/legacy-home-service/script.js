/* ============================================================
   LEGACY HOME SERVICE — script.js
   ============================================================ */

/* ---------- Navbar scroll state ---------- */
const navbar = document.getElementById('navbar');
const topBarH = document.querySelector('.top-bar')?.offsetHeight || 32;

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// Offset navbar below the top bar on page load
navbar.style.top = topBarH + 'px';
window.addEventListener('resize', () => {
  navbar.style.top = (document.querySelector('.top-bar')?.offsetHeight || 32) + 'px';
});

/* ---------- Mobile nav toggle ---------- */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

// Close on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', false);
    document.body.style.overflow = '';
  });
});

/* ---------- Hero video fade-in ---------- */
const heroVideo = document.querySelector('.hero-video');
if (heroVideo) {
  const markLoaded = () => heroVideo.classList.add('loaded');
  if (heroVideo.readyState >= 3) {
    markLoaded();
  } else {
    heroVideo.addEventListener('canplay', markLoaded, { once: true });
    // Fallback: show after 3s even if video hasn't loaded
    setTimeout(markLoaded, 3000);
  }
}

/* ---------- Gallery filter tabs ---------- */
const tabBtns    = document.querySelectorAll('.tab-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.tab;
    galleryItems.forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

/* ---------- Contact form ---------- */
const form        = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

form.addEventListener('submit', e => {
  e.preventDefault();

  // Simple required field check
  const name  = form.querySelector('#name').value.trim();
  const phone = form.querySelector('#phone').value.trim();

  if (!name || !phone) {
    // Shake the empty fields
    [form.querySelector('#name'), form.querySelector('#phone')].forEach(el => {
      if (!el.value.trim()) {
        el.style.borderColor = '#c0392b';
        el.addEventListener('input', () => { el.style.borderColor = ''; }, { once: true });
      }
    });
    return;
  }

  // Simulate submission
  const submitBtn = form.querySelector('[type="submit"]');
  submitBtn.textContent = 'Sending…';
  submitBtn.disabled = true;

  setTimeout(() => {
    form.reset();
    submitBtn.textContent = 'Send Message';
    submitBtn.disabled = false;
    formSuccess.classList.add('visible');
    setTimeout(() => formSuccess.classList.remove('visible'), 6000);
  }, 900);
});

/* ---------- Scroll-reveal animations ---------- */
const revealEls = document.querySelectorAll('.reveal, .stagger');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => observer.observe(el));

// Add reveal classes to key sections dynamically
document.querySelectorAll('.service-card, .why-card, .gallery-item').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

document.querySelectorAll('.about-grid, .area-grid, .contact-grid').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

/* ---------- Footer year ---------- */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---------- Smooth scroll offset for fixed navbar ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = navbar.offsetHeight + 16;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
