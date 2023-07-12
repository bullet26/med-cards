import {ModalNew} from "./Modal";

export class ModalSingIn extends ModalNew {
    constructor(element) {
        super(element);
        this.idForm = '#signin';
        this.idModal = '#modal-sign-in';
        this.idPassword = '#floatingPassword';
    }

    validatePassword () {
        const form = document.querySelector(this.idForm);
        const inputPassword = form.querySelector(this.idPassword);

        if ( !/[a-zа-я]/.test(inputPassword.value) ||
            !/[A-ZА-Я]/.test(inputPassword.value) ||
            !/[0-9]/.test(inputPassword.value) ||
            !/[!@#&\?\*\$]+/.test(inputPassword.value) ||
            inputPassword.value.length < 8) {
            this.showError(form, 'The password must contain at least one: <br> Uppercase letter, lowercase letter, <br> digit and special character');
        } else {
            return true;
        }
    }
}