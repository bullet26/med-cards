import {Visit} from "./Visit";

export class VisitDentist extends Visit {
    constructor(id, doctor, title, description, urgency, patient, phone, day, hour, lastVisit) {
        super(id, doctor, title, description, urgency, patient, phone, day, hour);
        this.lastVisit = lastVisit;
        this.specificFields = `<div class="dropdown-item">Last visit: ${this.lastVisit}</div>`
    }
}