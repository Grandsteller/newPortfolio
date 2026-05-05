/* ── PARTICLES ── */
const particlesEl = document.getElementById('particles');
for (let i = 0; i < 18; i++) {
  const p = document.createElement('div');
  p.className = 'particle';
  const size = Math.random() * 8 + 3;
  p.style.cssText = `
    width:${size}px; height:${size}px;
    left:${Math.random()*100}%;
    animation-duration:${Math.random()*15+10}s;
    animation-delay:${Math.random()*10}s;
    opacity:${Math.random()*0.15};
  `;
  particlesEl.appendChild(p);
}

/* ── TYPEWRITER ── */
const words = ['Web Applications.', 'RESTful APIs.', 'Scalable Systems.', 'Clean Code.', 'Great Products.'];
let wi = 0, ci = 0, del = false;
const tw = document.getElementById('typewriter');
function type() {
  const word = words[wi];
  if (!del) {
    tw.textContent = word.slice(0, ++ci);
    if (ci === word.length) { del = true; setTimeout(type, 1800); return; }
  } else {
    tw.textContent = word.slice(0, --ci);
    if (ci === 0) { del = false; wi = (wi + 1) % words.length; setTimeout(type, 400); return; }
  }
  setTimeout(type, del ? 55 : 90);
}
type();

/* ── NAVBAR SCROLL ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  updateActiveNav();
});

function updateActiveNav() {
  const sections = ['home', 'about', 'skills', 'contact'];
  const links = document.querySelectorAll('.nav-links a');
  let current = 'home';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 120) current = id;
  });
  links.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + current);
  });
}

/* ── HAMBURGER ── */
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => document.getElementById('navLinks').classList.remove('open'));
});

/* ── TABS ── */
function showTab(name, btn) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + name).classList.add('active');
  btn.classList.add('active');
  animateFadeUp();
}

/* ── FADE-UP OBSERVER ── */
function animateFadeUp() {
  document.querySelectorAll('.fade-up').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) el.classList.add('visible');
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

/* ── SKILL BARS ── */
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-category').forEach(el => skillObserver.observe(el));

/* ── EMAILJS INIT ── */
emailjs.init('7WmlmkB4PpZ4CgS5h');

/* ── CONTACT FORM ── */
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.btn-send');
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  btn.disabled = true;

  emailjs.sendForm('service_oqcxhs8', 'template_3uki52n', e.target)
    .then(() => {
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      btn.disabled = false;
      e.target.reset();
      showToast(true);
    }, () => {
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      btn.disabled = false;
      showToast(false);
    });
}

function showToast(success) {
  const toast = document.getElementById('toast');
  if (success) {
    toast.innerHTML = '<i class="fas fa-check-circle"></i> Message sent! I\'ll get back to you shortly.';
    toast.style.background = '';
  } else {
    toast.innerHTML = '<i class="fas fa-times-circle"></i> Failed to send. Please try again.';
    toast.style.background = '#e74c3c';
  }
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}
