import store from '../../utils/store';
import { filters } from '../../utils/variables';

export const doneVisit = () => {
    document.body.addEventListener('click', e => {
        if (e.target.classList.contains('check')) {
            const visitWrapper = e.target.closest('.visit-card-wrapper');
            const id = visitWrapper.getAttribute('id').slice(1);

            visitWrapper.classList.toggle('bg-info-subtle');

            store.visits.forEach(visit => {
                if (String(visit.id) === String(id)) {
                    visit.changeStatus(visitWrapper);
                }

                filters.filterFunction();
            });
        }
    });
};
