// SENTERPRISEIT Landing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initAnimations();
    initNavigation();
    initServiceCategories();
    initContactForm();
    initScrollEffects();
    initDeviceAnimations();
    initRegistrationForm();
});

// Animation initialization
function initAnimations() {
    // Add loading animation to elements
    const animatedElements = document.querySelectorAll('.hero-title, .hero-subtitle, .whatsapp-btn, .device-mockups');
    
    animatedElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Navigation functionality
function initNavigation() {
    const navPills = document.querySelectorAll('.nav-pill');
    const flagButtons = document.querySelectorAll('.flag-btn');

    // Navigation pills interaction
    navPills.forEach(pill => {
        pill.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all pills
            navPills.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked pill
            this.classList.add('active');
            
            // Smooth scroll to section (if implemented)
            const target = this.getAttribute('href');
            if (target && target !== '#') {
                const element = document.querySelector(target);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Flag buttons interaction
    flagButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            flagButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Language change logic (placeholder)
            const isEnglish = this.querySelector('.fa-flag-usa');
            if (isEnglish) {
                console.log('Switching to English');
                // Implement language switching logic here
            } else {
                console.log('Switching to Spanish');
                // Implement language switching logic here
            }
        });
    });

    // Action buttons
    const loginBtn = document.querySelector('.btn-secondary');

    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            showModal('Iniciar Sesión', 'Funcionalidad de inicio de sesión próximamente disponible.');
        });
    }
}

// Service categories interaction
function initServiceCategories() {
    const serviceCategories = document.querySelectorAll('.service-category');
    
    serviceCategories.forEach(category => {
        // Add hover sound effect (optional)
        category.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        category.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Contact form functionality
function initContactForm() {
    // Add click-to-copy functionality for contact information
    const contactDetails = document.querySelectorAll('.contact-details p');
    
    contactDetails.forEach(detail => {
        detail.addEventListener('click', function() {
            const text = this.textContent;
            copyToClipboard(text);
            showToast('Información copiada al portapapeles');
        });
    });
}

// Scroll effects
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const elementsToObserve = document.querySelectorAll('.service-category, .contact-section, .feature-card');
    elementsToObserve.forEach(el => observer.observe(el));
}

// Device animations
function initDeviceAnimations() {
    const devices = document.querySelectorAll('.phone-mockup, .laptop-mockup');
    
    devices.forEach((device, index) => {
        // Staggered animation on load
        device.style.animationDelay = `${index * 0.3}s`;
        
        // Interactive hover effects
        device.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        device.addEventListener('mouseleave', function() {
            this.style.zIndex = index + 1;
        });
    });

    // Simulate real-time updates in device screens
    simulateDeviceUpdates();
}

// Simulate device screen updates
function simulateDeviceUpdates() {
    const callItems = document.querySelectorAll('.call-item');
    const posItems = document.querySelectorAll('.pos-item');
    const statNumbers = document.querySelectorAll('.stat-number');

    // Animate call status changes
    setInterval(() => {
        callItems.forEach(item => {
            const status = item.querySelector('.call-status');
            if (status && Math.random() > 0.7) {
                const statuses = ['En línea', 'Ocupada', 'Disponible'];
                const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
                status.textContent = newStatus;
                status.style.color = newStatus === 'En línea' ? '#10b981' : 
                                   newStatus === 'Ocupada' ? '#ef4444' : '#6b7280';
            }
        });
    }, 5000);

    // Animate POS transactions
    setInterval(() => {
        posItems.forEach(item => {
            const amount = item.querySelector('.pos-amount');
            if (amount && Math.random() > 0.8) {
                const newAmount = Math.floor(Math.random() * 2000) + 100;
                amount.textContent = `$${newAmount.toLocaleString()}.00`;
            }
        });
    }, 3000);

    // Animate attendance stats
    setInterval(() => {
        statNumbers.forEach(stat => {
            if (stat.textContent.includes(':')) {
                // Time format
                const [hours, minutes] = stat.textContent.split(':');
                const newMinutes = (parseInt(minutes) + 1) % 60;
                const newHours = newMinutes === 0 ? (parseInt(hours) + 1) % 24 : hours;
                stat.textContent = `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;
            } else if (stat.textContent.match(/^\d+$/)) {
                // Number format
                const current = parseInt(stat.textContent);
                const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
                const newValue = Math.max(0, current + change);
                stat.textContent = newValue;
            }
        });
    }, 4000);
}

// WhatsApp functionality
function openWhatsApp() {
    const phoneNumber = '6564376040';
    const message = encodeURIComponent('Hola, me interesa conocer más sobre las soluciones tecnológicas de SENTERPRISEIT.');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
}

// Registration modal functionality
function openRegistrationModal() {
    const modal = document.getElementById('registrationModal');
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeRegistrationModal() {
    const modal = document.getElementById('registrationModal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Registration form functionality
function initRegistrationForm() {
    const form = document.getElementById('registrationForm');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const registrationData = {
            nombre: formData.get('nombre'),
            empresa: formData.get('empresa'),
            email: formData.get('email'),
            telefono: formData.get('telefono'),
            solucion: formData.get('solucion'),
            mensaje: formData.get('mensaje'),
            fecha: new Date().toISOString(),
            timestamp: Date.now()
        };
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        try {
            // Save to database (Firebase or localStorage fallback)
            const result = await saveRegistration(registrationData);
            
            // Show success message
            showToast(result.message);
            
            // Close modal and reset form
            closeRegistrationModal();
            form.reset();
            
        } catch (error) {
            console.error('Error saving registration:', error);
            showToast('Error al enviar registro. Inténtalo de nuevo.');
        } finally {
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Save registration to database
async function saveRegistration(data) {
    // Check if database service is available
    if (window.databaseService) {
        try {
            const result = await window.databaseService.saveRegistration(data);
            console.log('Registration saved to database:', result);
            return result;
        } catch (error) {
            console.error('Database error, falling back to localStorage:', error);
        }
    }
    
    // Fallback to localStorage
    let registrations = JSON.parse(localStorage.getItem('senterpriseit_registrations') || '[]');
    registrations.push(data);
    localStorage.setItem('senterpriseit_registrations', JSON.stringify(registrations));
    
    console.log('Registration saved to localStorage:', data);
    console.log('Total registrations:', registrations.length);
    
    return { success: true, message: '¡Registro enviado exitosamente! Nos pondremos en contacto contigo pronto.' };
}

// Scroll to specific service section
function scrollToService(serviceId) {
    const element = document.getElementById(serviceId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Export registrations to Excel (CSV format)
function exportRegistrationsToExcel() {
    const registrations = JSON.parse(localStorage.getItem('senterpriseit_registrations') || '[]');
    
    if (registrations.length === 0) {
        showToast('No hay registros para exportar');
        return;
    }
    
    // Create CSV content
    const headers = ['Nombre', 'Empresa', 'Email', 'Teléfono', 'Solución', 'Mensaje', 'Fecha'];
    const csvContent = [
        headers.join(','),
        ...registrations.map(reg => [
            `"${reg.nombre}"`,
            `"${reg.empresa}"`,
            `"${reg.email}"`,
            `"${reg.telefono}"`,
            `"${reg.solucion}"`,
            `"${reg.mensaje || ''}"`,
            `"${new Date(reg.fecha).toLocaleDateString('es-ES')}"`
        ].join(','))
    ].join('\n');
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `registros_senterpriseit_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showToast('Registros exportados exitosamente');
}

// Utility functions
function showModal(title, message) {
    // Create modal element
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-lg p-6 max-w-md mx-4 transform transition-all">
            <h3 class="text-lg font-semibold mb-4">${title}</h3>
            <p class="text-gray-600 mb-6">${message}</p>
            <button class="btn-primary w-full" onclick="this.closest('.fixed').remove()">
                Cerrar
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal on background click
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.remove();
        }
    });
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform translate-y-full transition-transform duration-300 z-50';
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateY(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.transform = 'translateY(full)';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
}

// Add CSS for new animations
const additionalStyles = `
    .animate-in {
        animation: slideInUp 0.6s ease-out forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .service-category {
        opacity: 0;
        transform: translateY(20px);
    }
    
    .service-category.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .feature-card {
        opacity: 0;
        transform: translateY(30px);
    }
    
    .feature-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Performance optimization
function debounce(func, wait) {
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

// Optimize scroll events
const optimizedScrollHandler = debounce(() => {
    // Scroll-based animations and effects
}, 16);

window.addEventListener('scroll', optimizedScrollHandler);

// Add loading state
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('registrationModal');
    if (e.target === modal) {
        closeRegistrationModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeRegistrationModal();
    }
});

// Export functions for global access
window.SENTERPRISEIT = {
    showModal,
    showToast,
    copyToClipboard,
    openWhatsApp,
    openRegistrationModal,
    closeRegistrationModal,
    exportRegistrationsToExcel,
    scrollToService
}; 