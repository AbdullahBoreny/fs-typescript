import { Gender } from '../../types';
import { Female, Male } from '@mui/icons-material';
import EntryMapper from '../EntryDetailsPage/EntryMapper';
import usePatientDetails from '../../customHooks/usePatientDetails';
import { Button } from '@mui/material';
import AddEntryModal from '.';
import useEntryModal from './useEntryModal';
export default function PatientDetails() {


    const { patient, diagnoses, setPatient } = usePatientDetails();
    const { openModal, submitNewEntry, error, closeModal, modalOpen } = useEntryModal(setPatient, patient);
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
            <AddEntryModal
                dialogTitle="Add New Entry"
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
            />
            <Button variant="contained" onClick={() => openModal()}>
                Add New Entry
            </Button>
        </>
    );
}