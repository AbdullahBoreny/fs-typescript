import express, { type Response, type NextFunction, type Request } from 'express';
const router = express.Router();
import z from 'zod';

import patientsService from '../service/patientsService.ts';
import { type NewPatient, newPatientSchema, type NonSensitiveInfo, type Patient } from '../types.ts';

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        newPatientSchema.parse(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};
const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
    if (error instanceof z.ZodError) {
        res.status(400).send({ error: error.issues });
    } else {
        next(error);
    }
};
router.get('/hidden', (_req, res: Response<Patient[]>) => {
    const patientsData = patientsService.getPatients();
    res.send(patientsData);
});
router.get('/', (_req, res: Response<NonSensitiveInfo[]>) => {
    const patientsData = patientsService.getFilteredPatients();
    res.send(patientsData);
});
router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const addedPatient = patientsService.addPatients(req.body);
    res.json(addedPatient);

});
router.use(errorMiddleware);
export default router;