import {excursObj} from "./info.js";

const tourList = document.querySelector('.tour-list');

let radios = document.querySelectorAll('input[name="radio"]');

let arrTour = [];

radios.forEach((item) => {
    item.addEventListener('click', (event) => {
        while (tourList.firstChild) {
            tourList.removeChild(tourList.firstChild);
        }
            if(event.target.checked) {
                workArray(event.target.id)
            }
    })
})

function addList(elemObj) {

    const linkTour = document.createElement('div');
    linkTour.classList.add('tour-list__item');
    linkTour.dataset.var = "excurs";
    linkTour.id = elemObj.id;

    const divImg = document.createElement('div');
    divImg.classList.add('item-img-excurs');
    divImg.style.backgroundImage = `url(${elemObj.img1})`;
    linkTour.append(divImg);

    const divText = document.createElement('div');
    divText.classList.add('item-text-excurs');
    linkTour.append(divText);

    const divInfoText = document.createElement('div');
    divInfoText.classList.add('excurs__info_text');
    divText.append(divInfoText);

    const hotelTitle = document.createElement('h3');
    hotelTitle.classList.add('excurs__info_text-title');
    hotelTitle.textContent = elemObj.name;
    divInfoText.append(hotelTitle);

    const hotelCity = document.createElement('p');
    hotelCity.classList.add('excurs__info_text-city');
    hotelCity.textContent = elemObj.descMin;
    divInfoText.append(hotelCity);

    const divDate = document.createElement('div');
    divDate.classList.add('text-date');
    divInfoText.append(divDate);

    const listCity = document.createElement('ul');
    listCity.classList.add('excurs-city');
    for(let i=1; i<elemObj.city.length-1; i++) {
        const itemCity = document.createElement('li');
        itemCity.classList.add('item-excurs-city');
        itemCity.textContent = elemObj.city[i];
        listCity.append(itemCity);
    }
    divDate.append(listCity);




    const divPrice = document.createElement('div');
    divPrice.classList.add('item-price');
    linkTour.append(divPrice);

    const pPrice = document.createElement('p');
    pPrice.classList.add('price');
    pPrice.innerHTML = `<span class="price-number">${new Intl.NumberFormat().format(elemObj.price)}</span> ₽</p>`;
    divPrice.append(pPrice);

    const pGrown = document.createElement('p');
    pGrown.classList.add('item-price__grown');
    pGrown.innerHTML = `Цена за одного человека`;
    pGrown.style.textAlign = 'center';
    divPrice.append(pGrown);

    const pCount = document.createElement('p');
    pCount.classList.add('excurs-count');
    pCount.innerHTML = `<span class="count-number">${elemObj.quantity}</span> дн.`;
    divPrice.append(pCount);

    return linkTour;

}


function compare(a, b) {
    const param1 = a.price;
    const param2 = b.price;

    let comparison = 0;
    if (param1 > param2) {
      comparison = 1;
    } else if (param1 < param2) {
      comparison = -1;
    }
    return comparison;
}

function sortArray(z, obj) {
        arrTour = [];
    for(let key in obj) {
        let elemObj = obj[key];
        arrTour.push(elemObj)
    }   
    arrTour.sort(compare);
    if(z==='radio2') {
        arrTour.reverse();
    }
    arrTour.forEach((element) => {
        let elemObj = element;
        tourList.append(addList(elemObj));
    })

}

function workArray(z) {
    if(z==='0') {
        let arrTour = [];
        for(let key in excursObj) {
            let elemObj = excursObj[key];
            // console.log(elemObj)
            tourList.append(addList(elemObj));
        }

    }
    if(z==='radio1') {
        sortArray(z, excursObj);
    }
    if(z==='radio2') {
        sortArray(z, excursObj);
    }
}

workArray('0');

const btnLinkAll = document.querySelectorAll('div[data-var="excurs"]');
const imgLinkAll = document.querySelectorAll('.item-img-excurs');

btnLinkAll.forEach((elem)=> {

    elem.addEventListener('click', (e)=> {
        let parent = e.target.closest('.tour-list__item'); //делегирование события клика родителю
        localStorage.setItem("idButton", parent.id);
        location.assign('excurs.html');
    })
})









