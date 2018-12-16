import React, { Component }  from 'react';
import MUIDataTable from "mui-datatables";

const PatientsSlideShow = ({data}) => {
  const columns = ["Nombre", 'Días restantes'];

  
  const options = {
    filterType: 'checkbox',
    rowsPerPage: 3,
    rowsPerPageOptions: [5,10,15],
    textLabels:{
      body: '' //estp pa q cuando esten fetcheando los mensajes, aparezca en blanco el table
    }
  };  
  // falta hacer que cuando tenga menos de 7 pacientes, aparezcan las 7 - n filas en blanco
  return(
    <MUIDataTable
      title={'Pacientes por renovar'}
      data={data}
      columns={columns}
      options={options}
    />
  )
}

export default PatientsSlideShow;