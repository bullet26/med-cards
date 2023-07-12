import {getToken, getAllCards} from '../api/useHTTPRequest';
import {chooseCorrectClass} from '../utils/chooseCorrectClass';
import {showServerError} from '../tools/showServerError';
import {loader, modalSingIn} from '../utils/variables';

export const AuthenticationUser = () => {
    const form = document.querySelector('#signin');

    const checkbox = document.querySelector('#rememberme');
    const visiBtn = document.querySelector('.create-visit__btn');
    const loginBtn = document.querySelector('.login__btn');
    const filter = document.querySelector('.filter');
    const calendar = document.querySelector('.calendar');
    const calendarWrapper = document.querySelector('.calendar-wrapper')

    const showVisiBtn = () => {
        visiBtn.style.display = 'inline-block';
        loginBtn.style.display = 'none';
        filter.style.display = 'block';
        calendar.style.display = 'block';
        calendarWrapper.style.backgroundImage = 'none';
    };

    if (!!localStorage.getItem('token')) {
        showVisiBtn();

        loader.show();
        getAllCards().then(res =>
            res.forEach(obj => {
                loader.hide();
                chooseCorrectClass(obj);
            })
        );
    }

    modalSingIn.clearInputsWhenClose();

    form.addEventListener('submit', event => {
        event.preventDefault();

        if (modalSingIn.validatePassword()) {
            const formData = new FormData(form);
            const data = {};

            for (const [key, value] of formData.entries()) {
                data[key] = value;
            }

            (async () => {
                try {
                    modalSingIn.hide();
                    loader.show();

                    await getToken({...data, isAuth: checkbox.checked});

                    showVisiBtn();

                    const res = await getAllCards();

                    res.forEach(obj => {
                        chooseCorrectClass(obj);
                    });

                    loader.hide();
                } catch (error) {
                    modalSingIn.hide();
                    loader.hide();
                    showServerError(error.message);
                } finally {
                    modalSingIn.clearInput();
                }
            })();
        }
    });
};
