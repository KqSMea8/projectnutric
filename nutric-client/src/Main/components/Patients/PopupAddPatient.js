import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import {apiCall} from '../../services/api'
import IconButton from '@material-ui/core/IconButton';
import PersonAdd from '@material-ui/icons/PersonAdd';

import { CountryDropdown } from 'react-country-region-selector';

import moment from 'moment';
import "antd/dist/antd.css";
import { DatePicker } from "antd";

const styles = theme => ({
    dialogPaper: { //dimensiones del popup
        minHeight: '85vh',
        maxHeight: '85vh',
    },
    dialogTitle: {
      paddingBottom: '10px'
    },
    group: {
      width: 'auto',
      height: 'auto',
      display: 'flex',
      flexWrap: 'nowrap',
      flexDirection: 'row'
    },
    inputField: {
      width: '100%'
    },
    DatePickerField: {
      width: '100%',
      borderRadius: '5px',
      height: '30px'
    },
    label: {
      textAlign: 'end',
      paddingRight: '20px'
    },
    rowContainer: {
      paddingBottom: '9px'
    }
});


class PopupAddPatient extends Component {
  state = {
    open: false,
    firstName:'',
    lastName: '',
    mail: '',
    phone: '',
    gender: '',
    birthDate: '',
    nationality: '',
    idNumber: '',
    address: ''
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { currentUserId, addPatient, history } = this.props;
    const  { firstName, lastName, mail, phone, gender, birthDate, nationality, idNumber, address } = this.state
    addPatient(currentUserId, firstName, lastName, mail, phone, gender, birthDate, nationality, idNumber, address);
  // falta hacer que el paciente aparezca automaticamente despues de que lo agrgeue
    this.handleClose();
    // quizas poner fetchpatients aqui, o hacer que se rerenderee PatientsList
  }


  
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  
  handleTextChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  
  handleDateChange = date => {
    this.setState({ birthDate: date.set({ hour: 0, minute: 0, second: 0, millisecond: 0 }) });
  };

  handleFormControlChange = event => {
    this.setState({ gender: event.target.value });
  };

  selectNationality = val => {
    this.setState({ nationality: val });
  }
  
  render() {
    const { classes, patient } = this.props;
    return (
      <div>
        <IconButton onClick={this.handleClickOpen}>
          <PersonAdd />
        </IconButton>
        <Dialog
          classes={{paper:classes.dialogPaper}}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
            Agregar paciente
          </DialogTitle>
          <DialogContent>
            <DialogContentText style={{marginBottom: '15px'}}>
              Completa el formulario con los datos del nuevo paciente.
            </DialogContentText>
            <form onSubmit={this.handleSubmit} style={{padding: '0 40px'}}>
              <Grid container direction='row' >
              
                <Grid container alignItems='center' className={classes.rowContainer}>
                  <Grid item xs={4} className={classes.label}>Nombre:</Grid>
                  <Grid item xs={6} >
                    <Input
                      value={this.state.firstName}
                      onChange={this.handleTextChange('firstName')}
                      placeholder="ej: María"
                      className={classes.inputField}
                      inputProps={{
                        'aria-label': 'Description',
                      }}
                    />
                  </Grid>
                  <Grid item xs={2} style={{height: '100%'}}/>
                </Grid>
                
                <Grid container alignItems='center' className={classes.rowContainer}>
                  <Grid item xs={4} className={classes.label}>Apellido:</Grid>
                  <Grid item xs={6}>
                    <Input
                      value={this.state.lastName}
                      onChange={this.handleTextChange('lastName')}
                      placeholder="ej: García"
                      className={classes.inputField}
                      inputProps={{
                        'aria-label': 'Description',
                      }}
                    />
                  </Grid>
                  <Grid item xs={2} style={{height: '100%'}}/>
                </Grid>
                
                <Grid container alignItems='center' className={classes.rowContainer}>
                  <Grid item xs={4} className={classes.label}>Sexo:</Grid>
                  <Grid item xs={6}>
                      <RadioGroup
                        aria-label="Sex"
                        className={classes.group}
                        value={this.state.gender}
                        onChange={this.handleFormControlChange}
                      >
                        <FormControlLabel value="Male" control={<Radio style={{padding: '0 12px'}} />} label="Hombre" />
                        <FormControlLabel value="Female" control={<Radio style={{padding: '0 12px'}} />} label="Mujer" />
                      </RadioGroup>
                  </Grid>
                  <Grid item xs={2} style={{height: '100%'}}/>
                </Grid>
                
                <Grid container alignItems='center' className={classes.rowContainer}>
                  <Grid item xs={4} className={classes.label}>Fecha de nacimiento:</Grid>
                  <Grid item xs={6}>
                    <DatePicker
                      value={this.state.birthDate}
                      onChange={this.handleDateChange}
                      format={"DD/MM/YYYY"}
                      placeholder="Fecha"
                      showToday={false}
                      disabledDate={this.disabledDate}
                      allowClear={false}
                      className={classes.DatePickerField}
                    />
                  </Grid>
                  <Grid item xs={2} style={{height: '100%'}}/>
                </Grid>
                
                <Grid container alignItems='center' className={classes.rowContainer}>
                  <Grid item xs={4} className={classes.label}>Email:</Grid>
                  <Grid item xs={6}>
                    <Input
                      onChange={this.handleTextChange('mail')}
                      placeholder="ej: m.garcia@gmail.com"
                      className={classes.inputField}
                      inputProps={{
                        'aria-label': 'Description',
                      }}
                    />
                  </Grid>
                  <Grid item xs={2} style={{height: '100%'}}/>
                </Grid>
                
                <Grid container alignItems='center' className={classes.rowContainer}>
                  <Grid item xs={4} className={classes.label}>DNI:</Grid>
                  <Grid item xs={6}>
                    <Input
                      onChange={this.handleTextChange}
                      placeholder="ej: 70412345"
                      className={classes.inputField}
                      inputProps={{
                        'aria-label': 'Description',
                      }}
                    />
                  </Grid>
                  <Grid item xs={2} style={{height: '100%'}}/>
                </Grid>
                
                <Grid container alignItems='center' className={classes.rowContainer}>
                  <Grid item xs={4} className={classes.label}>Teléfono:</Grid>
                  <Grid item xs={6}>
                    <Input
                      onChange={this.handleTextChange('phone')}
                      placeholder="ej: 999123123"
                      className={classes.inputField}
                      inputProps={{
                        'aria-label': 'Description',
                      }}
                    />
                  </Grid>
                  <Grid item xs={2} style={{height: '100%'}}/>
                </Grid>
                
                <Grid container alignItems='center' className={classes.rowContainer}>
                  <Grid item xs={4} className={classes.label}>Nacionalidad:</Grid>
                  <Grid item xs={6} >
                    <CountryDropdown
                      // priorityOptions={['PE']}
                      defaultOptionLabel='Selecciona un país'
                      value={this.state.nationality}
                      onChange={val => this.selectNationality(val)}
                      className={classes.inputField}
                    />
                  </Grid>
                  <Grid item xs={2} style={{height: '100%'}}/>
                </Grid>
                
                <Grid container alignItems='center' className={classes.rowContainer}>
                  <Grid item xs={4} className={classes.label}>Dirección:</Grid>
                  <Grid item xs={6}>
                    <Input
                      onChange={this.handleTextChange('address')}
                      placeholder="ej: Calle Comesano 123"
                      className={classes.inputField}
                      inputProps={{
                        'aria-label': 'Description',
                      }}
                    />
                  </Grid>
                  <Grid item xs={2} style={{height: '100%'}}/>
                </Grid>
                
              </Grid>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Cerrar
            </Button>
            <Button onClick={this.handleSubmit} variant="contained" color="primary">
              Crear Paciente
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

PopupAddPatient.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state){
  return{
    error: state.error,
    patients: state.patients,
    currentUserId: state.currentUser.user.id
  };
};
  
export default connect(mapStateToProps, null)(withStyles(styles)(PopupAddPatient));