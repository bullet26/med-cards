import { mainCreateVisitBtn } from '../tools/mainCrateVisitBtn';
import { selectDoctor } from './Modal/selectDoctor';
import { selectDate } from './Modal/selectDate';
import { AuthenticationUser } from './AuthenticationUser';
import { doneVisit } from './Visit/doneVisit';
import { DeleteVisit } from './DeleteVisit';
import { CreateEditVisit } from './CreateEditVisit';
import { EditVisit } from './Visit/EditVisit';
import { filters, dragAndDrop } from '../utils/variables';
import { emptyCell } from './Modal/emptyCell';

mainCreateVisitBtn();
selectDoctor();
selectDate();
AuthenticationUser();
CreateEditVisit();
emptyCell();

doneVisit();
DeleteVisit();
EditVisit();

filters.showFilters();
filters.filterByAll();

dragAndDrop.dragEventsListener();
