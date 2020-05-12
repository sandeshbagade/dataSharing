import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from './listitems';
import { HashRouter as Router, Route, Switch, HashRouter, useRouteMatch ,Link } from 'react-router-dom';
import ImageUploder from './ImageUploder'
import { connect } from 'react-redux';
// import Leads from '../leads/DashboardLeads'
import Form from '../leads//Form';
import Leads from '../leads//Leads';



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawer: {
    zIndex: 1000,
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

function Dashboard(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [state, setState] = React.useState({
    left: false,
  });
  const toggleDrawer = (open) => (event) => {
    setState({ ...state, left: open });
  };
  const funOnC=()=>{
       console.log(props.user)
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <main className={classes.content}>
     
        <Container maxWidth="lg" className={classes.container}>  
        <Drawer variant="permanent" className={classes.drawer}>
            <Divider />
            <br/><br/><br/><br/>
            <List>{mainListItems}</List>
            <Divider />
            {/* <List>{secondaryListItems}</List> */}
        </Drawer>
          <Grid container spacing={3}>
          <Grid item xs={12} md={2} lg={2}></Grid>
            <Grid item xs={12} md={10} lg={10} style={{textAlign:"center"}}><br/><br/>
            <h2  style={{fontWeight:"bold"}} >
                <span  onClick={funOnC}>Secure Server for remote viewing and transfer of Encrypted EEG Database</span>
            </h2>
            </Grid> 
          </Grid>
          <Switch>
          <Route exact path="/">
                <Grid container spacing={3}>
                <Grid item xs={12} md={2} lg={2}></Grid>
                  <Grid item xs={12} md={10} lg={10} style={{textAlign:"center"}}>
                      <Leads/>
                  </Grid> 
                  <Grid item xs={12} md={2} lg={2}></Grid>
                </Grid>
          </Route>
          <Route exact path="/new-data">
          <Grid container spacing={3}>
                <Grid item xs={12} md={4} lg={4}></Grid>
                  <Grid item xs={12} md={6} lg={6} style={{textAlign:"center"}}>
                      {props.user.first_name=='2'?
                      <h2>
                        If you want to add Dataset please &ensp; 
                          <a target="_blank" href="https://mail.google.com/mail/u/0/?view=cm&fs=1&to=sandeshbagade25@gmail.com&tf=1">
                             Email us 
                          </a> 
                      </h2>:<Form history={props.history}/>
                      }
                  </Grid> 
                  <Grid item xs={12} md={2} lg={2}></Grid>
                </Grid>
          </Route> 
          </Switch>  
         
         
          <Box pt={4}>
        
          </Box>
        </Container>
      </main>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});


export default  connect(mapStateToProps,{  })(Dashboard);