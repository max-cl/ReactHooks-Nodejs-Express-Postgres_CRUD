import React, { useState, Fragment } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// Material UI
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add';

// APIs
import { SIGNUP } from '../../redux/apis';

// Styles
import { styles } from './styles';


const SignUpModal = (props) => {

    // Local States
    const [open, setOpen] = useState(false);
    const [newuser, setNewuser] = useState({ newFullName: '', newUserName: '', newPassword: '', newRepeatPassword: '', newEmail: '', newRoles: '' });

    const handleOpen = () => {
        setOpen(!open);
    }

    const handleChange = name => event => {
        setNewuser({ ...newuser, [name]: event.target.value });
    };

    const signUp = async (e) => {
        e.preventDefault();
        const { newFullName, newUserName, newPassword, newRepeatPassword, newEmail, newRoles } = newuser;
        try {
        
            await axios.post(`${SIGNUP}`, {
                name: newFullName,
                username: newUserName,
                password: newPassword,
                repeat_password: newRepeatPassword,
                roles: newRoles,
                email: newEmail
            });
            
            setOpen(!open);

        } catch (error) {
            console.log("SIGN-UP Error: ", error);
        }

    }

    const { newFullName, newUserName, newPassword, newRepeatPassword, newEmail, newRoles } = newuser;
    const { classes } = props;

    return(
        <Fragment>
            <IconButton aria-label="edit" onClick={handleOpen}>
                <Add fontSize="large" />
            </IconButton>
            <Modal
                open={open}
                onClose={handleOpen}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                className={classes.modal}
            >
                <div className={classes.addFormContainer}>
                    <form noValidate autoComplete="off" onSubmit={signUp}>
                        <TextField id="newFullName" variant="outlined" label="Full Name" className={classes.textField} value={newFullName} onChange={handleChange('newFullName')}/>
                        <TextField id="newUserName" variant="outlined" label="Username" className={classes.textField} value={newUserName} onChange={handleChange('newUserName')}/>
                        <TextField id="newPassword" type="password" variant="outlined" label="Password" className={classes.textField} value={newPassword} onChange={handleChange('newPassword')}/>
                        <TextField id="newRepeatPassword" type="password" variant="outlined" label="Repeat Password" className={classes.textField} value={newRepeatPassword} onChange={handleChange('newRepeatPassword')}/>
                        <TextField id="newEmail" variant="outlined" label="Email" className={classes.textField} value={newEmail} onChange={handleChange('newEmail')}/>
                        <TextField id="newRoles" variant="outlined" label="Role" className={classes.textField} value={newRoles} onChange={handleChange('newRoles')}/>
                        <Button variant="contained" color="primary" className={classes.button} onClick={handleOpen}>Cancel</Button>
                        <Button variant="contained" color="primary" className={classes.button} type="submit">Add new User</Button>
                    </form>
                </div>
            </Modal>
        </Fragment>
    );
}

SignUpModal.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(SignUpModal);