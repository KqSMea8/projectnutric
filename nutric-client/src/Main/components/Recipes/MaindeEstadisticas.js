import React, { Component }  from 'react';
import Grid from '@material-ui/core/Grid';
import Plot from 'react-plotly.js';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'



const styles = {
  card: {
    minWidth: 185,
    marginTop: 40,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  chart: {
    marginLeft: 10,
  },
};

class StatsMain extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  
  render(){
    
     const { classes } = this.props;

            
            
    return(<div> 
     <h1> Estadísticas de mi negocio </h1>
    

    <Grid container >
      <Grid container sm={12} >
        <Grid item sm={7} styles={{ marginBottom: 30}}>
      <Plot
        data={[
          {
            x: ["Enero","Febrero","Marzo","Abril","Mayo"],
            y: [1500, 2500, 2000, 2700, 3200, 3000],
            type: 'scatter',
            mode: 'lines+points',
            marker: {color: 'red'},
          },
        ]}
        layout={ {width: 700, height: 600, title: 'Ingresos a la fecha'} }
      />
        </Grid>
        <Grid item sm={1}  > </Grid>
        <Grid item sm={4}  >
         
          <Plot 
          data = {[
          {
            values: [43, 57],
            labels: ['Hombres', 'Mujeres'],
            type: 'pie'
          },
          ]}
          
          layout = { {height: 280, width: 380, title: 'Distribución de pacientes'}}
          
          />
         
        </Grid>
      </Grid>  
        
        <Grid container sm={12} >
          <Grid container sm={12}>
            <Grid item sm ={3}>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      12
                    </Typography>
                    <Typography component="p">
                      Pacientes activos a la fecha
                    </Typography>
                  </CardContent>
                  <CardActions>
                      <Link to="/pacientes">
                        <Button size="small">Ir a pacientes</Button>
                      </Link>
                  </CardActions>
              </Card>
            </Grid>
            <Grid item sm ={3}>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      S/.2900
                    </Typography>
                    <Typography component="p">
                      Ingresos del mes a la fecha
                    </Typography>
                  </CardContent>
                  <CardActions>
                      <Link to="/euy">
                        <Button size="small">Ir a mis Ingresos</Button>
                      </Link>
                  </CardActions>
              </Card>
            </Grid>
            <Grid item sm ={3}>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      40
                    </Typography>
                    <Typography component="p">
                      Consultas realizadas este mes
                    </Typography>
                  </CardContent>
                  <CardActions>
                      <Link to="/pacientes">
                        <Button size="small">Ir a pacientes</Button>
                      </Link>
                  </CardActions>
              </Card>
            </Grid>
            <Grid item sm ={3}>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      34 minutos
                    </Typography>
                    <Typography component="p">
                      Tiempo medio por consulta
                    </Typography>
                  </CardContent>
                  <CardActions>
                      <Link to="/pacientes">
                        <Button size="small">Ir a pacientes</Button>
                      </Link>
                  </CardActions>
              </Card>
            </Grid>
          </Grid>
          <Grid container sm={12}>
            <Grid item sm ={4}>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      80%
                    </Typography>
                    <Typography component="p">
                      Clientes Satisfechos este mes
                    </Typography>
                  </CardContent>
                  <CardActions>
                      <Link to="/pacientes">
                        <Button size="small">Ir a mis planes</Button>
                      </Link>
                  </CardActions>
              </Card>
            </Grid>
            <Grid item sm ={4}>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      3 consultas S/.100
                    </Typography>
                    <Typography component="p">
                      Paquete nutricional mas popular
                    </Typography>
                  </CardContent>
                  <CardActions>
                      <Link to="/euy">
                        <Button size="small">Ir a mis Ingresos</Button>
                      </Link>
                  </CardActions>
              </Card>
            </Grid>
            <Grid item sm ={4}>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      2 meses
                    </Typography>
                    <Typography component="p">
                      Promedio de estadía de un paciente
                    </Typography>
                  </CardContent>
                  <CardActions>
                      <Link to="/pacientes">
                        <Button size="small">Ir a pacientes</Button>
                      </Link>
                  </CardActions>
              </Card>
            </Grid>
          </Grid>
          <Grid container sm={12}>
            <Grid item sm ={4}>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      Brocoli
                    </Typography>
                    <Typography component="p">
                      Comida más utilizada
                    </Typography>
                  </CardContent>
                  <CardActions>
                      <Link to="/dietas">
                        <Button size="small">Ir a dietas</Button>
                      </Link>
                  </CardActions>
              </Card>
            </Grid>
            <Grid item sm ={4}>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      Dieta 1200 kcal
                    </Typography>
                    <Typography component="p">
                      Plantilla más utilizada
                    </Typography>
                  </CardContent>
                  <CardActions>
                      <Link to="/euy">
                        <Button size="small">Ir a mis plantillas</Button>
                      </Link>
                  </CardActions>
              </Card>
            </Grid>
            <Grid item sm ={4}>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      850 kilos
                    </Typography>
                    <Typography component="p">
                      Has disminuido en tus pacientes
                    </Typography>
                  </CardContent>
                  <CardActions>
                      <Link to="/pacientes">
                        <Button size="small">Ir a pacientes</Button>
                      </Link>
                  </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Grid>
    </Grid>

    
    </div>)
  }
  
}

StatsMain.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StatsMain);

