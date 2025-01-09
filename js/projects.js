document.addEventListener('DOMContentLoaded', function () {
    // Project click handlers
    const projectItems = document.querySelectorAll('.project-item');
    const projectList = document.querySelector('.project-list');
    const professionalProjects = document.querySelector('#professional-projects');

    // Project details data
    const projectDetails = {
        'EGR192': {
            title: 'EGR192 - Introduction to Engineering II',
            description: `
                <ul class="project-bullets">
                    <li>Designed, fabricated, and tested an RC scale car using below $40 that drove within two one-meter-wide track lanes for up to 75 meters</li>
                    <li>Managed team members, finances, and assignments</li>
                    <li>Led internal and external communications</li>
                    <li>Provided written record and oral presentations on design, fabrication, and testing</li>
                    <li>Designed 3D printed parts and created detailed drawings using Inventor</li>
                    <li>Programmed an Arduino Uno and wired the circuit</li>
                </ul>
            `,
            images: [
                { src: '/images/car-project/IMG_8201.jpg', caption: 'RC Car Project - View 1' },
                { src: '/images/car-project/IMG_8509.jpg', caption: 'RC Car Project - View 2' },
                { src: '/images/car-project/IMG_8526.jpg', caption: 'RC Car Project - View 3' },
                { src: '/images/car-project/IMG_8527.jpg', caption: 'RC Car Project - View 4' }
            ]
        },
        'EGR196': {
            title: 'EGR196 - Engineering Drawings',
            description: `
                <ul class="project-bullets">
                    <li>Mastered AutoCAD for 2D technical drawings and architectural layouts</li>
                    <li>Created complex 3D models using Autodesk Inventor</li>
                    <li>Developed parametric designs in Fusion 360</li>
                    <li>Collaborated on team projects for real-world applications</li>
                </ul>
            `,
            images: [
                {
                    src: '/images/egr196/simple_floor.jpeg',
                    caption: 'Following a series of YouTube videos, designed a basic floor plan.'
                },
                {
                    src: '/images/egr196/campus_building.jpeg',
                    caption: 'Replicate a campus building visually (inaccurate dimensions)'
                },
                {
                    src: '/images/egr196/elevation.jpeg',
                    caption: 'Design residential hall with accurate dimensions, following housing codes (elevation)'
                },
                {
                    src: '/images/egr196/floor_1.jpeg',
                    caption: 'Design residential hall with accurate dimensions, following housing codes (floor 1)'
                },
                {
                    src: '/images/egr196/upper_floors.jpeg',
                    caption: 'Design residential hall with accurate dimensions, following housing codes (upper floors)'
                }
            ]
        }
    };

    projectItems.forEach(item => {
        item.addEventListener('click', function () {
            const courseId = this.querySelector('h4').textContent;
            const projectDetail = projectDetails[courseId];

            if (projectDetail) {
                projectList.style.display = 'none';
                professionalProjects.style.display = 'none';

                const detailView = createDetailView(projectDetail);
                projectList.parentElement.appendChild(detailView);

                const carousel = detailView.querySelector('.carousel');
                if (carousel) {
                    initializeCarousel(carousel);
                }
            }
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
                                <div class="image-caption">${image.caption}</div>
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
        const interval = 7000; // Increased interval to 7 seconds
        let autoSlideInterval;
        let isTransitioning = false;

        function updateSlidePosition() {
            if (isTransitioning) return;
            
            isTransitioning = true;
            inner.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Update indicators
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentSlide);
            });

            // Reset transition lock after animation completes
            setTimeout(() => {
                isTransitioning = false;
            }, 500); // Match this with your CSS transition duration
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

        // Set up click handlers
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

        // Set up indicator click handlers
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

        // Initialize position and auto-slide
        updateSlidePosition();
        startAutoSlide();

        // Mouse enter/leave handlers
        carousel.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
        carousel.addEventListener('mouseleave', startAutoSlide);

        // Add visibility change handling
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                clearInterval(autoSlideInterval);
            } else {
                startAutoSlide();
            }
        });
    }
});