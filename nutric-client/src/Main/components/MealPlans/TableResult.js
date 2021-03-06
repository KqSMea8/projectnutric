import React from "react";
import {connect} from 'react-redux';

import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import TablePagination from '@material-ui/core/TablePagination';


import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

let counter = 0;

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  {
    id: "foodName",
    numeric: false,
    disablePadding: true,
    label: "Alimento (100g)"
  },
  { 
    id: "calories_kcal", 
    numeric: false, 
    disablePadding: true, 
    label: "Calorías" 
  },
  { 
    id: "fat_g", 
    numeric: false, 
    disablePadding: true, 
    label: "Grasa (g)" 
  },
  {
    id: "carbs_g",
    numeric: false,
    disablePadding: true,
    label: "Carbohidratos (g)"
  },
  {
    id: "protein_g",
    numeric: false,
    disablePadding: true,
    label: "Proteína (g)"
  },
  { 
    id: "select", 
    numeric: false, 
    disablePadding: true, 
    label: "" 
  }
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {
      order,
      orderBy
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox" />
          {rows.map(row => {
            return (
              <TableCell
                key={row.id}
                numeric={row.numeric}
                padding={row.disablePadding ? "none" : "default"}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Ordenar"
                  placement={row.numeric ? "bottom-end" : "bottom-start"}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: "0",
    textAlign:"center"
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  spacer: {
    flex: "1 1 100%"
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: "0 0 auto"
  }
});

let EnhancedTableToolbar = props => {
  const { numSelected, classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    />
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    textAlign:"center"
  },

  tableWrapper: {
    overflowX: "auto"
  },
  tableRow:{
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
   '&:hover': {
      '& $button':{
        visibility:"visible !important"
      }
    }, 

  }
  
});

class EnhancedTable extends React.Component {
  state = {
    order: "asc",
    orderBy: "calories",
    selected: [],
    page: 0,
    rowsPerPage: 5
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";
  
    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }
  
    this.setState({ order, orderBy });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes, tableId, selectedFood } = this.props;
    const { order, orderBy, selected, rowsPerPage, page } = this.state;
    const foodDatabase=this.props.foods.map(function(food){
      return {id: food._id, foodName: food.foodName, calories_kcal: food.calories_kcal, fat_g: food.fat_g, carbs_g:food.carbs_g, protein_g: food.protein_g}
    })
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, foodDatabase.length - page * rowsPerPage);

    return (
      <Paper id={tableId} className={classes.root}>
        <div  className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={foodDatabase.length}
              style={{textAlign:"center"}}
            />
            <TableBody>
              {stableSort(foodDatabase, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                      className={classes.tableRow}
                    >
                      <TableCell padding="checkbox" />
                      <TableCell component="th" scope="row" padding="none">
                        {n.foodName}
                      </TableCell>
                      <TableCell style={{textAlign:"center"}} numeric>{Math.round(n.calories_kcal*100)/100}</TableCell>
                      <TableCell style={{textAlign:"center"}} numeric>{Math.round(n.fat_g*100)/100}</TableCell>
                      <TableCell style={{textAlign:"center"}} numeric>{Math.round(n.carbs_g*100)/100}</TableCell>
                      <TableCell style={{textAlign:"center"}} numeric>{Math.round(n.protein_g*100)/100}</TableCell>
                      <TableCell style={{textAlign:"center"}} numeric>
                        <Fab style={{visibility:"hidden"}} size="small" color="secondary" aria-label="Add" onClick={e=>{this.props.clearInput(e); this.props.addNewRecipeButton(n, this.props.selectedInputIdentifier)}}>
                          <AddIcon />
                        </Fab>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 55 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5]}
          component="div"
          count={foodDatabase.length}
          rowsPerPage={rowsPerPage}
          page={page}
          labelRowsPerPage={'Alimentos por página:'}
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
          backIconButtonProps={{
            'aria-label': 'Anterior',
          }}
          nextIconButtonProps={{
            'aria-label': 'Siguiente',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={(e,foodDatabase)=>this.handleChangeRowsPerPage(e,foodDatabase)}
        />
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state){
  return{
    foods: state.foods,
    currentUserId: state.currentUser.user.id
  };
};

export default connect(mapStateToProps, null)(withStyles(styles)(EnhancedTable))