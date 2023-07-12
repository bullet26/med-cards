import axios from 'axios';
import store from '../utils/store';

const request = async ({ url, method = 'GET', body, headers } = {}) => {
    const token = window.localStorage.getItem('token') || store.authToken;

    axios.defaults.baseURL = 'https://ajax.test-danit.com/api/v2/cards';
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    if (!!token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        axios.defaults.headers.common['Authorization'] = ``;
    }
    const fetchData = () => {
        if (method === 'GET') return axios.get(url, { params: body });
        else return axios({ url, method, data: body, headers });
    };

    try {
        const { data, status } = await fetchData();

        return { res: data, status };
    } catch ({ response }) {
        return { err: response };
    }
};

export default request;
