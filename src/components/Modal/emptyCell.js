import {modalCreateVisit} from "../../utils/variables";

export const emptyCell = () => {
    document.body.addEventListener('click', e => {
        if (e.target.hasAttribute('data-date') && e.target.children.length === 0 && !!localStorage.getItem('token')) {
            const day = document.querySelector('.select-dates');
            const hour = document.querySelector('.select-hours');
            const neededDate = e.target.dataset.date.split('-');

            modalCreateVisit.show()
            day.value = neededDate[0];
            hour.value = neededDate[1];
        }
    })
}