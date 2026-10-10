/**
 * ALEX CARTER - PORTFOLIO INTERACTION ENGINE
 * Vanilla JavaScript (ES6+)
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. Data Store: Project Details
  // ==========================================
  const projectsData = {
    taskflow: {
      title: 'TaskFlow',
      subtitle: 'A productivity app for managing tasks and teams.',
      image: 'assets/images/project_taskflow.svg',
      tags: ['React', 'TypeScript', 'Tailwind CSS', 'Zustand', 'Chart.js'],
      description: 
        'TaskFlow is an enterprise-grade collaboration ecosystem built to simplify sprint management, task pipelines, and team velocity tracking. Designed from the ground up for high-velocity software engineering teams, it provides real-time updates, interactive Kanban views, and interactive burn-down charts.',
      highlights: [
        'Interactive Drag-and-drop Kanban workflow with smooth reordering',
        'Custom SVG data visualizations and sprint velocity graphs',
        'Optimistic UI state management with 0ms perceived latency',
        'Fully responsive layout tested across mobile, tablet, and ultra-wide displays'
      ],
      demoUrl: '#',
      repoUrl: 'https://github.com'
    },
    devblog: {
      title: 'DevBlog',
      subtitle: 'A minimal blog platform for developers.',
      image: 'assets/images/project_devblog.svg',
      tags: ['Next.js', 'Markdown', 'Vercel', 'Tailwind CSS', 'PrismJS'],
      description: 
        'DevBlog is a lightweight publishing system engineered specifically for developers and technical writers. It bridges markdown-driven content creation with modern static rendering and edge caching for sub-100ms page transitions.',
      highlights: [
        'Full Markdown/MDX parser with automated code block syntax highlighting',
        'Zero-CLS typography system optimized for reading comfort and night mode',
        'Instant client-side search indexing across all published articles',
        '100/100 Lighthouse performance, accessibility, and SEO audit scores'
      ],
      demoUrl: '#',
      repoUrl: 'https://github.com'
    },
    financetrack: {
      title: 'FinanceTrack',
      subtitle: 'Track your expenses and reach your goals.',
      image: 'assets/images/project_financetrack.svg',
      tags: ['React Native', 'Firebase', 'Expo', 'TypeScript', 'D3.js'],
      description: 
        'FinanceTrack empowers individuals to regain control over their finances with automated bank syncing, smart expense categorization, and predictive cash flow trajectories.',
      highlights: [
        'Clean native mobile interface built with fluid gestures and micro-interactions',
        'Interactive spending charts and monthly budget comparison indicators',
        'Encrypted local persistence and biometric security authentication',
        'Multi-currency support with real-time exchange rate updates'
      ],
      demoUrl: '#',
      repoUrl: 'https://github.com'
    }
  };

  // ==========================================
  // 2. Elements & Navigation State
  // ==========================================
  const header = document.getElementById('header');
  const navMenu = document.getElementById('nav-menu');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section.section');

  // Sticky Header Scrolled State
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile Menu Toggle
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.classList.toggle('active', isOpen);
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });
  }

  // Close mobile menu when clicking nav links
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      if (mobileToggle) {
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // ==========================================
  // 3. Active Nav Link on Scroll (Intersection Observer)
  // ==========================================
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('data-section') === id) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    sectionObserver.observe(section);
  });

  // ==========================================
  // 4. Modal Controller (Helper)
  // ==========================================
  function openModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.add('open');
    modalEl.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.remove('open');
    modalEl.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Setup click outside & close button handlers for all modals
  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });

    const closeBtn = modal.querySelector('.modal-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => closeModal(modal));
    }
  });

  // ESC key to close any open modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-backdrop.open').forEach(modal => {
        closeModal(modal);
      });
    }
  });

  // ==========================================
  // 5. Toast Notification System
  // ==========================================
  const toastCard = document.getElementById('toast-card');
  const toastTitle = document.getElementById('toast-title');
  const toastMessage = document.getElementById('toast-message');
  let toastTimer = null;

  function showToast(title, message, duration = 4000) {
    if (!toastCard) return;
    
    if (toastTitle) toastTitle.textContent = title;
    if (toastMessage) toastMessage.textContent = message;

    toastCard.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastCard.classList.remove('show');
    }, duration);
  }

  if (toastCard) {
    toastCard.addEventListener('click', () => {
      toastCard.classList.remove('show');
    });
  }

  // ==========================================
  // 6. Contact Modal & Form Handling
  // ==========================================
  const contactModal = document.getElementById('contact-modal');
  const openContactBtn = document.getElementById('open-contact-modal-btn');
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('form-submit-btn');

  if (openContactBtn) {
    openContactBtn.addEventListener('click', () => openModal(contactModal));
  }

  // Also support clicking 'Contact' in nav when already on page or for instant contact
  const contactNavLink = document.querySelector('.nav-link[data-section="contact"]');
  if (contactNavLink) {
    contactNavLink.addEventListener('click', (e) => {
      // smooth scroll to section is default, modal can also be reached
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('form-name');
      const emailInput = document.getElementById('form-email');
      const messageInput = document.getElementById('form-message');

      let isValid = true;

      // Validate Name
      const nameGroup = nameInput.closest('.form-group');
      if (!nameInput.value.trim()) {
        nameGroup.classList.add('has-error');
        isValid = false;
      } else {
        nameGroup.classList.remove('has-error');
      }

      // Validate Email
      const emailGroup = emailInput.closest('.form-group');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        emailGroup.classList.add('has-error');
        isValid = false;
      } else {
        emailGroup.classList.remove('has-error');
      }

      // Validate Message
      const messageGroup = messageInput.closest('.form-group');
      if (!messageInput.value.trim()) {
        messageGroup.classList.add('has-error');
        isValid = false;
      } else {
        messageGroup.classList.remove('has-error');
      }

      if (!isValid) return;

      // Simulate sending with loading state
      const originalText = submitBtn.querySelector('.btn-text').textContent;
      submitBtn.querySelector('.btn-text').textContent = 'Sending Message...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.querySelector('.btn-text').textContent = originalText;
        submitBtn.disabled = false;
        contactForm.reset();
        closeModal(contactModal);

        showToast(
          'Message Sent!',
          'Thank you for reaching out, Alex will get back to you shortly.'
        );
      }, 700);
    });

    // Clear error on input
    contactForm.querySelectorAll('.form-input, .form-textarea').forEach(input => {
      input.addEventListener('input', () => {
        const group = input.closest('.form-group');
        if (group) group.classList.remove('has-error');
      });
    });
  }

  // ==========================================
  // 7. Project Details Modal Dynamic Content
  // ==========================================
  const projectModal = document.getElementById('project-modal');
  const projectContent = document.getElementById('project-modal-dynamic-content');

  function openProjectModal(projectId) {
    const data = projectsData[projectId];
    if (!data || !projectContent) return;

    projectContent.innerHTML = `
      <div class="project-modal-preview">
        <img src="${data.image}" alt="${data.title} full preview">
      </div>
      <div class="modal-header" style="margin-bottom: 12px;">
        <span class="section-tag">PROJECT SPOTLIGHT</span>
        <h3 class="project-modal-title">${data.title}</h3>
        <p class="project-modal-desc">${data.description}</p>
      </div>

      <div style="margin-bottom: 24px;">
        <h4 style="font-size: 0.9rem; font-weight: 600; color: #111827; margin-bottom: 8px;">Key Technical Highlights</h4>
        <ul style="padding-left: 20px; font-size: 0.85rem; color: #4b5563; line-height: 1.6; list-style: disc;">
          ${data.highlights.map(h => `<li style="margin-bottom: 4px;">${h}</li>`).join('')}
        </ul>
      </div>

      <div class="project-modal-meta">
        <div class="project-tags">
          ${data.tags.map(tag => `<span class="tag-pill">${tag}</span>`).join('')}
        </div>
        <div class="modal-actions">
          <a href="${data.repoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
            <span>View Source Code</span>
          </a>
          <button class="btn btn-primary btn-sm" onclick="alert('Launching live demo environment for ${data.title}...')">
            <span>Live Interactive Demo</span>
          </button>
        </div>
      </div>
    `;

    openModal(projectModal);
  }

  // Attach project click handlers
  document.querySelectorAll('[data-project]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      // Don't trigger if it's the article wrapper and an inner button was clicked
      const projectId = trigger.getAttribute('data-project');
      if (projectId) {
        openProjectModal(projectId);
      }
    });
  });

  // View All Projects button
  const viewAllBtn = document.getElementById('view-all-projects-btn');
  if (viewAllBtn) {
    viewAllBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('All Projects', 'You are currently viewing all featured works. More coming soon!');
    });
  }

  // ==========================================
  // 8. CV / Resume Modal & Print
  // ==========================================
  const cvModal = document.getElementById('cv-modal');
  const downloadCvBtn = document.getElementById('btn-download-cv');
  const printCvBtn = document.getElementById('cv-print-btn');

  if (downloadCvBtn) {
    downloadCvBtn.addEventListener('click', () => {
      openModal(cvModal);
    });
  }

  if (printCvBtn) {
    printCvBtn.addEventListener('click', () => {
      window.print();
    });
  }

  console.log('Alex Carter Portfolio initialized successfully.');
});
