/* ============================================================
   SIBILIA SIDING — script.js
============================================================ */

// ── Nav: scroll-based background ──────────────────────────
const header = document.getElementById('site-header');

function updateHeader() {
  if (window.scrollY > 40) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

// ── Mobile menu toggle ─────────────────────────────────────
const navToggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');

navToggle.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ── Smooth scroll for all in-page anchor links ─────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = header.offsetHeight + 8;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ── Estimate form submit ───────────────────────────────────
const form = document.getElementById('estimate-form-el');
const formSuccess = document.getElementById('form-success');

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Simple required-field check
    const name = form.querySelector('#name').value.trim();
    const phone = form.querySelector('#phone').value.trim();

    if (!name || !phone) {
      // Highlight empty required fields
      [{ id: 'name', val: name }, { id: 'phone', val: phone }].forEach(({ id, val }) => {
        const el = form.querySelector('#' + id);
        if (!val) {
          el.style.borderColor = '#dc2626';
          el.addEventListener('input', () => { el.style.borderColor = ''; }, { once: true });
        }
      });
      return;
    }

    form.style.display = 'none';
    formSuccess.style.display = 'block';
    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

// ── File upload label update ───────────────────────────────
const fileInput = document.getElementById('photos');
const fileLabel = document.querySelector('.file-upload-label');

if (fileInput && fileLabel) {
  fileInput.addEventListener('change', () => {
    const count = fileInput.files.length;
    if (count === 0) {
      fileLabel.innerHTML = '<span>📷</span> Upload project photos (optional — helps us prepare your estimate)';
    } else {
      fileLabel.innerHTML = `<span>✅</span> ${count} photo${count > 1 ? 's' : ''} selected`;
    }
  });
}

// ── Intersection Observer: fade-in on scroll ───────────────
const fadeEls = document.querySelectorAll(
  '.service-card, .gallery-item, .why-list li, .trust-item'
);

document.head.insertAdjacentHTML('beforeend', `
  <style>.visible { opacity: 1 !important; transform: none !important; }</style>
`);

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0, rootMargin: '0px 0px 0px 0px' });

  fadeEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = `opacity 0.45s ease ${i * 0.06}s, transform 0.45s ease ${i * 0.06}s`;
    io.observe(el);
  });

  // Fallback: ensure all items are visible after 1.8s regardless
  setTimeout(() => {
    fadeEls.forEach(el => el.classList.add('visible'));
  }, 1800);
}

// ── Chat bubble stagger re-trigger on scroll into view ─────
const chatDemo = document.querySelector('.chat-demo');
const chatBubbles = document.querySelectorAll('.chat-bubble');

if (chatDemo && 'IntersectionObserver' in window) {
  let triggered = false;
  const chatIO = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !triggered) {
      triggered = true;
      chatBubbles.forEach(b => {
        b.style.opacity = '0';
        b.style.animation = 'none';
        void b.offsetWidth; // reflow
        b.style.animation = '';
      });
    }
  }, { threshold: 0.3 });
  chatIO.observe(chatDemo);
}
