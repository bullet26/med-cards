export const selectDate = () => {
    const selectDates = document.querySelector('.select-dates');
    const allHours = Array.from(document.querySelectorAll('[data-date]'));
    const selectHours = Array.from(document.querySelector('.select-hours').options);

    selectDates.addEventListener('change', e => {
        const neededHours = allHours.filter(el => el.dataset.date.includes(e.target.value));
        const availableHoursArr = neededHours.filter(el => el.children.length === 0);
        const availableHours = [];

        availableHoursArr.forEach(el => {
            availableHours.push(el.dataset.date.slice(3));
        });

        selectHours.forEach(el => {
            if (availableHours.includes(el.value)) {
                el.style.display = 'block';
            } else {
                el.style.display = 'none';
            }
        });
    });
};
