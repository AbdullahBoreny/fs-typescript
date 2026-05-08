import { Gender } from '../../types';
import { Female, Male } from '@mui/icons-material';
import EntryMapper from './EntryMapper';
import usePatientDetails from '../../customHooks/usePatientDetails';
import AddPatientModal from '../AddPatientModal';
import { useState } from 'react';
import { Button } from '@mui/material';
export default function PatientDetails() {
    const { patient, diagnoses } = usePatientDetails();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    return (
        <>
            <div className='personal-info'>
                <h1>name {patient?.name}</h1>
                <h2>{(patient?.gender === Gender.Male) ?
                    <div>Gender: <Male color='primary' /></div> :
                    <div>Gender: <Female color='secondary' /></div>
                }</h2>

                <h2>ssn: {patient?.ssn}</h2>
                <h2>occupation: {patient?.occupation}</h2>
                <h2>date of birth: {patient?.dateOfBirth}</h2>
            </div>
            <div className='entires-container'>
                {patient?.entries.length !== 0 ? <h1>entires</h1> : null}
                {patient?.entries.map(entry => (
                    <div className='entry' style={{ borderStyle: 'solid', borderColor: "red", borderWidth: '1px' }} key={entry.id}>
                        <EntryMapper entry={entry} />

                        {entry.diagnosisCodes && <h2>diagnoses</h2>}

                        {diagnoses?.map(diagnosis => (
                            entry.diagnosisCodes?.includes(diagnosis.code) &&
                            <li>{diagnosis.code}  {diagnosis.name}</li>
                        ))}


                    </div>
                ))}
            </div>
            <AddPatientModal
                dialogTitle="Add New Patient"
                modalOpen={modalOpen}
                onSubmit={() => console.log('poop')}
                error={error}
                onClose={closeModal}
            />
            <Button variant="contained" onClick={() => openModal()}>
                Add New Patient
            </Button>
        </>
    );
}