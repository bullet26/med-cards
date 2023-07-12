import {Visit} from "./Visit";

export class VisitTherapist extends Visit {
    constructor(id, doctor, title, description, urgency, patient, phone, day, hour, therapistAge) {
        super(id, doctor, title, description, urgency, patient, phone, day, hour);
        this.therapistAge = therapistAge;
        this.specificFields = `<div class="dropdown-item">Age: ${this.therapistAge}</div>`
    }
}