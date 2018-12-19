import React, { Component }  from 'react';
import MUIDataTable from "mui-datatables";
import RecipeListCss from '../../../RecipeList.css'

const RecipesList = ({data, numRows}) => {
  const columns = ["Nombre", "Categoria", "Fecha de Creacion", "Número de Ingredientes"];

  const options = {
    filterType: 'dropdown',
    rowsPerPage: numRows,
    rowsPerPageOptions: [numRows, numRows * 2, numRows * 3],
    textLabels:{
      body: '' 
    },
    filterType: 'dropdown',
    // selectableRows: false,
    responsive: 'scroll',
    

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