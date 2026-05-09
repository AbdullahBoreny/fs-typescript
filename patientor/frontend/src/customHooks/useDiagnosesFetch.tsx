import { useEffect, useState } from "react";
import patientsService from '../services/patients';

import { Diagnosis } from "../types";


export default function useDiagnosesFetch() {
    const [diagnoses, setDiagnoses] = useState<Diagnosis[] | null>(null);

    useEffect(() => {
        patientsService.getDiagnoses()
            .then(data => setDiagnoses(data));
    }, []);


    return { diagnoses, setDiagnoses };
}