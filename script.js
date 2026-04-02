// Tabs
function switchTab(id) {
  document.querySelectorAll('.tab-btn').forEach((btn,i) => {
    btn.classList.remove('active');
    if(btn.getAttribute('onclick').includes(id)) btn.classList.add('active');
  });
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  document.getElementById('tab-'+id).classList.add('active');
}

// Modal
function openModal() {
  document.getElementById('modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  document.getElementById('modal').classList.remove('open');
  document.body.style.overflow = '';
}
function handleOverlayClick(e) {
  if(e.target === document.getElementById('modal')) closeModal();
}
function submitForm() {
  document.getElementById('modal-form').style.display = 'none';
  document.getElementById('success-msg').style.display = 'block';
  setTimeout(closeModal, 2800);
}

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Nav active state on scroll
document.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  nav.style.boxShadow = window.scrollY > 20 ? '0 2px 24px rgba(10,14,26,0.08)' : '';
});
