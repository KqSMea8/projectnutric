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
import Input from '@material-ui/core/Input';
import {apiCall} from '../../services/api'
import SearchDropdown from './SearchDropdown'


import moment from 'moment';
import 'moment/locale/es';

import "antd/dist/antd.css";
import { TimePicker } from "antd";
import { DatePicker } from "antd";

const styles = {
    dialogPaper: {
        minHeight: '85vh',
        maxHeight: '85vh',
    }
};


class Popup extends Component {
  state = {
    open: false,
    multiline:"",
    scheduledTimeDuration: 45,
    notes:"",
    patient:"",
    endTime: moment().add(15 - (moment().minute() % 15), "minutes").add(45, "minutes").set({second:0, millisecond:0}),
    startTime: moment().add(15 - (moment().minute() % 15), "minutes").set({second:0, millisecond:0}),
    date: moment().set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { currentUserId } = this.props
    // scheduledTimeStart,
    const scheduledTimeStart=this.state.date.set({hour: this.state.startTime.hours(), minute: this.state.startTime.minutes()}).toDate()
    // scheduledTimeEnd,
    const scheduledTimeEnd=this.state.date.set({hour: this.state.endTime.hours(), minute: this.state.endTime.minutes()}).toDate()
    // scheduledTimeDuration,
    const duration=this.state.endTime.diff(this.state.startTime, "minutes")
       
    apiCall("post", `/api/experts/${currentUserId}/scheduledappointments/`,{
      scheduledTimeStart:scheduledTimeStart,
      scheduledTimeEnd:scheduledTimeEnd,
      scheduledTimeDuration:duration,
      notes:this.state.notes,
      patient_id:this.state.patient,
    })
    .then(res => {
      console.log(res);
      // ¿Cómo se redirigía con history?
      window.location.href="/agenda"
    })
    .catch(err => {
      console.log(err)
    });
  }

  onPatientSelected = (patientId) => {
    this.setState({ patient: patientId.value });
  };
  
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  
  handleTimeChange = name => time => {
    this.setState({
      [name]: time.set({second:0, millisecond:0})
    });
  };
  
  handleTimeChangeStart = time => {
    this.setState({ startTime: time, endTime: time});
  };

  handleDateChange = date => {
    this.setState({ date: date.set({ hour: 0, minute: 0, second: 0, millisecond: 0 }) });
  };
  disabledDate = current => {
    return (
      current &&
      current <
        moment()
          .subtract(1, "days")
          .endOf("day")
    );
  };

  getDisabledHours = () => {
    var hours = [];
    for (var i = 0; i < moment().hour(); i++) {
      hours.push(i);
    }
    return hours;
  };

  getDisabledHoursEnd = () => {
    var hours = [];
    for (var i = 0; i < this.state.startTime.hour(); i++) {
      hours.push(i);
    }
    return hours;
  };

  getDisabledMinutes = selectedHour => {
    var minutes = [];
    if (selectedHour === moment().hour()) {
      for (var i = 0; i < moment().minute(); i++) {
        minutes.push(i);
      }
    }
    return minutes;
  };

  getDisabledMinutesEnd = selectedHour => {
    var minutes = [];
    if (selectedHour === this.state.startTime.hour()) {
      for (var i = 0; i < this.state.startTime.minute() + 1; i++) {
        minutes.push(i);
      }
    }
    return minutes;
  };
  
  render() {
    const {currentUserId, patient}=this.props
    const { classes } = this.props;
    
    return (
      <div>
        <Button variant="outlined" color="secondary" onClick={this.handleClickOpen}>
          <Add/> Agendar cita
        </Button> 
        <Dialog
          classes={{paper:classes.dialogPaper}}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Agendar nueva cita</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <Grid container direction="row" justify="space-between" alignItems="baseline">
                <Grid container direction="row" justify="space-between" alignItems="flex-start">
                  <Grid item md={8} xs={12}>  
                    <Grid container justify="space-between" alignItems="center">
                      <Grid item md={3} xs={4}>Paciente:</Grid>
                      <Grid item md={9} xs={8}>
                          <SearchDropdown patient={patient} onPatientSelected={this.onPatientSelected}/>
                      </Grid>
                    </Grid>
                  </Grid>  
                  <Grid item md={1} xs={12} align="center">o</Grid>
                  <Grid item md={3} xs={12} align="center">
                    <NavLink to="/pacientes">
                      <Button variant="outlined" color="primary" size="small" style={{margin: "5px 0px"}}>
                        <Add/>
                        Nuevo Paciente
                      </Button>
                    </NavLink>
                  </Grid>
                </Grid>
                <Grid container direction="row" justify="center" alignItems="baseline" spacing={40}>
                  <Grid item md={2} xs={4}>Fecha:</Grid>
                  <Grid item md={10} xs={8}>
                    <DatePicker
                      value={this.state.date}
                      onChange={this.handleDateChange}
                      format={"DD/MMMM/YYYY"}
                      placeholder="Fecha"
                      showToday={false}
                      disabledDate={this.disabledDate}
                      allowClear={false}
                    />
                  </Grid>
                  <Grid item md={2} xs={4}>Inicio:</Grid>
                  <Grid item md={4} xs={8}>
                    <TimePicker
                      use12Hours
                      value={this.state.startTime}
                      onChange={this.handleTimeChangeStart}
                      format={"h:mm a"}
                      placeholder="Inicio"
                      disabledHours={this.getDisabledHours}
                      disabledMinutes={this.getDisabledMinutes}
                      minuteStep={5}
                      allowEmpty={false}
                    />
                  </Grid>
                  <Grid item md={2} xs={4}>Fin:</Grid>
                  <Grid item md={4} xs={8}>
                    <TimePicker
                      use12Hours
                      value={this.state.endTime}
                      onChange={this.handleTimeChange("endTime")}
                      format={"h:mm a"}
                      placeholder="Fin"
                      disabledHours={this.getDisabledHoursEnd}
                      disabledMinutes={this.getDisabledMinutesEnd}
                      minuteStep={5}
                      allowEmpty={false}
                    />
                  </Grid>
                  <Grid item md={2} xs={4}>Duración:</Grid>
                  <Grid item md={5} xs={8}>
                        <Input
                          type="number"
                          disabled
                          placeholder="tiempo (minutos)"
                          value={moment(this.state.endTime).diff(this.state.startTime, "minutes")}
                          onChange={this.handleChange('scheduledTimeDuration')}
                        /><span> minutos</span>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-multiline-flexible"
                      label="Descripción (opcional)"
                      multiline
                      rowsMax="4"
                      value={this.state.notes}
                      onChange={this.handleChange('notes')}
                      margin="normal"
                      variant="outlined"
                      fullWidth
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
              Agendar cita
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

function mapStateToProps(state){
  return{
    patients: state.patients,
    currentUserId: state.currentUser.user.id
  };
};
  
export default connect(mapStateToProps, null)(withStyles(styles)(Popup));