import { Entry } from "../entryTypes";
import OccupationalHealthcare from "./Entries/OccupationalHealthcare";
import Hospital from "./Entries/Hospital";
import HealthCheck from "./Entries/HealthCheck";

export default function EntryDetails({ entry }: { entry: Entry; }) {
    const renderSwitch = (entry: Entry) => {
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

    };

    function assertNever(entry: never) {
        throw new Error(`Function not implemented ${entry}`);
    }

    return (
        <>
            {renderSwitch(entry)}
        </>
    );
}

