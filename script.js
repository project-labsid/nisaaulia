let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const audio = document.getElementById('birthday-audio');
const audioToggle = document.getElementById('audio-toggle');
const audioIcon = document.getElementById('audio-icon');

const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('myProgressBar');

const animations = ['fx-zoom', 'fx-slide-up', 'fx-slide-down', 'fx-fade'];

const playIconPath = '<path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>';
const stopIconPath = '<path d="M4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>';

function applyRandomAnimation(slide) {
    const photoContainer = slide.querySelector('.photo-container');
    if (photoContainer) {
        animations.forEach(className => photoContainer.classList.remove(className));
        const randomAnim = animations[Math.floor(Math.random() * animations.length)];
        photoContainer.classList.add(randomAnim);
    }
}

function changeSlide(direction) {
    if (currentSlide === slides.length - 1 && direction === 1) return;
    if (currentSlide === 0 && direction === -1) return;

    slides[currentSlide].classList.remove('active');
    currentSlide += direction;

    applyRandomAnimation(slides[currentSlide]);
    slides[currentSlide].classList.add('active');

    updateNavigationStatus();
    updateProgressBar(); // FITUR 5: Sinkronisasi Progress Bar

    if (audio.paused) {
        playAudio();
    }
}

// FITUR 5: Fungsi Perhitungan Bar Atas
function updateProgressBar() {
    const totalSlides = slides.length;
    const progressPercentage = ((currentSlide + 1) / totalSlides) * 100;
    progressBar.style.width = progressPercentage + '%';
}

function updateNavigationStatus() {
    prevBtn.disabled = (currentSlide === 0);
    nextBtn.disabled = (currentSlide === slides.length - 1);
}

// FITUR 3: Animasi Membuka Surat Interaktif
function openLetter() {
    const envelope = document.getElementById('envelope');
    const actualLetter = document.getElementById('actual-letter');
    
    envelope.classList.add('open');
    
    // Berikan jeda waktu agar animasi amplop terbuka selesai, baru munculkan suratnya
    setTimeout(() => {
        envelope.style.display = 'none';
        actualLetter.classList.add('show-letter');
    }, 1200);
}

setTimeout(() => {
    if(currentSlide === 0) {
        changeSlide(1);
        playAudio();
    }
}, 4000);

function playAudio() {
    audio.volume = 0.6;
    audio.play().then(() => {
        audioIcon.innerHTML = playIconPath;
    }).catch(err => {
        console.log("Menunggu interaksi user untuk memainkan musik.");
    });
}

audioToggle.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        audioIcon.innerHTML = playIconPath;
    } else {
        audio.pause();
        audio.innerHTML = audio.innerHTML;
        audioIcon.innerHTML = stopIconPath;
    }
});


updateNavigationStatus();
updateProgressBar();
