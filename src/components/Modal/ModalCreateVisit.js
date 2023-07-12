import { ModalNew } from './Modal';
import { allOptions, selectDoctorBtn } from '../Modal/selectDoctor';
import store from '../../utils/store';

export class ModalCreateVisit extends ModalNew {
    constructor(element) {
        super(element);
        this.idForm = '#select-doctors';
        this.idModal = '#modal-create-visit';
    }

    clearInput() {
        super.clearInput();

        allOptions.forEach(opt => (opt.style.display = 'none'));
        selectDoctorBtn.setAttribute('disabled', '');
    }

    validateInputs({ formData }) {
        store.isValideFormData = true;
        let allErrorsMsg = [];

        const validateRules = {
            patient: /^[A-ZА-Яa-zа-я]{2,}/,
            phone: /\d{10,13}/,
            lastVisit: /^[0123]\d{1}(\.)[01]\d{1}(\.)[12][902]\d{2}/,
            pressure: /\d{3}.\d{2,3}/,
            massIndex: /\d{2}/,
            cardiologistAge: /^1?\d{1,2}$/,
            therapistAge: /^1?\d{1,2}$/,
            diseases: /\w{5,}/,
            hour: /\d{2}/,
            day: /\d{2}/,
        };

        const validateMessages = {
            patient: 'Please enter correct name: min 2 letters',
            phone: 'Please enter correct phone number: 098 111 22 33',
            lastVisit: 'Please enter correct last visit date: dd.mm.yyyy',
            pressure: 'Please enter correct pressure',
            massIndex: 'Please enter correct mass index',
            cardiologistAge: 'Please enter correct age',
            therapistAge: 'Please enter correct age',
            diseases: 'Please write diseases in field',
            hour: 'Please select time for your visit',
            day: 'Please select day for your visit',
        };

        Object.entries(formData).forEach(([key, value]) => {
            if (validateRules.hasOwnProperty(key)) {
                if (!validateRules[key].test(value)) {
                    allErrorsMsg.push(validateMessages[key]);
                }
            }
        });

        if (allErrorsMsg.length > 0) {
            const message = allErrorsMsg.map(item => `<span>${item}</span><br>`);

            this.showError(selectDoctorBtn, message.join(''), 'beforebegin', 6000);
            store.isValideFormData = false;
        } else {
            console.log('all inputs are valid');
        }
    }

    filteredSpecificFields(data) {
        let { doctor, title, description, urgency, patient, phone, day, hour, lastVisit, pressure, massIndex, diseases, cardiologistAge, therapistAge } = data;
        phone = phone.replace(/[\s|-]/g, '');
        lastVisit = lastVisit.replace(/[,|-]/g, '.');
        const filteredData = { doctor, title, description, urgency, patient, phone, day, hour };

        if (data['doctor'] === 'dentist') {
            return { ...filteredData, lastVisit };
        } else if (data['doctor'] === 'cardiologist') {
            return { ...filteredData, pressure, massIndex, diseases, cardiologistAge };
        } else if (data['doctor'] === 'therapist') {
            return { ...filteredData, therapistAge };
        }
    }
}
