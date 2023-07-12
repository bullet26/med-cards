const baseOptions = document.querySelector('.base-options');
const cardiologistOptions = document.querySelector('.cardiologist-options');
const dentistOptions = document.querySelector('.dentist-options');
const therapistOptions = document.querySelector('.therapist-options');

export const allOptions = [baseOptions, cardiologistOptions, dentistOptions, therapistOptions];
export const selectDoctorBtn = document.querySelector('.select-doctor-btn');

export const displayOptions = (btn, ...options) => {
    btn.removeAttribute('disabled');

    options.forEach(el => {
        el.style.display = 'block';
    });
}

export const selectDoctor = () => {
    const selectDoctors = document.querySelector('.select-doctors');

    selectDoctors.addEventListener('change', e => {
        allOptions.forEach(opt => (opt.style.display = 'none'));
        selectDoctorBtn.setAttribute('disabled', '');

        if (e.target.value === 'cardiologist') {
            displayOptions(selectDoctorBtn, allOptions[0], allOptions[1]);
        }

        if (e.target.value === 'dentist') {
            displayOptions(selectDoctorBtn, allOptions[0], allOptions[2]);
        }

        if (e.target.value === 'therapist') {
            displayOptions(selectDoctorBtn, allOptions[0], allOptions[3]);
        }
    });
};


