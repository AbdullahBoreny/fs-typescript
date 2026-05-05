import type { newPatient } from './types.ts';
import { Gender } from './types.ts';


const parseNewPatient = (object: unknown): newPatient => {
    if (!object || typeof object !== 'object') {
        throw new Error('incorrect or missing data');
    }
    if ('gender' in object
        && 'name' in object
        && 'ssn' in object
        && 'dateOfBirth' in object
        && 'occupation' in object
    ) {
        const newEntry: newPatient = {
            
            name: parseName(object.name),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth),
            ssn: parseSSN(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
        };

        return newEntry;
    }
    throw new Error('Incorrect data: some fields are missing');

};
const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error('INCORRECT OR MISSING Visibility' + gender);
    }
    return gender;
};
const isGender = (param: string): param is Gender => {
    return (Object.values(Gender) as string[]).includes(param);
};
const parseOccupation = (occupation: unknown): string => {
    if (!isString(occupation)) {
        throw new Error('incorrect or missing' + occupation);
    }
    return occupation;
};
const parseSSN = (ssn: unknown): string => {
    if (!isString(ssn)) {
        throw new Error('incorrect or missing' + ssn);
    }
    return ssn;
};

const parseName = (name: unknown): string => {
    if (!isString(name)) {
        throw new Error('Incorrect or missing name');
    }

    return name;
};
const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseDateOfBirth = (date: unknown): string => {
    if (!isString(date) || !date || !isDate(date)) {
        throw new Error('incorrect or missing date' + date);
    }
    return date;
};
const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};
export default parseNewPatient;