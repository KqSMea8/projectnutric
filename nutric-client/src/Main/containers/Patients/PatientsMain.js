import React, {Component} from 'react';
import {connect} from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import SnackbarContent from '@material-ui/core/SnackbarContent';
import moment from 'moment'
import 'moment/locale/es';

import '../../../App.css'
import PatientsList from '../../components/Patients/PatientsList.js';
import { fetchPatients, addPatient } from '../../store/actions/patients';
import { fetchAppointments } from '../../store/actions/appointments';


class PatientsMain extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  
  componentWillMount(){
    const { currentUserId } = this.props
    console.log(currentUserId);
    this.props.fetchPatients(currentUserId, console.log('patients were fetched'));
    this.props.fetchAppointments(currentUserId, console.log('appointments were fetched'));
    
  }
  

  render(){
    const numRows = 6; //num de filas q sera el default en la tabla
    const { appointments, patients, currentUserId } = this.props;
    console.log(appointments);
    let patientsList = patients.map(patient => {
      // ahorita solo tenemos el birthDate del paciente, age se calcularia aqui, o tb podria venir desde el back
      // falta hacer que cuando tenga menos de 7 pacientes, aparezcan las 7 - n filas en blanco
      // esto pq 7 va a ser el numero de pacientes q se vean pq calza con el height de screen - AppBar
      const { firstName, lastName, mail } = patient;
      return (
        [`${firstName} ${lastName}`, mail, '3era col', '4ta col']
      )
    });

    // if(patientsList.length < 7){
    //   let fillArray = [];
    //   for(let i = numRows; i > patientsList.length; i--){
    //     fillArray.push(new Array(4).fill(''));
    //     console.log(fillArray);
    //   }  
    // }
    
    
    let orderedWithMealPlan = [];
    patients.filter(patient=> {
       if( patient.mealPlans[0] !== undefined){
         orderedWithMealPlan.push(patient)
       }
      return orderedWithMealPlan; 
    })
    
    orderedWithMealPlan.sort(function(a,b){
      return new Date(a.endDate) - new Date(b.endDate);
    });
    
    //pacientes con meal plan, sorteado de meal plan mas proximo a mas lejano
    let top3Renewals = orderedWithMealPlan.slice(0,3)
      
    return (
      <Grid container>
        
        <Grid item style={{paddingRight: '30px', flex: 2}}>
          <PatientsList data={patientsList} numRows={numRows} currentUserId={currentUserId} />
        </Grid>

        <Grid container direction={'column'} justify={'space-between'} style={{flex: 1}}>
        
          <Paper justify='center' style={{height: '45%'}}>
            <SnackbarContent message={'Pacientes por renovar'} style={{width: '80%', margin: '-15px auto 0', textAlign: 'center', backgroundColor: '#3f51b5'}} />
            <Grid container style={{height: '86%'}}>
              <Grid container style={{padding: '16px 30px 0 30px', borderBottom: '1px solid black'}} >
                <Grid item xs={5}>Nombre</Grid>
                <Grid item style={{textAlign: 'center'}} xs={3}>Días</Grid>
                <Grid item style={{textAlign: 'end'}} xs={4}>Fecha fin</Grid>
              </Grid>
              {top3Renewals.map((renewal, i) => {
                const formattedEndDate = moment.utc(renewal.mealPlans[0].endDate).format('L');
                const remainingDays = moment().diff(renewal.mealPlans[0].endDate, 'days');
                let alpha = 1/(3.14*(i+1))
                return(
                  <Grid key={renewal._id} style={{padding: '8px 30px', backgroundColor: `rgba(255, 0, 0, ${alpha})`}} container alignItems='center'>
                    <Grid item xs={5} >
                      <Typography>{renewal.firstName} {renewal.lastName}</Typography>
                    </Grid>
                    <Grid item xs={3} style={{textAlign: 'center'}}>
                      <Typography>{remainingDays}</Typography> {/*dias restantes. OK, pero endDate de mealPlan solo pueden ser en el futuro*/}                 
                    </Grid>
                    <Grid item xs={4} style={{textAlign: 'end'}} >
                      <Typography>{formattedEndDate}</Typography> {/*fecha fin*/}                 
                    </Grid>
                  </Grid>
              )})}
            </Grid>
          </Paper>  
          
          
          <Paper justify='center' style={{height: '45%'}}>
            <SnackbarContent message={'Últimas consultas'} style={{width: '80%', margin: '-15px auto 0', textAlign: 'center', backgroundColor: '#3f51b5'}} />
            <Grid container style={{height: '86%'}}>
              <Grid container style={{padding: '16px 30px 0 30px', borderBottom: '1px solid black'}} >
                <Grid item xs={5}>Nombre</Grid>
                <Grid item style={{textAlign: 'center'}} xs={3}>Fecha</Grid>
                <Grid item style={{textAlign: 'end'}} xs={4}>Motivo</Grid>
              </Grid> 
              {/*==========HACER LOGICA DE ULTIMOS PACIENTES============*/}
              {top3Renewals.map((renewal, i) => {
                const formattedEndDate = moment.utc(renewal.mealPlans[0].endDate).format('L');
                const remainingDays = moment().diff(renewal.mealPlans[0].endDate, 'days');
                let alpha = 1/(3.14*(i+1))
                return(
                  <Grid key={renewal._id} style={{padding: '8px 30px', backgroundColor: `rgba(0, 0, 255, ${alpha})`}} container alignItems='center'>
                    <Grid item xs={5} >
                      <Typography>{renewal.firstName} {renewal.lastName}</Typography>
                    </Grid>
                    <Grid item xs={3} style={{textAlign: 'center'}}>
                      <Typography>{remainingDays}</Typography> {/*dias restantes. OK, pero endDate de mealPlan solo pueden ser en el futuro*/}                 
                    </Grid>
                    <Grid item xs={4} style={{textAlign: 'end'}} >
                      <Typography>{formattedEndDate}</Typography> {/*fecha fin*/}                 
                    </Grid>
                  </Grid>
              )})}
            </Grid>
          </Paper>  
          
        </Grid>
      </Grid>
    );
  }
};

function mapStateToProps(state){
  return{
    appointments: state.appointments,
    patients: state.patients,
    currentUserId: state.currentUser.user.id
  };
};
  
export default connect(mapStateToProps, {fetchPatients, addPatient, fetchAppointments})(PatientsMain);