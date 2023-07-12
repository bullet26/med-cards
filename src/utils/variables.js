import { ModalSingIn } from '../components/Modal/ModalSingIn';
import store from './store';
import { ModalCreateVisit } from '../components/Modal/ModalCreateVisit';
import { ModalError } from '../components/Modal/ModalError';
import { Filters } from '../components/Filters';
import { Loader } from '../components/UI/Loader';
import { DragAndDrop } from '../components/DragAndDrop';

export const modalSingIn = new ModalSingIn(document.getElementById('modal-sign-in'));
store.modal.push(modalSingIn);
modalSingIn.focusInput(document.getElementById('input-email'));

export const modalCreateVisit = new ModalCreateVisit(document.getElementById('modal-create-visit'));
store.modal.push(modalCreateVisit);

export const errorModal = new ModalError(document.querySelector('.error-modal'));
store.modal.push(errorModal);

export const filters = new Filters();

export const loader = new Loader(document.querySelector('.lp'));

export const dragAndDrop = new DragAndDrop();
