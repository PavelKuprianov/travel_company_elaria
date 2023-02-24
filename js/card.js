import {tourObj} from "./info.js";

function addCard(subTourOdj) {
    const divCard = document.createElement('div');
    divCard.classList.add('tab__card');
    const divImg = document.createElement('div');
    divImg.classList.add('tab__card_img');
    divCard.append(divImg);
    divImg.style.backgroundImage = `url(${subTourOdj.img1})`;

    const divStar = document.createElement('div');
    divStar.classList.add('tab__card_star');
    divCard.append(divStar);
    for(let i=0; i<subTourOdj.star; i++) {
        const imgStar = document.createElement('img');
        imgStar.src = 'img/star.svg';
        divStar.append(imgStar);
    }

    const h3 = document.createElement('h3');
    h3.classList.add('tab__card_title');
    h3.textContent = subTourOdj.motel;
    divCard.append(h3);

    const pDesc = document.createElement('p');
    pDesc.classList.add('tab__card_descr');
    pDesc.textContent = subTourOdj.descMin;
    divCard.append(pDesc);

    const pPrice = document.createElement('p');
    pPrice.classList.add('tab__card_descr');
    pPrice.textContent = `${new Intl.NumberFormat().format(subTourOdj.price)} ₽`;
    divCard.append(pPrice);

    const btn = document.createElement('a');
    btn.classList.add('tab__card_btn');
    btn.textContent = 'Подробнее';
    btn.id = subTourOdj.id;
    btn.href = 'border.html';
    divCard.append(btn);

    return divCard;
}

for(let key in tourObj) {
    let subTourOdj = tourObj[key];
    if(subTourOdj.state === 'Турция'){

       const turz = document.querySelector('.turz');

       turz.append(addCard(subTourOdj));
    }

    if(subTourOdj.state === 'Египет'){

        const egip = document.querySelector('.egip');

        egip.append(addCard(subTourOdj));
    }

    if(subTourOdj.state === 'Россия'){

        const ru = document.querySelector('.ru');

        ru.append(addCard(subTourOdj));
    }
}

const btnCardAll = document.querySelectorAll('.tab__card_btn');
btnCardAll.forEach((elem)=> {
    elem.addEventListener('click', (e)=> {
        localStorage.removeItem('idButton');
        localStorage.setItem("idButton", e.target.id);
    })
})


