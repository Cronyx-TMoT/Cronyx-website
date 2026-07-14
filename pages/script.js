let ticking = false;

// ============================================
// 1. SCROLL – gestione logotype e content-wrapper
// ============================================
function updatePosition() {
    const headerImg = document.querySelector('.header-img');
    const contentWrapper = document.querySelector('.content-wrapper');

    if (!headerImg || !contentWrapper) return;

    const maxHeight = 450;
    const minHeight = 0;
    const topHeader = 90;
    const spacing = 20;

    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    const scrollForLogotype = Math.min(300, windowHeight * 0.6);

    const logotypeProgress = Math.min(scrollY / scrollForLogotype, 1);
    const newHeight = maxHeight - (maxHeight - minHeight) * logotypeProgress;

    headerImg.style.height = newHeight + 'px';
    headerImg.style.opacity = newHeight / maxHeight;

    let wrapperTop;
    if (scrollY < scrollForLogotype) {
        wrapperTop = topHeader + newHeight + spacing;
    } else {
        const extraScroll = scrollY - scrollForLogotype;
        wrapperTop = topHeader + spacing - extraScroll;
    }

    contentWrapper.style.top = wrapperTop + 'px';
}

// ============================================
// 2. QUADRATINI – selezione unica (default white)
// ============================================
function initSquares() {
    const squares = document.querySelectorAll('.black-square, .red-square, .white-square, .blue-square');
    const whiteSquare = document.querySelector('.white-square');

    if (whiteSquare) {
        whiteSquare.classList.add('clicked');
    }

    squares.forEach(square => {
        square.addEventListener('click', function() {
            if (this.classList.contains('clicked')) return;
            squares.forEach(s => s.classList.remove('clicked'));
            this.classList.add('clicked');
        });
    });
}

// ============================================
// 3. CONTROLLO PULSANTI – Apple nasconde, Windows mostra
// ============================================
function initDownloadControls() {
    const appleBtn = document.querySelector('.apple-btn');
    const windowsBtn = document.querySelector('.windows-btn');
    const downloadButtons = document.querySelector('.download-buttons');

    if (!downloadButtons) return;

    if (appleBtn) {
        appleBtn.addEventListener('click', function() {
            downloadButtons.classList.add('hidden');
        });
    }

    if (windowsBtn) {
        windowsBtn.addEventListener('click', function() {
            downloadButtons.classList.remove('hidden');
        });
    }
}

// ============================================
// 4. NAVIGAZIONE – Versions → versions.html
// ============================================
function initNavButtons() {
    const versionsBtn = document.querySelector('.nav-versions');
    
    if (versionsBtn) {
        versionsBtn.addEventListener('click', function() {
            window.location.href = 'pages/versions.html';
        });
    }
}

// ============================================
// 5. NAVIGAZIONE – Home → index.html (da versions.html)
// ============================================
function initHomeButton() {
    const homeBtn = document.querySelector('.nav-home');
    if (homeBtn) {
        homeBtn.addEventListener('click', function() {
            // Reindirizza alla root (index.html)
            window.location.href = '../index.html';
        });
    }
}

// ============================================
// 6. AVVIO – esecuzione al caricamento
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    initSquares();
    initDownloadControls();
    initNavButtons();
    initHomeButton();   // ← AGGIUNTO
});

// Esegue all'avvio e durante lo scroll (con ottimizzazione)
window.addEventListener('load', updatePosition);

window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            updatePosition();
            ticking = false;
        });
        ticking = true;
    }
});