import { OccupationalHealthcareEntry } from "../../entryTypes";
export default function OccupationalHealthcare({ entry }: { entry: OccupationalHealthcareEntry; }) {

    return (
        <>
            <h2>Type: {entry.type}</h2>
            <h2>Date of entry: {entry.date}</h2>

            <h2>Employer Name(if found): {entry.employerName} </h2>
            <h3>Description: {entry.description}</h3>

            {entry.sickLeave &&
                <div>
                    <h2>  Granted Sick Leave on:</h2>
                    <h3>START: {entry.sickLeave?.startDate}</h3>
                    <h3>END: {entry.sickLeave?.endDate}</h3>
                </div>
            }


        </>
    );
};