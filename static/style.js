/* =========================================
   MOBILE MENU
========================================= */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {

    navMenu.classList.toggle("show");

    if (navMenu.classList.contains("show")) {
        menuBtn.textContent = "✕";
    } else {
        menuBtn.textContent = "☰";
    }

});


/* Close mobile menu */

document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("show");

        menuBtn.textContent = "☰";

    });

});


/* =========================================
   3D PROFILE IMAGE
========================================= */

const profileCard =
    document.getElementById("profileCard");

const heroArea =
    document.querySelector(".hero-image-area");


heroArea.addEventListener("mousemove", (event) => {

    // Disable strong 3D effect on small screens

    if (window.innerWidth < 700) {
        return;
    }

    const rect =
        heroArea.getBoundingClientRect();

    const x =
        event.clientX - rect.left;

    const y =
        event.clientY - rect.top;

    const centerX =
        rect.width / 2;

    const centerY =
        rect.height / 2;

    const rotateY =
        (x - centerX) / 25;

    const rotateX =
        (centerY - y) / 25;

    profileCard.style.transform =
        `rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)
         translateZ(20px)`;

});


heroArea.addEventListener("mouseleave", () => {

    profileCard.style.transform =
        "rotateX(0deg) rotateY(0deg) translateZ(0)";

});


/* =========================================
   PARTICLE SYSTEM
========================================= */

const canvas =
    document.getElementById("particles");

const ctx =
    canvas.getContext("2d");

let particles = [];

let mouse = {
    x: null,
    y: null
};


/* Canvas size */

function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

}

resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);


/* Mouse position */

window.addEventListener(
    "mousemove",
    (event) => {

        mouse.x = event.clientX;
        mouse.y = event.clientY;

    }
);


/* =========================================
   CREATE PARTICLES
========================================= */

function createParticles() {

    particles = [];

    let amount;

    if (window.innerWidth < 600) {
        amount = 35;
    } else {
        amount = 75;
    }

    for (let i = 0; i < amount; i++) {

        particles.push({

            x:
                Math.random() *
                canvas.width,

            y:
                Math.random() *
                canvas.height,

            size:
                Math.random() * 2 + 0.5,

            speedX:
                (Math.random() - 0.5) *
                0.3,

            speedY:
                (Math.random() - 0.5) *
                0.3,

            opacity:
                Math.random() * 0.6 + 0.2

        });

    }

}

createParticles();


/* =========================================
   DRAW PARTICLES
========================================= */

function drawParticles() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    particles.forEach((particle, index) => {

        particle.x += particle.speedX;
        particle.y += particle.speedY;


        /* Screen wrapping */

        if (particle.x < 0)
            particle.x = canvas.width;

        if (particle.x > canvas.width)
            particle.x = 0;

        if (particle.y < 0)
            particle.y = canvas.height;

        if (particle.y > canvas.height)
            particle.y = 0;


        /* Particle */

        ctx.beginPath();

        ctx.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(100, 110, 255, ${particle.opacity})`;

        ctx.fill();


        /* Connect nearby particles */

        for (
            let j = index + 1;
            j < particles.length;
            j++
        ) {

            const other =
                particles[j];

            const dx =
                particle.x - other.x;

            const dy =
                particle.y - other.y;

            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            if (distance < 110) {

                const opacity =
                    0.12 *
                    (1 - distance / 110);

                ctx.beginPath();

                ctx.moveTo(
                    particle.x,
                    particle.y
                );

                ctx.lineTo(
                    other.x,
                    other.y
                );

                ctx.strokeStyle =
                    `rgba(100, 90, 255, ${opacity})`;

                ctx.lineWidth = 0.5;

                ctx.stroke();

            }

        }

    });


    requestAnimationFrame(drawParticles);

}

drawParticles();


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections =
    document.querySelectorAll("section");

const navLinks =
    document.querySelectorAll(".nav-link");


window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 200;

        if (
            window.scrollY >=
            sectionTop
        ) {

            current =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${current}`
        ) {

            link.classList.add("active");

        }

    });

});


/* =========================================
   CONTACT FORM
========================================= */

const form =
    document.querySelector(".contact-form");