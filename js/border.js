import {tourObj} from "./info.js";

let storageId = localStorage.getItem('idButton');


for(let key in tourObj) {
    let thisTourOdj = tourObj[key];
    if(thisTourOdj.id === storageId) {
        const title = document.querySelector('.hotel__title');
        title.textContent = thisTourOdj.motel;

        const containerStar = document.querySelector('.star');
        for(let i=0; i<thisTourOdj.star; i++) {
            const imgStar = document.createElement('img');
            imgStar.src = 'img/star.svg';
            containerStar.append(imgStar);
        }

        const adress = document.querySelector('.adress');
        adress.textContent = `${thisTourOdj.state}, ${thisTourOdj.city}`;

        const hotelImgBig = document.querySelector('.hotel__img_big');
        hotelImgBig.style.backgroundImage = `url(${thisTourOdj.img1})`;

        const imgRightTop = document.querySelector('.img-right-top');
        imgRightTop.style.backgroundImage = `url(${thisTourOdj.img2})`;

       const imgRightBottom = document.querySelector('.img-right-bottom');
        imgRightBottom.style.backgroundImage = `url(${thisTourOdj.img3})`;

        const dateTourStart = document.querySelector('.date-tour-start');
        dateTourStart.textContent = thisTourOdj.dateStart;

        const dateTourEnd = document.querySelector('.date-tour-end');
        dateTourEnd.textContent = thisTourOdj.dateEnd;

        const countNumber = document.querySelector('.count-number');
        countNumber.textContent = thisTourOdj.quantity;

        const priceNumber = document.querySelector('.price-number');
        priceNumber.textContent = new Intl.NumberFormat().format(thisTourOdj.price);

        const hotelText = document.querySelector('.hotel__text');
        hotelText.textContent = thisTourOdj.description;

        const hotelName = document.querySelector('.hotel-name');
        hotelName.textContent = thisTourOdj.motel;

        //КАРТА
        ymaps.ready(function () {

            var myMap = new ymaps.Map('map', {
                center: thisTourOdj.airport,
                zoom: 9,
                controls: []
            });

            // Создание экземпляра маршрута.
            var multiRoute = new ymaps.multiRouter.MultiRoute({
                // Точки маршрута.
                // Обязательное поле.
                referencePoints: [
                    thisTourOdj.airport, //Координаты аэропорта
                    thisTourOdj.mapEnd, //Координаты отеля
                ]
            }, {
                // Автоматически устанавливать границы карты так,
                // чтобы маршрут был виден целиком.
                boundsAutoApply: true
            });
            // Добавление маршрута на карту.
            myMap.geoObjects.add(multiRoute);
        });

        //Модальное окно

        const btnOpen = document.querySelector('#btn-finish-tour');
        const btnClose = document.querySelector('.modal-btn');
        const modal = document.querySelector('.modal');

        const modalViewHandler = () => {
            modal.classList.toggle('modal--open');
        }

        btnOpen.addEventListener('click', modalViewHandler);
        btnClose.addEventListener('click', modalViewHandler);


    }
}
