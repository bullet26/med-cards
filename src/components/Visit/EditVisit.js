import store from '../../utils/store';
import { allOptions, displayOptions, selectDoctorBtn } from '../Modal/selectDoctor';

export const EditVisit = () => {
    document.body.addEventListener('click', e => {
        const names = document.querySelector('#select-doctors').querySelectorAll('[name]');

        if (e.target.classList.contains('bi-pencil-square')) {
            const id = e.target.closest('.visit-card-wrapper').getAttribute('id').slice(1);
            selectDoctorBtn.setAttribute('data-edit', `${id}`);
            const neededVisit = store.visits.filter(visit => visit.id === +id)[0];

            if (neededVisit.doctor === 'cardiologist') {
                displayOptions(selectDoctorBtn, allOptions[0], allOptions[1]);
            }
            if (neededVisit.doctor === 'dentist') {
                displayOptions(selectDoctorBtn, allOptions[0], allOptions[2]);
            }
            if (neededVisit.doctor === 'therapist') {
                displayOptions(selectDoctorBtn, allOptions[0], allOptions[3]);
            }

            names.forEach(name => {
                for (const key in neededVisit) {
                    if (name.name === key && !name.classList.contains('form-check-input')) {
                        name.value = neededVisit[key];
                    }

                    if (name.value === neededVisit.urgency) {
                        const allRadio = document.querySelectorAll('.form-check-input');

                        allRadio.forEach(el => (el.checked = false));
                        name.checked = true;
                    }
                }
            });
        }
    });
};
