import { Dispatch, SetStateAction, useState } from "react";
import axios from 'axios';
import patientService from "../services/patients";
import { EntryWithoutId } from "../entryTypes";
import { Patient } from "../types";
import { ErrorMessage } from "../components/AddEntryModel";


export default function useAddNewEntry(setError: Dispatch<SetStateAction<ErrorMessage | undefined>>, patients: Patient[], setPatients: Dispatch<SetStateAction<Patient[]>>, id: string | undefined) {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewEntry = async (entryData: EntryWithoutId) => {
        try {
            const patient = patients.find(patient => patient.id === id);
            if (!patient) {
                throw new Error('not found');
            }
            const entry = await patientService.addEntry(patient.id, entryData);
            const patientsWithoutId = patients.filter(p => p.id !== patient.id);
            setPatients([
                ...patientsWithoutId,
                { ...patient, entries: patient.entries.concat(entry) }
            ]);

            setModalOpen(false);
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {

                console.error(e.response?.data);
                setError(e.response?.data);
            }
        }
    };
    return { modalOpen, setError, openModal, submitNewEntry, closeModal };
}