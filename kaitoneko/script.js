// script.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Menú Hamburguesa ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // --- Navegación Activa en el Scroll ---
    const sections = document.querySelectorAll('section[id]');

    function activateNavLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Ajuste para que se active antes
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', activateNavLink);
    window.addEventListener('load', activateNavLink); // Activar al cargar por si no hay scroll

    // --- Animaciones al hacer Scroll (Intersection Observer) ---
    const scrollAnimateElements = document.querySelectorAll('.scroll-animate');
    const revealItems = document.querySelectorAll('.reveal-item');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.2 // Porcentaje del elemento visible para activar
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Dejar de observar una vez visible
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    scrollAnimateElements.forEach(el => observer.observe(el));
    revealItems.forEach(el => observer.observe(el));

    // --- Efecto 3D de la imagen de perfil al mover el mouse ---
    const aboutImageCard = document.querySelector('.about-image-card');
    const aboutImage = document.querySelector('.about-image'); // La imagen dentro de la tarjeta

    if (aboutImageCard && aboutImage) {
        const movementStrength = 20; // Cuánto se moverá la tarjeta (en grados)
        const imageMovement = 10; // Cuánto se moverá la imagen dentro de la tarjeta (en píxeles Z)

        aboutImageCard.addEventListener('mousemove', (e) => {
            const cardRect = aboutImageCard.getBoundingClientRect();
            const centerX = cardRect.left + cardRect.width / 2;
            const centerY = cardRect.top + cardRect.height / 2;

            const mouseX = e.clientX;
            const mouseY = e.clientY;

            const rotateX = ((mouseY - centerY) / cardRect.height) * -movementStrength;
            const rotateY = ((mouseX - centerX) / cardRect.width) * movementStrength;

            // Aplicar la rotación a la tarjeta
            aboutImageCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

            // Mover la imagen ligeramente en el eje Z para un efecto más pronunciado
            aboutImage.style.transform = `translateZ(${imageMovement}px)`;
        });

        aboutImageCard.addEventListener('mouseleave', () => {
            // Volver al estado original al quitar el mouse
            aboutImageCard.style.transform = `rotateX(0deg) rotateY(0deg)`;
            aboutImage.style.transform = `translateZ(0px)`;
        });
    }

});