import React, { Component }  from 'react';
import MUIDataTable from "mui-datatables";

const PatientsList = ({data, numRows}) => {
  const columns = ["Nombre", "Edad", "Email", "Activo"]; //ojo con PatientsMain y numcolumnas

  const options = {
    filterType: 'dropdown',
    rowsPerPage: numRows,
    rowsPerPageOptions: [numRows, numRows * 2, numRows * 3],
    textLabels:{
      body: '' //estp pa q cuando esten fetcheando los mensajes, aparezca en blanco el table
    },
    filterType: 'dropdown',
    // selectableRows: false,
    responsive: 'scroll'
  };  
  
  
  return(
    <MUIDataTable
      title={['Pacientes']}
      data={data}
      columns={columns}
      options={options}
    />
  )
}

export default PatientsList;