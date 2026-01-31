document.addEventListener('DOMContentLoaded', () => {
    const mainButton = document.getElementById('mainButton');
    const envelope = document.querySelector('.envelope');
    const overlay = document.getElementById('messageOverlay');
    const valentineText = document.getElementById('valentineText');
    const closeButton = document.getElementById('closeButton');
    const heartsContainer = document.getElementById('heartsContainer');
    const heartSeal = document.querySelector('.heart');

    let state = 'closed'; // closed -> opened -> pulled -> revealed

    function handleNextStep() {
        if (state === 'closed') {
            // Step 1: Open the flap + Bounce Letter
            envelope.classList.add('open');
            mainButton.innerText = "Opening...";
            mainButton.disabled = true;
            state = 'opened';

            // Hide heart immediately in JS to be safe
            if (heartSeal) heartSeal.style.display = 'none';

            // Wait for bounce-pop animation (1.2s) to finish
            setTimeout(() => {
                const letter = document.querySelector('.letter');
                letter.classList.add('on-top'); // Keep it on the front layer
                mainButton.innerText = "Read Special Message";
                mainButton.disabled = false;
            }, 1300);

        } else if (state === 'opened') {
            // Step 2: Slide the letter up AND Reveal Overlay (Combined)
            envelope.classList.add('letter-out');
            mainButton.innerText = "Reading...";
            mainButton.disabled = true;
            state = 'read';

            // Wait for pull-up animation then show overlay
            setTimeout(() => {
                overlay.classList.remove('hidden');
                setTimeout(() => {
                    overlay.classList.add('show');
                    typeMessage("Happy Valentine! ❤️");
                    mainButton.innerText = "Enjoy your day! ❤️";
                }, 100);
            }, 800);
        }
    }

    mainButton.addEventListener('click', handleNextStep);
    heartSeal.addEventListener('click', handleNextStep);

    closeButton.addEventListener('click', () => {
        overlay.classList.remove('show');
        
        // Wait for overlay fade out
        setTimeout(() => {
            overlay.classList.add('hidden');
            
            // Step 1: Slide letter from "read" position (-160px) back to envelope surface (0)
            envelope.classList.remove('letter-out');
            
            // Step 2: Trigger Reverse Pop (Pop out of front, land in pocket)
            setTimeout(() => {
                const letter = document.querySelector('.letter');
                letter.classList.remove('on-top');
                letter.classList.add('closing');
                
                // Step 3: Wait for reverse pop (1.2s)
                setTimeout(() => {
                    letter.classList.remove('closing');
                    envelope.classList.remove('open'); // Close Flap
                    
                    // Show heart again
                    if (heartSeal) heartSeal.style.display = 'block';

                    mainButton.innerText = "Open This Letter";
                    mainButton.disabled = false;
                    valentineText.innerHTML = "";
                    heartsContainer.innerHTML = "";
                    state = 'closed';
                }, 1200);
            }, 600); // Wait for letter-out slide down
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
