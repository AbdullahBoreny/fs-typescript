import { Dispatch, SetStateAction, useState } from "react";
import axios from 'axios';
import patientService from "../../services/patients";
import { EntryWithoutId } from "../../entryTypes";
import usePatientDetails from "../../customHooks/usePatientDetails";
import { Patient } from "../../types";

export default function useEntryModal(setPatient: Dispatch<SetStateAction<Patient | undefined>>, patient: Patient | undefined) {
    const { id } = usePatientDetails();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewEntry = async (entryData: EntryWithoutId) => {
        try {
            if (!id || !patient) {

                throw new Error(id + 'not found');
            }
            console.log(id);
            const entry = await patientService.addEntry(id, entryData);

            setPatient({ ...patient, entries: patient.entries.concat(entry) });

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