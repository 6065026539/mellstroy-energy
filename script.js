// Улучшенный и исправленный скрипт для слотов
let isSpinning = false;
let slotSound = null;
let audioEnabled = false;

// Функция для предзагрузки и включения аудио
function initAudio() {
    if (slotSound) return;
    
    try {
        slotSound = new Audio('sounds/slot-sound.mp3');
        slotSound.preload = 'auto';
        slotSound.volume = 0.7;
        
        // Создаем контекст для разблокировки аудио
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
            const audioContext = new AudioContext();
            if (audioContext.state === 'suspended') {
                audioContext.resume();
            }
        }
    } catch (error) {
        console.log('Audio initialization error:', error);
    }
}

function enableAudio() {
    if (audioEnabled) return;
    
    initAudio();
    audioEnabled = true;
    
    // Воспроизводим и сразу останавливаем для разблокировки
    if (slotSound) {
        const playPromise = slotSound.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                slotSound.pause();
                slotSound.currentTime = 0;
            }).catch(e => {
                console.log('Audio unlock failed:', e);
            });
        }
    }
}

function spinSlots() {
    if (isSpinning) return;
    
    // Включаем аудио при первом клике
    if (!audioEnabled) {
        enableAudio();
    }
    
    isSpinning = true;
    const slots = document.querySelectorAll('.slot');
    const spinButton = document.querySelector('.spin-button');
    
    // Воспроизводим звук
    playSlotSound();
    
    spinButton.disabled = true;
    spinButton.style.opacity = '0.7';
    spinButton.querySelector('span').textContent = 'КРУТИТСЯ...';
    
    const images = ['images/slot1.jpeg', 'images/slot2.jpg', 'images/slot3.gif'];
    let completedSlots = 0;
    
    slots.forEach((slot, index) => {
        let spins = 0;
        const maxSpins = 10 + Math.floor(Math.random() * 10);
        const img = slot.querySelector('.slot-image');
        
        const spinInterval = setInterval(() => {
            const randomImage = images[Math.floor(Math.random() * images.length)];
            img.src = randomImage;
            img.alt = `Слот ${spins + 1}`;
            spins++;
            
            if (spins >= maxSpins) {
                clearInterval(spinInterval);
                
                setTimeout(() => {
                    const finalImage = images[Math.floor(Math.random() * images.length)];
                    img.src = finalImage;
                    
                    completedSlots++;
                    if (completedSlots === slots.length) {
                        finishSpin();
                    }
                }, 300);
            }
        }, 100);
    });
}

function playSlotSound() {
    if (!slotSound || !audioEnabled) {
        console.log('Sound not ready, trying to enable...');
        enableAudio();
        return;
    }
    
    try {
        slotSound.currentTime = 0;
        const playPromise = slotSound.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(e => {
                console.log('Audio play failed:', e);
                // Пробуем снова через небольшой промежуток
                setTimeout(() => {
                    if (slotSound) {
                        slotSound.play().catch(e => console.log('Retry failed:', e));
                    }
                }, 100);
            });
        }
    } catch (error) {
        console.log('Sound error:', error);
    }
}

function finishSpin() {
    isSpinning = false;
    const spinButton = document.querySelector('.spin-button');
    
    setTimeout(() => {
        showWinMessage();
        spinButton.disabled = false;
        spinButton.style.opacity = '1';
        spinButton.querySelector('span').textContent = 'КРУТИТЬ СЛОТ!';
    }, 500);
}

function showWinMessage() {
    const messages = [
        "🎉 ВЫ ВЫИГРАЛИ! МЕСЯЧНЫЙ ЗАПАС ЭНЕРГЕТИКОВ ВАШ! 🎉",
        "🔥 УДАЧА НА ТВОЕЙ СТОРОНЕ! ЗАБИРАЙ ПРИЗ! 🔥",
        "💸 ДЖЕКПОТ! МЕЛЛСТРОЙ ГОРДИТСЯ ТОБОЙ! 💸",
        "🚀 ВЫ Сорвали Куш! Энергия бьет ключом! 🚀"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    // Удаляем существующие попапы
    const existingPopup = document.querySelector('.win-popup');
    if (existingPopup) {
        existingPopup.remove();
    }
    
    const winPopup = document.createElement('div');
    winPopup.className = 'win-popup';
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
        z-index: 10000;
        box-shadow: 0 0 50px rgba(255,215,0,0.8);
        font-family: 'Press Start 2P', cursive;
        max-width: 80vw;
        word-wrap: break-word;
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
            font-size: 0.7em;
        ">Отдать меллстрою</button>
    `;
    
    document.body.appendChild(winPopup);
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log("💊 MELLSTROY ENERGY - Сайт загружен!");
    
    // Предварительная инициализация аудио
    initAudio();
    
    // Включаем аудио при любом взаимодействии
    const enableAudioOnInteraction = () => {
        if (!audioEnabled) {
            enableAudio();
        }
    };
    
    // Добавляем обработчики для различных событий
    ['click', 'touchstart', 'keydown', 'scroll'].forEach(event => {
        document.addEventListener(event, enableAudioOnInteraction, { 
            once: true,
            passive: true 
        });
    });
    
    // Улучшение производительности скролла
    document.body.style.webkitOverflowScrolling = 'touch';
    
    // Фикс для мобильного скролла
    let touchStartY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener('touchmove', function(e) {
        // Разрешаем нативный скролл
    }, { passive: true });
});

// Предзагрузка критических ресурсов
window.addEventListener('load', function() {
    // Предзагрузка изображений для слотов
    const slotImages = [
        'images/slot1.jpeg',
        'images/slot2.jpg', 
        'images/slot3.gif'
    ];
    
    slotImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});
