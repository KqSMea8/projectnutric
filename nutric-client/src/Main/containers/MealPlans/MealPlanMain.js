// info de miniDashboard plan almenticio

import React, {Component} from 'react';
import {Link, Route, Switch, Redirect} from 'react-router-dom';
import {Grid, Table, TableBody, TableCell, TableHead, TableRow, Card, CardMedia, Typography} from '@material-ui/core'
import MealPlanCreate from './MealPlanCreate';
import MealPlanMainTable from '../../components/MealPlans/MealPlanMainTable'
import MealPlanTemplateCard from '../../components/MealPlans/MealPlanTemplateCard'
import plantilla_default from '../../images/plantilla_default.jpg';

const MealPlanMain = ({ match }) => {
  
  return(
    <div style={{height: '100%'}}>
      <Link to={`${match.url}/crear`} >Click para ir a /dietas/crear</Link>
      <Grid container style={{height: '100%'}}>
        <Grid container style={{height: '20%', paddingBottom: '20px', borderBottom: '1px solid #d3d3d3'}}>
          <Grid item xs={4}> 
            <Card style={{margin: '0 20px', height: '100%'}}>
              <Grid container style={{height: "100%"}}>
                <Grid item md={5} style={{height: "100%"}}>
                  <CardMedia 
                    image="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/State_flag_of_Peru%2C_T%C3%BAcume.jpg/200px-State_flag_of_Peru%2C_T%C3%BAcume.jpg"
                    title="afiche"
                    style={{height: "100%"}}
                  />
                </Grid>
                <Grid item md={7} style={{padding: '5px 5px 5px 10px'}}>
                  <Typography variant={'subtitle1'}>Tonificación Intensa</Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>
            
          <Grid item xs={4}>
            <Card style={{margin: '0 20px', height: '100%'}}>
              <Grid container style={{height: "100%"}}>
                <Grid item md={5} style={{height: "100%"}}>
                  <CardMedia 
                    image="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/State_flag_of_Peru%2C_T%C3%BAcume.jpg/200px-State_flag_of_Peru%2C_T%C3%BAcume.jpg"
                    title="afiche"
                    style={{height: "100%"}}
                  />
                </Grid>
                <Grid item md={7} style={{padding: '8px 5px 0px 5px'}}>
                  <Grid container style={{height: '100%'}}>
                    <Grid item xs={12}>
                      <Typography variant={'subtitle1'}>Mantenerse saludable</Typography>
                    </Grid>
                    <Grid item xs={12} >
                      <Grid container alignContent={'center'} style={{height: '100%', textAlign: 'center', alignItems: 'center'}}>
                        <Grid item xs={3}>
                          <Typography style={{fontSize: 'small'}}>2500</Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography style={{fontSize: 'small'}}>179gr</Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography style={{fontSize: 'small'}}>210gr</Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography style={{fontSize: 'small'}}>62gr</Typography>
                        </Grid>
                      </Grid>
                      
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          
          <Grid item xs={4}>
            <Card style={{margin: '0 20px', height: '100%'}}>
              <Grid container style={{height: "100%"}}>
                <Grid item md={5} style={{height: "100%"}}>
                  <CardMedia 
                    image="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/State_flag_of_Peru%2C_T%C3%BAcume.jpg/200px-State_flag_of_Peru%2C_T%C3%BAcume.jpg"
                    title="afiche"
                    style={{height: "100%"}}
                  />
                </Grid>
                <Grid item md={7} style={{padding: '5px 5px 5px 10px'}}>
                   <Typography variant={'subtitle1'}>Desarrollo muscular</Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      
        <Grid container spacing={40} style={{height: 'auto'}} > {/*spacing para los child*/}
          <Grid item xs={8} >
            <MealPlanMainTable /> {/*bug: con tabla,cuando scrolleo de costado navbar no es fixed*/}
          </Grid>
          
          <Grid item xs={4} >
            <Grid container style={{height: '100%'}}>
              <Grid item xs={12}> Grafico1 </Grid>
              <Grid item xs={12}> Grafico 2 </Grid>
            </Grid>
          </Grid>
      
      </Grid>
      
      </Grid>
      <Route 
        exact 
        path={`${match.path}/crear`} 
        render={() => (<MealPlanCreate />) }
      />
    </div>
      
  );
  
}


export default MealPlanMain;