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
  // Reset form/success state for next open
  setTimeout(() => {
    const modalForm = document.getElementById('modal-form');
    const successMsg = document.getElementById('success-msg');
    if (modalForm) modalForm.style.display = '';
    if (successMsg) successMsg.style.display = '';
  }, 300);
}
function handleOverlayClick(e) {
  if(e.target === document.getElementById('modal')) closeModal();
}
// Formspree AJAX submission
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('waitlist-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = document.getElementById('waitlist-submit-btn');
    const originalText = btn.textContent;
    btn.textContent = 'Sending…';
    btn.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (response.ok) {
        form.reset();
        document.getElementById('modal-form').style.display = 'none';
        document.getElementById('success-msg').style.display = 'block';
        setTimeout(closeModal, 3000);
      } else {
        const data = await response.json().catch(() => ({}));
        const msg = (data.errors && data.errors.map(err => err.message).join(', ')) || 'Submission failed. Please try again.';
        alert(msg);
        btn.textContent = originalText;
        btn.disabled = false;
      }
    } catch {
      alert('Network error. Please check your connection and try again.');
      btn.textContent = originalText;
      btn.disabled = false;
    }
  });
});

// kept for backward compat (no longer called by any button)
function submitForm() {}

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
