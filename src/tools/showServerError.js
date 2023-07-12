import { errorModal } from '../utils/variables';

export const showServerError = error => {
    errorModal.innerErrorText(error);
    errorModal.show();

    setTimeout(() => {
        errorModal.hide();
        errorModal.innerErrorText('');
    }, 5000);
};
