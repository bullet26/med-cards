import store from '../utils/store';
import { loader } from '../utils/variables';
import { updateCard } from '../api/useHTTPRequest';
import { showServerError } from '../tools/showServerError';

export class DragAndDrop {
    constructor() {
        this.wrpapper = document.querySelector('.container');
    }

    dragstartHandler(event) {
        event.target.style.opacity = '0.3';
        event.dataTransfer.setData('text', event.target.getAttribute('id'));
        event.effectAllowed = 'move';
    }

    dragoverHandler(event) {
        document.querySelector('.dragover')?.classList.remove('dragover');
        event.target.classList.add('dragover');
        event.preventDefault();
    }

    dropHandler(event) {
        event.preventDefault();
        const id = event.dataTransfer.getData('text');
        event.target.append(document.getElementById(id));
    }

    dragendHandler(event) {
        event.target.style.opacity = '1';
        event.dataTransfer.clearData();
        document.querySelector('.dragover')?.classList.remove('dragover');
        this.updateCardData(event);
    }

    dragEventsListener() {
        console.log(store.visits);
        this.wrpapper.addEventListener('dragstart', e => {
            if (e.target.classList.contains('visit-card-wrapper')) {
                this.dragstartHandler(e);
            }
        });

        this.wrpapper.addEventListener('dragover', e => {
            if (e.target.classList.contains('table-empty-block') && e.target.children.length === 0) {
                this.dragoverHandler(e);
            }
        });

        this.wrpapper.addEventListener('drop', e => {
            this.dropHandler(e);
        });

        this.wrpapper.addEventListener('dragend', e => {
            this.dragendHandler(e);
        });
    }

    updateCardData(event) {
        const id = event.target.getAttribute('id').slice(1);
        const [day, hour] = event.target.parentElement.dataset.date.split('-');
        const dataDate = `${day}-${hour}`;
        const currentElement = store.visits.find(item => String(item.id) === String(id));

        (async () => {
            try {
                loader.show();

                const res = await updateCard({ cardId: id, visiInformation: { ...currentElement, day, hour, dataDate } });

                if (!!res) {
                    loader.hide();
                    currentElement.dataDate = dataDate;
                    currentElement.day = day;
                    currentElement.hour = hour;
                }
            } catch (error) {
                showServerError(error.message);
            }
        })();
    }
}
