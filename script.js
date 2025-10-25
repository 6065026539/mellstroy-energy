// Упрощенный и исправленный скрипт для слотов
let isSpinning = false;

function spinSlots() {
    if (isSpinning) return;
    
    isSpinning = true;
    const slots = document.querySelectorAll('.slot');
    const spinButton = document.querySelector('.spin-button');
    
    spinButton.disabled = true;
    spinButton.style.opacity = '0.7';
    spinButton.textContent = 'КРУТИТСЯ...';
    
    const images = ['images/slot1.jpeg', 'images/slot2.jpg', 'images/slot3.gif'];
    let completedSlots = 0;
    
    slots.forEach((slot, index) => {
        let spins = 0;
        const maxSpins = 10 + Math.random() * 10;
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
                    
                    completedSlots++;
                    if (completedSlots === slots.length) {
                        finishSpin();
                    }
                }, 300);
            }
        }, 100);
    });
}

function finishSpin() {
    isSpinning = false;
    const spinButton = document.querySelector('.spin-button');
    
    setTimeout(() => {
        showWinMessage();
        spinButton.disabled = false;
        spinButton.style.opacity = '1';
        spinButton.innerHTML = '<span>КРУТИТЬ СЛОТ!</span><div class="button-glow"></div>';
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
        ">Закрыть</button>
    `;
    
    document.body.appendChild(winPopup);
}

document.addEventListener('DOMContentLoaded', function() {
    console.log("💊 MELLSTROY ENERGY - Сайт загружен!");
});
