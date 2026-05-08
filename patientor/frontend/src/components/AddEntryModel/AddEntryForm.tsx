import { useState, SyntheticEvent } from "react";

import { TextField, Grid, Button, SelectChangeEvent, InputLabel, Select, MenuItem } from '@mui/material';
import { EntryWithoutId, HealthCheckRating, Type } from "../../entryTypes";

interface Props {

    onCancel: () => void;
    onSubmit: (values: EntryWithoutId) => void;
}
interface TypeOptions {
    value: Type;
    label: string;
}

const typeOptions: TypeOptions[] = Object.values(Type).map(v => ({
    value: v, label: v.toString()
}));

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
    const [specialist, setSpecialist] = useState('');
    const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);
    const [date, setEntryDate] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState<Type>();

    const onTypeChange = (event: SelectChangeEvent<string>) => {
        event.preventDefault();
        if (typeof event.target.value === "string") {
            const value = event.target.value;
            const type = Object.values(Type).find(t => t.toString() === value);
            if (type) {
                setType(type);
            }
        }
    };



    const addEntry = (event: SyntheticEvent) => {
        event.preventDefault();
        onSubmit({ specialist, healthCheckRating, description, date, type });
    };

    return (
        <div>
            <form onSubmit={addEntry}>
                <TextField
                    label="Specialist"
                    fullWidth
                    type="text"
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
                    // label="Date of entry"
                    placeholder="YYYY-MM-DD"
                    fullWidth
                    type="date"
                    value={date}
                    onChange={({ target }) => setEntryDate(target.value)}
                />
                <TextField
                    label="Health Rating"
                    fullWidth
                    value={healthCheckRating}
                    onChange={({ target }) => setHealthCheckRating(target.value)}
                />
                <InputLabel sx={{ marginTop: 2.5 }}>Entry Type</InputLabel>
                <Select
                    label="Type"
                    fullWidth
                    value={type}
                    onChange={onTypeChange}
                >
                    {typeOptions.map(option =>
                        <MenuItem
                            key={option.label}
                            value={option.value}
                        >
                            {option.label
                            }</MenuItem>
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