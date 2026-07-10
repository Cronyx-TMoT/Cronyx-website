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
    const documentHeight = document.documentElement.scrollHeight;
    const maxScroll = documentHeight - windowHeight;

    if (maxScroll <= 0) return;

    const scrollPercent = Math.min(scrollY / maxScroll, 1);
    const newHeight = maxHeight - (maxHeight - minHeight) * scrollPercent;

    headerImg.style.height = newHeight + 'px';
    headerImg.style.opacity = newHeight / maxHeight;
    contentWrapper.style.top = (topHeader + newHeight + spacing) + 'px';
}

// Gestione click sui quadratini: almeno uno deve rimanere selezionato
document.addEventListener('DOMContentLoaded', function() {
    const squares = document.querySelectorAll('.black-square, .red-square, .white-square, .blue-square');
    
    // Imposta il quadrato BIANCO come selezionato di default (border 4)
    const whiteSquare = document.querySelector('.white-square');
    if (whiteSquare) {
        whiteSquare.classList.add('clicked');
    }

    squares.forEach(square => {
        square.addEventListener('click', function() {
            // Se questo quadrato è già attivo, non fare nulla (per mantenere almeno uno selezionato)
            if (this.classList.contains('clicked')) {
                return;
            } else {
                // Altrimenti rimuovi la classe da tutti e aggiungila a questo
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