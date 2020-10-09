import React, { useState, useEffect, useCallback, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// Components
import SignUpModal from './SignUpModal';

// Material UI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// Actions
import { login } from '../../redux/actions/auth.action';
import { clearErrors } from '../../redux/actions/error.action';


// Styles
import { styles } from './styles';

const  Login = (props) => {

    // Local States
    const [user, setUSer] = useState({ username: '', password: '' });

    // Global States (Redux Store)
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const error = useSelector(state => state.error);

    // React router
    let history = useHistory();

    // To use the actions
    const dispatch = useDispatch();

    const initFetch = useCallback(() => {
        dispatch(clearErrors());
        history.push('/home');
    }, [dispatch, history]);


    useEffect(() => {
        isAuthenticated && initFetch();
    }, [isAuthenticated, initFetch, error]);

    
    const handleChange = name => event => {
        setUSer({ ...user, [name]: event.target.value });
    };

    const onSubmit = event => {
        event.preventDefault();
        // Attempt to login
        dispatch(login(user));
    };
  

    const errorMessages = (errorMessage, classes) => {
        if(errorMessage === 'No auth token'){
            return null;
        } else if(errorMessage === 'jwt expired'){
            return (
                <Typography component="h1" variant="subtitle1" className={classes.errorMsg}>
                    Session has expired
                </Typography>)
        } else {
            return (
                <Typography component="h1" variant="subtitle1" className={classes.errorMsg}>
                    {errorMessage}
                </Typography>);
        }
    }
    
    const { username, password } = user;
    const { classes } = props;

    return (
        <Grid className={classes.container}>  
            <Fragment>
                <SignUpModal />
            </Fragment>          

            <Paper className={classes.paperLogin}>
                { 
                    errorMessages(error.msg, classes)
                }
                <form className={classes.form} autoComplete="off" onSubmit={onSubmit}>
                    <TextField
                        id="username"
                        label="Username"
                        className={classes.textField}
                        value={username}
                        placeholder="Username"
                        onChange={handleChange('username')}
                        margin="normal"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id="password"
                        label="Password"
                        className={classes.textField}
                        value={password}
                        type="password"
                        autoComplete="off"
                        placeholder="Password"
                        onChange={handleChange('password')}
                        margin="normal"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <div className={classes.containerButton}>
                        <Button type="submit" variant="contained" color="primary" className={classes.button}>
                            Login
                        </Button>
                    </div>
                </form>
                <Fragment>
                    <Link to="/forgotpassword" className={classes.link}>
                        <Typography variant="h5" component="h5" className={classes.forgotPassword}>
                            Forgot password?
                        </Typography>
                    </Link>
                </Fragment>
            </Paper>
        </Grid>
    );
}

Login.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles, { withTheme: true })(Login));