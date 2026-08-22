/* =====================================================
   CLUB ONE
   GLOBAL JAVASCRIPT
===================================================== */


document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeNavigation();
        initializeScrollHeader();
        initializeRevealAnimations();
        initializeContactForm();
        initializeCounters();
        initializeSchoolChecker();
        initializeYear();

    }
);


/* =====================================================
   MOBILE NAVIGATION
===================================================== */

function initializeNavigation() {

    const menuToggle =
        document.getElementById("menuToggle");

    const mobileNav =
        document.getElementById("mobileNav");


    if (!menuToggle || !mobileNav) {
        return;
    }


    menuToggle.addEventListener(
        "click",
        () => {

            const isOpen =
                mobileNav.classList.toggle("active");


            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );


            menuToggle.classList.toggle(
                "open",
                isOpen
            );

        }
    );


    const mobileLinks =
        mobileNav.querySelectorAll("a");


    mobileLinks.forEach(
        link => {

            link.addEventListener(
                "click",
                () => {

                    mobileNav.classList.remove(
                        "active"
                    );


                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );


                    menuToggle.classList.remove(
                        "open"
                    );

                }
            );

        }
    );

}


/* =====================================================
   HEADER SCROLL EFFECT
===================================================== */

function initializeScrollHeader() {

    const header =
        document.getElementById("siteHeader");


    if (!header) {
        return;
    }


    const updateHeader =
        () => {

            if (window.scrollY > 30) {

                header.classList.add(
                    "scrolled"
                );

            } else {

                header.classList.remove(
                    "scrolled"
                );

            }

        };


    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );


    updateHeader();

}


/* =====================================================
   SCROLL REVEAL
===================================================== */

function initializeRevealAnimations() {

    const elements =
        document.querySelectorAll(
            ".reveal"
        );


    if (!elements.length) {
        return;
    }


    if (
        !("IntersectionObserver" in window)
    ) {

        elements.forEach(
            element => {

                element.classList.add(
                    "active"
                );

            }
        );

        return;

    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "active"
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    elements.forEach(
        element => {

            observer.observe(
                element
            );

        }
    );

}


/* =====================================================
   COUNTERS
===================================================== */

function initializeCounters() {

    const counters =
        document.querySelectorAll(
            ".counter"
        );


    if (!counters.length) {
        return;
    }


    const animateCounter =
        counter => {

            const target =
                Number(
                    counter.dataset.target
                );


            if (!target) {
                return;
            }


            const duration =
                1400;


            const startTime =
                performance.now();


            const update =
                currentTime => {

                    const elapsed =
                        currentTime -
                        startTime;


                    const progress =
                        Math.min(
                            elapsed /
                            duration,
                            1
                        );


                    const eased =
                        1 -
                        Math.pow(
                            1 - progress,
                            3
                        );


                    const value =
                        Math.floor(
                            eased * target
                        );


                    counter.textContent =
                        value.toLocaleString();


                    if (
                        progress < 1
                    ) {

                        requestAnimationFrame(
                            update
                        );

                    } else {

                        counter.textContent =
                            target.toLocaleString();

                    }

                };


            requestAnimationFrame(
                update
            );

        };


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            animateCounter(
                                entry.target
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.5
            }
        );


    counters.forEach(
        counter => {

            observer.observe(
                counter
            );

        }
    );

}


/* =====================================================
   SCHOOL CHECKER
===================================================== */

function initializeSchoolChecker() {

    const form =
        document.getElementById(
            "schoolSearchForm"
        );


    const input =
        document.getElementById(
            "schoolInput"
        );


    const result =
        document.getElementById(
            "checkerResult"
        );


    if (
        !form ||
        !input ||
        !result
    ) {

        return;

    }


    /*
       PHASE 1 SCHOOL DATABASE

       Replace these with the actual
       participating schools.
    */

    const schools = [

        {
            name:
                "Greenfield Academy",

            status:
                "available"

        },


        {
            name:
                "Chrisland School",

            status:
                "available"

        },


        {
            name:
                "Corona Schools",

            status:
                "available"

        },


        {
            name:
                "Grange School",

            status:
                "available"

        }

    ];


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const query =
                input.value
                    .trim()
                    .toLowerCase();


            if (!query) {

                showCheckerMessage(
                    "Please enter your school name.",
                    "warning"
                );

                input.focus();

                return;

            }


            const match =
                schools.find(
                    school =>

                        school.name
                            .toLowerCase()
                            .includes(query)

                );


            if (match) {

                const schoolName =
                    encodeURIComponent(
                        match.name
                    );


                showCheckerMessage(

                    `

                    <strong>
                        ${match.name}
                    </strong>

                    <br>

                    <span>
                        ✓ This school is currently
                        listed for Club One.
                    </span>

                    <br><br>

                    <a
                        href="https://wa.me/2347037170129?text=Hello%20Club%20One%2C%20I%20am%20a%20parent%20at%20${schoolName}%20and%20I%20would%20like%20to%20join."
                        target="_blank"
                        rel="noopener"
                        style="
                            font-weight:800;
                            color:#0b452c;
                        "
                    >

                        Continue on WhatsApp →

                    </a>

                    `,

                    "success"

                );

            }


            else {

                showCheckerMessage(

                    `

                    <strong>
                        We couldn't find that school yet.
                    </strong>

                    <br>

                    <span>
                        We are continuing to add schools
                        to the Club One community.
                    </span>

                    <br><br>

                    <a
                        href="contact.html"
                        style="
                            font-weight:800;
                            color:#ef6c00;
                        "
                    >

                        Tell us about your school →

                    </a>

                    `,

                    "warning"

                );

            }

        }
    );


    function showCheckerMessage(
        message,
        type
    ) {

        result.innerHTML =
            message;


        result.className =
            `checker-result show ${type}`;

    }

}


/* =====================================================
   CONTACT FORM
===================================================== */

function initializeContactForm() {

    const form =
        document.getElementById(
            "contactForm"
        );


    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        () => {

            const button =
                form.querySelector(
                    "button[type='submit']"
                );


            if (!button) {
                return;
            }


            button.innerHTML =
                `
                Sending...

                <i class="fa-solid fa-spinner fa-spin"></i>
                `;


            button.disabled = true;

        }
    );

}


/* =====================================================
   CURRENT YEAR
===================================================== */

function initializeYear() {

    const year =
        document.getElementById(
            "currentYear"
        );


    if (!year) {
        return;
    }


    year.textContent =
        new Date()
            .getFullYear();

}
