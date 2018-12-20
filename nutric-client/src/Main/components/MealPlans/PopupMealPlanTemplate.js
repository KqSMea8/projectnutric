import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';


const styles = {
    dialogPaper: {
        minHeight: '35vh',
        maxHeight: '35vh',
    }
};


class Popup extends Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  

  render() {
    const { classes, popupRemove } = this.props;
    
    return (
      <div>
        <IconButton disableRipple>
          <DeleteIcon style={{ color: "red" }} onClick={this.handleClickOpen}/>
        </IconButton>
        <Dialog
          classes={{paper:classes.dialogPaper}}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">¿Realmente quieres eliminar esta plantilla?</DialogTitle>
          <DialogContent>
            Esta acción no es reversible. Si haces click en eliminar, se borrará permanentemente esta plantilla. 
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} style={{color: 'blue'}}>Volver</Button>
            <Button onClick={popupRemove} variant="contained" color='secondary'>
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

Popup.propTypes = {
  classes: PropTypes.object.isRequired,
};

  
export default withStyles(styles)(Popup);