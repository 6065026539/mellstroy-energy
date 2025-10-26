// ПРОСТОЙ РАБОЧИЙ СКРИПТ ДЛЯ СЛОТА
let isSpinning = false;
let slotSound = null;

function initAudio() {
    if (slotSound) return;
    
    try {
        slotSound = new Audio('sounds/slot-sound.mp3');
        slotSound.preload = 'auto';
        slotSound.volume = 0.7;
    } catch (error) {
        console.log('Audio init error:', error);
    }
}

function spinSlots() {
    if (isSpinning) return;
    
    // ВКЛЮЧАЕМ АУДИО ПРИ ПЕРВОМ КЛИКЕ
    if (!slotSound) {
        initAudio();
    }
    
    isSpinning = true;
    const slots = document.querySelectorAll('.slot');
    const spinButton = document.querySelector('.spin-button');
    
    // ЗВУК
    playSlotSound();
    
    spinButton.disabled = true;
    spinButton.style.opacity = '0.7';
    spinButton.querySelector('span').textContent = 'КРУТИТСЯ...';
    
    const images = ['images/slot1.jpeg', 'images/slot2.jpg', 'images/slot3.gif'];
    let completedSlots = 0;
    const finalImages = [];
    
    slots.forEach((slot, index) => {
        let spins = 0;
        const maxSpins = 10 + Math.floor(Math.random() * 10);
        const img = slot.querySelector('.slot-image');
        
        const spinInterval = setInterval(() => {
            const randomImage = images[Math.floor(Math.random() * images.length)];
            img.src = randomImage;
            spins++;
            
            if (spins >= maxSpins) {
                clearInterval(spinInterval);
                
                setTimeout(() => {
                    const finalImage = images[Math.floor(Math.random() * images.length)];
                    img.src = finalImage;
                    finalImages[index] = finalImage;
                    
                    completedSlots++;
                    if (completedSlots === slots.length) {
                        finishSpin(finalImages);
                    }
                }, 300);
            }
        }, 100);
    });
}

function playSlotSound() {
    if (!slotSound) return;
    
    try {
        slotSound.currentTime = 0;
        slotSound.play().catch(e => {
            console.log('Audio play failed:', e);
        });
    } catch (error) {
        console.log('Sound error:', error);
    }
}

function finishSpin(finalImages) {
    isSpinning = false;
    const spinButton = document.querySelector('.spin-button');
    
    // ПРОВЕРКА НА ВЫИГРЫШ
    const allSame = finalImages.every(img => img === finalImages[0]);
    
    setTimeout(() => {
        if (allSame) {
            showWinMessage();
        } else {
            showLoseMessage();
        }
        
        spinButton.disabled = false;
        spinButton.style.opacity = '1';
        spinButton.querySelector('span').textContent = 'КРУТИТЬ СЛОТ!';
    }, 500);
}

function showWinMessage() {
    const messages = [
        "🎉 ВЫ ВЫИГРАЛИ! МЕСЯЧНЫЙ ЗАПАС ЭНЕРГЕТИКОВ ВАШ! 🎉",
        "🔥 УДАЧА НА ТВОЕЙ СТОРОНЕ! ЗАБИРАЙ ПРИЗ! 🔥",
        "💸 ДЖЕКПОТ! МЕЛЛСТРОЙ ГОРДИТСЯ ТОБОЙ! 💸"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    // Удаляем старые попапы
    const existingPopup = document.querySelector('.win-popup, .lose-popup');
    if (existingPopup) {
        existingPopup.remove();
    }
    
    const winPopup = document.createElement('div');
    winPopup.className = 'win-popup';
    winPopup.innerHTML = `
        <div style="margin-bottom: 15px;">${randomMessage}</div>
        <div style="font-size: 0.8em; margin-top: 15px;">"Как говорится, либо пан, либо пропал!"</div>
        <button class="popup-button" onclick="this.parentElement.remove()">Отдать меллстрою</button>
    `;
    
    document.body.appendChild(winPopup);
}

function showLoseMessage() {
    // Удаляем старые попапы
    const existingPopup = document.querySelector('.win-popup, .lose-popup');
    if (existingPopup) {
        existingPopup.remove();
    }
    
    const losePopup = document.createElement('div');
    losePopup.className = 'lose-popup';
    losePopup.innerHTML = `
        <div style="margin-bottom: 15px;">😞 В СЛЕДУЮЩИЙ РАЗ ПОВЕЗЕТ! 😞</div>
        <div style="font-size: 0.8em; margin-top: 15px;">"Попробуй еще раз - удача любит смелых!"</div>
        <button class="popup-button" onclick="this.parentElement.remove()">Закрыть</button>
    `;
    
    document.body.appendChild(losePopup);
}

// ПРОСТАЯ ИНИЦИАЛИЗАЦИЯ
document.addEventListener('DOMContentLoaded', function() {
    console.log("💊 MELLSTROY ENERGY - Сайт загружен!");
    
    // Предзагрузка аудио
    initAudio();
    
    // Включаем аудио при любом клике
    document.addEventListener('click', function() {
        if (!slotSound) {
            initAudio();
        }
    }, { once: true });
});

// Глобальные функции
window.showWinMessage = showWinMessage;
window.showLoseMessage = showLoseMessage;

