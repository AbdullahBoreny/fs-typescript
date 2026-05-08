import { useEffect, useState } from "react";
import patientsService from '../services/patients';

import { useParams } from "react-router-dom";
import { Diagnosis, Patient } from "../types";

export default function usePatientDetails() {
    const [patient, setPatient] = useState<Patient>();
    const [diagnoses, setDiagnoses] = useState<Diagnosis[] | null>(null);
    const { id } = useParams();


    useEffect(() => {
        patientsService.getDiagnosis()
            .then(data => setDiagnoses(data));
    }, []);
    useEffect(() => {
        if (!id) {
            throw Error('not found');
        }
        patientsService.getById(id)
            .then(data => setPatient(data));
    }, [id]);
    return { patient, diagnoses, id, setPatient };
}