const tabsLink = document.querySelectorAll('.tabs-link');
const tabs = document.querySelectorAll('.tab');

tabsLink.forEach((link) => {
    link.addEventListener('click', (event)=> {
        if(!event.target.classList.contains('active')) {
            tabsLink.forEach((item) => {
                item.classList.remove('active');
            })
            let val = event.target.dataset.num;

            tabs.forEach((tab) => {
                tab.classList.remove('active');
                if(tab.dataset.num === val) {
                    tab.classList.add('active');
                }
            })
            event.target.classList.add('active');
        }
    })
})
