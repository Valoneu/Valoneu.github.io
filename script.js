// script.js
// No changes needed in script.js for this specific fix.
// The explicit Prism.highlightAll() call is already in place.
const letters = "!<>-_\\/[]{}—=+*^?#()~";
let h1Interval = null;
const h1Element = document.querySelector(".logo h1");

function runScrambleAnimation(element) {
	const originalValue = element.dataset.value;
	if (!originalValue) return;
	let iteration = 0;
	clearInterval(h1Interval);
	h1Interval = setInterval(() => {
		element.innerText = element.innerText
			.split("")
			.map((_, index) => {
				if (index < iteration) {
					return originalValue[index];
				}
				return letters[Math.floor(Math.random() * letters.length)];
			})
			.join("");
		if (iteration >= originalValue.length) {
			clearInterval(h1Interval);
			element.innerText = originalValue;
			h1Interval = null;
		}
		iteration += originalValue.length / 45;
	}, 25);
}

// Theme switching logic (moved setup outside DOMContentLoaded for immediate application)
const storedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
let currentTheme = storedTheme || (prefersDark ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', currentTheme);

function updateParticleColors() {
	const rootStyles = getComputedStyle(document.documentElement);
	const particleColor = rootStyles.getPropertyValue('--particle-color').trim().replace(/"/g, '');
	const linkColor = rootStyles.getPropertyValue('--particle-link-color').trim().replace(/"/g, '');
	if (window.pJSDom?.[0]?.pJS) {
		const pJS = window.pJSDom[0].pJS;
		pJS.particles.color.value = particleColor;
		pJS.particles.line_linked.color = linkColor;
		pJS.fn.particlesRefresh();
	}
}

const themeToggleButton = document.getElementById('theme-toggle');
if (themeToggleButton) {
	themeToggleButton.addEventListener('click', () => {
		currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
		document.documentElement.setAttribute('data-theme', currentTheme);
		localStorage.setItem('theme', currentTheme);
		setTimeout(updateParticleColors, 50);
	});
}


// Custom Cursor Logic
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");
if (cursorDot && cursorOutline) {
	window.addEventListener("mousemove", (e) => {
		const posX = e.clientX;
		const posY = e.clientY;
		cursorDot.style.left = `${posX}px`;
		cursorDot.style.top = `${posY}px`;
		cursorOutline.style.left = `${posX}px`;
		cursorOutline.style.top = `${posY}px`;
	});
	const interactableElements = document.querySelectorAll(
		'a, button, .theme-toggle-button, .nav-item, .filter-button, .project-card, .blog-post-summary, input, textarea, label'
	);
	interactableElements.forEach((el) => {
		el.addEventListener("mouseover", () => cursorOutline.classList.add("cursor-interact"));
		el.addEventListener("mouseleave", () => cursorOutline.classList.remove("cursor-interact"));
	});
}

// 3D Card Tilt Effect Logic
function apply3DTiltEffect(elements) {
	elements.forEach(card => {
		card.style.transition = 'box-shadow 0.4s ease, border-color 0.4s ease';
		card.addEventListener('mousemove', (e) => {
			const rect = card.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;
			const { offsetWidth: width, offsetHeight: height } = card;
			const maxRotate = 4;
			const rotateY = ((x / width) - 0.5) * 2 * maxRotate;
			const rotateX = ((y / height) - 0.5) * -2 * maxRotate;
			const scaleValue = 1.03;
			card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scaleValue}, ${scaleValue}, ${scaleValue})`;
			card.style.transition = 'box-shadow 0.4s ease, border-color 0.4s ease, transform 0.05s linear';
		});
		card.addEventListener('mouseleave', () => {
			card.style.transition = 'box-shadow 0.4s ease, border-color 0.4s ease, transform 0.3s ease-out';
			card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
		});
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'box-shadow 0.4s ease, border-color 0.4s ease, transform 0.05s linear';
        });
	});
}

// particles.js Configuration
function initializeParticles() {
	const rootStyles = getComputedStyle(document.documentElement);
	const particleColor = rootStyles.getPropertyValue('--particle-color').trim().replace(/"/g, '');
	const linkColor = rootStyles.getPropertyValue('--particle-link-color').trim().replace(/"/g, '');
	const particleDensity = window.innerWidth < 768 ? 35 : 70;
	if (typeof particlesJS !== 'undefined') {
		particlesJS('particles-js', {
			"particles": {
				"number": { "value": particleDensity, "density": { "enable": true, "value_area": 800 } },
				"color": { "value": particleColor },
				"shape": { "type": "circle" },
				"opacity": { "value": 0.5, "random": true, "anim": { "enable": true, "speed": 0.6, "opacity_min": 0.1, "sync": false } },
				"size": { "value": 2.5, "random": true, "anim": { "enable": true, "speed": 4, "size_min": 0.3, "sync": false } },
				"line_linked": { "enable": true, "distance": 140, "color": linkColor, "opacity": 0.35, "width": 1 },
				"move": { "enable": true, "speed": 1.5, "direction": "none", "random": true, "straight": false, "out_mode": "out", "attract": { "enable": true, "rotateX": 500, "rotateY": 1000 } }
			},
			"interactivity": {
				"detect_on": "canvas",
				"events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
				"modes": { "grab": { "distance": 160, "line_linked": { "opacity": 0.7 } }, "push": { "particles_nb": 3 }, }
			},
			"retina_detect": true
		});
	} else {
        console.warn("particles.js not loaded.");
    }
}

// --- Run initializations after DOM loads ---
document.addEventListener('DOMContentLoaded', () => {

	// Initial logo scramble
	if (h1Element) {
		setTimeout(() => runScrambleAnimation(h1Element), 800);
	}

    // Activate Intersection Observer
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
	if (animatedElements.length > 0) {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry, index) => {
				if (entry.isIntersecting) {
					entry.target.style.transitionDelay = `${index * 0.08}s`;
					entry.target.classList.add('is-visible');
				}
			});
		}, { threshold: 0.1 });
		animatedElements.forEach(el => observer.observe(el));
	}

    // Setup Project Filtering
	const filterButtons = document.querySelectorAll('.filter-button');
	const projectCards = document.querySelectorAll('.project-card');
	if (filterButtons.length > 0 && projectCards.length > 0) {
		filterButtons.forEach(button => {
			button.addEventListener('click', () => {
				document.querySelector('.filter-button.active')?.classList.remove('active');
				button.classList.add('active');
				const filterValue = button.getAttribute('data-filter');
				projectCards.forEach((card, index) => {
					const categories = card.getAttribute('data-category').split(' ');
					const shouldShow = filterValue === 'all' || categories.includes(filterValue);
					const delay = shouldShow ? index * 0.04 : (projectCards.length - index - 1) * 0.02;
					card.style.transitionDelay = `${delay}s`;
					if (shouldShow) card.classList.remove('filtered-out');
					else card.classList.add('filtered-out');
				});
			});
		});
	}

    // Setup 3D Tilt Effect
	const skillCards = document.querySelectorAll('.skill-category');
	const projectCardElements = document.querySelectorAll('.project-card');
	apply3DTiltEffect(skillCards);
	apply3DTiltEffect(projectCardElements);

    // Update Footer Year
	const yearSpan = document.getElementById('current-year');
	if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // Setup Smooth Scroll
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			const href = this.getAttribute('href');
			if (href === '#' || href === '#top') {
				e.preventDefault();
				window.scrollTo({ top: 0, behavior: 'smooth' });
			} else if (href.startsWith('#') && document.querySelector(href)) {
				e.preventDefault();
				const targetElement = document.querySelector(href);
				const navHeight = document.querySelector('nav')?.offsetHeight || 0;
				const elementPosition = targetElement.getBoundingClientRect().top;
				const offsetPosition = elementPosition + window.pageYOffset - navHeight - 20;
				window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
			}
		});
	});

	// Initialize particles
	initializeParticles();

	// Explicitly call Prism highlighting LAST
	if (typeof Prism !== 'undefined') {
		Prism.highlightAll();
	} else {
		console.warn("Prism object not found immediately after DOM load. Syntax highlighting might be delayed or failed.");
	}
});