import { type Response, type NextFunction, type Request } from 'express';
import { newPatientSchema } from "../types/types.ts";
import z from "zod";
import { v1 as uuid } from 'uuid';

import { newEntrySchema, type Entry, type EntryWithoutId } from '../types/EntriesTypes.ts';

export const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        newPatientSchema.parse(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};
export const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        newEntrySchema.parse(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};
export const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
    if (error instanceof z.ZodError) {
        res.status(404).json({ error: error.issues });
    } else {
        next(error);
    }
};

export function parseEntry(entry: EntryWithoutId): Entry | undefined {
    switch (entry.type) {
        case 'HealthCheck':
            return {
                id: uuid(),
                type: entry.type,
                description: entry.description,
                date: entry.date,
                specialist: entry.specialist,
                diagnosisCodes: entry.diagnosisCodes,
                healthCheckRating: entry.healthCheckRating



            };
        case "Hospital":
            return {
                id: uuid(),
                type: entry.type,
                description: entry.description,
                date: entry.date,
                specialist: entry.specialist,
                diagnosisCodes: entry.diagnosisCodes,
                discharge: entry.discharge
            };
        case "OccupationalHealthcare":
            return {
                id: uuid(),
                type: entry.type,
                description: entry.description,
                date: entry.date,
                specialist: entry.specialist,
                employerName: entry.employerName,
                diagnosisCodes: entry.diagnosisCodes, sickLeave: entry.sickLeave
            };
        default:
            return assertNever(entry);
    }

}

function assertNever(entry: never): Entry | undefined {
    throw new Error('Function not implemented. ' + entry);
}

