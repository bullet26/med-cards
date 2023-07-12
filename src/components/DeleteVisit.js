import store from '../utils/store';
import { deleteCard } from '../api/useHTTPRequest';
import { showServerError } from '../tools/showServerError';
import { loader } from '../utils/variables';

export const DeleteVisit = () => {
    document.body.addEventListener('click', e => {
        if (e.target.classList.contains('trash')) {
            const id = e.target.closest('.visit-card-wrapper').getAttribute('id').slice(1);
            const index = store.visits.findIndex(visit => visit.id === +id);

            (async () => {
                try {
                    loader.show();

                    await deleteCard(id);

                    store.visits[index].deleteCard(index);
                    loader.hide();
                } catch (error) {
                    loader.hide();
                    showServerError(error.message);
                }
            })();
        }
    });
};
