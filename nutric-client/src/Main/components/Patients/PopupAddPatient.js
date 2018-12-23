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
    group: {
      width: 'auto',
      height: 'auto',
      display: 'flex',
      flexWrap: 'nowrap',
      flexDirection: 'row',
    },
    label: {
      textAlign: 'end',
      paddingRight: '20px'
    },
    rowContainer: {
      paddingBottom: '12px'
    }
});


class PopupAddPatient extends Component {
  state = {
    open: false,
    firstName:'',
    lastName: '',
    mail: '',
    birthDate: '',
    sexValue: '',
    nationality: ''
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { currentUserId } = this.props
       
    // apiCall("post", `/api/experts/${currentUserId}/scheduledappointments/`,{
    //   scheduledTimeStart:scheduledTimeStart,
    //   scheduledTimeEnd:scheduledTimeEnd,
    //   scheduledTimeDuration:duration,
    //   notes:this.state.notes,
    //   patient_id:this.state.patient,
    // })
    // .then(res => {
    //   console.log(res);
    //   // ¿Cómo se redirigía con history?
    //   window.location.href="/agenda"
    // })
    // .catch(err => {
    //   console.log(err)
    // });
  }


  
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  
  handleTextChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  
  handleDateChange = date => {
    this.setState({ date: date.set({ hour: 0, minute: 0, second: 0, millisecond: 0 }) });
  };
  // disabledDate = current => {
  //   return (
  //     current &&
  //     current <
  //       moment()
  //         .subtract(1, "days")
  //         .endOf("day")
  //   );
  // };
  
  handleFormControlChange = event => {
    this.setState({ sexValue: event.target.value });
  };

  selectNationality = val => {
    this.setState({ nationality: val });
  }
  
  render() {
    const {currentUserId, patient}=this.props
    const { classes } = this.props;
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
          <DialogTitle id="form-dialog-title">
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
                  <Grid item xs={8}>
                    <Input
                      onChange={this.handleTextChange}
                      placeholder="ej: María"
                      className={classes.input}
                      inputProps={{
                        'aria-label': 'Description',
                      }}
                    />
                  </Grid>
                </Grid>
                
                <Grid container alignItems='center' className={classes.rowContainer}>
                  <Grid item xs={4} className={classes.label}>Apellido:</Grid>
                  <Grid item xs={8}>
                    <Input
                      onChange={this.handleTextChange}
                      placeholder="ej: García"
                      className={classes.input}
                      inputProps={{
                        'aria-label': 'Description',
                      }}
                    />
                  </Grid>
                </Grid>
                
                <Grid container alignItems='center' className={classes.rowContainer}>
                  <Grid item xs={4} className={classes.label}>Email:</Grid>
                  <Grid item xs={8}>
                    <Input
                      onChange={this.handleTextChange}
                      placeholder="ej: m.garcia@gmail.com"
                      className={classes.input}
                      inputProps={{
                        'aria-label': 'Description',
                      }}
                    />
                  </Grid>
                </Grid>
                
                <Grid container alignItems='center' className={classes.rowContainer}>
                  <Grid item xs={4} className={classes.label}>Fecha de nacimiento:</Grid>
                  <Grid item xs={8}>
                    <DatePicker
                      value={this.state.birthDate}
                      onChange={this.handleDateChange}
                      format={"DD/MMMM/YYYY"}
                      placeholder="Fecha"
                      showToday={false}
                      disabledDate={this.disabledDate}
                      allowClear={false}
                    />
                  </Grid>
                </Grid>
                
                <Grid container alignItems='center' className={classes.rowContainer}>
                  <Grid item xs={4} className={classes.label}>Sexo:</Grid>
                  <Grid item xs={8}>
                      <RadioGroup
                        aria-label="Sex"
                        name="gender1"
                        className={classes.group}
                        value={this.state.sexValue}
                        onChange={this.handleFormControlChange}
                      >
                        <FormControlLabel value="Male" control={<Radio style={{padding: '0 12px'}} />} label="Hombre" />
                        <FormControlLabel value="Female" control={<Radio style={{padding: '0 12px'}} />} label="Mujer" />
                      </RadioGroup>
                  </Grid>
                </Grid>
                
                <Grid container alignItems='center' className={classes.rowContainer}>
                  <Grid item xs={4} className={classes.label}>Teléfono</Grid>
                  <Grid item xs={8}>
                    <Input
                      onChange={this.handleTextChange}
                      placeholder="ej: 999123123"
                      className={classes.input}
                      inputProps={{
                        'aria-label': 'Description',
                      }}
                    />
                  </Grid>
                </Grid>
                
                <Grid container alignItems='center' className={classes.rowContainer}>
                  <Grid item xs={4} className={classes.label}>Nacionalidad:</Grid>
                  <Grid item xs={8} >
                    <CountryDropdown
                      priorityOptions={['PE']}
                      defaultOptionLabel='Selecciona un país'
                      value={this.state.nationality}
                      onChange={val => this.selectNationality(val)}
                      style={{maxWidth: '60px'}}
                    />
                  </Grid>
                </Grid>
                
                <Grid container alignItems='center' className={classes.rowContainer}>
                  <Grid item xs={4} className={classes.label}>Dirección:</Grid>
                  <Grid item xs={8}>
                    <Input
                      onChange={this.handleTextChange}
                      placeholder="ej: Calle Comesano 123"
                      className={classes.input}
                      inputProps={{
                        'aria-label': 'Description',
                      }}
                    />
                  </Grid>
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
    patients: state.patients,
    currentUserId: state.currentUser.user.id
  };
};
  
export default connect(mapStateToProps, null)(withStyles(styles)(PopupAddPatient));