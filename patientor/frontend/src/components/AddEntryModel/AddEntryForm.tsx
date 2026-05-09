import { useState, SyntheticEvent } from "react";

import { TextField, Grid, Button, SelectChangeEvent, InputLabel, Select, MenuItem, Box, Chip } from '@mui/material';
import { EntryWithoutId, HealthCheckRating, Type } from "../../entryTypes";
import usePatientDetails from "../../customHooks/usePatientDetails";

interface Props {

    onCancel: () => void;
    onSubmit: (values: EntryWithoutId) => void;
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
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 10;
const MenuProps = {
    slotProps: {
        paper: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    },
};
const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
    const { diagnoses } = usePatientDetails();

    const [specialist, setSpecialist] = useState('');
    const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);
    const [date, setEntryDate] = useState('');
    const [description, setDescription] = useState('');
    // const [diagnosisCodes, setDiagnosisCodes] = useState<Array<Diagnosis['code']>>();
    const [code, setCode] = useState<string[]>([]);
    const [type, setType] = useState<Type>(Type.HealthCheck);


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
    const onHealthRatingChange = (event: SelectChangeEvent<number>) => {
        event.preventDefault();
        if (typeof event.target.value === "number") {
            const value = event.target.value;
            const ratingValue = Object.values(HealthCheckRating).find(t => t === value);

            if (ratingValue) {
                console.log();
                setHealthCheckRating(ratingValue);
            }
        }
    };
    const handleChange = (event: SelectChangeEvent<typeof code>) => {
        const {
            target: { value },
        } = event;
        setCode(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    const addEntry = (event: SyntheticEvent) => {
        event.preventDefault();
        onSubmit({ specialist, diagnosisCodes: code, healthCheckRating, description, date, type });
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

                    fullWidth
                    type="date"
                    value={date}
                    onChange={({ target }) => setEntryDate(target.value)}
                />

                <InputLabel sx={{ marginTop: 2.5 }}>Entry Type</InputLabel>
                <Select
                    label="Type"
                    fullWidth
                    value={type}
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
                    value={healthCheckRating}
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
                    value={code}
                    label="Diagnoses"
                    MenuProps={MenuProps}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    onChange={handleChange}
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