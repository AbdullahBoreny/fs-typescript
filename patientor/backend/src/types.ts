import z from "zod";

export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}
export const Gender = {
    Male: 'male',
    Female: 'female',
    Other: 'other'
} as const;
export type Gender = typeof Gender[keyof typeof Gender];

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {
}
export type NewPatient = z.infer<typeof newPatientSchema>;

export const newPatientSchema = z.object({

    name: z.string().normalize().nonempty(),
    dateOfBirth: z.iso.date(),
    ssn: z.string(),
    gender: z.enum(Gender),
    occupation: z.string(),

});
export interface Patient extends NewPatient {
    id: string;
    entries: Entry[];

}
export type NonSensitiveInfo = Omit<Patient, 'ssn' | 'entries'>;
