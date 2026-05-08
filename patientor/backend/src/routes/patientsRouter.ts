import express, { type Response, type Request } from 'express';
const router = express.Router();
import * as middleWares from '../utils.ts';

import patientsService from '../service/patientsService.ts';
import { type NewPatient, type NonSensitiveInfo, type Patient } from '../../types/types.ts';
import type { Entry, EntryWithoutId } from '../../types/EntriesTypes.ts';


router.get('/hidden', (_req, res: Response<Patient[]>) => {
    const patientsData = patientsService.getPatients();
    res.json(patientsData);
});
router.get('/', (_req, res: Response<NonSensitiveInfo[]>) => {
    const patientsData = patientsService.getFilteredPatients();
    res.json(patientsData);
});
router.post('/', middleWares.newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const addedPatient = patientsService.addPatients(req.body);
    res.json(addedPatient);

});
router.get('/:id', (req: Request<{ id: string; }, unknown, unknown, unknown>, res: Response<Patient>) => {
    const { id } = req.params;
    console.log(id);
    const patientInfo = patientsService.getById(id);
    res.json(patientInfo);
});
router.post('/:id/entries', middleWares.newEntryParser, (req: Request<{ id: string; }, unknown, EntryWithoutId, unknown>, res: Response<Entry>) => {
    const { id } = req.params;
    console.log(id);
    const patientInfo = patientsService.addEntry(id, req.body);
    console.log(patientInfo);
    res.json(patientInfo);
});
router.use(middleWares.errorMiddleware);
export default router;
