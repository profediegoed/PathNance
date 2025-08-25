const maxXP = 100;

function updateXPBar(currentXP) {
    const xpBar = document.getElementById('xp-bar');
    const xpText = document.getElementById('xp-text');
    const xpPercentage = (currentXP / maxXP) * 100;
    xpBar.style.width = xpPercentage + '%';
    xpText.textContent = `${currentXP} / ${maxXP} XP`;
}

function fetchXP() {
    fetch('/get_xp')
        .then(response => response.json())
        .then(data => {
            currentXP = data.xp;
            updateXPBar(currentXP);
        })
        .catch(error => console.error('Error fetching XP:', error));
}

document.addEventListener('DOMContentLoaded', fetchXP);

let isAnimating = false;

function moveCarousel(direction) {
    if (isAnimating) return;
    isAnimating = true;

    const carouselInner = document.querySelector('.carousel-inner');
    const items = carouselInner.querySelectorAll('.carousel-item');

    if (direction === 1) { // Desplazar hacia la izquierda
        carouselInner.appendChild(items[0].cloneNode(true));
        carouselInner.style.transition = 'transform 0.5s ease';
        carouselInner.style.transform = 'translateX(-220px)';

        setTimeout(() => {
            carouselInner.style.transition = 'none';
            carouselInner.style.transform = 'translateX(0)';
            carouselInner.removeChild(items[0]);
            isAnimating = false;
        }, 500);
    } else if (direction === -1) { // Desplazar hacia la derecha
        carouselInner.style.transition = 'none';
        carouselInner.style.transform = 'translateX(-220px)';
        carouselInner.insertBefore(items[items.length - 1].cloneNode(true), items[0]);

        setTimeout(() => {
            carouselInner.style.transition = 'transform 0.5s ease';
            carouselInner.style.transform = 'translateX(0)';

            setTimeout(() => {
                carouselInner.style.transition = 'none';
                carouselInner.removeChild(items[items.length - 1]);
                isAnimating = false;
            }, 500);
        });
    }
}

document.querySelector('.prev').addEventListener('click', () => moveCarousel(-1));
document.querySelector('.next').addEventListener('click', () => moveCarousel(1));
