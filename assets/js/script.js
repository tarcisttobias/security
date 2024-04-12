function openMenu() {
    const nav = document.querySelector('nav');
    nav.classList.toggle('open');
}



'use strict';

/**
 * element toggle function
 */

const elemToggleFunc = function (elem) {
    elem
        .classList
        .toggle("active");
}

/**
 * header sticky & go to top
 */

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {

    if (window.scrollY >= 10) {
        header
            .classList
            .add("active");
        goTopBtn
            .classList
            .add("active");
    } else {
        header
            .classList
            .remove("active");
        goTopBtn
            .classList
            .remove("active");
    }

});

/**
 * navbar toggle
*/

/*
Old

const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbar = document.querySelector("[data-navbar]");

navToggleBtn.addEventListener("click", function () {

  elemToggleFunc(navToggleBtn);
  elemToggleFunc(navbar);
  elemToggleFunc(document.body);

});
*/

const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbar = document.querySelector("[data-navbar]");

navToggleBtn.addEventListener("click", function () {
    elemToggleFunc(navToggleBtn);
    elemToggleFunc(navbar);
    elemToggleFunc(document.body);
});

const navLinks = document.querySelectorAll(".navbar-link");

navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        elemToggleFunc(navToggleBtn);
        elemToggleFunc(navbar);
        elemToggleFunc(document.body);
    });
});

/**
 * skills toggle
 */

const toggleBtnBox = document.querySelector("[data-toggle-box]");
const toggleBtns = document.querySelectorAll("[data-toggle-btn]");
const skillsBox = document.querySelector("[data-skills-box]");

for (let i = 0; i < toggleBtns.length; i++) {
    toggleBtns[i].addEventListener("click", function () {

        elemToggleFunc(toggleBtnBox);
        for (let i = 0; i < toggleBtns.length; i++) {
            elemToggleFunc(toggleBtns[i]);
        }
        elemToggleFunc(skillsBox);

    });
}

/**
 * dark & light theme toggle
 */

const themeToggleBtn = document.querySelector("[data-theme-btn]");

themeToggleBtn.addEventListener("click", function () {

    elemToggleFunc(themeToggleBtn);

    if (themeToggleBtn.classList.contains("active")) {
        document
            .body
            .classList
            .remove("dark_theme");
        document
            .body
            .classList
            .add("light_theme");

        localStorage.setItem("theme", "light_theme");
    } else {
        document
            .body
            .classList
            .add("dark_theme");
        document
            .body
            .classList
            .remove("light_theme");

        localStorage.setItem("theme", "dark_theme");
    }

});

/**
 * check & apply last time selected theme from localStorage
 */

if (localStorage.getItem("theme") === "light_theme") {
    themeToggleBtn
        .classList
        .add("active");
    document
        .body
        .classList
        .remove("dark_theme");
    document
        .body
        .classList
        .add("light_theme");
} else {
    themeToggleBtn
        .classList
        .remove("active");
    document
        .body
        .classList
        .remove("light_theme");
    document
        .body
        .classList
        .add("dark_theme");
}

/**
 * Switch language
 */

function changeLang() {
    var ddl = document.getElementById("lang");
    var selectedValue = ddl
        .options[ddl.selectedIndex]
        .value;
    document
        .documentElement
        .setAttribute("lang", selectedValue);
    var lang = selectedValue;
    var elements = document.querySelectorAll("[lang]");
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].getAttribute("lang") === lang) {
            elements[i].style.display = "";
        } else {
            elements[i].style.display = "none";
        }
    }
}

var select = document.getElementById("lang");
select.addEventListener("change", function () {
    changeLang();
});

changeLang();

//  função para enviar o email

(function () {
    emailjs.init("n-uoSFberrPnSWpZm");
})();


function sendEmail() {
    // Pegar os dados do formulário

    if ( document.getElementById("lang").value == "en" ) {
    var params = {
        from_name: document
            .getElementById("name")
            .value,
        from_email: document
            .getElementById("email")
            .value,
        from_tel: document
            .getElementById("phone")
            .value,
        message: document
            .getElementById("message")
            .value
    }
}

else {
 
    var params = {
        from_name: document
            .getElementById("nome")
            .value,
        from_email: document
            .getElementById("e-mail")
            .value,
        from_tel: document
            .getElementById("telefone")
            .value,
        message: document
            .getElementById("mensagem")
            .value
    }
}
   
    // Enviar o email usando o EmailJS

    emailjs
        .send("service_6he4v5i", "template_ns25bmt", params)
        .then(function (response) {
            alert("Email enviado com sucesso!");
            reset("contact-form");
        }, function (error) {
            alert("Ocorreu um erro ao enviar o email: " + error);
        });
}

    // Entre em contato
const staticCacheName = 'site-static-v1';
const assets = [
    '/Portfolio/',
    '/Portfolio/index.html',
    '/style.css',
    '/Portfolio/assets/img/mobile.png',
    '/Portfolio/assets/img/favicon.png',
    'https://fonts.googleapis.com/css?family=Lato:300,400,700'
];
// install event
self.addEventListener('install', evt => {
    evt.waitUntil(
        caches.open(staticCacheName).then((cache) => {
            console.log('caching shell assets');
            cache.addAll(assets);
        })
    );
});
// activate event
self.addEventListener('activate', evt => {
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== staticCacheName)
                .map(key => caches.delete(key))
            );
        })
    );
});
// When we change the name we could have multiple cache, to avoid that we need to delet the old cache, so with this function we check the key that is our cache naming, if it is different from the actual naming we delete it, in this way we will always have only the last updated cache.
// fetch event
self.addEventListener('fetch', evt => {
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request);
        })
    );
});