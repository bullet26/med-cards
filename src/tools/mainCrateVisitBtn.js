import { selectDoctorBtn } from '../components/Modal/selectDoctor';

export const mainCreateVisitBtn = () => {
    const mainBtn = document.querySelector('.create-visit__btn');

    mainBtn.addEventListener('click', () => {
        selectDoctorBtn.removeAttribute('data-edit');
    });
};
