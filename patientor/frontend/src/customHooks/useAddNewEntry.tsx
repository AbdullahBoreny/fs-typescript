import { Dispatch, SetStateAction, useState } from "react";
import axios from 'axios';
import patientService from "../services/patients";
import { EntryWithoutId } from "../entryTypes";
import { Patient } from "../types";


export default function useAddNewEntry(patients: Patient[], setPatients: Dispatch<SetStateAction<Patient[]>>, id: string | undefined) {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>();
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

            setPatients(prev => [
                ...prev.filter(p => p.id !== patient.id),
                { ...patient, entries: patient.entries.concat(entry) }
            ]);
            console.log(patients);
            setModalOpen(false);
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                if (e?.response?.data && typeof e?.response?.data === "string") {
                    const message = e.response.data.replace('Something went wrong. Error: ', '');
                    console.error(message);
                    setError(message);
                } else {
                    setError("Unrecognized axios error");
                }
            } else {
                console.error("Unknown error", e);
                setError("Unknown error");
            }
        }
    };
    return { modalOpen, error, setError, openModal, submitNewEntry, closeModal };
}