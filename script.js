// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Animated Counter
    const counters = document.querySelectorAll('.counter');
    const speed = 900;

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

    // Intersection Observer for counters
    if (counters.length > 0) {
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target.querySelector('.counter');
                    if (counter && !counter.classList.contains('counted')) {
                        counter.classList.add('counted');
                        animateCounter(counter);
                    }
                }
            });
        }, observerOptions);

        // Observe each counter's parent div
        counters.forEach(counter => {
            const parentDiv = counter.parentElement;
            if (parentDiv) {
                observer.observe(parentDiv);
            }
        });
    }

    // Newsletter Form Submission
    const newsletterForm = document.querySelector('footer form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (email) {
                alert('Thank you for subscribing to our newsletter!');
                this.querySelector('input[type="email"]').value = '';
            }
        });
    }
});

//slider dots and fade
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let current = 0;
const intervalTime = 5000;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('opacity-100', i === index);
    slide.classList.toggle('opacity-0', i !== index);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle('bg-white', i === index);
    dot.classList.toggle('bg-white/50', i !== index);
  });

  current = index;
}

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    showSlide(index);
    resetInterval();
  });
});

let sliderInterval = setInterval(nextSlide, intervalTime);

function nextSlide() {
  let next = (current + 1) % slides.length;
  showSlide(next);
}

function resetInterval() {
  clearInterval(sliderInterval);
  sliderInterval = setInterval(nextSlide, intervalTime);
}