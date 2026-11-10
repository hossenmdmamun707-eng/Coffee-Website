
// ===============================
// Mobile Menu
// ===============================

const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-Close-button");
const navLinks = document.querySelectorAll(".nav-link");

menuOpenButton.addEventListener("click", () => {
    document.body.classList.toggle("show-mobile-menu");
});

menuCloseButton.addEventListener("click", () => {
    document.body.classList.remove("show-mobile-menu");
});


// Close mobile menu when clicking a nav link
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        document.body.classList.remove("show-mobile-menu");
    });
});


// ===============================
// Testimonials Swiper
// ===============================

const swiper = new Swiper(".slider-container", {

    loop: true,
    grabCursor: true,
    spaceBetween: 25,

    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
    },

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    breakpoints: {
        0: {
            slidesPerView: 1
        },

        768: {
            slidesPerView: 2
        },

        1024: {
            slidesPerView: 3
        }
    }
});


// ===============================
// Scroll Animation
// ===============================

const animatedElements = document.querySelectorAll(
    ".hero-details, .hero-image-wrapper, .about-details, .about-image-wrapper, .menu-item, .testimonial, .gallery-item, .contact-info, .contact-form"
);

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("show-animation");
            }

        });

    },
    {
        threshold: 0.15
    }
);


animatedElements.forEach(element => {
    element.classList.add("scroll-animation");
    observer.observe(element);
});


// ===============================
// Gallery Image Animation
// ===============================

const galleryItems = document.querySelectorAll(".gallery-item");

galleryItems.forEach((item, index) => {

    item.style.transitionDelay = `${index * 0.1}s`;

    item.addEventListener("mouseenter", () => {
        item.classList.add("gallery-active");
    });

    item.addEventListener("mouseleave", () => {
        item.classList.remove("gallery-active");
    });

});


// ===============================
// Navbar Scroll Effect
// ===============================

window.addEventListener("scroll", () => {

    const header = document.querySelector("header");

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});

// COntact Form
const contactForm = document.querySelector(".contact-form");

contactForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const submitButton = contactForm.querySelector(".submit-button");

    submitButton.textContent = "Sending...";
    submitButton.classList.add("loading");
    submitButton.disabled = true;

    // Order information save
    const orderDetails = {
        product: selectedProduct,
        quantity: quantityInput.value,
        total: totalPriceBox.textContent
    };

    localStorage.setItem(
        "orderDetails",
        JSON.stringify(orderDetails)
    );

    const formData = new FormData(contactForm);

    const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: {
            "Accept": "application/json"
        }
    });

if (response.ok) {

    window.location.href = "success.html";

} else {

    submitButton.textContent = "Send Message";
    submitButton.disabled = false;
    submitButton.classList.remove("loading");

    alert("❌ Something went wrong. Please try again.");

}
});


// ===============================
// Menu Order Button
// ===============================

const orderButtons = document.querySelectorAll(".menu-order-button");
const messageBox = document.querySelector('textarea[name="message"]');

const quantityInput = document.querySelector("#quantity");
const quantityMinus = document.querySelector("#quantity-minus");
const quantityPlus = document.querySelector("#quantity-plus");

const totalPriceBox = document.querySelector("#total-price");

let selectedPrice = 0;
let selectedProduct = "";



// Order Button


orderButtons.forEach(button => {

    button.addEventListener("click", () => {

        selectedProduct = button.dataset.product;

        const productPrice = button.dataset.price;

        selectedPrice = parseFloat(
            productPrice.replace(/[^0-9.]/g, "")
        );

        quantityInput.value = 1;

        updateOrder();

    });

});



// Quantity Plus


quantityPlus.addEventListener("click", () => {

    quantityInput.value = Number(quantityInput.value) + 1;

    updateOrder();

});



// Quantity Minus


quantityMinus.addEventListener("click", () => {

    if (Number(quantityInput.value) > 1) {

        quantityInput.value = Number(quantityInput.value) - 1;

        updateOrder();

    }

});



// Update Order


function updateOrder() {

    const quantity = Number(quantityInput.value);

    const total = selectedPrice * quantity;

    totalPriceBox.textContent = `৳${total.toFixed(2)}`;

    messageBox.value =
        `I would like to order: ${selectedProduct} - ৳${selectedPrice.toFixed(2)}\nQuantity: ${quantity}\nTotal: ৳${total.toFixed(2)}`;

}

// ===============================
// Active Navbar Link
// ===============================

const sections = document.querySelectorAll("section");
const navLinksActive = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight) {

            currentSection = section.getAttribute("id");
        }

    });

    navLinksActive.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }

    });

});

// ===============================
// Back To Top Button
// ===============================

const backToTop = document.querySelector("#back-to-top");

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// ===============================
// Menu Scroll Reveal
// ===============================

const menuCards = document.querySelectorAll(".menu-item");

if (menuCards.length > 0) {

    const menuObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                const card = entry.target;

                card.classList.add("show-menu-card");

                observer.unobserve(card);
            }

        });

    }, {
        threshold: 0.15
    });


    menuCards.forEach((card) => {
        menuObserver.observe(card);
    });

}

