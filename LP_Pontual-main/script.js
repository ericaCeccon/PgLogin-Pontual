// ============================
// TEMA CLARO / ESCURO
// ============================

const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isLight = htmlElement.getAttribute('data-theme') === 'light' || htmlElement.classList.contains('modo-claro');

        if (isLight) {
            htmlElement.setAttribute('data-theme', 'dark');
            htmlElement.classList.remove('modo-claro');
            htmlElement.classList.add('modo-escuro');
            localStorage.setItem('pontual-theme', 'dark');
        } else {
            htmlElement.setAttribute('data-theme', 'light');
            htmlElement.classList.remove('modo-escuro');
            htmlElement.classList.add('modo-claro');
            localStorage.setItem('pontual-theme', 'light');
        }
    });
}

// ============================
// BOTÃO VOLTAR AO TOPO
// ============================

const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}


// ============================
// BOTÕES
// ============================

const botoes = document.querySelectorAll(
    '.primary-button, .header-button'
);

botoes.forEach(botao => {

    botao.addEventListener('click', () => {

        alert('A plataforma Pontual será conectada aqui.');

    });

});


// ============================
// ANIMAÇÃO DE ROLAGEM
// ============================

const animElements = document.querySelectorAll(
    '.floating-card, .process-item, .solution-left, .solution-right, .big-statement h2, .section-top'
);

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                // observer.unobserve(entry.target); // Opcional: animar apenas 1 vez
            }
        });
    },
    { threshold: 0.15 }
);

animElements.forEach(el => {
    el.classList.add('anim-hidden');
    observer.observe(el);
});


// ============================
// MOVIMENTO SUTIL (PARALLAX)
// ============================
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 15; 
    const y = (e.clientY / window.innerHeight - 0.5) * 15;
    
    const heroPanel = document.querySelector('.hero-panel');
    if (heroPanel) {
        heroPanel.style.transform = `rotate(3deg) translate(${x}px, ${y}px)`;
    }

    const cardOne = document.querySelector('.card-one');
    if (cardOne) {
        cardOne.style.transform = `rotate(-4deg) translate(${x * -1.5}px, ${y * -1.5}px)`;
    }

    const cardTwo = document.querySelector('.card-two');
    if (cardTwo) {
        cardTwo.style.transform = `rotate(5deg) translate(${x * 2}px, ${y * 2}px)`;
    }
});


// ============================
// ACORDEON DE RECURSOS (ESCALAS, PONTO, PRESENÇA, GESTÃO)
// ============================
const resourceItems = document.querySelectorAll('.resource-item');

if (resourceItems.length > 0) {
    resourceItems.forEach(item => {
        const header = item.querySelector('.resource-header');
        if (!header) return;

        header.addEventListener('click', () => {
            const isCurrentlyActive = item.classList.contains('active');

            // Fecha os outros itens para experiência de sanfona fluida
            resourceItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                const otherHeader = otherItem.querySelector('.resource-header');
                if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
            });

            // Alterna o item clicado
            if (!isCurrentlyActive) {
                item.classList.add('active');
                header.setAttribute('aria-expanded', 'true');
            }
        });
    });
}


// ============================================
// SIMULAÇÃO DO SMARTPHONE (RELÓGIO & PONTO)
// ============================================

function updatePhoneScreenClock() {
    const clockEl = document.getElementById('screen-clock');
    const topTimeEl = document.getElementById('screen-top-time');
    const dateEl = document.getElementById('screen-date');

    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    if (clockEl) {
        clockEl.textContent = `${hours}:${minutes}:${seconds}`;
    }

    if (topTimeEl) {
        topTimeEl.textContent = `${hours}:${minutes}`;
    }

    if (dateEl) {
        const days = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'];
        const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        const dayName = days[now.getDay()];
        const dayNum = now.getDate();
        const monthName = months[now.getMonth()];
        dateEl.textContent = `${dayName}, ${dayNum} De ${monthName}`;
    }
}

// Inicia o relógio em tempo real
updatePhoneScreenClock();
setInterval(updatePhoneScreenClock, 1000);

// Simulação de registro de ponto interativo
window.triggerPunchSimulation = function () {
    const btn = document.getElementById('interactive-punch-btn');
    const btnText = document.getElementById('punch-btn-text');
    if (!btn || !btnText) return;

    if (btn.classList.contains('punched')) return;

    btn.classList.add('punched');
    const originalText = btnText.textContent;
    btnText.textContent = '✓ PONTO REGISTRADO!';

    setTimeout(() => {
        btn.classList.remove('punched');
        btnText.textContent = originalText;
    }, 3000);
};

