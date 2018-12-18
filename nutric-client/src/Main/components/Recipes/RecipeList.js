import React, { Component }  from 'react';
import MUIDataTable from "mui-datatables";

const RecipesList = ({data, numRows}) => {
  const columns = ["Nombre", "Fecha de Creacion", "Numero de Ingredientes", "Veces Usada"];

  const options = {
    filterType: 'dropdown',
    rowsPerPage: numRows,
    rowsPerPageOptions: [numRows, numRows * 2, numRows * 3],
    textLabels:{
      body: '' 
    },
    filterType: 'dropdown',
    // selectableRows: false,
    responsive: 'scroll'
  };  
  
  
  return(
    <MUIDataTable
      title={['Recetas']}
      data={data}
      columns={columns}
      options={options}
    />
  )
}

export default RecipesList;