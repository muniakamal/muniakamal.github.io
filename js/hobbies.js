document.addEventListener('DOMContentLoaded', function() {
    // Image data for each hobby
    const hobbyImages = {
        crochet: [
            '/images/hobbies/img_1894.jpg',
            '/images/hobbies/img_1897.jpg',
            '/images/hobbies/img_1898.jpg',
            '/images/hobbies/img_1900.jpg',
            '/images/hobbies/img_1904.jpg',
            '/images/hobbies/img_1918.jpg'
        ],
        needlefelt: [
            '/images/hobbies/img_0037.jpg',
            '/images/hobbies/img_0039.jpg',
            '/images/hobbies/img_1901.jpg',
            '/images/hobbies/img_1902.jpg',
            '/images/hobbies/img_7663.jpg',
            '/images/hobbies/img_7664.jpg'
        ],
        drawing: [
            '/images/hobbies/mountains.jpg',
            '/images/hobbies/img_1545.jpg',
            '/images/hobbies/img_1581.jpg',
            '/images/hobbies/img_4401.jpg',
            '/images/hobbies/img_6579.jpg'
        ]
    };

    // Initialize all carousels
    const carousels = {
        crochet: initializeCarousel('crochet', hobbyImages.crochet),
        needlefelt: initializeCarousel('needlefelt', hobbyImages.needlefelt),
        drawing: initializeCarousel('drawing', hobbyImages.drawing)
    };

    function initializeCarousel(id, images) {
        const carousel = document.getElementById(`${id}-carousel`);
        let currentSlide = 0;
        let autoSlideInterval;

        // Create carousel items
        images.forEach((src, index) => {
            const item = document.createElement('div');
            item.className = 'carousel-item';
            item.innerHTML = `
                <div class="image-container">
                    <img src="${src}" alt="${id} image ${index + 1}">
                </div>
            `;
            carousel.appendChild(item);
        });

        // Set up controls
        const prevButton = document.querySelector(`[data-carousel="${id}"].prev`);
        const nextButton = document.querySelector(`[data-carousel="${id}"].next`);

        function updateSlidePosition() {
            carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % images.length;
            updateSlidePosition();
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + images.length) % images.length;
            updateSlidePosition();
        }

        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }

        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, 5000); // 5 second interval
        }

        // Event listeners
        nextButton.addEventListener('click', () => {
            nextSlide();
            resetAutoSlide();
        });

        prevButton.addEventListener('click', () => {
            prevSlide();
            resetAutoSlide();
        });

        // Start auto-sliding
        startAutoSlide();

        return {
            next: nextSlide,
            prev: prevSlide,
            reset: resetAutoSlide
        };
    }
});