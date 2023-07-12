import {Modal} from 'bootstrap';

export class ModalNew extends Modal {
    constructor(element) {
        super(element);
        this._element = element;
        this.idForm = '';
        this.idModal = '';
    }

    focusInput(input) {
        this._element.addEventListener('shown.bs.modal', () => {
            input.focus();
        });
    }

    clearInput() {
        const radio = document.querySelectorAll('.form-check-input');
        const inputs = document.querySelector(this.idForm).querySelectorAll('input');
        const textArea = document.querySelector('textarea');
        const selects = document.querySelector(this.idForm).querySelectorAll('select');

        inputs.forEach(input => {
            if (!input.classList.contains('form-check-input')) input.value = ''
        });

        textArea.value = '';

        selects.forEach(select => (select.selectedIndex = 0));

        radio.forEach(input => (input.checked = false));
        radio[0].checked = true;
    }

    clearInputsWhenClose() {
        const modalWrapper = document.querySelector(this.idModal);
        const cross = document.querySelector(this.idModal).querySelector('.btn-close');

        modalWrapper.addEventListener('click', event => {
            if (event.target.classList.contains('modal')) {
                this.clearInput()
            }
        });

        document.addEventListener('keydown', event => {
            if (event.code === 'Escape') {
                this.clearInput()
            }
        });

        cross.addEventListener('click', () => {
            this.clearInput()
        });
    }

    showError(elem, message, position = 'afterbegin', time = 2500) {
        elem.insertAdjacentHTML(position, `<div class="msg">${message}</div>`);
        const msg = document.querySelector('.msg');

        setTimeout(() => {
            msg.remove();
        }, time)
    }
}