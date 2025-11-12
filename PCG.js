
// Inicializamos las constantes para el carrusel
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');
let currentSlide = 0;
let slideInterval;

// Función para mostrar el slide actual
function showSlide(index) {
    // Eliminamos la clase active de todos los slides e indicadores
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));

    // Añadimos la clase active al slide e indicador actuales
    slides[index].classList.add('active');
    indicators[index].classList.add('active');

    currentSlide = index;
}

// Función para avanzar al siguiente slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Función para iniciar y detener el slideshow automático
function startSlideShow() {
    slideInterval = setInterval(nextSlide, 4000); // Cambiar slide cada 4 segundos
}

// Función para detener el slideshow automático
function stopSlideShow() {
    clearInterval(slideInterval);
}

// Si hay slides, iniciamos el slideshow
if (slides.length > 0) {
    startSlideShow();

    // Hacemos clic en los indicadores para navegar a un slide específico
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopSlideShow();
            showSlide(index);
            startSlideShow(); // Reiniciar slideshow automático
        });
    });

    // Inicializamos la constante del carrusel
    const carousel = document.querySelector('.hero-carousel');

    // Si el cursor entra o sale del carrusel, detenemos o iniciamos el slideshow
    if (carousel) {
        carousel.addEventListener('mouseenter', stopSlideShow);
        carousel.addEventListener('mouseleave', startSlideShow);
    }
}

// Instanciamos las contantes obteniendo por clases
const tabButtons = document.querySelectorAll('.tab-btn');
const collectionCards = document.querySelectorAll('.collection-card');

// Agregamos evento de click a cada boton
tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Instanciamos la constante category obteniendo el data-category del boton
        const category = btn.dataset.category;

        // Removemos la clase active de todos los botones y se la agregamos al boton clickeado
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Mostramos u ocultamos las tarjetas segun la categoria
        collectionCards.forEach(card => {
            // Si la categoria es 'all' o coincide con el data-category de la tarjeta, la mostramos
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.animation = 'fadeInUp 0.6s ease forwards';
                }, 100);
            // Si no, la ocultamos
            } else {
                card.style.opacity = '0';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 0);
            }
        });
    });
});

// Instanciamos el formulario de contacto
const contactForm = document.getElementById('contactForm');

// Si el formulario existe, agregamos el evento de submit
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Obtener datos del formulario
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Simular el envio del formulario
        const submitBtn = contactForm.querySelector('.form-submit');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.style.opacity = '0.7';
        submitBtn.disabled = true;

        // Simulamos un retraso para el envio
        setTimeout(() => {
            submitBtn.textContent = 'Message Sent! ✓';
            submitBtn.style.background = '#4CAF50';

            // Reiniciamos el formulario
            contactForm.reset();

            // Restauramos el boton despues de unos segundos
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.style.opacity = '';
                submitBtn.disabled = false;
            }, 3000);
        }, 1500);
    });
}

// Instanciamos las constantes de los inputs y textareas del formulario
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

// Agregamos eventos de focus y blur para animaciones
formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.style.transform = 'translateY(-2px)';
    });
    input.addEventListener('blur', () => {
        input.parentElement.style.transform = '';
    });
});

// Animaciones de intersección para secciones destacadas y de contacto
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

// Instanciamos el observador de intersección
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observamos las secciones destacadas y de contacto
document.querySelectorAll('.featured-container, .contact-content').forEach(el => {
    observer.observe(el);
});