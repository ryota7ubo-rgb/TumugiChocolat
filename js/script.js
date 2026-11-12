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

