import type { Diagnosis } from "./types.ts";

export interface BaseEntry {
    id: string;
    date?: string;
    specialist?: string;
    type?: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
    description?: string;
}
export const HealthCheckRating = {
    Healthy: 0,
    LowRisk: 1,
    HighRisk: 2,
    CriticalRisk: 3
} as const;
export type HealthCheckRating = typeof HealthCheckRating[keyof typeof HealthCheckRating];

export interface HealthCheckEntry extends BaseEntry {
    type?: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}
interface SickLeave {
    startDate?: string;
    endDate?: string;
}
export interface OccupationalHealthcareEntry extends BaseEntry {
    employerName?: string;
    type?: "OccupationalHealthcare";
    sickLeave?: SickLeave;
}
interface Discharge {
    date: string;
    criteria: string,
}
export interface HospitalEntry extends BaseEntry {
    type?: 'Hospital';
    discharge?: Discharge;
}


export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;


// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>;