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
            let animItemPoint = window.innerHeight - animItemHeight / 4; // точка анимирования элемента; window.innerHeight - видимая область всего окна пользователя
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / 4;
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
