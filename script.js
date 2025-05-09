document.addEventListener("DOMContentLoaded", () => {
	const hdr = document.getElementById("header");
	let headerActualHeight = hdr ? hdr.offsetHeight : 70;
	document.documentElement.style.setProperty("--header-height", headerActualHeight + "px");

	const navLinks = document.querySelectorAll("nav ul li a");
	const allNavSections = Array.from(document.querySelectorAll("main > section[id], section#hero"));
	const yearSpan = document.getElementById("year");
	if (yearSpan) yearSpan.textContent = new Date().getFullYear();

	const heroTitle = document.getElementById("hero-title");
	if (heroTitle) {
		const text = heroTitle.textContent;
		heroTitle.innerHTML = "";
		text.split("").forEach((char, index) => {
			const span = document.createElement("span");
			span.className = "char";
			span.textContent = char === " " ? "\u00A0" : char;
			span.style.animationDelay = `${0.2 + index * 0.05}s`;
			heroTitle.appendChild(span);
		});
	}

	const mainLogo = document.getElementById("main-logo");
	if (mainLogo) {
		const logoText = mainLogo.textContent;
		mainLogo.innerHTML = "";
		logoText.split("").forEach((char) => {
			const charSpan = document.createElement("span");
			charSpan.className = "logo-char";
			charSpan.textContent = char;
			charSpan.style.setProperty("--random-delay", Math.random().toFixed(2));
			charSpan.style.setProperty("--random-rotate", (Math.random() * 6 - 3).toFixed(2));
			mainLogo.appendChild(charSpan);
		});
	}

	document.querySelectorAll(".section-title").forEach((title) => {
		if (!title.querySelector("span")) {
			title.innerHTML = `<span>${title.innerHTML}</span>`;
		}
	});

	document.querySelectorAll(".cta-button").forEach((button) => {
		if (!button.querySelector("span") && !button.querySelector("i")) {
			button.innerHTML = `<span>${button.innerHTML}</span>`;
		} else {
			const children = Array.from(button.childNodes);
			let needsWrapper = false;
			children.forEach((child) => {
				if (child.nodeType === Node.TEXT_NODE && child.textContent.trim() !== "") {
					needsWrapper = true;
				}
			});

			if (needsWrapper) {
				button.innerHTML = ""; // Clear existing
				children.forEach((child) => {
					if (child.nodeType === Node.TEXT_NODE && child.textContent.trim() !== "") {
						const span = document.createElement("span");
						span.textContent = child.textContent;
						button.appendChild(span);
					} else {
						button.appendChild(child.cloneNode(true));
					}
				});
			}
		}
	});

	const cursorDot = document.querySelector(".cursor-dot");
	if (cursorDot && window.matchMedia("(pointer: fine)").matches) {
		window.addEventListener("mousemove", (e) => {
			cursorDot.style.left = e.clientX + "px";
			cursorDot.style.top = e.clientY + "px";
		});
		document.querySelectorAll("a, button, .logo, .footer-socials a, .project-filters button, .project-link, .cta-button, nav ul li a, #about .about-image img, .project-image img, #year, .skill-category, .project-card").forEach((el) => {
			el.addEventListener("mouseenter", () => cursorDot.classList.add("hovered"));
			el.addEventListener("mouseleave", () => cursorDot.classList.remove("hovered"));
		});
	} else if (cursorDot) {
		cursorDot.style.display = "none";
	}

	const allCards = document.querySelectorAll(".skill-category, .project-card");
	const HOVER_SCALE_SKILL = 1.02;
	const HOVER_SCALE_PROJECT = 1.015;
	const HOVER_TRANSLATE_Y = -8;

	allCards.forEach((card) => {
		card.addEventListener("mouseenter", () => {
			if (card.classList.contains("filtered-out")) return;
			card.style.setProperty("--card-translate-y", `${HOVER_TRANSLATE_Y}px`);
			if (card.classList.contains("skill-category")) {
				card.style.setProperty("--card-scale", `${HOVER_SCALE_SKILL}`);
			} else {
				card.style.setProperty("--card-scale", `${HOVER_SCALE_PROJECT}`);
			}
		});

		card.addEventListener("mouseleave", () => {
			card.style.setProperty("--card-scale", "1");
			card.style.setProperty("--card-translate-y", "0px");
		});
	});

	const lightbox = document.getElementById("lightbox");
	const lightboxImg = document.getElementById("lightbox-img");
	const lightboxClose = document.querySelector(".lightbox-close");

	document.querySelectorAll(".project-image img").forEach((image) => {
		image.addEventListener("click", (e) => {
			e.stopPropagation();
			if (lightbox && lightboxImg) {
				lightbox.style.display = "flex";
				lightboxImg.src = image.src;
				lightboxImg.alt = image.alt;
				document.body.classList.add("lightbox-open");
			}
		});
	});

	if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
	if (lightbox)
		lightbox.addEventListener("click", (e) => {
			if (e.target === lightbox) closeLightbox();
		});

	function closeLightbox() {
		if (lightbox) {
			lightbox.style.display = "none";
			document.body.classList.remove("lightbox-open");
		}
	}

	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape") {
			if (lightbox && lightbox.style.display === "flex") {
				closeLightbox();
			}
		}
	});

	let resizeTimeout;
	window.addEventListener("resize", () => {
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(() => {
			if (hdr) {
				headerActualHeight = hdr.offsetHeight;
				document.documentElement.style.setProperty("--header-height", headerActualHeight + "px");
			}
			onScroll();
		}, 100);
	});

	const onScroll = () => {
		let scrollY = window.pageYOffset;
		if (hdr) {
			scrollY > 30 ? hdr.classList.add("scrolled") : hdr.classList.remove("scrolled");
		}

		let currentId = "hero";
		const effectiveHeaderHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-height")) || 70;
		const scrollOffset = effectiveHeaderHeight + 20;

		let closestSection = null;
		let smallestDistance = Infinity;

		allNavSections.forEach((section) => {
			const sectionTop = section.offsetTop - scrollOffset;
			const sectionBottom = sectionTop + section.offsetHeight;

			if (scrollY >= sectionTop && scrollY < sectionBottom) {
				currentId = section.id;
				return;
			}

			const distanceToTop = Math.abs(scrollY - sectionTop);
			if (distanceToTop < smallestDistance) {
				smallestDistance = distanceToTop;
				closestSection = section.id;
			}
		});

		if (scrollY < allNavSections[0].offsetTop - scrollOffset) {
			currentId = allNavSections[0].id;
		} else if (!allNavSections.some((s) => s.id === currentId) && closestSection) {
			currentId = closestSection;
		}

		navLinks.forEach((link) => {
			link.classList.remove("active");
			if (link.getAttribute("href") === "#" + currentId) {
				link.classList.add("active");
			}
		});
	};
	window.addEventListener("scroll", onScroll, { passive: true });
	onScroll();

	const sectionObserver = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("visible");

					const itemsToAnimate = entry.target.querySelectorAll(".skill-category, .project-card:not(.filtered-out)");
					itemsToAnimate.forEach((item, index) => {
						if (!item.classList.contains("card-animate-in")) {
							setTimeout(() => {
								item.classList.add("card-animate-in");
							}, index * 100);
						}
					});
				}
			});
		},
		{ threshold: 0.05 }
	);

	document.querySelectorAll("main > section").forEach((section) => {
		sectionObserver.observe(section);
	});

	const filterContainer = document.querySelector(".project-filters");
	const projectCardsAll = document.querySelectorAll(".projects-grid .project-card");

	if (filterContainer) {
		filterContainer.addEventListener("click", (event) => {
			const button = event.target.closest("button");
			if (button) {
				const filterValue = button.dataset.filter;

				const currentActiveButton = filterContainer.querySelector("button.active");
				if (currentActiveButton) {
					currentActiveButton.classList.remove("active");
				}
				button.classList.add("active");

				let animationDelay = 0;
				projectCardsAll.forEach((card) => {
					const cardCategories = card.dataset.category || "";
					const shouldShow = filterValue === "all" || cardCategories.includes(filterValue);

					if (shouldShow) {
						if (card.classList.contains("filtered-out")) {
							card.classList.remove("filtered-out");
							card.classList.remove("card-animate-in");
							setTimeout(() => {
								card.classList.add("card-animate-in");
							}, animationDelay);
							animationDelay += 50;
						} else {
							if (!card.classList.contains("card-animate-in")) {
								card.classList.add("card-animate-in");
							}
						}
					} else {
						card.classList.add("filtered-out");
						card.classList.remove("card-animate-in");
					}
				});
			}
		});
	}
});
