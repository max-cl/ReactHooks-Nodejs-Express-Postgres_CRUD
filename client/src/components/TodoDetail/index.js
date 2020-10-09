import React, { useState, useEffect ,Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, Link, useParams, useHistory } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

// Material UI
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';

// Actions
import { removeTodo, updateTodo } from '../../redux/actions/todo.action';

// Styles
import { styles } from './styles';


const tableHeader = [
    { id_header: 1, header_txt: 'Id' },
    { id_header: 2, header_txt: 'Title' },
    { id_header: 3, header_txt: 'Done?' },
    { id_header: 4, header_txt: '' },
    { id_header: 5, header_txt: '' }
];

const TodoDetail = (props) => { 

    // Routes Params
    let { id } = useParams();

    // React router
    let history = useHistory();

    // Local States
    const [toEdit, setToEdit] = useState(false);
    const [title, setTitle] = useState('');
    const [done, setDone] = useState(false);

    // Global States
    const todos = useSelector(state => state.todo.todos);
    const titleSelected = useSelector(state => state.todo.todos.filter(f => { return f.id === parseInt(id,10)}).map(p => { return p.title; })[0]);
    const doneSelected = useSelector(state => state.todo.todos.filter(f => { return f.id === parseInt(id,10)}).map(p => { return p.done; })[0]);
    const userInfo = useSelector(state => state.auth.user);

    // To use the actions
    const dispatch = useDispatch()

    useEffect(() => {
        todos.length === 0 && history.push('/home');
        setTitle(titleSelected);
        setDone(doneSelected);
    }, [titleSelected, doneSelected, todos, history]);

    const toUpdateTodo = (e) => {
        e.preventDefault();
        dispatch(updateTodo(userInfo.id_user, parseInt(id,10), title, done));
        setToEdit(!toEdit);
    }
    const delTodo = (idTodo) => {
        dispatch(removeTodo(userInfo.id_user, parseInt(idTodo,10)));
        history.push('/home');
    }
    
    const editTodo = () => setToEdit(!toEdit);
    const handleChange = (e) => setTitle(e.target.value);
    const handleChangeCheckBox = (e) => setDone(e.target.checked);


    const { classes } = props;

    return (
        <Fragment>
            <div className={classes.backContainer}>
                <Link to="/home" className={classes.link}>
                    <Button variant="contained" color="primary" className={classes.button}>
                        Back
                    </Button>
                </Link>
            </div>
            {
                toEdit ?
                    <Fragment>
                        <div className={classes.updateFormContainer}>
                            <form noValidate autoComplete="off" onSubmit={toUpdateTodo}>
                                <TextField id="title" label="Title" className={classes.textField} value={title} onChange={handleChange}/>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={done}
                                            onChange={handleChangeCheckBox}
                                            name="done"
                                            color="primary"
                                        />
                                    }
                                    label="Is it Done?"
                                    />
                                <Button variant="contained" color="primary" className={classes.button} onClick={editTodo}>Cancel</Button>
                                <Button variant="contained" color="primary" className={classes.button} type="submit">Update</Button>
                            </form>
                        </div>
                    </Fragment>
                :
                    <div className={classes.tableContainer}>
                        <Table className={classes.table}>
                            <TableHead className={classes.tableHead}>
                            <TableRow>
                            {
                                tableHeader.map(h => {
                                    return <TableCell  key={h.id_header} align="left">{h.header_txt}</TableCell>
                                })
                            }
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow key={id}>
                                    <TableCell align="left">{id}</TableCell>
                                    <TableCell align="left">{title}</TableCell>
                                    <TableCell align="left">{`${done ? 'It\'s Done' : 'It\'s not Done'}` }</TableCell>
                                    <TableCell  align="left">
                                        <IconButton aria-label="delete" onClick={() => delTodo(id)}>
                                            <Delete fontSize="large" />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell  align="left">
                                        <IconButton aria-label="edit" onClick={editTodo}>
                                            <Edit fontSize="large" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>  
                            </TableBody>
                        </Table>
                    </div>
            }
        </Fragment>
    );
}

export default withRouter(withStyles(styles, { withTheme: true })(TodoDetail));