import axios from "axios";
import { Diagnosis, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";
import { Entry, EntryWithoutId } from "../entryTypes";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};
const getById = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return data;
};
const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};
const getDiagnosis = async () => {
  const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
  return data;
};
const addEntry = async (id: string, object: EntryWithoutId) => {
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${id}/entries`,
    object
  );
  return data;
};

export default {
  addEntry,
  getDiagnosis,
  getAll, create, getById
};

