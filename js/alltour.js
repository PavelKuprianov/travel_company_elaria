import {tourObj} from "./info.js";

const tourList = document.querySelector('.tour-list');

const select = document.getElementById('select');
const option = select.querySelectorAll('input');

let radios = document.querySelectorAll('input[name="radio"]');

let arrObj = [];
let arrTour = [];

select.addEventListener('click', () => {
    while (tourList.firstChild) {
        tourList.removeChild(tourList.firstChild);
    }
    Array.from(option).map((e, i) => {
        if(e.checked) {
            workArray(i)
        }
    })
})


radios.forEach((item) => {
    item.addEventListener('click', (event) => {
        while (tourList.firstChild) {
            tourList.removeChild(tourList.firstChild);
        }

        Array.from(option).map((e, i) => {
            if(e.checked) {
                workArray(i, event.target.id)
            }
        })

    })
})


function addList(elemObj) {

        const linkTour = document.createElement('div');
        linkTour.classList.add('tour-list__item');
        linkTour.id = elemObj.id;

        const divImg = document.createElement('div');
        divImg.classList.add('item-img');
        divImg.style.backgroundImage = `url(${elemObj.img1})`;
        linkTour.append(divImg);

        const divText = document.createElement('div');
        divText.classList.add('item-text');
        linkTour.append(divText);

        const divInfoText = document.createElement('div');
        divInfoText.classList.add('hotel__info_text');
        divText.append(divInfoText);

        const hotelTitle = document.createElement('h3');
        hotelTitle.classList.add('hotel__info_text-title');
        hotelTitle.textContent = elemObj.motel;
        divInfoText.append(hotelTitle);

        const hotelCity = document.createElement('p');
        hotelCity.classList.add('hotel__info_text-city');
        hotelCity.textContent = `${elemObj.state}, ${elemObj.city}`;
        divInfoText.append(hotelCity);

        const divStar = document.createElement('div');
        divStar.classList.add('star');
        divInfoText.append(divStar);
        for(let i=0; i<elemObj.star; i++) {
            const imgStar = document.createElement('img');
            imgStar.src = 'img/star.svg';
            divStar.append(imgStar);
        }

        const pAll = document.createElement('p');
        pAll.classList.add('hotel__info_text-city');
        pAll.textContent = 'Все включено, AI';
        divInfoText.append(pAll);

        const divDate = document.createElement('div');
        divDate.classList.add('text-date');
        divInfoText.append(divDate);

        const pStart = document.createElement('p');
        pStart.classList.add('date-tour');
        pStart.classList.add('date-tour-start');
        pStart.textContent = elemObj.dateStart;
        divDate.append(pStart);

        const pCentr = document.createElement('p');
        pCentr.classList.add('date-tour');
        pCentr.classList.add('date-tour-center');
        pCentr.innerHTML = '&nbsp;—&nbsp;';
        divDate.append(pCentr);

        const pEnd = document.createElement('p');
        pEnd.classList.add('date-tour');
        pEnd.classList.add('date-tour-end');
        pEnd.textContent = elemObj.dateEnd;
        divDate.append(pEnd);

        const pCount = document.createElement('p');
        pCount.classList.add('text-count');
        pCount.innerHTML = `<span class="count-number">${elemObj.quantity}</span> ночей`;
        divInfoText.append(pCount);

        const divPrice = document.createElement('div');
        divPrice.classList.add('item-price');
        linkTour.append(divPrice);

        const pPrice = document.createElement('p');
        pPrice.classList.add('price');
        pPrice.innerHTML = `<span class="price-number">${new Intl.NumberFormat().format(elemObj.price)}</span> ₽</p>`;
        divPrice.append(pPrice);

        const pGrown = document.createElement('p');
        pGrown.classList.add('item-price__grown');
        pGrown.innerHTML = `Цена за <span className="piple">${elemObj.grown}</span> взрсл.`;
        divPrice.append(pGrown);

        const pKid = document.createElement('p');
        pKid.classList.add('item-price__kid');
        pKid.innerHTML = `и <span className="kid">${elemObj.kid}</span> ребёнк.`;
        divPrice.append(pKid);

        return linkTour;

}



// Функция для сортировки массива по возрастанию
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

function workArray(i, z='0') {
    if(i === 0){
        if(z==='0') {
            let arrTour = [];
            for(let key in tourObj) {
                let elemObj = tourObj[key];
                arrTour.push(elemObj)
                tourList.append(addList(elemObj));
            }  
        }
        if(z==='radio1') {
            sortArray(z, tourObj);
        }
        if(z==='radio2') {
            sortArray(z, tourObj);
        }
    }
    if(i === 1) {
        arrObj = [];
        for(let key in tourObj) {
            if(tourObj[key].state === 'Турция') {
                    let elemObj = tourObj[key];
                    arrObj.push(elemObj);
            }
        }

                if(z==='0') {
                    let arrTour = [];
                    for(let key in arrObj) {
                        let elemObj = arrObj[key];
                        arrTour.push(elemObj)
                        tourList.append(addList(elemObj));
                    }  
                }  
                if(z==='radio1') {
                    sortArray(z, arrObj);
                }
                if(z==='radio2') {
                    sortArray(z, arrObj);
                }

    }
    if(i === 2) {
        arrObj = [];
        for(let key in tourObj) {
            if(tourObj[key].state === 'Египет') {
                let elemObj = tourObj[key];
                arrObj.push(elemObj);
            }
        }
        if(z==='0') {
            let arrTour = [];
            for(let key in arrObj) {
                let elemObj = arrObj[key];
                arrTour.push(elemObj)
                tourList.append(addList(elemObj));
            }  
        }  
        if(z==='radio1') {
            sortArray(z, arrObj);

        }
        if(z==='radio2') {
            sortArray(z, arrObj);

        }
    }
    if(i === 3) {
        arrObj = [];
        for(let key in tourObj) {
            if(tourObj[key].state === 'Россия') {
                let elemObj = tourObj[key];
                arrObj.push(elemObj);
            }
        }
        if(z==='0') {
            let arrTour = [];
            for(let key in arrObj) {
                let elemObj = arrObj[key];
                arrTour.push(elemObj)
                tourList.append(addList(elemObj));
            }  
        }  
        if(z==='radio1') {
            sortArray(z, arrObj);
        }
        if(z==='radio2') {
            sortArray(z, arrObj);
        }
    }

    const btnLinkAll = document.querySelectorAll('.tour-list__item');
    btnLinkAll.forEach((elem)=> {

        elem.addEventListener('click', (e)=> {
            let parent = e.target.closest('.tour-list__item'); //делегирование события клика родителю
            localStorage.setItem("idButton", parent.id);
            location.assign('border.html');
        })
    })

}

workArray(0);





