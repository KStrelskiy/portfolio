let app = document.querySelector(".body-home__profession");
let typewriter = new Typewriter(app, {
    loop: true,
    delay: 75,
});

typewriter
    .pauseFor(300)
    .typeString("Front-end Developer")
    .pauseFor(300)
    .deleteAll()
    .typeString("HTML Developer")
    .pauseFor(300)
    .start();

const itemsBtn = document.querySelectorAll(".block-experience__btn");
const itemsBody = document.querySelectorAll(".block-experience__item-body");


