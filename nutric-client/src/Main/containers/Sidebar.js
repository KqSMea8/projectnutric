import React, {Component} from "react";
import {  NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InboxIcon from "@material-ui/icons/MoveToInbox";

import Person from "@material-ui/icons/Person";
import DashboardIcon from "@material-ui/icons/Dashboard";
import CalendarToday from "@material-ui/icons/CalendarToday";
import Event from "@material-ui/icons/Event";
import InsertChart from "@material-ui/icons/InsertChart";
import Restaurant from "@material-ui/icons/Restaurant";

import Grid from "@material-ui/core/Grid";
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Typography from '@material-ui/core/Typography';

import logoXL from '../images/logoXL.svg';

const drawerWidth = 200;

const styles = theme => ({
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9 + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-middle",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  mainLogo: {
    textAlign: "center"
  },

});
class Sidebar extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <CssBaseline />
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.props.open,
            [classes.drawerClose]: !this.props.open
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.props.open,
              [classes.drawerClose]: !this.props.open
            })
          }}
          open={this.props.open}
        >
          <div
            style={{ height: "180px" }}
            className={classNames({
              [classes.hide]: !this.props.open,
              [classes.mainLogo]: true
            })}
          >
            <div style={{height:"140px", width:"140px", margin: "5px auto"}}><img style={{height:"100%", width:"100%"}} src={logoXL}/></div>
            <div>Consultorio María Matayuca</div>
          </div>
          <div
            style={{ height: "64px" }}
            className={classNames({
              [classes.hide]: this.props.open,
              [classes.mainLogo]: true
            })}
          >
            <div style={{height:"64px", width:"60px", margin:"auto"}}><img style={{height:"100%", width:"100%"}} src={logoXL}/></div>
          </div>
          <Divider />
          <List>
            <Tooltip TransitionComponent={Zoom} title={!this.props.open ?"Inicio":""} placement="right">
              <NavLink to="/inicio" activeClassName="activeLink">
                <ListItem button key="dashboard">
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <Typography style={(this.props.open ? {padding:"0"}:{padding:"0 16px"})}>Inicio</Typography>
                </ListItem>
              </NavLink>
            </Tooltip>
            <Tooltip TransitionComponent={Zoom} title={!this.props.open ?"Pacientes":""} placement="right">
              <NavLink to="/pacientes" activeClassName="activeLink">
                <ListItem button key="patients">
                  <ListItemIcon>
                    <Person style={{ color: "#007bff" }}/>
                  </ListItemIcon>
                  <Typography style={(this.props.open ? {padding:"0"}:{padding:"0 16px"})}>Pacientes</Typography>
                </ListItem>
              </NavLink>
            </Tooltip>
            <Tooltip TransitionComponent={Zoom} title={!this.props.open ?"Agenda":""} placement="right">
              <NavLink to="/agenda" activeClassName="activeLink" >
                <ListItem button key="schedule">
                  <ListItemIcon>
                    <CalendarToday style={{ color: "red" }}/>
                  </ListItemIcon>
                  <Typography style={(this.props.open ? {padding:"0"}:{padding:"0 16px"})}>Agenda</Typography>
                </ListItem>
              </NavLink>
            </Tooltip>
            <Tooltip TransitionComponent={Zoom} title={!this.props.open ?"Planes Alimenticios":""} placement="right">
              <NavLink to="/dietas" activeClassName="activeLink">
                <ListItem button key="mealplan">
                  <ListItemIcon>
                    <Restaurant style={{ color: "#f1c55c" }} />
                  </ListItemIcon>
                  <Typography style={(this.props.open ? {padding:"0"}:{padding:"0 16px"})}>Planes Alimenticios</Typography>
                </ListItem>
              </NavLink>
            </Tooltip>
            <Tooltip TransitionComponent={Zoom} title={!this.props.open ?"Recetas":""} placement="right">
              <NavLink to="/recetas" activeClassName="activeLink">
                <ListItem button key="templates">
                  <ListItemIcon>
                    <InboxIcon style={{ color: "#447e67" }}/>
                  </ListItemIcon>
                  <Typography style={(this.props.open ? {padding:"0"}:{padding:"0 16px"})}>Recetas</Typography>
                </ListItem>
              </NavLink>
            </Tooltip>
            <Tooltip TransitionComponent={Zoom} title={!this.props.open ?"Estadísticas":""} placement="right">
              <NavLink to="/estadisticas" activeClassName="activeLink">
                <ListItem button key="stats">
                  <ListItemIcon>
                    <InsertChart style={{ color: "green" }} />
                  </ListItemIcon>
                  <Typography style={(this.props.open ? {padding:"0"}:{padding:"0 16px"})}>Estadísticas</Typography>
                </ListItem>
              </NavLink>
            </Tooltip>
          </List>
          <Divider />
         {/* <Grid container direction={'column'} justify={'flex-end'} style={{height: '100%'}}> */}
            <List style={{ bottom: "0px", position: "relative" }}>
                <ListItem button key="start_appointment">
                  <ListItemIcon>
                    <InsertChart style={{ color: "orange" }} />
                  </ListItemIcon>
                  <Typography style={(this.props.open ? {padding:"0"}:{padding:"0 16px"})}>Iniciar Consulta</Typography>
                </ListItem>
               <ListItem button key="schedule_appointment">
                  <ListItemIcon>
                    <Event style={{ color: "blue" }} />
                  </ListItemIcon>
                  <Typography style={(this.props.open ? {padding:"0"}:{padding:"0 16px"})}>Agendar Consulta</Typography>
                </ListItem>
            </List>
        {/*  </Grid> */}
        </Drawer>
      </div>
    );
  }
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Sidebar);
