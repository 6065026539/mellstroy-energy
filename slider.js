try {
// Слайдер для страниц энергетиков
class EnergySlider {
    constructor(containerId, images) {
        this.container = document.getElementById(containerId);
        this.images = images;
        this.currentIndex = 0;
        this.autoPlayInterval = null;
        this.init();
    }
    
    init() {
        this.createSlider();
        this.startAutoPlay();
        this.addEventListeners();
    }
    
    createSlider() {
        this.container.innerHTML = `
            <div class="energy-slider">
                <div class="slides-container">
                    ${this.images.map((img, index) => `
                        <div class="slide ${index === 0 ? 'active' : ''}">
                            <img src="${img}" alt="Энергетик ${index + 1}">
                        </div>
                    `).join('')}
                </div>
                <div class="slider-nav">
                    <button class="slider-btn prev">❮</button>
                    <button class="slider-btn next">❯</button>
                </div>
                <div class="slider-dots">
                    ${this.images.map((_, index) => `
                        <div class="dot ${index === 0 ? 'active' : ''}" data-index="${index}"></div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    goToSlide(index) {
        const slides = this.container.querySelectorAll('.slide');
        const dots = this.container.querySelectorAll('.dot');
        
        // Скрываем все слайды
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Показываем нужный слайд
        this.currentIndex = index;
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }
    
    nextSlide() {
        let nextIndex = this.currentIndex + 1;
        if (nextIndex >= this.images.length) {
            nextIndex = 0;
        }
        this.goToSlide(nextIndex);
    }
    
    prevSlide() {
        let prevIndex = this.currentIndex - 1;
        if (prevIndex < 0) {
            prevIndex = this.images.length - 1;
        }
        this.goToSlide(prevIndex);
    }
    
    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 3000); // Меняем каждые 3 секунды
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
    }
    
    addEventListeners() {
        const prevBtn = this.container.querySelector('.prev');
        const nextBtn = this.container.querySelector('.next');
        const dots = this.container.querySelectorAll('.dot');
        
        // Стрелки
        prevBtn.addEventListener('click', () => {
            this.stopAutoPlay();
            this.prevSlide();
            this.startAutoPlay();
        });
        
        nextBtn.addEventListener('click', () => {
            this.stopAutoPlay();
            this.nextSlide();
            this.startAutoPlay();
        });
        
        // Точки
        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                this.stopAutoPlay();
                const index = parseInt(e.target.getAttribute('data-index'));
                this.goToSlide(index);
                this.startAutoPlay();
            });
        });
        
        // Останавливаем автоплей при наведении
        this.container.addEventListener('mouseenter', () => {
            this.stopAutoPlay();
        });
        
        // Возобновляем автоплей когда убираем мышь
        this.container.addEventListener('mouseleave', () => {
            this.startAutoPlay();
        });
        
        // Для мобильных устройств - останавливаем при касании
        this.container.addEventListener('touchstart', () => {
            this.stopAutoPlay();
        });
    }
}

// Инициализация слайдеров для каждой страницы
document.addEventListener('DOMContentLoaded', function() {
    // ENERGY OF YOUR DEP - 3 фото
    if (document.getElementById('slider-energy1')) {
        new EnergySlider('slider-energy1', [
            'images/energy_red1.jpg',
            'images/energy_red2.jpg',
            'images/back_red.png'
        ]);
    }
    
    // ЭНЕРГИЯ КОРОЛЯ - 3 фото
    if (document.getElementById('slider-energy2')) {
        new EnergySlider('slider-energy2', [
             'images/energy_purple1.jpg',
            'images/energy_purple2.jpg',
            'images/back_purple.png'
        ]);
    }
    
    // DONAT ЭНЕРГИЯ - 3 фото
    if (document.getElementById('slider-energy3')) {
        new EnergySlider('slider-energy3', [
             'images/energy_green1.jpg',
            'images/energy_green2.jpg',
            'images/back_green.png'
        ]);
    }
    
    // ЖЕСТКАЯ ЭНЕРГИЯ - 2 фото
    if (document.getElementById('slider-energy4')) {
        new EnergySlider('slider-energy4', [
             'images/energy_yellow1.jpg',
            'images/back_yellow.png'
        ]);
    }
    
    // ХОЛОДНЫЙ БЕСПРЕДЕЛ - 3 фото
    if (document.getElementById('slider-energy5')) {
        new EnergySlider('slider-energy5', [
            'images/energy_blue1.jpg',
            'images/energy_blue2.jpg',
            'images/back_blue.png'
        ]);
    }

});
} catch (error) {
    console.log('Ошибка в слайдере:', error);
}
