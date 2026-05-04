import express from 'express';
import diagnoseService from '../service/diagnoseService.ts';
const router = express.Router();
router.get('/', (_req, res) => {
    const diagnoses = diagnoseService.getDiagnoses();
    res.send(diagnoses);
});

export default router;