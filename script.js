document.addEventListener('DOMContentLoaded', () => {
    const mainButton = document.getElementById('mainButton');
    const envelope = document.querySelector('.envelope');
    const overlay = document.getElementById('messageOverlay');
    const valentineText = document.getElementById('valentineText');
    const closeButton = document.getElementById('closeButton');
    const heartsContainer = document.getElementById('heartsContainer');

    mainButton.addEventListener('click', () => {
        // Open the envelope
        envelope.classList.add('open');
        
        // Change button text
        mainButton.innerText = "Revealing...";
        mainButton.disabled = true;

        // Show overlay after a delay
        setTimeout(() => {
            overlay.classList.remove('hidden');
            setTimeout(() => {
                overlay.classList.add('show');
                typeMessage("Happy Valentine! ❤️");
            }, 100);
        }, 1200);
    });

    closeButton.addEventListener('click', () => {
        overlay.classList.remove('show');
        setTimeout(() => {
            overlay.classList.add('hidden');
            envelope.classList.remove('open');
            mainButton.innerText = "Open This Letter";
            mainButton.disabled = false;
            valentineText.innerHTML = "";
        }, 500);
    });

    function typeMessage(text) {
        let i = 0;
        valentineText.innerHTML = "";
        const interval = setInterval(() => {
            valentineText.innerHTML += text.charAt(i);
            i++;
            if (i >= text.length) {
                clearInterval(interval);
                createFloatingHearts();
            }
        }, 100);
    }

    function createFloatingHearts() {
        for (let i = 0; i < 20; i++) {
            const heart = document.createElement('div');
            heart.classList.add('floating-heart');
            heart.innerHTML = '❤️';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = '100%';
            heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
            heart.style.position = 'absolute';
            heart.style.transition = `all ${Math.random() * 2 + 3}s linear`;
            heart.style.opacity = '1';
            
            heartsContainer.appendChild(heart);

            setTimeout(() => {
                heart.style.top = '-10%';
                heart.style.opacity = '0';
                heart.style.transform = `translateX(${(Math.random() - 0.5) * 100}px)`;
            }, 100);

            setTimeout(() => {
                heart.remove();
            }, 5000);
        }
    }
});
