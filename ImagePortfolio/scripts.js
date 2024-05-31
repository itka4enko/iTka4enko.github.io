// scripts.js
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.project');

    function checkVisibility() {
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                element.classList.add('visible');
            } else {
                element.classList.remove('visible');
            }
        });
    }

    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // Initial check
});

document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.project img');
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-image');
    const captionText = document.getElementById('caption');
    const closeModal = document.querySelector('.close');

    // Перевірка видимості елементів при прокрутці
    function checkVisibility() {
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                element.classList.add('visible');
            } else {
                element.classList.remove('visible');
            }
        });
    }

    // Додавання обробника подій для кожного зображення проекту
    elements.forEach(element => {
        element.addEventListener('click', function() {
            modal.style.display = 'block';
            modalImg.src = this.src;
            captionText.innerHTML = this.nextElementSibling.innerHTML;
        });
    });

    // Закриття модального вікна при кліку на хрестик
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Закриття модального вікна при кліку поза його межами
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Перевірка видимості елементів при завантаженні сторінки
    checkVisibility();

    // Перевірка видимості елементів при прокрутці сторінки
    window.addEventListener('scroll', checkVisibility);
});

document.addEventListener("DOMContentLoaded", function() {
    const loader = document.getElementById('loader');
    const projectsContainer = document.getElementById('projects-container');
    const projectImages = document.querySelectorAll('.project img');
    let imagesLoaded = 0;

    function imageLoaded() {
        imagesLoaded++;
        if (imagesLoaded === projectImages.length) {
            loader.style.display = 'none';
            projectsContainer.style.display = 'block';
        }
    }

    loader.style.display = 'block';
    projectImages.forEach(img => {
        if (img.complete) {
            imageLoaded();
        } else {
            img.addEventListener('load', imageLoaded);
            img.addEventListener('error', imageLoaded); // якщо зображення не вдалося завантажити
        }
    });
});



// FUNCTIONS----------------------
// Відключення прокрутки сторінки
function disableScroll() {
    document.body.style.overflow = 'hidden';
}

// Включення прокрутки сторінки
function enableScroll() {
    document.body.style.overflow = null;
}