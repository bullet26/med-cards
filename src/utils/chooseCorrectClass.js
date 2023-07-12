import { VisitDentist } from '../components/Visit/VisitDentist';
import { VisitCardiologist } from '../components/Visit/VisitCardiologist';
import { VisitTherapist } from '../components/Visit/VisitTherapist';

export const chooseCorrectClass = obj => {
    if (obj.doctor === 'dentist') {
        const visit = new VisitDentist(obj.id, obj.doctor, obj.title, obj.description, obj.urgency, obj.patient, obj.phone, obj.day, obj.hour, obj.lastVisit);
        visit.renderCard(visit);
    }

    if (obj.doctor === 'cardiologist') {
        const visit = new VisitCardiologist(
            obj.id,
            obj.doctor,
            obj.title,
            obj.description,
            obj.urgency,
            obj.patient,
            obj.phone,
            obj.day,
            obj.hour,
            obj.pressure,
            obj.massIndex,
            obj.diseases,
            obj.cardiologistAge
        );
        visit.renderCard(visit);
    }

    if (obj.doctor === 'therapist') {
        const visit = new VisitTherapist(obj.id, obj.doctor, obj.title, obj.description, obj.urgency, obj.patient, obj.phone, obj.day, obj.hour, obj.therapistAge);
        visit.renderCard(visit);
    }
};
