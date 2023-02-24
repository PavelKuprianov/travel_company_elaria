import  {tourObj, excursObj}  from "./info.js";

const site = document.querySelector('.site');

const headerNavItem = document.querySelectorAll('.header__nav_item');
const searchTour = document.querySelector('.search-tour');
const searchExcursion = document.querySelector('.search-excursion');

const tourMenu = document.getElementById('tourMenu');
const tourHidden = document.getElementById('tourHidden');
const excursMenu = document.getElementById('excursMenu');
const excursHidden = document.getElementById('excursHidden');


const tour = document.querySelector('#tour');
const allTour = document.querySelector('#allTour');
const allExcurs = document.querySelector('#allExcurs');
const excurs = document.querySelector('#excurs');

const tourSearchBtn = document.querySelector('#tourBtn');
const tourField = document.querySelector('#tourField');
const excursSearchBtn = document.querySelector('#excursionBtn');
const exursField = document.querySelector('#exursField');


headerNavItem.forEach((view) => {
    view.addEventListener('click', (event) => {
        if(event.target.textContent === 'Туры') {
            tourHidden.style.display = 'block';
            event.target.parentNode.classList.add('active');
            searchExcursion.style.display = 'none';
            if(excursMenu.parentNode.classList.contains('active')) {
                excursMenu.parentNode.classList.remove('active');
                excursHidden.style.display = 'none';
                
            }
        } else {
            excursHidden.style.display = 'block';
            event.target.parentNode.classList.add('active');
            searchTour.style.display = 'none';
            if(tourMenu.parentNode.classList.contains('active')) {
                tourMenu.parentNode.classList.remove('active');
                tourHidden.style.display = 'none';
                
            }
        }
    })
});

tour.addEventListener('click', (e)=> {
    e.stopPropagation();
    searchTour.style.display = 'flex';
    searchExcursion.style.display = 'none';
});
allTour.addEventListener('click', (e)=> {
    e.stopPropagation();
});
allExcurs.addEventListener('click', (e)=> {
    e.stopPropagation();
});

excurs.addEventListener('click', ()=> {
    searchTour.style.display = 'none';
    searchExcursion.style.display = 'flex';
})

//закрываем выпадающую менюшку при клике вне меню
site.addEventListener('click', (e)=> { // Обработчик клика по сайту
    if(e.target.closest('.header__nav_item') === null
        && e.target.closest('.search') === null
        && e.target.closest('.btn-clean-search') === null) { // Проверка, что место клика не на поле меню
        searchTour.style.display = 'none';                      // Если это так, то убираются все классы active и
        searchExcursion.style.display = 'none';                 // всем элементам присваивается display = 'none'
        excursMenu.parentNode.classList.remove('active');
        tourMenu.parentNode.classList.remove('active');
        tourHidden.style.display = 'none';
        excursHidden.style.display = 'none';
    }
})



const cityInput1 = document.querySelector('#city');

tourSearchBtn.addEventListener('click', () => {
    let count = 0;

    for(let key in tourObj) {

        let subObj = tourObj[key];

        if(subObj.city === cityInput1.value || subObj.state === cityInput1.value ||
            subObj.motel.includes(cityInput1.value)) {
            count++;
            let p = document.createElement('p');
            p.textContent = `${subObj.state}, г. ${subObj.city}, Отель: ${subObj.motel}`
            p.classList.add('search-item');
            p.id = subObj.id;
            tourField.append(p);
        }

    }

    if(count === 0) {
        let p = document.createElement('p');
        p.classList.add('search-item');
        p.textContent = "По вашему запросу ничего не найдено...";
        tourField.append(p);
    }

    const btnCleanSearch = document.createElement('button');
    btnCleanSearch.classList.add('btn-clean-search');
    btnCleanSearch.textContent = 'Повторить поиск';
    tourField.append(btnCleanSearch);

    btnCleanSearch.addEventListener('click', () => {
        tourField.innerHTML = '';
        cityInput1.value = '';
    })

    const items = document.querySelectorAll('.search-item');
    items.forEach((item) => {
        item.addEventListener('click', (e) => {
            console.log(e.target.id)
            localStorage.setItem("idButton", e.target.id);
            location.assign('border.html');
        })

    })

})


const cityInput2 = document.querySelector('#city2');

excursSearchBtn.addEventListener('click', () => {
    let count = 0;

    for(let key in excursObj) {

        let subObj = excursObj[key];

        for(let i = 1; i < subObj.city.length - 1; i++) {

            if(subObj.city[i].includes(cityInput2.value)) {
                count++;
                let p = document.createElement('p');
                p.textContent = `${subObj.name} - ${subObj.quantity} дн.`
                p.classList.add('search-item');
                p.id = subObj.id;
                exursField.append(p);
                break;
            }
        }
    }

    if(count === 0) {
        let p = document.createElement('p');
        p.classList.add('search-item');
        p.textContent = "По вашему запросу ничего не найдено...";
        exursField.append(p);
    }

    const btnCleanSearch = document.createElement('button');
    btnCleanSearch.classList.add('btn-clean-search');
    btnCleanSearch.textContent = 'Повторить поиск';
    exursField.append(btnCleanSearch);

    btnCleanSearch.addEventListener('click', () => {
        exursField.innerHTML = '';
        cityInput2.value = '';
    })

    const items = document.querySelectorAll('.search-item');
    items.forEach((item) => {
        item.addEventListener('click', (e) => {
            console.log(e.target.id)
            localStorage.setItem("idButton", e.target.id);
            location.assign('excurs.html');
        })

    })

})



const btnMenu = document.querySelector('.header__burger'); // Поиск кнопки 'burger'
const menuField = document.querySelector('.header__burger_menu'); // Поиск поля меню

btnMenu.addEventListener('click', ()=> {
    menuField.classList.toggle('open-menu'); // Переключение класса поля меню
})





