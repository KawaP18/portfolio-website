// My portfolio JS - need to clean this up later

document.addEventListener('DOMContentLoaded', function() {
    initScrollEffects();
    initSkillBars();
    initCounters();
    initBackToTop();

    initSmoothScrolling();
    initTypingEffect();
    initFadeInAnimation();
    initProjectCards();
});

// Smooth scroll - works better than CSS scroll behavior had issues with the default browser scrolling
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {

        link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();

                    const target = document.querySelector(href);
                
                if (target) {
                        const offsetTop = target.offsetTop - 70; // navbar height

                    
                    window.scrollTo({
                            top: offsetTop,
                            
                        behavior: 'smooth'
                    });
                    
                        // close mobile menu if open
                    const navbarCollapse = document.querySelector('.navbar-collapse');

                    if (navbarCollapse.classList.contains('show')) {

                            const navbarToggler = document.querySelector('.navbar-toggler');
                        navbarToggler.click();
                    }


                }

            }
        });
    });
}

// Counter animation - animates numbers counting up when in view
function initCounters() {


        const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    const animateCounter = (counter) => {
            const target = parseInt(counter.getAttribute('data-target'));
        const count = parseInt(counter.innerText);
            const increment = target / speed;
        
            
        if (count < target) {
                counter.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounter(counter), 1);
        } else {


                counter.innerText = target;
        }

        
    };
    
        const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
                if (entry.isIntersecting) {
                const counter = entry.target;


                    counter.innerText = '0';

                animateCounter(counter);
                    counterObserver.unobserve(counter);
            }
        });


    });

        counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Progress bar animations - looks good when they fill up
function initSkillBars() {
        const skillBars = document.querySelectorAll('.progress-bar');
    
    const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {

            if (entry.isIntersecting) {
                    const progressBar = entry.target;
                const width = progressBar.getAttribute('data-width');
                
                    // small delay looks better
                setTimeout(() => {
                        progressBar.style.width = width + '%';
                }, 200);

                
                    skillObserver.unobserve(progressBar);
            }
        });
    });
    
        skillBars.forEach(bar => {
            
        skillObserver.observe(bar);
    });
}

// Back to top btn - simple but effective
function initBackToTop() {
        const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) { // show after scrolling a bit
            backToTopBtn.style.display = 'flex';

        } else {
                backToTopBtn.style.display = 'none';

        }

    });
    
        backToTopBtn.addEventListener('click', () => {
        window.scrollTo({

                top: 0,
            behavior: 'smooth'
        });
    });
}

// Navbar scroll effect - changes background when scrolling
function initScrollEffects() {
        const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {

            if (window.scrollY > 50) { // after scrolling 50px
            navbar.classList.add('scrolled');
        } else {

                navbar.classList.remove('scrolled');
        }
    });
}

// Typewriter effect - took forever to get this working properly tried like 5 different approaches before this one worked
function initTypingEffect() {
        const typingText = document.querySelector('.typing-text');
    if (!typingText) return; // safety check
    
    
        const text = typingText.textContent;
    typingText.textContent = ''; // clear it first
    
        let i = 0;
    const typeWriter = () => {
            if (i < text.length) {

            typingText.textContent += text.charAt(i);
                i++;
            setTimeout(typeWriter, 150); // typing speed
        }
    };
    
        setTimeout(typeWriter, 1000); // delay before starting
}

// Fade animations on scroll - intersection observer is better than scroll events
function initFadeInAnimation() {

        const fadeElements = document.querySelectorAll('.card, .hobby-card, .contact-info, .achievement-item');
    

    fadeElements.forEach(element => {
            element.classList.add('fade-in');
    });
    
        const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
                if (entry.isIntersecting) {

                entry.target.classList.add('visible');
            }
        });
    }, {
            threshold: 0.1 // trigger when 10% visible

    });
    
        fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });
}

// Project card hover effects - simple but looks nice
function initProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {

            card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';

        });
        
            card.addEventListener('mouseleave', function() {

            this.style.transform = 'translateY(0) scale(1)';

        });
    });
}
