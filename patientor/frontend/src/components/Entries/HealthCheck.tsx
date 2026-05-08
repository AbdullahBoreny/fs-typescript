import { HospitalIcon } from "lucide-react";
import type { HealthCheckEntry } from "../../entryTypes";

export default function HealthCheck({ entry }: { entry: HealthCheckEntry; }) {
    return (
        <>
            <h2>specialist: {entry.specialist} <HospitalIcon /></h2>
            <h2>date: {entry.date}</h2>
            <h2>description: {entry.description}</h2>
            <h2>type: {entry.type}</h2>
            <h2>healthRating: {entry.healthCheckRating}</h2>
        </>
    );
}