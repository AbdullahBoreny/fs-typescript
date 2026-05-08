import z from "zod";
import type { Diagnosis } from "./types.ts";

export interface BaseEntry {
    id: string;
    date: string;
    specialist: string;
    type: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
    description: string;
}
const HealthCheckRating = {
    Healthy: 0,
    LowRisk: 1,
    HighRisk: 2,
    CriticalRisk: 3
} as const;
type HealthCheckRating = typeof HealthCheckRating[keyof typeof HealthCheckRating];

export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}
interface SickLeave {
    startDate: string;
    endDate: string;
}
export interface OccupationalHealthcareEntry extends BaseEntry {
    employerName: string;
    type: "OccupationalHealthcare";
    sickLeave?: SickLeave;
}
interface Discharge {
    date: string;
    criteria: string,
}
export interface HospitalEntry extends BaseEntry {
    type: 'Hospital';
    discharge: Discharge;
}
const NewHealthCheckRating = z.union([
    z.literal(HealthCheckRating.Healthy),
    z.literal(HealthCheckRating.LowRisk),
    z.literal(HealthCheckRating.HighRisk),
    z.literal(HealthCheckRating.CriticalRisk),
]);
export type NewHealthCheckRating = z.infer<typeof NewHealthCheckRating>;

export type newEntry = z.infer<typeof newEntrySchema>;

export const newEntrySchema = z.object({

    date: z.iso.date(),
    employerName: z.string(),
    specialist: z.string(),
    type: z.string(),
    description: z.string(),
    discharge: z.object({ date: z.iso.date(), criteria: z.string() }).optional(),
    sickLeave: z.object({ startDate: z.string(), endDate: z.string() }).optional(),
    healthCheckRating: NewHealthCheckRating.optional()

});



export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;


// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>;