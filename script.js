let ticking = false;

// Funzione per aggiornare posizione e opacità
function updatePosition() {
    const headerImg = document.querySelector('.header-img');
    const contentWrapper = document.querySelector('.content-wrapper');

    const maxHeight = 450;
    const minHeight = 0;
    const topHeader = 90;
    const spacing = 20;

    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    // Distanza di scroll in cui il logotype scompare (es. 300px o 60% della viewport)
    const scrollForLogotype = Math.min(300, window.innerHeight * 0.6); // 300px o 60% viewport

    // Calcola se siamo nella fase di scomparsa del logotype
    const logotypeProgress = Math.min(scrollY / scrollForLogotype, 1);
    const newHeight = maxHeight - (maxHeight - minHeight) * logotypeProgress;

    // Aggiorna altezza e opacità del logotype
    headerImg.style.height = newHeight + 'px';
    headerImg.style.opacity = newHeight / maxHeight;

    // Calcola la posizione del wrapper:
    // - durante la scomparsa: segue il logotype (come prima)
    // - dopo la scomparsa: continua a salire con lo scroll
    let wrapperTop;
    if (scrollY < scrollForLogotype) {
        wrapperTop = topHeader + newHeight + spacing;
    } else {
        // Dopo la scomparsa, il wrapper sale di 1px per ogni px di scroll aggiuntivo
        const extraScroll = scrollY - scrollForLogotype;
        wrapperTop = topHeader + spacing - extraScroll;
        // Limite: non può scendere sotto un certo valore (per non sparire del tutto)
        // Lo lasciamo andare fino a un minimo, ma possiamo anche non limitarlo
    }

    contentWrapper.style.top = wrapperTop + 'px';
}

// Gestione click sui quadratini (invariata)
document.addEventListener('DOMContentLoaded', function() {
    const squares = document.querySelectorAll('.black-square, .red-square, .white-square, .blue-square');
    const whiteSquare = document.querySelector('.white-square');
    if (whiteSquare) {
        whiteSquare.classList.add('clicked');
    }

    squares.forEach(square => {
        square.addEventListener('click', function() {
            if (this.classList.contains('clicked')) {
                return;
            } else {
                squares.forEach(s => s.classList.remove('clicked'));
                this.classList.add('clicked');
            }
        });
    });
});

// Esegue all'avvio
window.addEventListener('load', updatePosition);

// Esegue durante lo scroll (con ottimizzazione)
window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            updatePosition();
            ticking = false;
        });
        ticking = true;
    }
});