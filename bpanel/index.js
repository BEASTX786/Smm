document.addEventListener("DOMContentLoaded", function() {
  // Initialize AOS (Animate On Scroll) library
  AOS.init({
    duration: 600,
    once: true // Ensures animations run only once
  });

  // --- Mobile Menu Functionality ---
  const mobileMenuButton = document.querySelector('.mobile-menu__toggle');
  const mobileMenuDropdown = document.querySelector('.mobile-menu__dropdown');

  if (mobileMenuButton && mobileMenuDropdown) { // Ensure elements exist
    mobileMenuButton.addEventListener('click', () => {
      mobileMenuDropdown.classList.toggle('active'); // Consistent with CSS: .active
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (event) => {
      const isClickInsideMenu = mobileMenuDropdown.contains(event.target);
      const isClickOnButton = mobileMenuButton.contains(event.target);

      if (!isClickInsideMenu && !isClickOnButton && mobileMenuDropdown.classList.contains('active')) {
        mobileMenuDropdown.classList.remove('active');
      }
    });
  }

  // --- FAQ Accordion Functionality ---
  const faqPanels = document.querySelectorAll('.panel');

  faqPanels.forEach(panel => {
    const button = panel.querySelector('.panel__btn');
    const content = panel.querySelector('.panel__content');

    if (button && content) {
      button.addEventListener('click', () => {
        // Close all other open panels
        faqPanels.forEach(otherPanel => {
          if (otherPanel !== panel && otherPanel.classList.contains('active')) {
            otherPanel.classList.remove('active');
            otherPanel.querySelector('.panel__btn').classList.remove('active'); // Remove active from button
            otherPanel.querySelector('.panel__content').style.maxHeight = '0';
            otherPanel.querySelector('.panel__content').style.paddingTop = '0';
            otherPanel.querySelector('.panel__content').style.paddingBottom = '0';
          }
        });

        // Toggle the clicked panel
        panel.classList.toggle('active');
        button.classList.toggle('active'); // Add/remove 'active' class on the button for styling (e.g., the +/– icon)

        if (panel.classList.contains('active')) {
          content.style.maxHeight = content.scrollHeight + "px"; // Set max-height to scrollHeight for smooth expansion
          content.style.paddingTop = '15px'; // Apply padding for transition effect
          content.style.paddingBottom = '20px'; // Apply padding for transition effect
        } else {
          content.style.maxHeight = '0';
          content.style.paddingTop = '0';
          content.style.paddingBottom = '0';
        }
      });
    }
  });


  // --- Gallery Carousel Functionality ---
  const galleryCarousel = document.querySelector('.carousel__slides');
  const galleryPaginatorButtons = document.querySelectorAll('.carousel-paginator__item');
  const galleryNextButton = document.querySelector('.carousel__mobile-paginator-next');
  const galleryPrevButton = document.querySelector('.carousel__mobile-paginator-prev');
  const mobilePageIndicators = document.querySelectorAll('.carousel__page-indicator-item');
  const gallerySlides = document.querySelectorAll('.carousel__slide');

  let currentGallerySlideIndex = 0; // Keep track of the current slide

  // Function to update the carousel's position and button/indicator states
  function updateGalleryCarousel() {
    if (!galleryCarousel || gallerySlides.length === 0) return;

    // Recalculate slide width on each update to ensure responsiveness
    const slideWidth = gallerySlides[0].offsetWidth;
    galleryCarousel.style.transform = `translateX(-${currentGallerySlideIndex * slideWidth}px)`;

    // Update desktop paginator buttons
    galleryPaginatorButtons.forEach((button, index) => {
      if (index === currentGallerySlideIndex) {
        button.classList.add('carousel-paginator__item_active');
      } else {
        button.classList.remove('carousel-paginator__item_active');
      }
    });

    // Update mobile page indicators
    mobilePageIndicators.forEach((indicator, index) => {
      if (index === currentGallerySlideIndex) {
        indicator.classList.add('carousel__page-indicator-item_active');
      } else {
        indicator.classList.remove('carousel__page-indicator-item_active');
      }
    });

    // Disable/enable next/prev buttons
    galleryPrevButton.classList.toggle('btn-disabled', currentGallerySlideIndex === 0);
    galleryNextButton.classList.toggle('btn-disabled', currentGallerySlideIndex === gallerySlides.length - 1);
  }

  // Event listeners for desktop paginator buttons
  galleryPaginatorButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      currentGallerySlideIndex = index;
      updateGalleryCarousel();
    });
  });

  // Event listeners for mobile next/prev buttons
  if (galleryNextButton) {
    galleryNextButton.addEventListener('click', () => {
      if (currentGallerySlideIndex < gallerySlides.length - 1) {
        currentGallerySlideIndex++;
        updateGalleryCarousel();
      }
    });
  }
  if (galleryPrevButton) {
    galleryPrevButton.addEventListener('click', () => {
      if (currentGallerySlideIndex > 0) {
        currentGallerySlideIndex--;
        updateGalleryCarousel();
      }
    });
  }

  // Initialize gallery carousel state
  updateGalleryCarousel(); // Call initially to set correct state

  // --- Benefits Carousel Functionality ---
  const benefitsCarousel = document.querySelector('.benefits__info-carousel');
  const benefitsPaginatorButtons = document.querySelectorAll('.benefit-paginator__item');
  const benefitsSlides = document.querySelectorAll('.benefits__info-slide');

  let currentBenefitSlideIndex = 0;

  function updateBenefitsCarousel() {
    if (!benefitsCarousel || benefitsSlides.length === 0) return;

    const slideWidth = benefitsSlides[0].offsetWidth;
    benefitsCarousel.style.transform = `translateX(-${currentBenefitSlideIndex * slideWidth}px)`;

    benefitsPaginatorButtons.forEach((button, index) => {
      if (index === currentBenefitSlideIndex) {
        button.classList.add('benefit-paginator__item_active');
      } else {
        button.classList.remove('benefit-paginator__item_active');
      }
    });
  }

  // Event listeners for benefits paginator buttons
  benefitsPaginatorButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      currentBenefitSlideIndex = index;
      updateBenefitsCarousel();
    });
  });

  // Initialize benefits carousel state
  updateBenefitsCarousel(); // Call initially to set correct state


  // --- Header Visibility on Load ---
  // Using DOMContentLoaded is generally preferred over 'load' for earlier execution
  // unless external resources (like images) *must* be loaded for the effect.
  const header = document.querySelector('.header');
  if (header) {
    header.classList.add('header_visible');
  }

  // --- Handle Window Resize for Carousels ---
  // Recalculate slide positions on window resize to maintain responsiveness
  window.addEventListener('resize', () => {
    // A small debounce could be added here for very performance-sensitive sites
    // to avoid recalculating too rapidly during a resize action.
    updateGalleryCarousel();
    updateBenefitsCarousel();
  });
});
