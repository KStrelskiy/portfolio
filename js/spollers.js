const spollersArray = document.querySelectorAll("[data-spollers]");

if (spollersArray.length > 0) {
    // Получение обычных спойлеров
    const spollersRegular = Array.from(spollersArray).filter(function (
        item,
        index,
        self
    ) {
        return !item.dataset.spollers.split(",")[0]; // Элементы имеющие только в data-spollers = ""
    });
    // Инициализация обычных спойлеров
    if (spollersRegular.length > 0) {
        initSpollers(spollersRegular);
    }
    // Получение спойлеров с медиа запросами
    const spollersMedia = Array.from(spollersArray).filter(function (
        item,
        index,
        self
    ) {
        return item.dataset.spollers.split(",")[0]; //Возращает все элементы имеющие в data-spollers = "650(разрешение),min(max)"
    });
    // Инициализация спойлеров с медиа запросами
    if (spollersMedia.length > 0) {
        const breakpointsArray = [];
        spollersMedia.forEach((item) => {
            const params = item.dataset.spollers; // 650,min
            const breakpoint = {};
            const paramsArray = params.split(","); // добавляем в массив, разделяя запятой (,); ['650', 'min']
            breakpoint.value = paramsArray[0]; // paramsArray[0] = 650
            breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max"; // paramsArray[1] = min; метод trim() удаляет пробельные символы с начала и конца строки, если нет, то paramsArray[1] = max
            breakpoint.item = item; // item = элементу div.block.block_1
            breakpointsArray.push(breakpoint); // добавляем в массив
        });
        // Получаем уникальные брейкпоинты
        let mediaQueries = breakpointsArray.map(function (item) {
            // ['(min-width: 650px)', '650', 'min']
            return (
                "(" +
                item.type +
                "-width: " +
                item.value +
                "px)," +
                item.value +
                "," +
                item.type
            ); // (min-width: 650px),650,min
        });
        mediaQueries = mediaQueries.filter(function (item, index, self) {
            // ['(min-width: 650px)', '650', 'min']
            return self.indexOf(item) === index; // вернёт true; item = (min-width: 650px),650,min; index = 0; self = ['(min-width: 650px),650,min']
        });
        // Работаем с каждым брейкпоинтом
        mediaQueries.forEach((breakpoint) => {
            const paramsArray = breakpoint.split(","); //добавляем в массив, разделяя запятой (,)
            const mediaBreakpoint = paramsArray[1]; // paramsArray[1] = 650/850
            const mediaType = paramsArray[2]; // paramsArray[2] = min/max
            const matchMedia = window.matchMedia(paramsArray[0]); //метод matchMedia() мб любыми мультимедийными функциями правила CSS @media , такими как минимальная высота, минимальная ширина, ориентация и т. д.; paramsArray[0] = (min-width: 650px)
            // Объекты с нудными условиями
            const spollersArray = breakpointsArray.filter(function (item) {
                if (item.value === mediaBreakpoint && item.type === mediaType) {
                    return true;
                }
            });
            // Событие
            matchMedia.addListener(function () {
                initSpollers(spollersArray, matchMedia);
            });
            initSpollers(spollersArray, matchMedia);
        });
    }
    // Инициализация
    function initSpollers(spollersArray, matchMedia = false) {
        spollersArray.forEach((spollersBlock) => {
            spollersBlock = matchMedia ? spollersBlock.item : spollersBlock; // если matchMedia = true, то spollersBlock.item = элементу div.block.block_1, если false spollersBlock = {value: '650', type: 'min', item: div.block.block_1._init}
            if (matchMedia.matches || !matchMedia) {
                // вернёт true, если размер экрана 850px или 650px; метод matches()возвращает значение true, если элемент соответствует определенному селектору CSS.
                spollersBlock.classList.add("_init");
                initSpollerBody(spollersBlock);
                spollersBlock.addEventListener("click", setSpollerAction);
            } else {
                spollersBlock.classList.remove("_init");
                initSpollerBody(spollersBlock, false);
                spollersBlock.removeEventListener("click", setSpollerAction);
            }
        });
    }
    // Работа с контентом
    function initSpollerBody(spollersBlock, hideSpollerBody = true) {
        const spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
        if (spollerTitles.length > 0) {
            spollerTitles.forEach((spollerTitle) => {
                if (hideSpollerBody) {
                    spollerTitle.removeAttribute("tabidnex");
                    if (!spollerTitle.classList.contains("_active")) {
                        spollerTitle.nextElementSibling.hidden = true;
                    }
                } else {
                    spollerTitle.setAttribute("tabidnex", "-1");
                    spollerTitle.nextElementSibling.hidden = false;
                }
            });
        }
    }
    function setSpollerAction(e) {
        const el = e.target;
        if (el.hasAttribute("data-spoller") || el.closest("[data-spoller]")) {
            const spollerTitle = el.hasAttribute("data-spoller")
                ? el
                : el.closest("[data-spoller]");
            const spollersBlock = spollerTitle.closest("[data-spollers]");
            const oneSpoller = spollersBlock.hasAttribute("data-one-spoller")
                ? true
                : false;
            if (!spollersBlock.querySelectorAll("._slide").length) {
                if (oneSpoller && !spollerTitle.classList.contains("_active")) {
                    hideSpollerBody(spollersBlock);
                }
                spollerTitle.classList.toggle("_active");
                console.log(spollerTitle.nextElementSibling);
                _slideToggle(spollerTitle.nextElementSibling, 500);
            }
            e.preventDefault();
        }
    }
    function hideSpollerBody(spollersBlock) {
        const spollerActiveTitle = spollersBlock.querySelector(
            "[data-spoller]._active"
        );
        if (spollerActiveTitle) {
            spollerActiveTitle.classList.remove("_active");
            _slideUp(spollerActiveTitle.nextElementSibling, 500);
        }
    }
}

//========================================================================================
//SlideToggle
let _slideUp = (target, duration = 500) => {
    if (!target.classList.contains("_slide")) {
        target.classList.add("_slide");
        target.style.transitionProperty = "height, margin, padding";
        target.style.transitionDuration = duration + "ms";
        target.style.height = target.offsetHeight + "px";
        target.offsetHeight;
        target.style.overflow = "hidden";
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        window.setTimeout(() => {
            target.hidden = true;
            target.style.removeProperty("height");
            target.style.removeProperty("padding-top");
            target.style.removeProperty("padding-bottom");
            target.style.removeProperty("margin-top");
            target.style.removeProperty("margin-bottom");
            target.style.removeProperty("overflow");
            target.style.removeProperty("transition-duration");
            target.style.removeProperty("transition-property");
            target.classList.remove("_slide");
        }, duration);
    }
};
let _slideDown = (target, duration = 500) => {
    if (!target.classList.contains("_slide")) {
        target.classList.add("_slide");
        if (target.hidden) {
            target.hidden = false;
        }
        let height = target.offsetHeight;
        target.style.overflow = "hidden";
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.offsetHeight;
        target.style.transitionProperty = "height, margin, padding";
        target.style.transitionDuration = duration + "ms";
        target.style.height = height + "px";
        target.style.removeProperty("padding-top");
        target.style.removeProperty("padding-bottom");
        target.style.removeProperty("margin-top");
        target.style.removeProperty("margin-bottom");
        window.setTimeout(() => {
            target.style.removeProperty("height");
            target.style.removeProperty("overflow");
            target.style.removeProperty("transition-duration");
            target.style.removeProperty("transition-property");
            target.classList.remove("_slide");
        }, duration);
    }
};
let _slideToggle = (target, duration = 500) => {
    if (target.hidden) {
        return _slideDown(target, duration);
    } else {
        return _slideUp(target, duration);
    }
};

/*
Для родителя спойлеров пишем атрибут data-spollers
Для заголовков спойлеров пишет атрибут data-spoller
Если нужно включать\выключать работу спойлеров на разных размерах экранов
пишем параметры ширины и типа брейкпоинта.
Например:
data-spollers = "992,max" - спойлеры будут работать только на экранах меньше или равно 992px
data-spollers = "768,min" - спойлеры будут работать только на экранах больше или равно 768px

Если нужно, чтобы в блоке открывался только один спойлер, добавляем атрибут data-one-spoller
*/
