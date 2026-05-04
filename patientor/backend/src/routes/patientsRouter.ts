import express from 'express';
const router = express.Router();
import patientsService from '../service/patientsService.ts';
router.get('/', (_req, res) => {
    const patientsData = patientsService.getFilteredPatients();
    res.send(patientsData);
});

export default router;