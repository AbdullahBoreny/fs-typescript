import { SyntheticEvent } from "react";

import { TextField, Grid, Button, InputLabel, Select, MenuItem, Box, Chip } from '@mui/material';
import { HealthCheckRating, Type } from "../../entryTypes";
import usePatientDetails from "../../customHooks/useDiagnosesFetch";
import useEntryForm, { entryFormData } from "../../customHooks/useEntryForm";

interface ModalProps {

    onCancel: () => void;
    onSubmit: (values: entryFormData) => void;
}

interface TypeOptions {
    value: Type;
    label: string;
}
interface HealthRatingOptions {
    value: HealthCheckRating;
    label: string;
    key: string;
}
const keys = Object.keys(HealthCheckRating);
const healthOptions: HealthRatingOptions[] = Object.values(HealthCheckRating).map(rating => ({
    value: rating,
    label: rating.toString(),
    key: keys[Number(rating)]
}));

const typeOptions: TypeOptions[] = Object.values(Type).map(v => ({
    value: v, label: v.toString(),
}));


const AddEntryForm = ({ onCancel, onSubmit }: ModalProps) => {
    const { diagnoses } = usePatientDetails();
    const { onHealthRatingChange, entryFormData, onDiagnosesChange, onTypeChange, entryFormSetters } = useEntryForm();
    const addEntry = (event: SyntheticEvent) => {
        event.preventDefault();
        onSubmit({ ...entryFormData });
    };
    return (
        <div>
            <form onSubmit={addEntry}>
                <TextField
                    label="Specialist"
                    fullWidth
                    type="text"
                    value={entryFormData.specialist}
                    onChange={({ target }) => entryFormSetters.setSpecialist(target.value)}
                />
                <TextField
                    label="description"
                    fullWidth
                    value={entryFormData.description}
                    onChange={({ target }) => entryFormSetters.setDescription(target.value)}
                />
                <TextField

                    fullWidth
                    type="date"
                    value={entryFormData.date}
                    onChange={({ target }) => entryFormSetters.setEntryDate(target.value)}
                />

                <InputLabel sx={{ marginTop: 2.5 }}>Entry Type</InputLabel>
                <Select
                    label="Type"
                    fullWidth
                    value={entryFormData.type}
                    onChange={onTypeChange}>
                    {typeOptions.map(option =>
                        <MenuItem
                            key={option.label}
                            value={option.value}>
                            {option.label}
                        </MenuItem>
                    )}
                </Select>
                <InputLabel sx={{ marginTop: 2.5 }}>Health Rating</InputLabel>
                <Select
                    label="Health Rating"
                    fullWidth
                    value={entryFormData.healthCheckRating}
                    onChange={onHealthRatingChange}>
                    {healthOptions.map(option =>
                        <MenuItem
                            key={option.label}
                            value={option.value}>
                            {option.value} - {option.key}

                        </MenuItem>
                    )}
                </Select>
                <InputLabel id='demo-multiple-name-label' sx={{ marginTop: 2.5 }} >Diagnoses</InputLabel>
                <Select
                    multiple
                    value={entryFormData.diagnosisCodes}
                    label="Diagnoses"

                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    onChange={onDiagnosesChange}
                >
                    {diagnoses && diagnoses.map(option =>
                        <MenuItem
                            key={option.code}
                            value={option.code}>
                            {option.code}- {option.name}

                        </MenuItem>
                    )}
                </Select>



                <Grid container justifyContent="space-between" sx={{ marginTop: 2 }}>
                    <Grid size="auto">
                        <Button
                            color="secondary"
                            variant="contained"
                            type="button"
                            onClick={onCancel}
                        >
                            Cancel
                        </Button>
                    </Grid>
                    <Grid size="auto">
                        <Button
                            type="submit"
                            variant="contained"
                        >
                            Add
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default AddEntryForm;