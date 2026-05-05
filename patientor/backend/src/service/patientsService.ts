import patientsEntries from "../../data/patients.ts";
import type { Patient, NonSensitiveInfo, NewPatient } from "../types.ts";
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
    return patientsEntries;
};
const addPatients = (patient: NewPatient): Patient => {

    const newPatient = {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        id: uuid(),
        ...patient
    };
    patientsEntries.push(newPatient);
    return newPatient;
};
const getFilteredPatients = (): NonSensitiveInfo[] => {
    return patientsEntries.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

export default {
    addPatients,
    getPatients,
    getFilteredPatients
};