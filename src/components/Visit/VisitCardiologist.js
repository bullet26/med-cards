import {Visit} from "./Visit";

export class VisitCardiologist extends Visit {
    constructor(id, doctor, title, description, urgency, patient, phone, day, hour, pressure, massIndex, diseases, cardiologistAge) {
        super(id, doctor, title, description, urgency, patient, phone, day, hour);
        this.pressure = pressure;
        this.massIndex = massIndex;
        this.diseases = diseases;
        this.cardiologistAge = cardiologistAge;
        this.specificFields = `<div class="dropdown-item">Normal pressure: ${this.pressure}</div>
                                    <div class="dropdown-item">Body mass index: ${this.massIndex}</div>
                                    <div class="dropdown-item">Previous diseases of the cardiovascular system: ${this.diseases}</div>
                                    <div class="dropdown-item">Age: ${this.cardiologistAge}</div>`
    }
}