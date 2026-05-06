import express, { type Response, type NextFunction, type Request } from 'express';
const router = express.Router();
import z from 'zod';
interface Foo {
    id: string;
}
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
        res.status(400).json({ error: error.issues });
    } else {
        next(error);
    }
};
router.get('/hidden', (_req, res: Response<Patient[]>) => {
    const patientsData = patientsService.getPatients();
    res.json(patientsData);
});
router.get('/', (_req, res: Response<NonSensitiveInfo[]>) => {
    const patientsData = patientsService.getFilteredPatients();
    res.json(patientsData);
});
router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const addedPatient = patientsService.addPatients(req.body);
    res.json(addedPatient);

});
router.get('/:id', (req: Request<Foo, unknown, unknown, unknown>, res: Response<Patient>) => {
    const { id } = req.params;
    console.log(id);
    const patientInfo = patientsService.getById(id);
    res.json(patientInfo);
});
router.use(errorMiddleware);
export default router;
