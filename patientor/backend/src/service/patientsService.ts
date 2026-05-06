import patientsEntries from "../../data/patients.ts";
import type { Entry } from "../types.ts";
import { type Patient, type NonSensitiveInfo, type NewPatient } from "../types.ts";
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
    return patientsEntries;
};
const addPatients = (patient: NewPatient): Patient => {

    const newPatient = {
        entries: [],
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
        occupation,
    }));
};
const getById = (id: string): Patient => {
    const found = patientsEntries.find(patient => patient.id === id);
    if (!found) {
        throw new Error('not found');
    }
    found["entries"] = new Array<Entry>;
    return found;
};
export default {
    getById,
    addPatients,
    getPatients,
    getFilteredPatients
};