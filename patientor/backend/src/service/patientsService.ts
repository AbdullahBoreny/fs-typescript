import patientsEntries from "../../data/patients.ts";
import type { Patient, NonSensitiveInfo } from "../../types.ts";

const getPatients = (): Patient[] => {
    return patientsEntries;
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
    getPatients,
    getFilteredPatients
};