import { Entry } from "../entryTypes";
import OccupationalHealthcare from "./Entries/OccupationalHealthcare";
import Hospital from "./Entries/Hospital";
import HealthCheck from "./Entries/HealthCheck";

export function EntryDetails({ entry }: { entry: Entry; }) {
    switch (entry.type) {
        case 'HealthCheck':
            return <HealthCheck />;
        case 'Hospital':
            return <Hospital />;
        case 'OccupationalHealthcare':
            return <OccupationalHealthcare />;
        default:
            return assertNever(entry);
    }

}

function assertNever(entry: never) {
    throw new Error(`Function not implemented ${entry}`);
}
