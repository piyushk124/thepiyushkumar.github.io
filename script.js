// Enhanced JavaScript functionality

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Active navigation highlighting
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function highlightNavigation() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavigation);

  // Mobile navbar toggle
  const navToggle = document.getElementById("nav-toggle");
  const navLinksContainer = document.getElementById("nav-links");
  
  if (navToggle && navLinksContainer) {
    navToggle.addEventListener("click", () => {
      navLinksContainer.classList.toggle("active");
      navToggle.setAttribute('aria-expanded', 
        navToggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
    });
  }

  // Close mobile menu when clicking on a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinksContainer.classList.contains('active')) {
        navLinksContainer.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Enhanced navbar scroll effect
  window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Scroll animations with performance optimization
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        // Stop observing after animation is triggered for performance
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });

  // Enhanced contact form submission
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  
  if (form && status) {
    const submitBtn = form.querySelector('button[type="submit"]');
    
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      // Add loading state
      submitBtn.classList.add('loading');
      submitBtn.textContent = 'Sending...';
      status.textContent = "";
      status.className = "form-status";
      
      // Simulate form submission (replace with actual form handling)
      setTimeout(() => {
        status.textContent = "✅ Success! Thanks for reaching out. I'll get back to you soon!";
        status.classList.add("show", "success");
        form.reset();
        
        // Remove loading state
        submitBtn.classList.remove('loading');
        submitBtn.textContent = 'Send Message';
      }, 1500);
    });
  }

  // Animated counter for stats
  function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
      start += increment;
      if (start < target) {
        if (target.toString().includes('+')) {
          element.textContent = Math.floor(start) + '+';
        } else if (target.toString().includes('%')) {
          element.textContent = Math.floor(start) + '%';
        } else {
          element.textContent = Math.floor(start);
        }
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    }
    updateCounter();
  }

  // Trigger counter animation when stats section is visible
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statNumbers = entry.target.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
          const target = stat.textContent;
          if (!stat.classList.contains('animated')) {
            stat.classList.add('animated');
            if (target.includes('K+')) {
              animateCounter(stat, 10000);
            } else if (target.includes('+')) {
              const num = parseInt(target);
              animateCounter(stat, num);
            } else if (target.includes('%')) {
              const num = parseInt(target);
              animateCounter(stat, num);
            } else {
              const num = parseInt(target);
              animateCounter(stat, num);
            }
          }
        });
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.stats');
  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  // Preload critical resources
  const preloadLink = document.createElement('link');
  preloadLink.rel = 'preconnect';
  preloadLink.href = 'https://fonts.googleapis.com';
  document.head.appendChild(preloadLink);
  
  // Initialize animations on page load
  highlightNavigation();
});
