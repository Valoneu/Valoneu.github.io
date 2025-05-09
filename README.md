# Valoneu's Portfolio Website

This repository contains the code for my personal portfolio website, hosted using GitHub Pages.

## Features

- **Interactive Design:** Uses various animations and transitions, including:
  - Animated background blobs.
  - Character reveal animations for the hero title and logo.
  - Smooth hover effects on navigation links, cards (scale, translation, accent bars, corner glyphs), buttons, and other interactive elements.
  - Scroll-triggered animations for sections and project/skill cards using IntersectionObserver.
- **Responsive:** Adapts to look good on different screen sizes (desktops, tablets, phones).
- **Content Sections:** Includes sections for Hero, About Me, Skills, and Projects.
- **Project Filtering:** Allows users to filter projects by category (Code, 3D Art, Pixel Art, Other) with smooth transitions for card visibility.
- **Image Lightbox:** Project images can be viewed in a larger overlay.
- **Custom Cursor:** Features an animated cursor effect on desktop browsers.
- **Dynamic Content:** The copyright year in the footer is dynamically updated.
- **Header Behavior:** The header changes appearance on scroll.
- **Technologies:** Built with HTML, CSS (Custom Properties, Grid, Flexbox), and vanilla JavaScript. Uses Font Awesome for icons.

## Files Included

- `index.html`: The main landing page and all content.
- `style.css`: Contains all CSS rules for layout, styling, and animations.
- `script.js`: Holds all the JavaScript for interactivity (animations, filtering, cursor effects, lightbox, header behavior, scroll observation).
- `img/`: Directory containing all images used on the site.
- `nothing.pdf`: Placeholder file for a resume.

## How to Run Locally

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Valoneu/Valoneu.github.io.git
    ```
2.  **Navigate to the directory:**
    ```bash
    cd Valoneu.github.io
    ```
3.  **Open in browser:** Open the `index.html` file directly in your web browser.

## Design Goal

The goal was to create a portfolio that is visually interesting and engaging. It uses modern web technologies to showcase my work. It also includes considerations for accessibility, like respecting reduced motion preferences where applicable (though most animations are CSS-driven and would be affected by OS-level settings).
