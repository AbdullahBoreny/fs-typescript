import express, { type Response } from 'express';
const router = express.Router();
import patientsService from '../service/patientsService.ts';
import type { NonSensitiveInfo } from '../../types.ts';
router.get('/', (_req, res: Response<NonSensitiveInfo[]>) => {
    const patientsData = patientsService.getFilteredPatients();
    res.send(patientsData);
});

export default router;