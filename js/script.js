const menuToggle = document.querySelector(".menu-toggle");
const siteNavigation = document.querySelector("#site-navigation");
const pageHeader = document.querySelector(".page-header");

if (menuToggle && siteNavigation && pageHeader) {
    const closeMenu = () => {
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "メニューを開く");
        pageHeader.classList.remove("menu-open");
    };

    pageHeader.classList.add("menu-ready");

    menuToggle.addEventListener("click", () => {
        const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-expanded", String(!isExpanded));
        menuToggle.setAttribute("aria-label", isExpanded ? "メニューを開く" : "メニューを閉じる");
        pageHeader.classList.toggle("menu-open", !isExpanded);
    });

    siteNavigation.addEventListener("click", (event) => {
        if (event.target instanceof Element && event.target.closest("a")) {
            closeMenu();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
            closeMenu();
            menuToggle.focus();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 700) {
            closeMenu();
        }
    });
}
const fixedHeader = document.querySelector('.page-header');

if (fixedHeader) {
    fixedHeader.classList.add('is-fixed');
    document.body.classList.add('has-fixed-header');

    window.addEventListener('resize', () => {
        if (window.innerWidth > 700) {
            fixedHeader.classList.add('is-fixed');
            document.body.classList.add('has-fixed-header');
        }
    });
}



const heroSlider = document.querySelector("#top-hero-slider");

if (heroSlider) {
    const slideImages = [
        "images/karigazou.jpg",
        "images/11.gif",
        "images/31.gif",
    ];

    let currentIndex = 0;
    let sliderTimer = null;

    const showSlide = (index) => {
        currentIndex = index;
        const slides = heroSlider.querySelectorAll(".top-hero-slide");
        const dots = heroSlider.querySelectorAll(".top-hero-dot");

        slides.forEach((slide, slideIndex) => {
            slide.classList.toggle("is-active", slideIndex === index);
        });

        dots.forEach((dot, dotIndex) => {
            dot.classList.toggle("is-active", dotIndex === index);
        });
    };

    const startSlider = () => {
        if (sliderTimer) {
            clearInterval(sliderTimer);
        }

        sliderTimer = setInterval(() => {
            const nextIndex = (currentIndex + 1) % slideImages.length;
            showSlide(nextIndex);
        }, 3500);
    };

    slideImages.forEach((image, index) => {
        const slide = document.createElement("div");
        slide.className = `top-hero-slide${index === 0 ? " is-active" : ""}`;
        slide.style.backgroundImage = `url('${image}')`;
        slide.setAttribute("aria-label", `スライド ${index + 1}`);
        heroSlider.appendChild(slide);
    });

    const dotsWrap = document.createElement("div");
    dotsWrap.className = "top-hero-dots";

    slideImages.forEach((_, index) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = `top-hero-dot${index === 0 ? " is-active" : ""}`;
        dot.setAttribute("aria-label", `${index + 1}枚目のスライドを表示`);
        dot.addEventListener("click", () => {
            showSlide(index);
            startSlider();
        });
        dotsWrap.appendChild(dot);
    });

    heroSlider.appendChild(dotsWrap);
    showSlide(0);
    startSlider();

    heroSlider.addEventListener("mouseenter", () => {
        if (sliderTimer) {
            clearInterval(sliderTimer);
            sliderTimer = null;
        }
    });

    heroSlider.addEventListener("mouseleave", () => {
        startSlider();
    });
}



// const fixedHeader = document.querySelector('.page-header');

// if (fixedHeader) {
//     fixedHeader.classList.add('is-fixed');
//     document.body.classList.add('has-fixed-header');

//     window.addEventListener('resize', () => {
//         if (window.innerWidth > 700) {
//             fixedHeader.classList.add('is-fixed');
//             document.body.classList.add('has-fixed-header');
//         }
//     });
// }

