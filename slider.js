// Простой и надежный слайдер
class EnergySlider {
    constructor(containerId, images) {
        this.container = document.getElementById(containerId);
        this.images = images;
        this.currentIndex = 0;
        this.isAnimating = false;
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
                            <img src="${img}" alt="Энергетик ${index + 1}" onerror="this.style.display='none'">
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
        if (this.isAnimating || index === this.currentIndex) return;
        
        this.isAnimating = true;
        const slides = this.container.querySelectorAll('.slide');
        const dots = this.container.querySelectorAll('.dot');
        
        slides[this.currentIndex].classList.remove('active');
        dots[this.currentIndex].classList.remove('active');
        
        this.currentIndex = index;
        
        slides[this.currentIndex].classList.add('active');
        dots[this.currentIndex].classList.add('active');
        
        setTimeout(() => {
            this.isAnimating = false;
        }, 500);
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
            if (!this.isAnimating) {
                this.nextSlide();
            }
        }, 4000);
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
        
        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                if (this.isAnimating) return;
                this.stopAutoPlay();
                const index = parseInt(e.target.getAttribute('data-index'));
                this.goToSlide(index);
                this.startAutoPlay();
            });
        });
        
        this.container.addEventListener('mouseenter', () => {
            this.stopAutoPlay();
        });
        
        this.container.addEventListener('mouseleave', () => {
            this.startAutoPlay();
        });
        
        this.container.addEventListener('touchstart', () => {
            this.stopAutoPlay();
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const sliders = {
        'slider-energy1': ['images/energy_red1.jpg', 'images/energy_red2.jpg', 'images/back_red.png'],
        'slider-energy2': ['images/energy_purple1.jpg', 'images/energy_purple2.jpg', 'images/back_purple.png'],
        'slider-energy3': ['images/energy_green1.jpg', 'images/energy_green2.jpg', 'images/back_green.png'],
        'slider-energy4': ['images/energy_yellow1.jpg', 'images/back_yellow.png'],
        'slider-energy5': ['images/energy_blue1.jpg', 'images/energy_blue2.jpg', 'images/back_blue.png']
    };
    
    Object.keys(sliders).forEach(sliderId => {
        if (document.getElementById(sliderId)) {
            new EnergySlider(sliderId, sliders[sliderId]);
        }
    });
});
