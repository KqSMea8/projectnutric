import React, {Component} from 'react';
import {connect} from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SnackbarContent from '@material-ui/core/SnackbarContent';

import '../../../App.css'
import PatientsList from '../../components/Patients/PatientsList.js';
import PatientsSlideShow from '../../components/Patients/PatientsSlideShow.js';
// import Patients2SliderShow from '../../components/Patients/Patients2SliderShow.js';
import {fetchPatients} from '../../store/actions/patients';


class PatientsMain extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  
  componentWillMount(){
    const { currentUserId } = this.props;
    this.props.fetchPatients(currentUserId, console.log('was fetched'));
  }
  

  render(){
    const numRows = 7 //num de filas q sera el default en la tabla
    const { patients } = this.props;
    let patientsList = patients.map(patient => {
      // ahorita solo tenemos el birthDate del paciente, age se calcularia aqui, o tb podria venir desde el back
      // falta hacer que cuando tenga menos de 7 pacientes, aparezcan las 7 - n filas en blanco
      // esto pq 7 va a ser el numero de pacientes q se vean pq calza con el height de screen - AppBar
      const { firstName, lastName, mail, age } = patient;
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
    
    // es activo si tiene mealPlan. Sortear endDate de mealPlans pacientes activos y poner top 3

  //     setTimeout(() => {
  //   var x =activePatients[0];
  // }, 500);
   
  // setTimeout(() => {
  //   console.log(activePatients[0].createdAt);
  // }, 1000);

    
    // var x = JSON.parse(JSON.stringify(activePatients))
    // console.log(x)
    // console.log(x["0"][0])
    
    

   
    // var x =(Object.keys(activePatients[0]));
    // console.log(x.allergies)
    // no se pq no puedo acceder a activePatients[0].mealPlans
    // ahi se hace el sort a traves de endDate y ya
    const activePatients=patients.filter(patient=> patient.mealPlans.length >0)
    return (
      <Grid container>
        
        <Grid item style={{paddingRight: '30px', flex: 2}}>
          <PatientsList data={patientsList} numRows={numRows} />
        </Grid>

        <Grid container direction={'column'} justify={'space-between'} style={{flex: 1}}>
        
          <Paper style={{height: '45%'}}>
            {/*<SnackbarContent message={'Pacientes por vencer'} style={{width: '80%', margin: '-15px auto 0', alignSelf: 'center', backgroundColor: '#3f51b5'}} />*/}
            <Grid container direction={'column'} justify={'center'} style={{height: '80%'}}>
              <Grid item>
                {activePatients.map((patient,key) => 
                    <Grid key={key} item style={{flex: 1}}>{patient.mealPlans[0]._id.toString()}</Grid>
                )}
              </Grid>
            </Grid>
            
          </Paper>  
          
          <Paper style={{height: '45%'}}>
            <SnackbarContent message={'Últimos pacientes'} style={{width: '80%', margin: '-15px auto 0', alignSelf: 'center', backgroundColor: '#3f51b5'}} />
            <Grid container style={{height: '100%'}}>
              <Grid item style={{flex: 1}}>1</Grid>
              <Grid item style={{flex: 1}}>2</Grid>
              <Grid item style={{flex: 1}}>3</Grid>
            </Grid>  
          </Paper>  
        </Grid>
      </Grid>
    )

  }
  
};

function mapStateToProps(state){
  return{
    patients: state.patients,
    currentUserId: state.currentUser.user.id
  };
};
  
export default connect(mapStateToProps, {fetchPatients})(PatientsMain);