import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { postData } from '../services/Api';

export default function AddPerson(props: { insertDataToTable: () => void; }) {

    const [open, setOpen] = useState(false);
    const [person, setPerson] = useState({ first_name: '', last_name: '', age: 0 });

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleCancel = () => {
        setOpen(false);
    }

    const handleSave = async () => {
        if (person.first_name === '' || person.last_name === '') {
            window.alert("Please fill the required fields.");
        } else {
            handleClose();
            await postData(person);
            setPerson({ first_name: '', last_name: '', age: 0 });
        }
        props.insertDataToTable();
    }

    const handleChange = (event: { target: { name: string; value: string | number; }; }) => {
        setPerson({ ...person, [event.target.name]: event.target.value });
    }

    return (
        <div>
            <Button style={{ margin: 10 }} variant="contained" color="primary" onClick={handleOpen}>Add new person</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add a person</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="first_name"
                        name="first_name"
                        value={person.first_name}
                        onChange={handleChange}
                        label="First name"
                        fullWidth
                    />
                    <TextField
                        required
                        margin="dense"
                        id="last_name"
                        name="last_name"
                        value={person.last_name}
                        onChange={handleChange}
                        label="Last name"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="age"
                        name="age"
                        type="number"
                        InputProps={{ inputProps: { min: 0, max: 123 } }}
                        value={person.age}
                        onChange={handleChange}
                        label="Age"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} variant="contained" color="warning">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} variant="contained" color="success">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
