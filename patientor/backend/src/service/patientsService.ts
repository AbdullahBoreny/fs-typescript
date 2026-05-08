import patientsEntries from "../../data/patients.ts";
import type { Entry, EntryWithoutId } from "../../types/EntriesTypes.ts";
import { type Patient, type NonSensitiveInfo, type NewPatient } from "../../types/types.ts";
import { v1 as uuid } from 'uuid';
import * as middleWares from '../utils.ts';

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
    return found;
};

const addEntry = (id: string, entry: EntryWithoutId): Entry => {


    const foundPatient = patientsEntries.find(patient => patient.id === id);
    if (!foundPatient) {
        throw new Error('patient not found' + foundPatient);
    }

    const foundEntry = middleWares.parseEntry(entry);
    if (!foundEntry) {
        throw new Error('no type match this entry');
    }
    foundPatient.entries.push(foundEntry);
    return foundEntry;

};
export default {
    addEntry,
    getById,
    addPatients,
    getPatients,
    getFilteredPatients
};
