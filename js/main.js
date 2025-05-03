document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles background
    const particlesElement = document.getElementById('particles-js');
    if (particlesElement) {
      const network = new ParticleNetwork(particlesElement, {
        particleColors: ['#FF5F1F', '#FF8C00', '#39FF14'],
        velocity: 0.5,
        density: 15000,
        netLineDistance: 200,
        netLineColor: '#FF5F1F'
      });
      network.start();
    }
  
    // Custom cursor
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');
    
    if (cursorDot && cursorOutline) {
      window.addEventListener('mousemove', function(e) {
        const posX = e.clientX;
        const posY = e.clientY;
        
        cursorDot.style.opacity = '1';
        cursorOutline.style.opacity = '1';
        
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
        
        // Add slight delay to outline for trail effect
        setTimeout(() => {
          cursorOutline.style.left = `${posX}px`;
          cursorOutline.style.top = `${posY}px`;
        }, 80);
      });
      
      // Hide cursor when mouse leaves window
      document.addEventListener('mouseleave', function() {
        cursorDot.style.opacity = '0';
        cursorOutline.style.opacity = '0';
      });
      
      document.addEventListener('mouseenter', function() {
        cursorDot.style.opacity = '1';
        cursorOutline.style.opacity = '1';
      });
    }
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
      menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
      });
      
      // Close menu when clicking a link on mobile
      const links = document.querySelectorAll('.nav-link');
      links.forEach(link => {
        link.addEventListener('click', function() {
          menuToggle.classList.remove('active');
          navLinks.classList.remove('active');
        });
      });
    }
    
    // Scroll to section smoothly when clicking nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Highlight active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');
    
    function highlightNavOnScroll() {
      const scrollPosition = window.scrollY;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${sectionId}`) {
              item.classList.add('active');
            }
          });
        }
      });
    }
    
    window.addEventListener('scroll', highlightNavOnScroll);
    
    // Add header background on scroll
    const header = document.querySelector('.header');
    
    function toggleHeaderBackground() {
      if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(18, 18, 18, 0.95)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
      } else {
        header.style.backgroundColor = 'rgba(18, 18, 18, 0.8)';
        header.style.boxShadow = 'none';
      }
    }
    
    window.addEventListener('scroll', toggleHeaderBackground);
    
    // Animate stats counter
    const statValues = document.querySelectorAll('.stat-value');
    
    function animateCounter(element) {
      const target = parseInt(element.getAttribute('data-count'));
      const duration = 2000; // 2 seconds
      const step = Math.ceil(target / (duration / 20)); // Update every 20ms
      let current = 0;
      
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          element.textContent = target;
          clearInterval(timer);
        } else {
          element.textContent = current;
        }
      }, 20);
    }
    
    // Intersection Observer for elements animation
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // If stats counter is in view
          if (entry.target.classList.contains('stat-value')) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
          
          // Add animation class to observed elements
          entry.target.classList.add('animate');
          
          // Stop observing after animation
          if (!entry.target.classList.contains('stat-value')) {
            observer.unobserve(entry.target);
          }
        }
      });
    }, observerOptions);
    
    // Observe stats counters
    statValues.forEach(stat => {
      observer.observe(stat);
    });
    
    // Observe all cards for animation
    const cards = document.querySelectorAll('.project-card, .service-card, .tool-card, .experience-card');
    cards.forEach(card => {
      observer.observe(card);
    });
    
    // Form handling
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email || !message) {
          alert('Please fill in all fields');
          return;
        }
        
        // Simulation of form submission
        alert(`Thank you for your message, ${name}! I'll get back to you soon.`);
        contactForm.reset();
      });
    }
  });