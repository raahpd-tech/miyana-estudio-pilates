// ==========================================================
// MENÚ MÓVIL
// ==========================================================

const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector("#primary-menu");


// ---------- Cerrar menú ----------

function closeMenu() {

    menu.classList.remove("is-open");

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    menuToggle.setAttribute(
        "aria-label",
        "Abrir menú"
    );

}


// ---------- Abrir / cerrar menú ----------

menuToggle.addEventListener("click", () => {

    const isOpen =
        menu.classList.toggle("is-open");

    menuToggle.setAttribute(
        "aria-expanded",
        isOpen
    );

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Cerrar menú" : "Abrir menú"
    );

});


// ==========================================================
// CERRAR MENÚ AL SELECCIONAR UNA SECCIÓN
// ==========================================================

const menuLinks =
    document.querySelectorAll("#primary-menu a");

menuLinks.forEach(link => {

    link.addEventListener("click", () => {

        closeMenu();

    });

});


// ==========================================================
// CERRAR MENÚ CON ESCAPE
// ==========================================================

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        closeMenu();

    }

});


// ==========================================================
// CERRAR MENÚ AL HACER CLIC FUERA
// ==========================================================

document.addEventListener("click", (event) => {

    const clickedOutsideMenu =
        !menu.contains(event.target) &&
        !menuToggle.contains(event.target);

    if (clickedOutsideMenu) {

        closeMenu();

    }

});


// ==========================================================
// FAQ - ACORDEÓN
// ==========================================================

const faqQuestions =
    document.querySelectorAll(".faq-question");

faqQuestions.forEach(question => {

    question.addEventListener("click", () => {

        const faqItem =
            question.closest(".faq-item");

        const isOpen =
            faqItem.classList.contains("is-open");


        // ---------- Cerrar todos los FAQ ----------

        faqQuestions.forEach(otherQuestion => {

            const otherItem =
                otherQuestion.closest(".faq-item");

            otherItem.classList.remove("is-open");

            otherQuestion.setAttribute(
                "aria-expanded",
                "false"
            );

        });


        // ---------- Abrir el seleccionado ----------

        if (!isOpen) {

            faqItem.classList.add("is-open");

            question.setAttribute(
                "aria-expanded",
                "true"
            );

        }

    });

});


// ==========================================================
// NAVEGACIÓN ACTIVA SEGÚN LA SECCIÓN VISIBLE
// ==========================================================

const sections =
    document.querySelectorAll("main section[id]");

const navigationLinks =
    document.querySelectorAll(".menu a");

const sectionObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    // ---------- Limpiar estado anterior ----------

                    navigationLinks.forEach(link => {

                        link.classList.remove("active");

                        link.removeAttribute(
                            "aria-current"
                        );

                    });


                    // ---------- Activar sección actual ----------

                    const activeLink =
                        document.querySelector(
                            `.menu a[href="#${entry.target.id}"]`
                        );

                    if (activeLink) {

                        activeLink.classList.add("active");

                        activeLink.setAttribute(
                            "aria-current",
                            "page"
                        );

                    }

                }

            });

        },
        {
            threshold: 0.2
        }
    );

sections.forEach(section => {

    sectionObserver.observe(section);

});


// ==========================================================
// ANIMACIONES DE ENTRADA
// ==========================================================

const animatedElements =
    document.querySelectorAll(
        ".service-card, " +
        ".about-image, " +
        ".about-content, " +
        ".team-card, " +
        ".contact-card"
    );

const animationObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "is-visible"
                    );

                    // Ya no necesitamos observar
                    // este elemento.

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.15
        }
    );

animatedElements.forEach(element => {

    animationObserver.observe(element);

});