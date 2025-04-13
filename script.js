/*
This JavaScript implements:
- Custom cursor movement and hover effects
- Particle background with particles.js
- Advanced animations using GSAP and ScrollTrigger
- AOS (Animate On Scroll) initialization
- Interactive elements like video controls and mobile menu
- Preloader animation
*/

document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            
            // Animate elements once page is loaded
            gsap.to('.hero-content', {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out'
            });
        }, 1500);
    });
    
    // Initialize AOS Animation Library
    AOS.init({
        duration: 800,
        once: false,
        mirror: true,
        offset: 100,
        easing: 'ease-in-out'
    });
    
    // Force elements to be visible (fix for AOS potentially hiding elements)
    setTimeout(function() {
        document.querySelectorAll('[data-aos]').forEach(function(element) {
            element.classList.add('aos-animate');
        });
    }, 500);
    
    // Custom cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    const links = document.querySelectorAll('a, button, .play-button, .video-container');
    
    document.addEventListener('mousemove', function(e) {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0,
        });
        
        gsap.to(cursorFollower, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.3,
        });
    });
    
    // Link hover effect for cursor
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            cursor.style.width = '0';
            cursor.style.height = '0';
            cursorFollower.style.width = '50px';
            cursorFollower.style.height = '50px';
            cursorFollower.style.borderColor = 'rgba(255, 215, 0, 0.5)';
            cursorFollower.style.backgroundColor = 'rgba(255, 215, 0, 0.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            cursor.style.width = '8px';
            cursor.style.height = '8px';
            cursorFollower.style.width = '30px';
            cursorFollower.style.height = '30px';
            cursorFollower.style.borderColor = 'var(--gold)';
            cursorFollower.style.backgroundColor = 'transparent';
        });
    });
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('header nav');
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        
        if (nav.classList.contains('active')) {
            menuToggle.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Close menu when clicking a navigation link on mobile
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768 && nav.classList.contains('active')) {
                nav.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
    
    // Improved smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Get header height dynamically
                const headerHeight = document.getElementById('header').offsetHeight;
                
                // Use window.scrollTo for better compatibility
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without page reload
                history.pushState(null, null, targetId);
                
                // Update active nav link
                navLinks.forEach(navLink => {
                    navLink.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Video play functionality
    const videoContainer = document.querySelector('.video-container');
    const video = document.querySelector('.video-container video');
    const videoOverlay = document.querySelector('.video-overlay');
    const playButton = document.querySelector('.play-button');
    
    if (videoContainer && video && videoOverlay && playButton) {
        // Show overlay initially
        videoOverlay.style.opacity = '1';
        videoOverlay.style.pointerEvents = 'auto'; // Make overlay clickable

        // Play video when play button or overlay is clicked
        function playVideo() {
            video.play();
            videoContainer.classList.add('playing');
            videoOverlay.style.opacity = '0';
            videoOverlay.style.pointerEvents = 'none'; // Disable overlay clicks while playing
        }

        playButton.addEventListener('click', playVideo);
        videoOverlay.addEventListener('click', playVideo);
        
        // Show overlay with play button when paused
        video.addEventListener('pause', function() {
            videoContainer.classList.remove('playing');
            videoOverlay.style.opacity = '1';
            videoOverlay.style.pointerEvents = 'auto'; // Make overlay clickable again
        });
        
        // Hide overlay when playing starts (e.g., using video controls)
        video.addEventListener('play', function() {
            videoContainer.classList.add('playing');
            videoOverlay.style.opacity = '0';
            videoOverlay.style.pointerEvents = 'none';
        });
        
        // Ensure controls are enabled
        video.controls = true;
    }
    
    // Initialize particles.js
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#FFD700'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    },
                    polygon: {
                        nb_sides: 5
                    }
                },
                opacity: {
                    value: 0.2,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#FFD700',
                    opacity: 0.1,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.3
                        }
                    },
                    push: {
                        particles_nb: 3
                    }
                }
            },
            retina_detect: true
        });
    }
    
    // Advanced animations with GSAP and ScrollTrigger
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);
        
        // Header scroll effect
        const header = document.getElementById('header');
        
        ScrollTrigger.create({
            start: 'top -80',
            end: 99999,
            toggleClass: {className: 'scrolled', targets: header}
        });
        
        // Animate section headings
        const sectionHeadings = document.querySelectorAll('.section h2');
        
        sectionHeadings.forEach(heading => {
            gsap.from(heading, {
                scrollTrigger: {
                    trigger: heading,
                    start: 'top 90%',
                    end: 'bottom 60%',
                    toggleActions: 'play none none reverse'
                },
                duration: 1,
                x: -100,
                opacity: 0,
                ease: 'power3.out'
            });
        });
        
        // Animate skill bars
        const skillBars = document.querySelectorAll('.skill-fill');
        
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = 0;
            
            gsap.to(bar, {
                scrollTrigger: {
                    trigger: bar,
                    start: 'top 90%',
                    end: 'bottom 60%',
                    toggleActions: 'play none none reverse'
                },
                width: width,
                duration: 1.5,
                ease: 'power3.out'
            });
        });
        
        // Timeline animation
        gsap.from('.timeline-item', {
            scrollTrigger: {
                trigger: '.timeline',
                start: 'top 80%',
                end: 'bottom 30%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 50,
            stagger: 0.3,
            duration: 1,
            ease: 'power3.out'
        });
        
        // Tools categories animation
        gsap.from('.tools-category', {
            scrollTrigger: {
                trigger: '.tools-container',
                start: 'top 80%',
                end: 'bottom 30%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 50,
            stagger: 0.2,
            duration: 1,
            ease: 'power3.out'
        });
    }
    
    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
                alert('Please fill out all fields');
                return;
            }
            
            // Simulated form submission success
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call delay
            setTimeout(function() {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.style.backgroundColor = '#4CAF50';
                
                // Reset form
                contactForm.reset();
                
                // Reset button after delay
                setTimeout(function() {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = '';
                }, 3000);
            }, 2000);
        });
    }
    
    // Enhanced active nav item tracking based on scroll position
    function updateActiveNavItem() {
        const sections = document.querySelectorAll('.section');
        const headerHeight = document.getElementById('header').offsetHeight;
        const scrollPosition = window.scrollY + headerHeight + 10;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current nav link
                const activeLink = document.querySelector(`nav a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    // Add scroll event listener for active nav item
    window.addEventListener('scroll', updateActiveNavItem);
    
    // Call once on page load
    updateActiveNavItem();
    
    // Add click event listeners to footer links
    document.querySelectorAll('.footer-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Get header height dynamically
                const headerHeight = document.getElementById('header').offsetHeight;
                
                // Calculate position accounting for header
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without page reload
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Fix for back-to-top button
    const backToTopButton = document.querySelector('.back-to-top a');
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}); 