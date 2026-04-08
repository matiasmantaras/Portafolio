/* ==================================
   CORPORATE PORTFOLIO - JAVASCRIPT
   Interacciones elegantes y refinadas
   ================================== */

// =========== CURSOR PERSONALIZADO ===========
const cursorDot = document.querySelector('.cursor-dot');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    const speed = 0.15;
    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;
    
    cursorDot.style.left = cursorX + 'px';
    cursorDot.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// =========== PARTICLES CANVAS ===========
const canvas = document.getElementById('particlesCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 60;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.3 + 0.1;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    
    draw() {
        ctx.fillStyle = `rgba(148, 163, 184, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// =========== NAVEGACIÓN===========
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Hamburger menu
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

// Active nav item
function updateActiveNav() {
    const sections = document.querySelectorAll('.section, .hero');
    const scrollY = window.pageYOffset + 200;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// =========== ROTACIÓN DE ROLES ===========
const roleElement = document.getElementById('roleRotate');
const roles = [
    'Desarrollador Fullstack',
    'Mobile Developer',
    'Consultor Digital',
    'Arquitecto de Software'
];

let currentRole = 0;

function rotateRole() {
    roleElement.style.opacity = '0';
    roleElement.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        currentRole = (currentRole + 1) % roles.length;
        roleElement.textContent = roles[currentRole];
        roleElement.style.opacity = '1';
        roleElement.style.transform = 'translateY(0)';
    }, 300);
}

roleElement.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
setInterval(rotateRole, 3000);

// =========== PARALLAX HERO ===========
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// =========== SCROLL REVEAL ===========
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.reveal').forEach(elem => {
    revealObserver.observe(elem);
});

// =========== CONTADORES ANIMADOS ===========
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const counter = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.dataset.count);
            animateCounter(entry.target, target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(elem => {
    counterObserver.observe(elem);
});

// =========== BARRAS DE HABILIDADES ===========
const skillBarObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fill = entry.target.querySelector('.skill-bar-fill');
            const percentage = entry.target.querySelector('.skill-percent');
            const targetWidth = fill.dataset.width;
            const targetPercent = percentage.dataset.percent;
            
            setTimeout(() => {
                fill.style.width = targetWidth + '%';
                
                // Animar porcentaje
                let current = 0;
                const increment = targetPercent / 100;
                const counter = setInterval(() => {
                    current += increment;
                    if (current >= targetPercent) {
                        percentage.textContent = targetPercent + '%';
                        clearInterval(counter);
                    } else {
                        percentage.textContent = Math.floor(current) + '%';
                    }
                }, 20);
            }, 200);
            
            skillBarObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-bar-item').forEach(elem => {
    skillBarObserver.observe(elem);
});

// =========== EFECTO TILT 3D EN CARDS ===========
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

// =========== SPOTLIGHT EFFECT ===========
document.querySelectorAll('.project-card').forEach(card => {
    const spotlight = card.querySelector('.project-spotlight');
    
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        spotlight.style.left = x - rect.width + 'px';
        spotlight.style.top = y - rect.height + 'px';
    });
});

// =========== RIPPLE EFFECT ===========
document.querySelectorAll('.ripple-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// =========== FORMULARIO ===========
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.btn-submit');
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Construir mensaje para WhatsApp
        const whatsappMessage = `*Nuevo mensaje desde el portafolio*%0A%0A` +
                                `*Nombre:* ${name}%0A` +
                                `*Email:* ${email}%0A%0A` +
                                `*Mensaje:*%0A${message}`;
        
        const phoneNumber = '5493754498862';
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage.replace(/%0A/g, '\n'))}`;
        
        // Abrir WhatsApp en nueva pestaña
        setTimeout(() => {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            
            // Abrir WhatsApp
            window.open(whatsappURL, '_blank');
            
            // Resetear formulario
            contactForm.reset();
            
            // Mensaje de confirmación
            alert('✓ Redirigiendo a WhatsApp. Por favor envía el mensaje desde ahí.');
        }, 1000);
    });
}

// =========== SCROLL TO TOP ===========
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// =========== SMOOTH SCROLL ===========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// =========== CONSOLE MESSAGE ===========
console.log('%c 🎯 Excelencia Técnica', 'color: #2563EB; font-size: 20px; font-weight: bold; font-family: Outfit;');
console.log('%c Desarrollador Fullstack comprometido con la calidad', 'color: #94A3B8; font-size: 14px; font-family: Inter;');
console.log('%c Contacto: matiasmantaras220603@gmail.com', 'color: #2563EB; font-size: 14px; font-family: Inter;');

// =========== PERFORMANCE OPTIMIZATION ===========
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplicar throttle a eventos scroll
const throttledUpdateNav = throttle(updateActiveNav, 100);
window.addEventListener('scroll', throttledUpdateNav);

// =========== LAZY LOADING DE IMÁGENES ===========
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

document.querySelectorAll('img').forEach(img => {
    imageObserver.observe(img);
});

// =========== GALLERY FUNCTIONALITY ===========
const projectGalleries = {
    mobile: {
        title: 'Mobile App Multiplataforma',
        subtitle: 'React Native • Android & iOS',
        images: [
            'images/homescreen.png',
            'images/homescreen2.png',
            'images/tv.png',
            'images/radio.png',
            'images/radio2.png',
            'images/videos.png',
            'images/videos2.png',
            'images/bible.png',
            'images/bible2.png',
            'images/bible3.png',
            'images/bible4.png',
            'images/bible5.png',
            'images/redes.png',
            'images/donaciones.png'
        ]
    },
    erp: {
        title: 'Sistema ERP Empresarial',
        subtitle: 'Python • PostgreSQL • Desktop',
        images: [
            'images/inicioerp.png',
            'images/erp.png',
            'images/pointofsale.png',
            'images/ubicacion.png',
            'images/role.png',
            'images/sucursales.png',
            'images/categorias.png',
            'images/unidades.png',
            'images/facturas.png',
            'images/metododepago.png',
            'images/movimientos.png',
            'images/reportes.png'
        ]
    },
    vibratto: {
        title: 'Vibratto - Plataforma Web',
        subtitle: 'Next.js • Node.js • MongoDB',
        images: [
            'images/vibrato.png',
            'images/titulos.png',
            'images/servicios.png',
            'images/instrumentos.png',
            'images/comentarios.png',
            'images/galeria.png',
            'images/precios.png',
            'images/contacto.png'
        ]
    },
    tickets: {
        title: 'Sistema de Entrada para Eventos',
        subtitle: 'React • Express • PostgreSQL • Mercado Pago',
        images: [
            'images/inicio.png',
            'images/evento.png',
            'images/seleccionaentrada.png',
            'images/entradas2.png',
            'images/qr.png',
            'images/mp.png'
        ]
    }
};

let currentProject = null;
let currentImageIndex = 0;
const galleryModal = document.getElementById('galleryModal');
const galleryImage = document.getElementById('galleryImage');
const galleryTitle = document.querySelector('.gallery-title');
const gallerySubtitle = document.querySelector('.gallery-subtitle');
const currentImageNum = document.getElementById('currentImageNum');
const totalImages = document.getElementById('totalImages');
const thumbnailsContainer = document.getElementById('galleryThumbnails');

function openGallery(projectKey) {
    currentProject = projectGalleries[projectKey];
    if (!currentProject) return;
    
    currentImageIndex = 0;
    galleryModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Update gallery title
    galleryTitle.textContent = currentProject.title;
    gallerySubtitle.textContent = currentProject.subtitle;
    
    updateGalleryImage();
    generateThumbnails();
    
    // Focus modal for keyboard navigation
    galleryModal.focus();
}

function closeGallery() {
    galleryModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    currentProject = null;
}

function nextImage() {
    if (!currentProject) return;
    currentImageIndex = (currentImageIndex + 1) % currentProject.images.length;
    updateGalleryImage();
}

function prevImage() {
    if (!currentProject) return;
    currentImageIndex = (currentImageIndex - 1 + currentProject.images.length) % currentProject.images.length;
    updateGalleryImage();
}

function goToImage(index) {
    currentImageIndex = index;
    updateGalleryImage();
}

function updateGalleryImage() {
    if (!currentProject) return;
    
    galleryImage.src = currentProject.images[currentImageIndex];
    galleryImage.alt = `${currentProject.title} - Imagen ${currentImageIndex + 1}`;
    currentImageNum.textContent = currentImageIndex + 1;
    totalImages.textContent = currentProject.images.length;
    
    // Update thumbnails active state
    document.querySelectorAll('.gallery-thumbnail').forEach((thumb, idx) => {
        if (idx === currentImageIndex) {
            thumb.classList.add('active');
            thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        } else {
            thumb.classList.remove('active');
        }
    });
}

function generateThumbnails() {
    if (!currentProject) return;
    
    thumbnailsContainer.innerHTML = '';
    currentProject.images.forEach((imgSrc, index) => {
        const thumbDiv = document.createElement('div');
        thumbDiv.className = 'gallery-thumbnail';
        if (index === 0) thumbDiv.classList.add('active');
        
        const thumbImg = document.createElement('img');
        thumbImg.src = imgSrc;
        thumbImg.alt = `Miniatura ${index + 1}`;
        
        thumbDiv.appendChild(thumbImg);
        thumbDiv.addEventListener('click', () => goToImage(index));
        thumbnailsContainer.appendChild(thumbDiv);
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!galleryModal.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
        closeGallery();
    } else if (e.key === 'ArrowRight') {
        nextImage();
    } else if (e.key === 'ArrowLeft') {
        prevImage();
    }
});

// Close on background click
galleryModal.addEventListener('click', (e) => {
    if (e.target === galleryModal) {
        closeGallery();
    }
});

// =========== INIT ===========
document.addEventListener('DOMContentLoaded', () => {
    // Trigger initial animations
    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach(elem => {
            elem.style.opacity = '1';
        });
    }, 100);
});

