import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import patientsService from '../services/patients';
import { Patient } from '../types';

export default function PatientDetails() {
    const [patient, setPatient] = useState<Patient | null>(null);
    const { id } = useParams();
    console.log(id);

    useEffect(() => {
        if (!id) {
            throw Error('not found');
        }
        patientsService.getById(id)
            .then(data => setPatient(data));
    }, [id]);
    return (
        <>
            <h1>{patient?.name}</h1>
            <h2>{patient?.ssn}</h2>
            <h2>{patient?.occupation}</h2>
            <h2>{patient?.dateOfBirth}</h2>
        </>
    );
}