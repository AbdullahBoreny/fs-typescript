import { useState } from "react";
import axios from 'axios';
import { PatientFormValues, Patient } from "../types";


import patientService from "../services/patients";
interface PatientProps {
    patients: Patient[];
    setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
}

export default function usePatientModal({ patients, setPatients }: PatientProps) {

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewPatient = async (values: PatientFormValues) => {
        try {
            const patient = await patientService.create(values);
            setPatients(patients.concat(patient));
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
    return { modalOpen, error, setError, openModal, submitNewPatient, closeModal };
}