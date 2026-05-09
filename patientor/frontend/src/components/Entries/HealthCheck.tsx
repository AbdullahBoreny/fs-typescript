import { HospitalIcon } from "lucide-react";
import type { HealthCheckEntry } from "../../entryTypes";

export default function HealthCheck({ entry }: { entry: HealthCheckEntry; }) {
    return (
        <>
            <h2>Type: {entry.type}</h2>
            <h2>Date of entry: {entry.date}</h2>
            <h2>Specialist: {entry.specialist} <HospitalIcon /></h2>
            <h2>description: {entry.description}</h2>
            <h2>healthRating: {entry.healthCheckRating}</h2>
        </>
    );
}