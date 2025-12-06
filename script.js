document.addEventListener('DOMContentLoaded', () => {
    const resourceData = {
        Breast: {
            title: "Breast Cancer Awareness",
            text: "Breast cancer is the most common cancer in women worldwide. Early detection through regular screenings like mammograms is key. Know your body, know the signs, and support organizations dedicated to research and patient care."
        },
        Lung: {
            title: "Lung Cancer Prevention and Support",
            text: "Smoking is the leading cause of lung cancer, but non-smokers are also at risk. Screening options are available for high-risk individuals. Support focuses on palliative care and innovative treatments."
        },
        Prostate: {
            title: "Prostate Cancer: Men's Health Focus",
            text: "Prostate cancer is highly treatable when caught early. Regular checkups and discussions with your doctor about PSA testing are important for men over 50 (or earlier for those with family history). Support groups offer valuable community."
        }
    };

    const header = document.getElementById('main-header');
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }

        if (window.scrollY > 400) {
            scrollToTopBtn.classList.remove('hidden');
        } else {
            scrollToTopBtn.classList.add('hidden');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    const modal = document.getElementById("resourceModal");
    const closeBtn = document.querySelector(".close-btn");
    const modalTitle = document.getElementById("modal-title");
    const modalText = document.getElementById("modal-text");
    const triggerButtons = document.querySelectorAll(".modal-trigger");

    triggerButtons.forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.resource-card');
            const type = card.getAttribute('data-type');

            if (resourceData[type]) {
                modalTitle.textContent = resourceData[type].title;
                modalText.textContent = resourceData[type].text;
                modal.style.display = "block";
            }
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = "none";
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    function validateInput(input) {
        let isValid = true;
        const value = input.value.trim();
        const type = input.getAttribute('data-validate');
        const errorMessageElement = input.parentElement.querySelector('.error-message');
        let message = '';

        if (value === '') {
            message = 'This field is required.';
            isValid = false;
        } else if (type === 'email' && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
            message = 'Please enter a valid email address.';
            isValid = false;
        } else if (type === 'text' && value.length < 3) {
            message = 'Must be at least 3 characters long.';
            isValid = false;
        }

        if (!isValid) {
            input.parentElement.classList.add('error');
            errorMessageElement.textContent = message;
        } else {
            input.parentElement.classList.remove('error');
            errorMessageElement.textContent = '';
        }

        return isValid;
    }

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        let formIsValid = true;
        const inputs = contactForm.querySelectorAll('[required]');

        inputs.forEach(input => {
            if (!validateInput(input)) {
                formIsValid = false;
            }
        });

        if (formIsValid) {
            formMessage.textContent = 'Thank you for your message! Your form has been validated and submitted.';
            formMessage.classList.remove('hidden');

            contactForm.reset();
            inputs.forEach(input => input.parentElement.classList.remove('error'));

            setTimeout(() => {
                formMessage.classList.add('hidden');
            }, 6000);
        } else {
            formMessage.textContent = 'Please correct the errors in the form before submitting.';
            formMessage.classList.remove('hidden');
            formMessage.style.backgroundColor = '#f8d7da';
            formMessage.style.color = '#721c24';
            setTimeout(() => {
                formMessage.classList.add('hidden');
            }, 6000);
        }
    });

    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');
    const quoteError = document.querySelector('.quote-error');

    const API_URL = 'https://api.quotable.io/random?tags=inspirational|courage|life';

    async function fetchQuote() {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error('Failed to fetch quote from API');
            }
            const data = await response.json();

            quoteText.textContent = `“${data.content}”`;
            quoteAuthor.textContent = `- ${data.author}`;
            quoteError.classList.add('hidden');
        } catch (error) {
            quoteText.textContent = "“Hope is the pillar that holds up the world. Hope is the dream of a waking man.”";
            quoteAuthor.textContent = "- Pliny the Elder";
            quoteError.classList.remove('hidden');
        }
    }

    fetchQuote();
});
