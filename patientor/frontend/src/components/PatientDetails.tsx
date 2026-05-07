import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import patientsService from '../services/patients';
import { Gender, Patient } from '../types';
import { Female, Male } from '@mui/icons-material';

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
            <h1>name {patient?.name}</h1>
            <h2>{(patient?.gender === Gender.Male) ?
                <div>Gender: <Male color='primary' /></div> :
                <div>Gender: <Female color='secondary' /></div>
            }</h2>
            <h2>ssn: {patient?.ssn}</h2>
            <h2>occupation: {patient?.occupation}</h2>
            <h2>date of birth: {patient?.dateOfBirth}</h2>
        </>
    );
}