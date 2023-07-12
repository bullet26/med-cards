import {ModalNew} from "./Modal";

export class ModalError extends ModalNew {
    constructor(element) {
        super(element);
    }

    innerErrorText(error) {
        const errorBody = document.querySelector('.error-body');

        errorBody.textContent = error
    }
}