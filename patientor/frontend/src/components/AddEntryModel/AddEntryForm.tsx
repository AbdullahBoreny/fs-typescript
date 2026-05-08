import { useState, SyntheticEvent } from "react";

import { TextField, Grid, Button } from '@mui/material';
import { EntryWithoutId, HealthCheckRating } from "../../entryTypes";

interface Props {

    onCancel: () => void;
    onSubmit: (values: EntryWithoutId) => void;
}


const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
    const [specialist, setSpecialist] = useState('');
    const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);
    const [date, setEntryDate] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState();




    const addEntry = (event: SyntheticEvent) => {
        event.preventDefault();
        onSubmit({ specialist, healthCheckRating, description, date, type });
    };

    return (
        <div>
            <form onSubmit={addEntry}>
                <TextField
                    label="Name"
                    fullWidth
                    value={specialist}
                    onChange={({ target }) => setSpecialist(target.value)}
                />
                <TextField
                    label="description"
                    fullWidth
                    value={description}
                    onChange={({ target }) => setDescription(target.value)}
                />
                <TextField
                    label="Date of entry"
                    placeholder="YYYY-MM-DD"
                    fullWidth
                    value={date}
                    onChange={({ target }) => setEntryDate(target.value)}
                />
                <TextField
                    label="Health Rating"
                    fullWidth
                    value={healthCheckRating}
                    onChange={({ target }) => setHealthCheckRating(target.value)}
                />
                <TextField
                    label="type"
                    fullWidth
                    value={type}
                    onChange={({ target }) => setType(target.value)}
                />



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