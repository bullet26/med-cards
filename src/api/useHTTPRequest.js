import request from './request';
import store from '../utils/store';

const getToken = async ({ email, password, isAuth }) => {
    const { res, err } = await request({ url: '/login', method: 'POST', body: { email, password } });

    if (!!res) {
        if (!!isAuth) {
            window.localStorage.setItem('token', res);
        } else {
            store.authToken = res;
        }
    } else {
        throw new Error(`It isn't authorised user: ${err.data}`);
    }
};

const getAllCards = async () => {
    const { res, err } = await request();

    if (!!res) {
        return res;
    } else {
        throw new Error(`Couldn't get cards: ${err.data}`);
    }
};

const createCard = async visiInformation => {
    const { res, err } = await request({ method: 'POST', body: visiInformation });

    if (!!res) {
        return res;
    } else {
        throw new Error(`Couldn't create card: ${err.data}`);
    }
};

const updateCard = async ({ cardId, visiInformation }) => {
    const { res, err } = await request({ method: 'PUT', url: `/${cardId}`, body: visiInformation });

    if (!!res) {
        return res;
    } else {
        throw new Error(`Couldn't update card: ${err.data}`);
    }
};

const deleteCard = async cardId => {
    const { status, err } = await request({ method: 'DELETE', url: `/${cardId}` });

    if (!!status) {
        return status;
    } else {
        throw new Error(`Couldn't delete card: ${err.data}`);
    }
};

export { getToken, getAllCards, createCard, updateCard, deleteCard };
