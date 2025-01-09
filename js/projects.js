document.addEventListener('DOMContentLoaded', function() {
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
                '/images/car-project/IMG_8201.jpg',
                '/images/car-project/IMG_8509.jpg',
                '/images/car-project/IMG_8526.jpg',
                '/images/car-project/IMG_8527.jpg'
            ]
        }
    };

    projectItems.forEach(item => {
        item.addEventListener('click', function() {
            const courseId = this.querySelector('h4').textContent;
            const projectDetail = projectDetails[courseId];
            
            if (projectDetail) {
                // Hide project list and professional projects
                projectList.style.display = 'none';
                professionalProjects.style.display = 'none';

                // Create and show project detail view
                const detailView = createDetailView(projectDetail);
                projectList.parentElement.appendChild(detailView);

                // Initialize carousel after adding to DOM
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
                    ${project.images.map((src, index) => `
                        <div class="carousel-item">
                            <div class="image-container">
                                <img src="${src}" alt="Project image ${index + 1}">
                            </div>
                        </div>
                    `).join('')}
                </div>
                <button class="carousel-control prev">&lt;</button>
                <button class="carousel-control next">&gt;</button>
            </div>
            <button onclick="window.location.reload()" class="back-button">Back to Projects</button>
        `;
        
        return detailElement;
    }

    function initializeCarousel(carousel) {
        let currentSlide = 0;
        const inner = carousel.querySelector('.carousel-inner');
        const items = carousel.querySelectorAll('.carousel-item');
        const totalSlides = items.length;
        const interval = 5000;
        let autoSlideInterval;

        function updateSlidePosition() {
            inner.style.transform = `translateX(-${currentSlide * 100}%)`;
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlidePosition();
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateSlidePosition();
        }

        // Set up click handlers
        const nextButton = carousel.querySelector('.next');
        const prevButton = carousel.querySelector('.prev');

        nextButton.addEventListener('click', () => {
            nextSlide();
            resetAutoSlide();
        });

        prevButton.addEventListener('click', () => {
            prevSlide();
            resetAutoSlide();
        });

        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, interval);
        }

        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }

        // Initialize position and auto-slide
        updateSlidePosition();
        startAutoSlide();
    }
});