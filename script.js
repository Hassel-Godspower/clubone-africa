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

/* =====================================================
   CLUB ONE SCHOOL CHECKER
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const schoolSearchForm = document.getElementById("schoolSearchForm");
    const schoolInput = document.getElementById("schoolInput");
    const checkerResult = document.getElementById("checkerResult");

    if (!schoolSearchForm || !schoolInput || !checkerResult) {
        return;
    }


    /* =====================================================
       REGISTERED CLUB ONE SCHOOLS
    ===================================================== */

    const registeredSchools = [
        "Everbright College",
        "Tombey Schools",
        "Kintobs Schools",
        "Racy & Sturdy Schools",
        "St Marcs Schools",
        "Effortswill Schools",
        "Favour Auditory Oral School",
        "De Margarette School",
        "Testimony Schools",
        "Divine Blessed Schools",
        "Soluk School",
        "Lizzyday Schools",
        "Purdue Infant School",
        "The Life Changer",
        "Altitude Schools",
        "Beehive Schools",
        "Great Learners Academy",
        "Alpha Rehoboth Group of Schools",
        "Was-Lat Group of Schools",
        "Cedarmount School",
        "Early Advantage Montessori Schools"
    ];


    /* =====================================================
       NORMALIZE SEARCH
    ===================================================== */

    function normalizeSchoolName(name) {

        return name
            .toLowerCase()
            .replace(/&/g, "and")
            .replace(/[^a-z0-9\s]/g, "")
            .replace(/\s+/g, " ")
            .trim();

    }


    /* =====================================================
       SEARCH
    ===================================================== */

    schoolSearchForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const searchValue = schoolInput.value.trim();


        if (!searchValue) {

            checkerResult.innerHTML = `
                <div class="checker-message checker-warning">

                    <div class="checker-message-icon">
                        <i class="fa-solid fa-circle-exclamation"></i>
                    </div>

                    <div>
                        <strong>Enter your school name</strong>

                        <span>
                            Please enter the name of your child's school.
                        </span>
                    </div>

                </div>
            `;

            return;
        }


        const normalizedSearch = normalizeSchoolName(searchValue);


        /* =================================================
           EXACT MATCH
        ================================================= */

        const exactMatch = registeredSchools.find(function (school) {

            return normalizeSchoolName(school) === normalizedSearch;

        });


        if (exactMatch) {

            showSchoolFound(exactMatch);

            return;
        }


        /* =================================================
           PARTIAL MATCH
        ================================================= */

        const matches = registeredSchools.filter(function (school) {

            const normalizedSchool = normalizeSchoolName(school);

            return normalizedSchool.includes(normalizedSearch);

        });


        if (matches.length > 0) {

            showPossibleMatches(matches);

            return;
        }


        /* =================================================
           SCHOOL NOT FOUND
        ================================================= */

        showSchoolNotFound(searchValue);

    });


    /* =====================================================
       SCHOOL FOUND
    ===================================================== */

    function showSchoolFound(school) {

        checkerResult.innerHTML = `

            <div class="checker-message checker-success">

                <div class="checker-message-icon">

                    <i class="fa-solid fa-circle-check"></i>

                </div>


                <div class="checker-message-content">

                    <strong>
                        School Found!
                    </strong>

                    <span>
                        ${school}
                    </span>

                    <small>
                        This school is currently registered
                        with Club One.
                    </small>

                </div>

            </div>

        `;

    }


    /* =====================================================
       POSSIBLE MATCHES
    ===================================================== */

    function showPossibleMatches(matches) {

        const matchList = matches.map(function (school) {

            return `
                <button
                    type="button"
                    class="school-match"
                    data-school="${school}"
                >
                    <i class="fa-solid fa-school"></i>

                    <span>
                        ${school}
                    </span>

                    <i class="fa-solid fa-arrow-right"></i>
                </button>
            `;

        }).join("");


        checkerResult.innerHTML = `

            <div class="checker-message checker-info">

                <div class="checker-message-icon">

                    <i class="fa-solid fa-magnifying-glass"></i>

                </div>


                <div class="checker-message-content">

                    <strong>
                        Did you mean?
                    </strong>

                    <span>
                        We found a possible match.
                    </span>

                </div>

            </div>


            <div class="school-match-list">

                ${matchList}

            </div>

        `;


        /* Make possible matches clickable */

        checkerResult
            .querySelectorAll(".school-match")
            .forEach(function (button) {

                button.addEventListener("click", function () {

                    const school = this.dataset.school;

                    schoolInput.value = school;

                    showSchoolFound(school);

                });

            });

    }


    /* =====================================================
       SCHOOL NOT FOUND
    ===================================================== */

    function showSchoolNotFound(searchValue) {

        checkerResult.innerHTML = `

            <div class="checker-message checker-error">

                <div class="checker-message-icon">

                    <i class="fa-solid fa-circle-xmark"></i>

                </div>


                <div class="checker-message-content">

                    <strong>
                        School not found
                    </strong>

                    <span>
                        "${searchValue}" is not currently
                        on the Club One registered school list.
                    </span>

                    <small>
                        Your school may still be eligible to join Club One.
                    </small>

                </div>

            </div>


            <a
                href="/contact"
                class="checker-contact-btn"
            >

                <i class="fa-solid fa-school"></i>

                Tell us about your school

                <i class="fa-solid fa-arrow-right"></i>

            </a>

        `;

    }


    /* =====================================================
       CLEAR RESULT WHEN USER STARTS TYPING AGAIN
    ===================================================== */

    schoolInput.addEventListener("input", function () {

        if (checkerResult.innerHTML !== "") {

            checkerResult.innerHTML = "";

        }

    });

});

/* =========================================================
   BACK-TO-SCHOOL EVENT COUNTDOWN
========================================================= */

const eventDate =
    new Date("2026-08-28T09:00:00+01:00").getTime();


function updateEventCountdown() {

    const now =
        new Date().getTime();

    const distance =
        eventDate - now;


    const countdown =
        document.getElementById("eventCountdown");


    if (!countdown) return;


    if (distance <= 0) {

        countdown.innerHTML = `
            <span>
                <strong>LIVE</strong>
            </span>
        `;

        return;

    }


    const days =
        Math.floor(
            distance /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (distance %
                (1000 * 60 * 60 * 24))
            /
            (1000 * 60 * 60)
        );


    const minutes =
        Math.floor(
            (distance %
                (1000 * 60 * 60))
            /
            (1000 * 60)
        );


    const seconds =
        Math.floor(
            (distance %
                (1000 * 60))
            /
            1000
        );


    document.getElementById("countdownDays")
        .textContent =
        String(days).padStart(2, "0");


    document.getElementById("countdownHours")
        .textContent =
        String(hours).padStart(2, "0");


    document.getElementById("countdownMinutes")
        .textContent =
        String(minutes).padStart(2, "0");


    document.getElementById("countdownSeconds")
        .textContent =
        String(seconds).padStart(2, "0");

}


updateEventCountdown();

setInterval(
    updateEventCountdown,
    1000
);
