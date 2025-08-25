function changeCarouselContent(category) {
    const carouselTitle = document.getElementById('carousel-title');
    const carouselInner = document.querySelector('.carousel-inner');
    const carouselSub = document.getElementById('carousel-sub');
    let content = '';

    switch (category) {
        case 'vivienda':
            carouselTitle.textContent = 'Oferta de vivienda';
            carouselSub.textContent = '';
            content = `
                <div class="carousel-item"><a href="https://www.minvivienda.gov.co/viceministerio-de-vivienda/mi-casa-ya"><img src="img/ejemplos.png" alt="Vivienda 1"></a>Mi casa ya</div>
                <div class="carousel-item"><a href="https://www.minvivienda.gov.co/cambia-mi-casa"><img src="img/ejemplos.png" alt="Vivienda 2"></a>Cambia mi casa</div>
                <div class="carousel-item"><a href="https://fundacionsantodomingo.org/nuestro-impacto/desarrollo-territorial/"><img src="img/ejemplos.png" alt="Vivienda 3"></a>F. santo domingo(caribe)</div>
                <div class="carousel-item"><a href="https://site.caldas.gov.co/index.php/secretaria-vivienda"><img src="img/ejemplos.png" alt="Vivienda 3"></a>Secretaria de vivienda(caldas)</div>
                <div class="carousel-item"><a href="#"><img src="img/ejemplos.png" alt="#"></a>#</div>
                <!-- Añadir más items si es necesario -->
                <button class="prev" onclick="moveCarousel(-1)">&lt;</button>
                <button class="next" onclick="moveCarousel(1)">&gt;</button>
            `;
            break;
        case 'educacion':
            carouselTitle.textContent = 'Oferta de Educación';
            carouselSub.textContent = '';
            content = `
                <div class="carousel-item"><a href="#"><img src="img/ejemplos.png" alt="Educación 1"></a>holllllllllla</div>
                <div class="carousel-item"><a href="#"><img src="img/ejemplos.png" alt="Educación 2"></a>aaaaaaaaaaaaaaa</div>
                <div class="carousel-item"><a href="#"><img src="img/ejemplos.png" alt="Educación 3"></a>aaaaaaaaaaaaaaa</div>
                <!-- Añadir más items si es necesario -->
                <button class="prev" onclick="moveCarousel(-1)">&lt;</button>
                <button class="next" onclick="moveCarousel(1)">&gt;</button>
            `;
            break;
        case 'salud':
            carouselTitle.textContent = 'Oferta de Salud';
            carouselSub.textContent = '';
            content = `
                <div class="carousel-item"><a href="#"><img src="img/ejemplos.png" alt="Salud 1"></a></div>
                <div class="carousel-item"><a href="#"><img src="img/ejemplos.png" alt="Salud 2"></a></div>
                <div class="carousel-item"><a href="#"><img src="img/ejemplos.png" alt="Salud 3"></a></div>
                <!-- Añadir más items si es necesario -->
                <button class="prev" onclick="moveCarousel(-1)">&lt;</button>
                <button class="next" onclick="moveCarousel(1)">&gt;</button>
            `;
            break;
        case 'Tm':
            carouselTitle.textContent = 'Transferencia Monetaria';
            carouselSub.textContent = '';
            content = `
                <div class="carousel-item"><a href="#"><img src="img/ejemplos.png" alt="Tm 1"></a></div>
                <div class="carousel-item"><a href="#"><img src="img/ejemplos.png" alt="Tm 2"></a></div>
                <div class="carousel-item"><a href="#"><img src="img/ejemplos.png" alt="Tm 3"></a></div>
                <!-- Añadir más items si es necesario -->
                <button class="prev" onclick="moveCarousel(-1)">&lt;</button>
                <button class="next" onclick="moveCarousel(1)">&gt;</button>
            `;
            break;
        case 'creditos':
            carouselTitle.textContent = 'Creditos';
            carouselSub.textContent = '';
            content = `
                <div class="carousel-item"><a href="#"><img src="img/ejemplos.png" alt="Creditos 1"></a></div>
                <div class="carousel-item"><a href="#"><img src="img/ejemplos.png" alt="Creditos 2"></a></div>
                <div class="carousel-item"><a href="#"><img src="img/ejemplos.png" alt="Creditos 3"></a></div>
                <!-- Añadir más items si es necesario -->
                <button class="prev" onclick="moveCarousel(-1)">&lt;</button>
                <button class="next" onclick="moveCarousel(1)">&gt;</button>
            `;
            break;
        case 'Otros':
            carouselTitle.textContent = 'Otros';
            carouselSub.textContent = '';
            content = `
                <div class="carousel-item"><a href="#"><img src="img/ejemplos.png" alt="Otros 1"></a></div>
                <div class="carousel-item"><a href="#"><img src="img/ejemplos.png" alt="Otros 2"></a></div>
                <div class="carousel-item"><a href="#"><img src="img/ejemplos.png" alt="Otros 3"></a></div>
                <div class="carousel-item"><a href="#"><img src="img/ejemplos.png" alt="Otros 3"></a></div>
                <div class="carousel-item"><a href="#"><img src="img/ejemplos.png" alt="Otros 3"></a></div>
                <!-- Añadir más items si es necesario -->
                <button class="prev" onclick="moveCarousel(-1)">&lt;</button>
                <button class="next" onclick="moveCarousel(1)">&gt;</button>
            `;
            break;
    }
    carouselInner.innerHTML = content;
    fetchXP(); // Actualiza el XP después de cambiar el contenido del carrusel
}
