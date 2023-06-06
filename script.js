// Бургер-меню
const burger = document.querySelector(".header__burger.burger");
const nav = document.querySelector(".nav__items");
const navLeftItems = document.querySelector(".header-nav_left__items");
const navLeft = document.querySelector(".header__nav-left");
burger.addEventListener("click", (e) => {
    burger.classList.toggle("active-burger");
    sizePopup();
    nav.classList.toggle("popup");
    if (nav.classList.contains("popup")) {
        document.body.style.overflowY = "hidden";
        const item = document.querySelectorAll(".item__link");
        item.forEach((item) => {
            item.addEventListener("click", () => {
                if (item.getAttribute("href")) {
                    document.body.style.overflowY = "scroll";
                    nav.classList.remove("popup");
                    burger.classList.remove("active-burger");
                }
            });
        });
    } else {
        document.body.style.overflowY = "scroll";
        nav.style.height = "";
        nav.style.width = "";
        navLeft.append(navLeftItems);
    }
});

window.addEventListener("resize", sizePopup);

function sizePopup() {
    width = window.innerWidth;
    height = window.innerHeight;
    if (width <= 767.98) {
        nav.style.width = width + "px";
        nav.style.height = height + "px";
        nav.append(navLeftItems);
    } else {
        nav.style.width = "";
        nav.style.height = "";
        navLeft.append(navLeftItems);
        document.body.style.overflowY = "scroll";
    }
}
// Бургер-меню

// Анимация текса (печатная машинка)
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
// Анимация текса (печатная машинка)

// Анимирования при скролле
const animItems = document.querySelectorAll("._anim-items"); // получаем все анимируемые элементы
if (animItems.length > 0) {
    window.addEventListener("scroll", animOnScrool);
    function animOnScrool() {
        for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index]; // перебираем их
            const animItemHeight = animItem.offsetHeight; // высота блок анимируемого элемента
            const animItemOffset = offset(animItem); // сумма высоты в видимой части и сколько проскроллили
            let animItemPoint = window.innerHeight - animItemHeight / 5; // точка анимирования элемента; window.innerHeight - видимая область всего окна пользователя
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / 5;
            } // если высота блока элемента больше высоты области видимости экрана пользователя
            if (
                pageYOffset > animItemOffset - animItemPoint &&
                pageYOffset < animItemOffset + animItemHeight
            ) {
                animItem.classList.add("_active");
            } else {
                if (!animItem.classList.contains("_no-repeatAnim")) {
                    animItem.classList.remove("_active");
                }
            } // момент, когда добавляется или удаляется класс
            // pageYOffset - количество пикселей, прокручиваемых по вертикальной оси (вниз и вверх)
        }
    }
    function offset(el) {
        const rect = el.getBoundingClientRect(); // getBoundingClientRec - обнаруживает размер элемента и его обнаружение относительно области просмотра
        //(часть страницы, видимая на экране, которую мы видим)
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return rect.top + scrollTop; // rect.top - высота до объекта в видимой части страницы
        // scrollTop - сколько проскроллили
    }

    setTimeout(() => {
        animOnScrool();
    }, 300); // вызывает функцию анимирования сразу же как загрузилась
    // страницы через 300 миллисекунд
}
// Анимирования при скролле
