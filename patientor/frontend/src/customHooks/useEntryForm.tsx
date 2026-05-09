import { SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { HealthCheckRating, Type } from "../entryTypes";
export interface entryFormData {
    specialist: string,
    healthCheckRating: HealthCheckRating,
    date: string;
    diagnosisCodes: string[],
    type: Type,
    description: string;
};
export default function useEntryForm() {
    const [specialist, setSpecialist] = useState('');
    const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);
    const [date, setEntryDate] = useState('');
    const [description, setDescription] = useState('');
    const [diagnosisCodes, setCode] = useState<string[]>([]);
    const [type, setType] = useState<Type>(Type.HealthCheck);
    const entryFormSetters = { setDescription, setEntryDate, setSpecialist };
    const entryFormData: entryFormData = { specialist, healthCheckRating, date, diagnosisCodes, type, description };
    const onTypeChange = (event: SelectChangeEvent<string>) => {
        event.preventDefault();
        if (typeof event.target.value === "string") {
            const value = event.target.value;
            const type = Object.values(Type).find(t => t.toString() === value);
            if (type) {
                setType(type);
            }
        }
    };
    const onHealthRatingChange = (event: SelectChangeEvent<number>) => {
        event.preventDefault();
        if (typeof event.target.value === "number") {
            const value = event.target.value;
            const ratingValue = Object.values(HealthCheckRating).find(t => t === value);

            if (ratingValue) {
                console.log();
                setHealthCheckRating(ratingValue);
            }
        }
    };
    const onDiagnosesChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
        const {
            target: { value },
        } = event;
        setCode(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    return { entryFormData, entryFormSetters, onDiagnosesChange, onHealthRatingChange, onTypeChange };
}