import React, { Component }  from 'react';
import Grid from '@material-ui/core/Grid';
import Plotly from 'plotly.js-dist'




class StatsMain extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  
  render(){
    
              let trace1 = {
              x: [1, 2, 3, 4],
              y: [10, 15, 13, 17],
              type: 'scatter'
            };
              
            
            var trace2 = {
              x: [1, 2, 3, 4],
              y: [16, 5, 11, 9],
              type: 'scatter'
            };
            
            var data = [trace1, trace2];
            
            Plotly.newPlot('myDiv', data);
            
            
    return(<div> 
     <h1> Estadísticas de mi negocio </h1>
    

    <Grid container >
        <Grid item sm>
    <div id="myDiv">
    </div>

        </Grid>
        <Grid item sm>
          Right Pane
        </Grid>
    </Grid>
   
    
    
    </div>)
  }
  
}
export default StatsMain ;