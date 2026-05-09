import { HospitalEntry } from "../../entryTypes";

export default function Hospital({ entry }: { entry: HospitalEntry; }) {
    return (
        <>
            <h2>Type: {entry.type}</h2>
            <h2>Date of entry: {entry.date}</h2>

            <h2>Discharging details:
                <ul>
                    <li>
                        criteria:
                        {entry.discharge?.criteria}
                    </li>
                    <li>on: {entry.discharge?.date}</li>
                </ul>
            </h2>
        </>
    );
}