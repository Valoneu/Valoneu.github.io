// ===== Logo Text Scramble Effect =====
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let h1Interval = null; // Keep track of the interval globally
const h1Element = document.querySelector(".logo h1");

// --- Function to run the scramble animation ---
function runScrambleAnimation(element) {
    // Get the original value from the data attribute inside the function
    const originalValue = element.dataset.value;
    if (!originalValue) return; // Exit if no value

    let iteration = 0;

    // Clear any *existing* interval (prevents multiple intervals running if triggered quickly)
    clearInterval(h1Interval);

    // Start the new interval
    h1Interval = setInterval(() => {
        element.innerText = element.innerText
            .split("")
            .map((letter, index) => {
                // If index is already past the current iteration point, return the original letter
                if(index < iteration) {
                    return originalValue[index];
                }
                // Otherwise, return a random letter
                return letters[Math.floor(Math.random() * 26)];
            })
            .join("");

        // Check if the animation is complete
        if(iteration >= originalValue.length){
            clearInterval(h1Interval); // Stop the interval
            element.innerText = originalValue; // Explicitly set the final text
            h1Interval = null; // Reset interval tracker
        }

        iteration += 1 / 3; // Increment iteration (controls speed)
    }, 30); // Interval time (milliseconds)
}


// --- Event Listeners ---
if (h1Element) {
    const originalValue = h1Element.dataset.value; // Store for mouseleave reset

    // 1. Trigger on Hover
    h1Element.addEventListener('mouseover', () => {
        runScrambleAnimation(h1Element); // Call the animation function
    });

    // 2. Trigger on Mouse Leave
    h1Element.addEventListener('mouseleave', () => {
        // Only stop and reset if an interval is actually running
        if (h1Interval) {
            clearInterval(h1Interval);
            h1Interval = null;
        }
        // Always reset text on leave, even if animation finished
        h1Element.innerText = originalValue;
    });

    // 3. Trigger on Page Load
    document.addEventListener('DOMContentLoaded', () => {
        // Run the animation once the DOM is ready
        runScrambleAnimation(h1Element);
    });
}


// ===== Intersection Observer for Fade-in Animation (for sections below intro) =====
const animatedElements = document.querySelectorAll('.animate-on-scroll');
if (animatedElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // observer.unobserve(entry.target); // Optional: Stop observing
            }
        });
    }, { threshold: 0.1 });
    animatedElements.forEach(el => observer.observe(el));
}

// ===== Project Filtering =====
const filterButtons = document.querySelectorAll('.filter-button');
const projectCards = document.querySelectorAll('.project-card');

if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filterValue = button.getAttribute('data-filter');
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.classList.remove('filtered-out');
                } else {
                    card.classList.add('filtered-out');
                }
            });
        });
    });
}

// ===== Theme Toggle =====
const themeToggleButton = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', currentTheme);

if (themeToggleButton) {
    themeToggleButton.addEventListener('click', () => {
        let newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// ===== Update Footer Year =====
const yearSpan = document.getElementById('current-year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// ===== Smooth scroll for Nav/Footer Links =====
document.querySelectorAll('.nav-links a[href^="#"], .back-to-top').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = targetId === '#top' ? document.body : document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});