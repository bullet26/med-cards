import {tooltip} from "../UI/tooltip";
import store from '../../utils/store';
import {chooseCorrectClass} from "../../utils/chooseCorrectClass";

export class Visit {
    constructor(id, doctor, title, description, urgency, patient, phone, day, hour) {
        this.id = id;
        this.doctor = doctor;
        this.title = title;
        this.description = description;
        this.urgency = urgency;
        this.patient = patient;
        this.phone = phone;
        this.day = day;
        this.hour = hour;
        this.status = false;
        this.specificFields = ''
        this.dataDate = `${this.day}-${this.hour}`;
    }

    renderCard(visit) {
        const card = `<div id="_${this.id}" class="visit-card-wrapper bg-info-subtle text-start text-black done-visit" draggable="true">
                            <span class="card-el-${this.urgency}"></span>
                            <div class="pencil" data-bs-toggle="modal" data-bs-target="#modal-create-visit"><i class="bi bi-pencil-square" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Edit visit"></i></div>
                            <i class="bi bi-trash3 trash" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Delete visit"></i>
                            <i class="bi bi-check2-square check" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Done visit"></i>
                            <div class="visit-patient fw-bold text-primary-emphasis">${this.patient}</div>
                            <div class="text-black-50 visit-doctor">${this.doctor}</div>
                            <div class="dropdown-center">
                                <button class="btn btn-outline-light text-primary-emphasis dropdown-toggle btn-sm visit-btn mt-1" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    See more
                                </button>
                                <div class="dropdown-menu bg-light text-black">
                                    <div class="dropdown-item">${this.title}</div>
                                    <div class="dropdown-item text-black-50">${this.description}</div>
                                    <div class="dropdown-item">Urgency: ${this.urgency}</div>
                                    <div class="dropdown-item">Phone number: ${this.phone}</div>
                                    ${this.specificFields}
                                </div>
                            </div>
                        </div>`
        const place = document.querySelector(`[data-date="${this.dataDate}"]`);

        place.insertAdjacentHTML('beforeend', card);
        tooltip();
        store.visits.push(visit);
    }

    deleteCard (index) {
        const tooltip = document.querySelector('.tooltip');
        const neededCard = document.getElementById(`_${this.id}`);

        if(!!tooltip){
            tooltip.remove();
        }

        store.visits.splice(index, 1);
        neededCard.remove();
    }

    editCard (index, res) {
        store.visits[index].deleteCard(index);
        chooseCorrectClass(res);
    }

    changeStatus (el) {
        this.status = !el.classList.contains('bg-info-subtle');
    }
}