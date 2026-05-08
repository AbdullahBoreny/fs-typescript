import { HospitalEntry } from "../../entryTypes";

export default function Hospital({ entry }: { entry: HospitalEntry; }) {
    return (
        <>
            <h1>discharge: {entry.discharge.criteria}</h1>
            <h1>type: {entry.type}</h1>
        </>
    );
}