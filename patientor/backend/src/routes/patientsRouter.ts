import express, { type Response } from 'express';
const router = express.Router();
import patientsService from '../service/patientsService.ts';
import type { NonSensitiveInfo, Patient } from '../types.ts';
import parseNewPatient from '../utils.ts';

router.get('/hidden', (_req, res: Response<Patient[]>) => {
    const patientsData = patientsService.getPatients();
    res.send(patientsData);
});
router.get('/', (_req, res: Response<NonSensitiveInfo[]>) => {
    const patientsData = patientsService.getFilteredPatients();
    res.send(patientsData);
});
router.post('/', (req, res) => {
    try {
        const newPatient = parseNewPatient(req.body);
        const addedPatient = patientsService.addPatients(newPatient);
        res.json(addedPatient);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';

        if (error instanceof Error) {
            errorMessage += "Error:" + error.message;
        }
        res.status(404).send(errorMessage);
    }


});
export default router;