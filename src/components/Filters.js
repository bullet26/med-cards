import store from '../utils/store';

export class Filters {
    constructor() {
        this.btn = document.querySelector('.bi-funnel-fill');
        this.inputTitle = document.querySelector('#search-input');
        this.form = document.querySelector('#filter');
        this.inputSpecialist = document.querySelector('#search-spec');
        this.inputUrgency = document.querySelector('#search-urgency');
        this.inputStatus = document.querySelector('#search-status');
    }

    showFilters() {
        this.btn.addEventListener('click', () => {
            if (!!localStorage.getItem('token') || !!store.authToken) {
                this.form.classList.toggle('active');
            } else {
                this.btn.insertAdjacentHTML('afterend', '<span class="filter-auth text-primary text-opacity-75">Please, authorise</span>');
                const hint = document.querySelector('.filter-auth');

                setTimeout(() => hint.remove(), 2000);
            }
        });
    }

    filterFunction() {
        store.filteredVisits = [];
        const noSearchString = ({ searhcString, ...rest }) => rest;
        const whereFind = ['description', 'title'];
        let whatFind = {};
        let res = [];

        const formData = new FormData(this.form);

        for (const [key, value] of formData.entries()) {
            if (!!value && value !== 'none') {
                whatFind[key] = value;
            }
        }

        const searchString = whatFind['searhcString'];

        if (!!searchString) {
            res = [];
            whatFind = noSearchString(whatFind);

            store.visits.forEach(item => {
                for (const [key, value] of Object.entries(item)) {
                    if (new RegExp(searchString, 'i').test(value) && whereFind.includes(key)) {
                        res.push(item);
                        return;
                    }
                }
            });

            if (!res.length) {
                store.filteredVisits = [];

                this.hideVisits();
                this.showInformText();
                return false;
            }
        }

        (res.length > 0 ? res : store.visits).forEach(obj => {
            for (const [key, value] of Object.entries(whatFind)) {
                if (!obj.hasOwnProperty(key) || String(obj[key]) !== String(value)) {
                    return;
                }
            }
            store.filteredVisits.push(obj);
        });

        this.hideVisits();

        if (!store.filteredVisits.length) {
            this.showInformText();
        }
    }

    filterByAll() {
        this.inputSpecialist.addEventListener('change', () => {
            this.filterFunction();
        });
        this.inputUrgency.addEventListener('change', () => {
            this.filterFunction();
        });
        this.inputStatus.addEventListener('change', () => {
            this.filterFunction();
        });

        this.inputTitle.addEventListener('input', () => {
            this.filterFunction();
        });
    }

    hideVisits() {
        const visits = document.querySelectorAll('.visit-card-wrapper');

        visits.forEach(item => (item.style.display = 'none'));
        store.filteredVisits.forEach(({ id }) => (document.querySelector(`#_${id}`).style.display = 'block'));
    }

    showInformText() {
        const informBar = document.querySelector('.inform-bar');

        informBar.textContent = 'Cards weren`t found, please, try other parameters';

        setTimeout(() => {
            informBar.textContent = '';
        }, 1500);
    }
}
