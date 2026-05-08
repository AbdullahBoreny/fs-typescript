import { Entry } from "../entryTypes";
import OccupationalHealthcare from "./Entries/OccupationalHealthcare";
import Hospital from "./Entries/Hospital";
import HealthCheck from "./Entries/HealthCheck";

export default function EntryDetails({ entry }: { entry: Entry; }) {
    function assertNever(entry: never) {
        throw new Error(`Function not implemented ${entry}`);
    }

    const component = {
        "HealthCheck": HealthCheck,
        "Hospital": Hospital,
        "OccupationalHealthcare": OccupationalHealthcare

    };

    switch (entry.type) {
        case 'HealthCheck':
            return <HealthCheck entry={entry} />;
        case 'Hospital':
            return <Hospital entry={entry} />;
        case 'OccupationalHealthcare':
            return <OccupationalHealthcare entry={entry} />;
        default:
            return assertNever(entry);
    }
    return (
        <>
        </>
    );
}

