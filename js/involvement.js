// Project details data
const projectDetails = {
    'Hack-A-Thon': {
        title: 'Hack-A-Thon',
        description: 'tbd',
        images: [
            { src: '/images/swe/hackathon/6.jpg' },
            { src: '/images/swe/hackathon/7.jpg' },
            { src: '/images/swe/hackathon/8.jpg' },
            { src: '/images/swe/hackathon/IMG_1672.jpg' },
            { src: '/images/swe/hackathon/IMG_7594.jpg' },
            { src: '/images/swe/hackathon/IMG_7595.jpg' }
        ],
        showCaption: false
    }
    // Add other project details here as needed
};

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get all project items
    const projectItems = document.querySelectorAll('.project-item');
    const projectList = document.querySelector('.project-list');

    if (!projectItems.length || !projectList) {
        console.error('Required elements not found');
        return;
    }

    projectItems.forEach(item => {
        item.addEventListener('click', function() {
            const courseId = this.querySelector('h4').textContent;
            const projectDetail = projectDetails[courseId];

            if (projectDetail) {
                projectList.style.display = 'none';

                const detailView = createDetailView(projectDetail);
                projectList.parentElement.appendChild(detailView);

                const carousel = detailView.querySelector('.carousel');
                if (carousel) {
                    initializeCarousel(carousel);
                }
            }
        });
    });
});

function createDetailView(project) {
    const detailElement = document.createElement('div');
    detailElement.className = 'project-detail active';

    detailElement.innerHTML = `
        <h3>${project.title}</h3>
        <div class="project-content">
            ${project.description}
        </div>
        <div class="carousel">
            <div class="carousel-inner">
                ${project.images.map((image, index) => `
                    <div class="carousel-item">
                        <div class="image-container">
                            <img src="${image.src}" alt="Project image ${index + 1}">
                            ${project.showCaption && image.caption ? `<div class="image-caption">${image.caption}</div>` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
            <button class="carousel-control prev">&lt;</button>
            <button class="carousel-control next">&gt;</button>
            <div class="carousel-indicators">
                ${project.images.map((_, index) => `
                    <button class="indicator${index === 0 ? ' active' : ''}" data-index="${index}"></button>
                `).join('')}
            </div>
        </div>
        <button onclick="window.location.reload()" class="back-button">Back to Projects</button>
    `;

    return detailElement;
}

function initializeCarousel(carousel) {
    let currentSlide = 0;
    const inner = carousel.querySelector('.carousel-inner');
    const items = carousel.querySelectorAll('.carousel-item');
    const indicators = carousel.querySelectorAll('.indicator');
    const totalSlides = items.length;
    const interval = 7000;
    let autoSlideInterval;
    let isTransitioning = false;

    function updateSlidePosition() {
        if (isTransitioning) return;
        
        isTransitioning = true;
        inner.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });

        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }

    function nextSlide() {
        if (isTransitioning) return;
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlidePosition();
    }

    function prevSlide() {
        if (isTransitioning) return;
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlidePosition();
    }

    function goToSlide(index) {
        if (isTransitioning || currentSlide === index) return;
        currentSlide = index;
        updateSlidePosition();
        resetAutoSlide();
    }

    const nextButton = carousel.querySelector('.next');
    const prevButton = carousel.querySelector('.prev');

    nextButton.addEventListener('click', () => {
        if (!isTransitioning) {
            nextSlide();
            resetAutoSlide();
        }
    });

    prevButton.addEventListener('click', () => {
        if (!isTransitioning) {
            prevSlide();
            resetAutoSlide();
        }
    });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            if (!isTransitioning) {
                goToSlide(index);
            }
        });
    });

    function startAutoSlide() {
        if (autoSlideInterval) clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(() => {
            if (!isTransitioning) {
                nextSlide();
            }
        }, interval);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    updateSlidePosition();
    startAutoSlide();

    carousel.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    carousel.addEventListener('mouseleave', startAutoSlide);

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            clearInterval(autoSlideInterval);
        } else {
            startAutoSlide();
        }
    });
}