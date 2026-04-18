// Menu tabs functionality
document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // Preloader
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  // Mobile Navigation Toggle
  const mobileNavToggle = document.querySelectorAll('.mobile-nav-toggle');
  const navbar = document.querySelector('.navbar');
  const body = document.body;

  mobileNavToggle.forEach(toggle => {
    toggle.addEventListener('click', function() {
      body.classList.toggle('mobile-nav-active');
      
      mobileNavToggle.forEach(t => {
        t.classList.toggle('d-none');
      });
    });
  });

  // Close mobile nav when clicking on a link
  document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', function() {
      body.classList.remove('mobile-nav-active');
      
      mobileNavToggle.forEach(t => {
        t.classList.remove('d-none');
        if (t.classList.contains('mobile-nav-show')) {
          t.classList.remove('d-none');
        } else {
          t.classList.add('d-none');
        }
      });
    });
  });

  // Sticky Header on scroll
  const header = document.querySelector('#header');
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 100) {
        header.classList.add('sticked');
      } else {
        header.classList.remove('sticked');
      }
    });
  }

  // Scroll to top button
  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    const toggleScrollTop = function() {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    };
    window.addEventListener('load', toggleScrollTop);
    document.addEventListener('scroll', toggleScrollTop);
    scrollTop.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Smooth Scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerOffset = 90;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Menu Tab Switching
  const navLinks = document.querySelectorAll('.menu .nav-link');
  const tabPanes = document.querySelectorAll('.menu .tab-pane');

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Remove active class from all links
      navLinks.forEach(l => l.classList.remove('active'));
      // Add active class to clicked link
      this.classList.add('active');
      
      // Get target id
      const targetId = this.getAttribute('data-bs-target');
      if (targetId) {
        // Hide all tab panes
        tabPanes.forEach(pane => {
          pane.classList.remove('active', 'show');
        });
        
        // Show target tab pane
        const targetPane = document.querySelector(targetId);
        if (targetPane) {
          targetPane.classList.add('active', 'show');
        }
      }
    });
  });

  // Initialize AOS (Animate On Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
      disable: function() {
        // Disable AOS on mobile for better performance
        return window.innerWidth < 768;
      }
    });
    
    // Remove aria-hidden from hero section to fix accessibility warning
    setTimeout(() => {
      const heroSection = document.getElementById('hero');
      if (heroSection && heroSection.hasAttribute('aria-hidden')) {
        heroSection.removeAttribute('aria-hidden');
      }
    }, 100);
  }

  // Initialize Swiper for Testimonials
  const testimonialSwiper = document.querySelector('.testimonials .swiper');
  if (testimonialSwiper && typeof Swiper !== 'undefined') {
    new Swiper(testimonialSwiper, {
      speed: 600,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      slidesPerView: 1,
      spaceBetween: 30,
      pagination: {
        el: '.testimonials .swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        768: {
          slidesPerView: 1,
          spaceBetween: 30
        },
        992: {
          slidesPerView: 1,
          spaceBetween: 30
        }
      }
    });
  }

  // Initialize Swiper for Gallery
  const gallerySwiper = document.querySelector('.gallery .swiper');
  if (gallerySwiper && typeof Swiper !== 'undefined') {
    new Swiper(gallerySwiper, {
      speed: 400,
      loop: true,
      centeredSlides: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      },
      slidesPerView: 'auto',
      spaceBetween: 20,
      pagination: {
        el: '.gallery .swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 10
        },
        480: {
          slidesPerView: 2,
          spaceBetween: 15
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20
        },
        992: {
          slidesPerView: 4,
          spaceBetween: 20
        }
      }
    });
  }

  // Initialize GLightbox for images only (not video)
  if (typeof GLightbox !== 'undefined') {
    const glightbox = GLightbox({
      selector: '.glightbox:not(.btn-watch-video):not(.play-btn)',
      openEffect: 'zoom',
      closeEffect: 'fade',
      touchNavigation: true,
      loop: true
    });
  }
  
  // Custom video modal function
  function openVideoModal(videoId) {
    const modal = document.createElement('div');
    modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);z-index:9999;display:flex;align-items:center;justify-content:center;';
    modal.innerHTML = `
      <div style="position:relative;width:90%;max-width:960px;">
        <button id="close-video" style="position:absolute;top:-40px;right:0;background:white;color:black;border:none;width:40px;height:40px;border-radius:50%;cursor:pointer;font-size:20px;font-weight:bold;">&times;</button>
        <iframe width="100%" height="540" src="https://www.youtube.com/embed/${videoId}?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    `;
    document.body.appendChild(modal);
    
    const closeBtn = modal.querySelector('#close-video');
    closeBtn.addEventListener('click', () => {
      document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    });
    
    document.addEventListener('keydown', function closeOnEsc(e) {
      if (e.key === 'Escape') {
        document.body.removeChild(modal);
        document.removeEventListener('keydown', closeOnEsc);
      }
    });
  }
  
  // Custom video modal for watch video button
  const watchVideoBtn = document.querySelector('.btn-watch-video');
  if (watchVideoBtn) {
    watchVideoBtn.addEventListener('click', function(e) {
      e.preventDefault();
      openVideoModal('8iqoJ8EVsjs');
    });
  }
  
  // Custom video modal for about section play button
  const playBtn = document.querySelector('.play-btn');
  if (playBtn) {
    playBtn.addEventListener('click', function(e) {
      e.preventDefault();
      openVideoModal('8iqoJ8EVsjs');
    });
  }

  // Contact Form Submission
  const contactForms = document.querySelectorAll('.php-email-form');
  contactForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      // Check if this is the book-a-table form
      const isBookingForm = form.closest('#book-a-table');

      if (isBookingForm) {
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const people = document.getElementById('people').value;
        const message = document.querySelector('textarea[name="message"]').value;

        // Construct WhatsApp message
        const whatsappMessage = encodeURIComponent(
          `*New Table Booking Request*\n\n` +
          `*Name:* ${name}\n` +
          `*Email:* ${email}\n` +
          `*Phone:* ${phone}\n` +
          `*Date:* ${date}\n` +
          `*Time:* ${time}\n` +
          `*Number of People:* ${people}\n` +
          `*Message:* ${message}`
        );

        // Open WhatsApp with the message
        window.open(`https://wa.me/447405041863?text=${whatsappMessage}`, '_blank');

        // Reset form
        form.reset();
        return;
      }

      const loading = this.querySelector('.loading');
      const errorMessage = this.querySelector('.error-message');
      const sentMessage = this.querySelector('.sent-message');

      // Show loading
      if (loading) loading.style.display = 'block';
      if (errorMessage) errorMessage.style.display = 'none';
      if (sentMessage) sentMessage.style.display = 'none';

      // Simulate form submission
      setTimeout(() => {
        if (loading) loading.style.display = 'none';
        if (sentMessage) sentMessage.style.display = 'block';
        form.reset();

        // Hide success message after 5 seconds
        setTimeout(() => {
          if (sentMessage) sentMessage.style.display = 'none';
        }, 5000);
      }, 1500);
    });
  });

  // Active link highlighting on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinksAll = document.querySelectorAll('.navbar a');

  function highlightNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 90;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector('.navbar a[href="#' + sectionId + '"]');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        if (navLink) {
          navLinksAll.forEach(link => link.classList.remove('active'));
          navLink.classList.add('active');
        }
      }
    });
  }

  window.addEventListener('scroll', highlightNavLink);
  window.addEventListener('load', highlightNavLink);

  // Menu tabs functionality
  const menuTabs = document.querySelectorAll('.menu-tab');
  const menuSections = document.querySelectorAll('.menu-section');
  
  menuTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Remove active class from all tabs
      menuTabs.forEach(t => t.classList.remove('active'));
      // Add active class to clicked tab
      this.classList.add('active');
      
      // Get the tab data
      const tabName = this.getAttribute('data-tab');
      
      // Hide all menu sections
      menuSections.forEach(section => {
        section.classList.remove('active');
      });
      
      // Show the selected menu section
      document.getElementById(tabName).classList.add('active');
    });
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

  // Contact form handling
  const contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for your message! We will get back to you soon.');
      this.reset();
    });
  }
});
