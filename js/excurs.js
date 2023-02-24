import {excursObj} from "./info.js";

let storageId = localStorage.getItem('idButton');


for(let key in excursObj) {
    let thisExcursOdj = excursObj[key];
    if(thisExcursOdj.id === storageId) {

        const headLeft = document.querySelector('.head__left');
        headLeft.style.backgroundImage = `url(${thisExcursOdj.img1})`;

        const headRight = document.querySelector('.head__right');
        headRight.style.backgroundImage = `url(${thisExcursOdj.img2})`;

        const excursName = document.querySelector('.excurs__name');
        excursName.textContent = thisExcursOdj.name;

        const excursDesc = document.querySelector('.excurs__desc');
        excursDesc.textContent = thisExcursOdj.descMin;

        const excursQuantitySpan = document.querySelector('.excurs__quantity-span');
        excursQuantitySpan.textContent = thisExcursOdj.quantity;

        const excursDescriptionText = document.querySelector('.excurs__description_text');
        excursDescriptionText.textContent = thisExcursOdj.description;

        // Блок с информацией по дням

        const excursMain = document.querySelector('.excurs__main');
        for (let day in thisExcursOdj.route) {
            const dayContainer = document.createElement('h4');
            dayContainer.classList.add('excurs__main_title');
            dayContainer.textContent = day;
            excursMain.append(dayContainer);

            let dayInfo = thisExcursOdj.route[day];
            for(let dayCity in dayInfo) {
                const cityContainer = document.createElement('h5');
                cityContainer.classList.add('excurs-city');
                cityContainer.textContent = dayCity;
                excursMain.append(cityContainer);

                const listContainer = document.createElement('ul');
                listContainer.classList.add('excurs-list');
                excursMain.append(listContainer);

                for(let i = 0; i < dayInfo[dayCity].length; i++) {
                    const itemContainer = document.createElement('li');
                    itemContainer.classList.add('excurs-item');
                    itemContainer.textContent = dayInfo[dayCity][i];
                    listContainer.append(itemContainer);
                }
            }
        }

        const excursEndInfo = document.querySelector('.excurs__end_info');
        excursEndInfo.textContent = thisExcursOdj.info;
        const excursEndPs = document.querySelector('.excurs__end_ps');
        excursEndPs.textContent = thisExcursOdj.ps;

        //КАРТА

        function init() {
            // Объявляем набор опорных точек и массив индексов транзитных точек.
            var referencePoints = thisExcursOdj.routeMap,
                viaIndexes = [];

            // Создаем мультимаршрут и настраиваем его внешний вид с помощью опций.
            var multiRoute = new ymaps.multiRouter.MultiRoute({
                referencePoints: referencePoints,
                // params: {viaIndexes: viaIndexes}
            }, {
                // Внешний вид путевых точек.
                wayPointStartIconColor: "red",
                wayPointStartIconFillColor: "#B3B3B3",
                // Задаем собственную картинку для последней путевой точки.
                wayPointFinishIconLayout: "default#image",
                wayPointFinishIconImageHref: "",
                wayPointFinishIconImageSize: [30, 30],
                wayPointFinishIconImageOffset: [-15, -15],
                // Позволяет скрыть иконки путевых точек маршрута.
                wayPointVisible:false,

                // Внешний вид транзитных точек.
                viaPointIconRadius: 7,
                viaPointIconFillColor: "#000088",
                viaPointActiveIconFillColor: "#E63E92",
                // Транзитные точки можно перетаскивать, при этом
                // маршрут будет перестраиваться.
                viaPointDraggable: false,
                // Позволяет скрыть иконки транзитных точек маршрута.
                // viaPointVisible:false,

                // Внешний вид точечных маркеров под путевыми точками.
                pinIconFillColor: "#000088",
                pinActiveIconFillColor: "#B3B3B3",
                // Позволяет скрыть точечные маркеры путевых точек.
                // pinVisible:false,

                // Внешний вид линии маршрута.
                routeActiveStrokeWidth: [10, 3],
                routeActiveStrokeColor: ["#ff0000"],

                // Автоматически устанавливать границы карты так, чтобы маршрут был виден целиком.
                boundsAutoApply: true
            });

            // Создаем карту
            var myMap = new ymaps.Map('map', {
                center: [55.739625, 37.54120],
                zoom: 7,
                controls: ['zoomControl', 'searchControl', 'typeSelector',  'fullscreenControl', 'routeButtonControl']
            }, {
                // buttonMaxWidth: 300
            });

            // Добавляем мультимаршрут на карту.
            myMap.geoObjects.add(multiRoute);

            //Добавление баллунов на транзитные точки
            for(let i=0; i < thisExcursOdj.routeMap.length; i++) {
                let placemark = new ymaps.Placemark(thisExcursOdj.routeMap[i], {
                    balloonContent:`
                <div class="balloon">
                    <h2>${thisExcursOdj.city2[i]}</h1>
                    <h3>${thisExcursOdj.point[i]}</p>
                    <img src="${thisExcursOdj.images[i]}">
                </div>
            `,
                }, {
                    iconLayout: 'default#image',
                    iconImageHref: 'img/marker.png',
                    iconImageSize: [50, 50],
                    iconImageOffset: [-25, -50],
                });

                myMap.geoObjects.add(placemark);
            }
        }

        ymaps.ready(init);


        //Модальное окно

        const btnOpen = document.querySelector('#btn-finish-excurs');
        const btnClose = document.querySelector('.modal-btn');
        const modal = document.querySelector('.modal');

        const modalViewHandler = () => {
            modal.classList.toggle('modal--open');
        }

        btnOpen.addEventListener('click', modalViewHandler);
        btnClose.addEventListener('click', modalViewHandler);
    }

}
