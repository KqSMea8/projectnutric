import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Redirect, NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";

import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ExitToApp from "@material-ui/icons/ExitToApp";
import Settings from "@material-ui/icons/Settings";
import AttachMoney from "@material-ui/icons/AttachMoney";
import HelpOutline from "@material-ui/icons/HelpOutline";
import Person from "@material-ui/icons/Person";
import Create from "@material-ui/icons/Create";
import Check from "@material-ui/icons/Check";
import Home from "@material-ui/icons/Home";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";

import {logout} from '../store/actions/auth';
const drawerWidth = 240;
const closedDrawerWidth = 73;

const styles = theme => ({
  grow: {
    flexGrow: 1
  },
  appBar: {
    width: "100%",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: "100%",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  menuListDivider: {
    "border-top": "1px solid #8b8b8b2e"
  }
});

class Header extends Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    currentTime: new Date()
  };

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      currentTime: new Date()
    });
  }

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

// Handlers para click de cada elemento del popup 
  handleProfile = event => {
    
  }
  
  handleLogout = event => {
    this.handleMenuClose();
    this.props.logout();
  }


  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes, theme } = this.props;
    const headerTitle= "No se pudo"
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <NavLink to="/perfil">
          <MenuItem onClick={this.handleMenuClose}>
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            Perfil
          </MenuItem>
        </NavLink>
        <MenuItem
          onClick={this.handleMenuClose}
          style={{ "border-top": "1px solid #8b8b8b2e" }}
        >
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          Configuración
        </MenuItem>
        <MenuItem onClick={this.handleMenuClose}>
          <ListItemIcon>
            <AttachMoney />
          </ListItemIcon>
          Invitar a amigos
        </MenuItem>
        <MenuItem onClick={this.handleMenuClose}>
          <ListItemIcon>
            <HelpOutline />
          </ListItemIcon>
          Ayuda
        </MenuItem>
        <MenuItem
          onClick={this.handleMenuClose}
          style={{ "border-top": "1px solid #8b8b8b2e" }}
        >
          <ListItemIcon>
            <Check />
          </ListItemIcon>
          Activar notificaciones
        </MenuItem>
        <MenuItem
          onClick={this.handleLogout}
          style={{ "border-top": "1px solid #8b8b8b2e" }}
        >
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          Cerrar sesión
        </MenuItem>
      </Menu>
    );
    return (
      <div>
        <AppBar
          position="relative"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.props.open
          })}
        >
          <Toolbar disableGutters={!this.props.open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.props.handleDrawerToggle}
              className={classNames(classes.menuButton)}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              style={{ width: "40%" }}
              variant="h6"
              color="inherit"
              noWrap
            >
              {headerTitle}
            </Typography>
            <Typography
              color="inherit"
              style={{ width: "100%", textAlign: "center" }}
            >
              {this.state.currentTime.toLocaleDateString("es-ES", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: true
              })}
            </Typography>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <Link to="/inicio">  
                <IconButton color="inherit">
                  <Home style={{"color":"white"}}/>
                </IconButton>
              </Link>
              <IconButton color="inherit">
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                aria-owns={isMenuOpen ? "material-appbar" : undefined}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-haspopup="true"
                onClick={this.handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default connect(null, { logout })(withStyles(styles, { withTheme: true })(Header));
// export default connect(mapStateToProps,{ removeError })(withStyles(styles, {withTheme: true})(Dashboard))
