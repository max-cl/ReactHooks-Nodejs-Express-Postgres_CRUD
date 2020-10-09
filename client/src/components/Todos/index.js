import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter, useHistory } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

// Material UI
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// Styles
import { styles } from './styles';

const tableHeader = [
    { id_header: 1, header_txt: 'Id' },
    { id_header: 2, header_txt: 'Title' },
    { id_header: 3, header_txt: 'Done?' }
];


const Todos = (props) => {  

    // React router
    let history = useHistory();

    const goTodoDetail = (id) => {
        history.push(`/tododetail/${id}`);
    }


    const { classes, todos } = props;   

    return (
        <Fragment>
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
                {todos.map(row => (
                    <TableRow key={row.id} onClick={() => goTodoDetail(row.id)} className={classes.tableRow}>        
                        <TableCell align="left">{row.id}</TableCell>
                        <TableCell align="left">{row.title}</TableCell>
                        <TableCell align="left">{`${row.done ? 'It\'s Done' : 'It\'s not Done'}` }</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>  
        </Fragment>
    );
}

Todos.propTypes = {
    classes: PropTypes.object.isRequired,
    todos: PropTypes.array.isRequired
};


export default withRouter(withStyles(styles)(Todos));