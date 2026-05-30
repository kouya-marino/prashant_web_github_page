/* ============================================
   Prashant Rawat Portfolio - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // --- Initialize AOS (Animate On Scroll) ---
  AOS.init({
    duration: 800,
    easing: 'ease-out',
    once: true,
    offset: 80,
    disable: 'mobile'
  });

  // --- Mobile Navigation Toggle ---
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('.site-nav');
  const navLinks = document.querySelectorAll('.nav-list a');

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', function () {
      const isOpen = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isOpen);
      siteNav.classList.toggle('open');
    });

    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.setAttribute('aria-expanded', 'false');
        siteNav.classList.remove('open');
      });
    });
  }

  // --- Header scroll effect ---
  const header = document.querySelector('.site-header');

  function updateHeader() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // --- Active nav highlighting based on scroll position ---
  const sections = document.querySelectorAll('section[id]');

  function highlightNav() {
    var scrollPos = window.scrollY + 100;

    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');
      var link = document.querySelector('.nav-list a[href="#' + id + '"]');

      if (link) {
        if (scrollPos >= top && scrollPos < top + height) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });
  highlightNav();

  // --- Back to Top button ---
  var backToTop = document.querySelector('.back-to-top');

  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, { passive: true });

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Generic filter (works for portfolio projects + blog cards) ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const filterableItems = document.querySelectorAll('.project-row, .blog-card');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const filter = this.dataset.filter;

      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');

      filterableItems.forEach(function (item) {
        if (filter === 'all' || item.dataset.category === filter) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // --- Pip install copy buttons ---
  document.querySelectorAll('.pip-install').forEach(function (block) {
    var btn = block.querySelector('.copy-btn');
    var code = block.querySelector('code');
    if (btn && code) {
      btn.addEventListener('click', function () {
        navigator.clipboard.writeText(code.textContent).then(function () {
          btn.innerHTML = '<i class="fas fa-check"></i>';
          btn.classList.add('copied');
          setTimeout(function () {
            btn.innerHTML = '<i class="fas fa-copy"></i>';
            btn.classList.remove('copied');
          }, 2000);
        });
      });
    }
  });

  // --- Contact form handling ---
  var contactForm = document.getElementById('contactForm');
  var formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      var action = contactForm.getAttribute('action');

      if (!action || action.includes('your-form-id')) {
        e.preventDefault();
        if (formStatus) {
          formStatus.textContent = 'Form not configured yet. Please reach out directly at prashantrawatmailbox@gmail.com';
          formStatus.className = 'form-status error';
        }
        return;
      }

      // Show sending state
      var submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      }
    });
  }
});
