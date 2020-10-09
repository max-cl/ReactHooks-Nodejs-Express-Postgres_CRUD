import React, { useState, useEffect, useCallback ,Fragment } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

// Material UI
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add';

// Components
import Todos from '../Todos';

// Action
import { logout } from '../../redux/actions/auth.action';
import { getTodos, createTodo } from '../../redux/actions/todo.action';
import { clearErrors } from '../../redux/actions/error.action';

// Styles
import { styles } from './styles';


const Home = (props) => {

    // Local States 
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');

    // Global States (Redux Store)
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const userInfo = useSelector(state => state.auth.user);
    const todos= useSelector(state => state.todo.todos);

    // To use the actions
    const dispatch = useDispatch();

    // React router
    let history = useHistory();

    const initFetch = useCallback(() => {
        userInfo.id_user !== undefined && dispatch(getTodos(userInfo.id_user));
    }, [dispatch, userInfo.id_user]);

    const logoutApp = (event) => {
        event.preventDefault();
        dispatch(clearErrors());
        dispatch(logout());
        history.push('/');
    }

    const handleOpen = (e) => {
        e.preventDefault();
        setOpen(!open);
    }

    const handleChange = (e) => {
        setTitle(e.target.value)
    }

    const toCreateTodo = (e) => {
        e.preventDefault();
        dispatch(createTodo(userInfo.id_user, title));

        setOpen(!open);
        setTitle('')
    }

    useEffect(() => {
        initFetch();
    }, [initFetch]);

    const { classes } = props;

    !isAuthenticated && history.push('/');

    return (
        <div className={classes.homeContainer}>
        {
            isAuthenticated && 
                <div className={classes.logoutContainer}>
                    <Button variant="contained" color="primary" onClick={logoutApp} className={classes.button}>
                        Logout
                    </Button>
                </div>
        }
            
            <div className={classes.tableContainer}>
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
                            <form noValidate autoComplete="off" onSubmit={toCreateTodo}>
                                <TextField id="standard-basic" label="Title" className={classes.textField} value={title} onChange={handleChange}/>
                                <Button variant="contained" color="primary" className={classes.button} onClick={handleOpen}>Cancel</Button>
                                <Button variant="contained" color="primary" className={classes.button} type="submit">Create</Button>
                            </form>
                        </div>
                    </Modal>
                </Fragment>
                <Todos 
                    todos={todos}
                />
            </div>
        </div>
    );
}

Home.propTypes = {
    classes: PropTypes.object.isRequired
};


export default withRouter(withStyles(styles, { withTheme: true })(Home));