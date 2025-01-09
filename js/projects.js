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
                { src: '/images/car-project/IMG_8201.jpg'},
                { src: '/images/car-project/IMG_8509.jpg'},
                { src: '/images/car-project/IMG_8526.jpg'},
                { src: '/images/car-project/IMG_8527.jpg'}
            ],
            showCaption: false
        },
        'EGR196': {
            title: 'EGR196 - Engineering Drawings',
            description: 'Introduction to computer-aided drawing with emphasis on two-dimensional sketching, three-dimensional part modeling, assembly construction, component dimensioning, circuit diagram drawing, and shop drawing production',
            images: [
                {src: '/images/egr196/simple_floor.jpeg',
                caption: 'Following a series of YouTube videos, designed a basic floor plan'},
                {src: '/images/egr196/campus_building.jpeg',
                caption: 'Replicate a campus building visually (inaccurate dimensions)'},
                {src: '/images/egr196/elevation.jpeg',
                caption: 'Design residential hall with accurate dimensions, following housing codes (elevation)'},
                {src: '/images/egr196/floor_1.jpeg',
                caption: 'Design residential hall with accurate dimensions, following housing codes (floor 1)'},
                {src: '/images/egr196/upper_floors.jpeg',
                caption: 'Design residential hall with accurate dimensions, following housing codes (upper floors)'}
            ],
            showCaption: true
        },
        'EGR295': {
            title: 'EGR295 - Matlab for Engineers',
            description: 'A course covering the fundamentals of Matlab. Emphasizes the use of online resources to troubleshoot, debug, and find useful functions. Apply Matlab to solve complex mathematical problems, extract, analyze, filter, plot data, and learn to use control-flow structures.',
            images: [
                {src: '/images/egr295/hw4_1.png',
                caption: 'Create a plot showing hip, knee, and ankle angles during a sprint start as well as a plot of joint power during the movement'},
                {src: '/images/egr295/hw4_2.png',
                caption: 'Create a plot showing hip, knee, and ankle angles during a sprint start as well as a plot of joint power during the movement'},
                {src: '/images/egr295/hw5_1.png',
                caption: 'Processing and analyzing experimental data using Matlab with polynomial fitting and numerical derivatives and integration'},
                {src: '/images/egr295/hw5_2.png',
                caption: 'Processing and analyzing experimental data using Matlab with polynomial fitting and numerical derivatives and integration'},
                {src: '/images/egr295/hw6.png',
                caption: 'Using ode45 to analyze the motion of four different projectiles'},
                {src: '/images/egr295/hw8_1.png',
                caption: 'Perform a two-sample t-test, paired t-test, bar charts with error bars, and perform a linear regression from given data'},
                {src: '/images/egr295/hw8_2.png',
                caption: 'Perform a two-sample t-test, paired t-test, bar charts with error bars, and perform a linear regression from given data'},
                {src: '/images/egr295/hw9.png',
                caption: 'Use Simulink to model a damped oscillator with feedback control and explore different parameter effects on system behavior'},
                {src: '/images/egr295/hw10.png',
                caption: 'Use Simulink to model a mountain bike suspension system and use Simscape Multibody to explore parameters'},
                {src: '/images/egr295/hw11.png',
                caption: 'Use Simscape Multibody to model a mass-spring-damper system with pendulum to explore parameters'},
                {src: '/images/egr295/final.png',
                caption: 'Use Simscape and Simulink to model a door closer mechanism and implement powered door enhancement'}
            ],
            showCaption: true
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