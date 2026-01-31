document.addEventListener('DOMContentLoaded', () => {
    const mainButton = document.getElementById('mainButton');
    const envelope = document.querySelector('.envelope');
    const overlay = document.getElementById('messageOverlay');
    const valentineText = document.getElementById('valentineText');
    const closeButton = document.getElementById('closeButton');
    const heartsContainer = document.getElementById('heartsContainer');

    const heartsContainer = document.getElementById('heartsContainer');
    const heartSeal = document.querySelector('.heart');

    let state = 'closed'; // closed -> opened -> pulled -> revealed

    function handleNextStep() {
        if (state === 'closed') {
            // Step 1: Open the flap
            envelope.classList.add('open');
            mainButton.innerText = "Take Out Letter";
            state = 'opened';
        } else if (state === 'opened') {
            // Step 2: Slide the letter out
            envelope.classList.add('letter-out');
            mainButton.innerText = "Read Special Message";
            state = 'pulled';
        } else if (state === 'pulled') {
            // Step 3: Reveal the final message
            mainButton.innerText = "Revealing...";
            mainButton.disabled = true;

            setTimeout(() => {
                overlay.classList.remove('hidden');
                setTimeout(() => {
                    overlay.classList.add('show');
                    typeMessage("Happy Valentine! ❤️");
                }, 100);
            }, 500);
            state = 'revealed';
        }
    }

    mainButton.addEventListener('click', handleNextStep);
    heartSeal.addEventListener('click', handleNextStep);

    closeButton.addEventListener('click', () => {
        overlay.classList.remove('show');
        setTimeout(() => {
            overlay.classList.add('hidden');
            envelope.classList.remove('open');
            envelope.classList.remove('letter-out');
            mainButton.innerText = "Open This Letter";
            mainButton.disabled = false;
            valentineText.innerHTML = "";
            state = 'closed';
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
