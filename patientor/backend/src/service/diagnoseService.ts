import DiagnoseEntries from "../../data/diagnoses.ts";
import type { Diagnosis } from "../../types.ts";
const getDiagnoses = (): Diagnosis[] => {
    return DiagnoseEntries;
};





export default {
     getDiagnoses
};