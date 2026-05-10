import { Gender, Patient } from '../../types';
import { Female, Male } from '@mui/icons-material';
import EntryMapper from './EntryMapper';
import usePatientDetails from '../../customHooks/useDiagnosesFetch';
import { Button } from '@mui/material';
import AddEntryModal, { ErrorMessage } from '../AddEntryModel';
import { useParams } from 'react-router-dom';
import useAddNewEntry from '../../customHooks/useAddNewEntry';
interface Props {
    patients: Patient[];
    setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
    error: ErrorMessage | undefined;
    setError: React.Dispatch<React.SetStateAction<ErrorMessage | undefined>>;

}

export default function PatientDetails({ patients, setPatients, error, setError }: Props) {
    const { diagnoses } = usePatientDetails();
    const { id } = useParams();


    const { openModal, submitNewEntry, closeModal, modalOpen } = useAddNewEntry(setError, patients, setPatients, id,);
    const patient = patients.find(patient => patient.id === id);
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
                <h1>entires</h1>
                {patient?.entries.map(entry => (
                    <div className='entry' style={{ borderStyle: 'solid', borderColor: "red", borderWidth: '1px' }} key={entry.id}>
                        <EntryMapper entry={entry} />

                        {entry.diagnosisCodes && <h2>Diagnoses:</h2>}

                        {diagnoses?.map(diagnosis => (
                            entry.diagnosisCodes?.includes(diagnosis.code) &&
                            <h3 key={diagnosis.code}>{diagnosis.code} - {diagnosis.name}</h3>
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