import { Box, Table, Button, TableHead, Typography, TableCell, TableRow, TableBody } from '@mui/material';
import { Patient } from "../../types";
import AddPatientModal from "../AddPatientModal";

import HealthRatingBar from "./HealthRatingBar";

import { Link } from "react-router-dom";
import usePatientSubmit from '../../customHooks/usePatientSubmit';
interface Props {
  patients: Patient[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
}


const PatientListPage = ({ patients, setPatients }: Props) => {
  const { modalOpen,
    error,
    openModal,
    closeModal, submitNewPatient } = usePatientSubmit({ patients, setPatients });

  return (
    <div className="App">
      <Box>
        <Typography align="center" variant="h6">
          Patient list
        </Typography>
      </Box>

      <Table sx={{ marginBottom: "1em" }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Occupation</TableCell>
            <TableCell>Health Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients.map((patient: Patient) => (
            <TableRow key={patient.id}>
              <TableCell>{patient.name}</TableCell>
              <TableCell>{patient.gender}</TableCell>
              <TableCell>{patient.occupation}</TableCell>
              <TableCell>
                <HealthRatingBar showText={true} rating={1} />
              </TableCell>
              <TableCell>

                <Button key={patient.id} component={Link} to={`patients/${patient.id}`} variant="contained" color="primary">
                  View
                </Button>

              </TableCell>

            </TableRow>

          ))}

        </TableBody>
      </Table>

      <AddPatientModal
        dialogTitle="Add New Patient"
        modalOpen={modalOpen}
        onSubmit={submitNewPatient}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Patient
      </Button>
    </div>
  );
};

export default PatientListPage;
