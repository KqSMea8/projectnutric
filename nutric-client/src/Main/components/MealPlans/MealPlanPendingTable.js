import React, { Component }  from 'react';
import MUIDataTable from "mui-datatables";

const PendingMealPlans = ({mealPlansList, numRows}) => {
  
  const columns = ["Paciente", "Fecha de creación", "Objetivo", "Progreso"]; //ojo con PatientsMain y numcolumnas
  const options = {
    filterType: 'dropdown',
    rowsPerPage: numRows,
    rowsPerPageOptions: [numRows, numRows * 2, numRows * 3],
    textLabels:{
      body: '' //cuando esten fetcheando los mensajes, aparezca en blanco el table.
    },
    filterType: 'dropdown',
    responsive: 'scroll'
  };  

  // es pending si mealPlan.progess < 100%
  const pendingMealPlansList = mealPlansList.filter(m => {
    if(m==null){
      return null
    }
   let progress = m[3]
   return progress < 100
  })

  return(
    <MUIDataTable
      title={['Planes alimenticios pendientes']}
      data={pendingMealPlansList}
      columns={columns}
      options={options}
    />
  )
}

export default PendingMealPlans;