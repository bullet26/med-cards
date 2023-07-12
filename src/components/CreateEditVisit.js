import { createCard, updateCard } from '../api/useHTTPRequest';
import { chooseCorrectClass } from '../utils/chooseCorrectClass';
import { selectDoctorBtn } from './Modal/selectDoctor';
import store from '../utils/store';
import { showServerError } from '../tools/showServerError';
import { loader, modalCreateVisit, filters } from '../utils/variables';

export const CreateEditVisit = () => {
    const form = document.querySelector('#select-doctors');

    let filteredData = {};

    modalCreateVisit.clearInputsWhenClose();

    form.addEventListener('submit', event => {
        event.preventDefault();

        const formData = new FormData(form);
        const data = {};

        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }

        filteredData = modalCreateVisit.filteredSpecificFields(data);

        modalCreateVisit.validateInputs({ formData: filteredData });

        if (!store.isValideFormData) {
            return;
        }

        (async () => {
            try {
                if (!selectDoctorBtn.hasAttribute('data-edit')) {
                    modalCreateVisit.hide();
                    loader.show();

                    const res = await createCard(filteredData);

                    if (!!res) {
                        loader.hide();
                        chooseCorrectClass(res);
                        filters.filterFunction();
                    }
                } else {
                    const idCard = +selectDoctorBtn.getAttribute('data-edit');
                    const index = store.visits.findIndex(visit => visit.id === +idCard);

                    modalCreateVisit.hide();
                    loader.show();

                    const res = await updateCard({ cardId: idCard, visiInformation: filteredData });

                    if (!!res) {
                        loader.hide();
                        store.visits[index].editCard(index, res);
                        filters.filterFunction();
                    }
                }
            } catch (error) {
                modalCreateVisit.hide();
                showServerError(error.message);
            } finally {
                modalCreateVisit.clearInput();
            }
        })();
    });
};
