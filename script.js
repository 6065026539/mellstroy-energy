// Массивы с изображениями для каждого слота
const slotImages = {
    slot1: ['images/slot1.jpeg', 'images/slot2.jpg', 'images/slot3.gif'],
    slot2: ['images/slot1.jpeg', 'images/slot2.jpg', 'images/slot3.gif'], 
    slot3: ['images/slot1.jpeg', 'images/slot2.jpg', 'images/slot3.gif']
};

// Финальные изображения, которые должны выпасть
const finalImages = ['images/slot2.jpg', 'images/slot2.jpg', 'images/slot2.jpg'];

// Функция для прокрутки слотов
function spinSlots() {
    const slots = document.querySelectorAll('.slot');
    const sound = document.getElementById('slotSound');
    const spinButton = document.querySelector('.spin-button');
    
    // Блокируем кнопку на время анимации
    spinButton.disabled = true;
    spinButton.style.opacity = '0.7';
    
    // Воспроизводим звук
    if (sound) {
        sound.currentTime = 0;
        sound.play().catch(e => console.log('Audio play failed:', e));
    }
    
    // Запускаем анимацию для каждого слота
    slots.forEach((slot, index) => {
        animateSlot(slot, index);
    });
    
    // Останавливаем через 3 секунды
    setTimeout(() => {
        stopSlots(slots);
        
        // Разблокируем кнопку
        spinButton.disabled = false;
        spinButton.style.opacity = '1';
        
        // Показываем результат с задержкой
        setTimeout(() => {
            showWinMessage();
        }, 500);
        
    }, 3000);
}

// Анимация прокрутки одного слота
function animateSlot(slot, slotIndex) {
    const images = slotImages[`slot${slotIndex + 1}`];
    let currentIndex = 0;
    let spinCount = 0;
    const totalSpins = 20 + Math.random() * 10; // Случайное количество прокруток
    
    const spinInterval = setInterval(() => {
        // Меняем изображение
        const img = slot.querySelector('.slot-image');
        if (img) {
            img.src = images[currentIndex];
            img.alt = `Слот ${currentIndex + 1}`;
        }
        
        // Переходим к следующему изображению
        currentIndex = (currentIndex + 1) % images.length;
        spinCount++;
        
        // Запоминаем интервал для остановки
        slot.spinInterval = spinInterval;
        
        // Останавливаем когда достигли нужного количества прокруток
        if (spinCount >= totalSpins) {
            clearInterval(spinInterval);
        }
    }, 100); // Скорость смены изображений
}

// Остановка всех слотов
function stopSlots(slots) {
    slots.forEach((slot, index) => {
        // Останавливаем анимацию
        if (slot.spinInterval) {
            clearInterval(slot.spinInterval);
        }
        
        // Устанавливаем финальное изображение
        const finalImageIndex = Math.floor(Math.random() * finalImages.length);
        const img = slot.querySelector('.slot-image');
        if (img) {
            img.src = finalImages[finalImageIndex];
            img.alt = `Финальный слот ${finalImageIndex + 1}`;
        }
    });
}

// Показ сообщения о выигрыше
function showWinMessage() {
    const messages = [
        "🎉 ВЫ ВЫИГРАЛИ! МЕСЯЧНЫЙ ЗАПАС ЭНЕРГЕТИКОВ ВАШ! 🎉",
        "🔥 УДАЧА НА ТВОЕЙ СТОРОНЕ! ЗАБИРАЙ ПРИЗ! 🔥",
        "💸 ДЖЕКПОТ! МЕЛЛСТРОЙ ГОРДИТСЯ ТОБОЙ! 💸",
        "🚀 ВЫ Сорвали Куш! Энергия бьет ключом! 🚀"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    // Создаем всплывающее сообщение
    const winPopup = document.createElement('div');
    winPopup.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(45deg, #ffd700, #ffed4e);
        color: #000;
        padding: 30px;
        border-radius: 20px;
        border: 5px solid #000;
        font-size: 1.5em;
        font-weight: bold;
        text-align: center;
        z-index: 1000;
        box-shadow: 0 0 50px rgba(255,215,0,0.8);
        font-family: 'Press Start 2P', cursive;
        max-width: 80%;
    `;
    
    winPopup.innerHTML = `
        <div style="margin-bottom: 15px;">${randomMessage}</div>
        <div style="font-size: 0.8em; margin-top: 15px;">"Как говорится, либо пан, либо пропал!"</div>
        <button onclick="this.parentElement.remove()" style="
            margin-top: 20px;
            padding: 10px 20px;
            background: #000;
            color: #ffd700;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            font-family: 'Press Start 2P', cursive;
        ">Отдать Мелстрою</button>
    `;
    
    document.body.appendChild(winPopup);
}

// Случайные фразы Mellstroy при загрузке страницы
const mellstroyPhrases = [
    "Добро пожаловать на самый энергетический сайт!",
    "Заряжайся по-взрослому!",
    "Здесь энергия бьет ключом!",
    "Принимай регулярно: утром, днем и перед стримом!",
    "Это не просто энергетик, это образ жизни!"
];

// Предзагрузка изображений для плавной анимации
function preloadImages() {
    const allImages = [...new Set([...slotImages.slot1, ...slotImages.slot2, ...slotImages.slot3, ...finalImages])];
    
    allImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const randomPhrase = mellstroyPhrases[Math.floor(Math.random() * mellstroyPhrases.length)];
    console.log(`💊 MELLSTROY: "${randomPhrase}"`);
    
    // Предзагрузка изображений
    preloadImages();
    
    // Добавляем эффект параллакса для фона главной страницы
    if (document.querySelector('.main-background')) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const background = document.querySelector('.main-background');
            if (background) {
                background.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });
    }

});
function fixMobileScroll() {
    // Предотвращаем масштабирование на дабл-тап
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // Фикс для iOS
    document.addEventListener('touchmove', function (e) {
        e.preventDefault();
    }, { passive: false });
    
    // Блокируем скролл когда открыто модальное окно
    const originalBodyOverflow = document.body.style.overflow;
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                const hasPopup = document.querySelector('div[style*="fixed"]');
                if (hasPopup) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = originalBodyOverflow;
                }
            }
        });
    });
    
    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['style']
    });
}

// Вызываем при загрузке
document.addEventListener('DOMContentLoaded', function() {
    fixMobileScroll();
});
