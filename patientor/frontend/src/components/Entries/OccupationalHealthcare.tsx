import { HospitalIcon } from "lucide-react";
import { OccupationalHealthcareEntry } from "../../entryTypes";
export default function OccupationalHealthcare({ entry }: { entry: OccupationalHealthcareEntry; }) {

    return (
        <>
            <h2>employerName: {entry.employerName} </h2>
            <h2>DESCRIPTION: {entry.description}</h2>
            {entry.sickLeave &&
                <div>
                    <h1>startDate: {entry.sickLeave?.startDate}</h1>
                    <h2>END: {entry.sickLeave?.endDate}</h2>
                </div>
            }

            <h1>type: {entry.type}</h1>
        </>
    );
};