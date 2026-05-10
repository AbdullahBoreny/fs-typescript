import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from "./constants";
import { Patient } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientDetails from "./components/PatientDetailsPage/PatientDetails";
import { ErrorMessage } from "./components/AddEntryModel";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [error, setError] = useState<ErrorMessage | undefined>();
  // const [error, setError] = useState<string | null>();
  // function notify(errorMessage: string) {
  //   setError(errorMessage);

  //   setTimeout(() => {
  //     setError(null);
  //   }, 10000);
  // }
  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" sx={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider sx={{ marginY: 1, margin: 1 }} />

          <Routes>
            <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
            <Route path={`/patients/:id`}
              element={<PatientDetails
                error={error}
                setError={setError}
                patients={patients} setPatients={setPatients} />} />
          </Routes>
        </Container>

      </Router>
    </div>
  );
};

export default App;
