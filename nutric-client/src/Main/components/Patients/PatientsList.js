import React, { Component }  from 'react';
import MUIDataTable from "mui-datatables";
import IconButton from '@material-ui/core/IconButton';
import PersonAdd from '@material-ui/icons/PersonAdd';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import PopupAddPatient from './PopupAddPatient';
import Paper from '@material-ui/core/Paper';

import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';


class PatientsList extends Component {

  getMuiTheme = () => createMuiTheme({
    overrides: {
      MUIDataTable: {
        paper: {
          paddingTop: "40px"
        }
      }
    }
  })
  
  
  render(){
    const {data, numRows, addPatient, currentUser} = this.props;
    const columns = ["Nombre", "Edad", "Email", "Activo"]; //ojo con PatientsMain y numcolumnas
  
    const options = {
      filterType: 'dropdown',
      rowsPerPage: numRows,
      rowsPerPageOptions: [numRows, numRows * 2, numRows * 3],
      textLabels: { body: '' },     //estp pa q cuando esten fetcheando los mensajes, aparezca en blanco el table
      filterType: 'dropdown',
      responsive: 'scroll',
    }
    
    const action = (
      <PopupAddPatient addPatient={addPatient} currentUser={currentUser} />
    );
  
  return(
    <div>
      {/*falta alinearlo horizontalmente. No se como pq es absolute*/}
      <SnackbarContent  
        message={'Mis pacientes'} 
        action={action} 
        
        style={{position: 'absolute', width: '80%', margin: '-15px auto 0', justifyContent: 'center', backgroundColor: '#3f51b5'}} 
      />
      <MuiThemeProvider theme={this.getMuiTheme()}>
        <MUIDataTable
          data={data}
          columns={columns}
          options={options}
          style={{paddingTop: '30px'}}
        />
      </MuiThemeProvider>  
    </div>
  
  )}
}

export default PatientsList;