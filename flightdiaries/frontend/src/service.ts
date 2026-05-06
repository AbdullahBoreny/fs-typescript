import axios from "axios";
import type { NewDiaryEntry, NonSensitiveDiaryEntry } from "./types";
const baseUrl = 'http://localhost:4000/api/diaries';
const getAll = () => {
    return axios
        .get<NonSensitiveDiaryEntry[]>(baseUrl)
        .then(response => response.data);
};
const create = (object: NewDiaryEntry) => {
    return axios
        .post<NewDiaryEntry>(baseUrl, object)
        .then(response => response.data);
};


export default { getAll, create };
