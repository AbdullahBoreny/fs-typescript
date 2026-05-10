import { Dialog, DialogTitle, DialogContent, Divider, Alert } from '@mui/material';

import { EntryWithoutId } from '../../entryTypes';
// import AddHospitalEntry from './AddHospitalEntry';
import AddOccupEntry from './AddOccupEntry';
export interface ErrorMessage {
    error: Error[];
}
interface Error {
    message: string;
}
interface Props {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: EntryWithoutId) => void;
    error?: ErrorMessage;
    dialogTitle: string;
}

const AddEntryModal = ({ dialogTitle, modalOpen, onClose, onSubmit, error }: Props) => (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <Divider />
        <DialogContent>
            {error && error.error.map(err => (
                <Alert severity="error">{err.message}</Alert>
            )
            )
            }
            <AddOccupEntry onSubmit={onSubmit} onCancel={onClose} />
        </DialogContent>
    </Dialog>
);

export default AddEntryModal;
