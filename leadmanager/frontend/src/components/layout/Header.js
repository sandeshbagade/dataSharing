import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { RootRef } from '@material-ui/core';
const classes = {
  appbar:{

    zIndex:"1400"
  }
}
export class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  };
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLinks = (
          <div>
            <span>
              <strong>{user ? `Welcome ${user.username}` : ''}</strong>
            </span>
            <Button variant="outlined" color="secondary" style={{color:"#fff",marginLeft:"20px"}} onClick={this.props.logout}>
                Logout
            </Button>
          </div>
    );

    const guestLinks = (
      <div>
          <Link to="/register" style={{textDecoration:"none",color:"#fff"}}>
          <Button style={{color:"#fff"}}>
            Register
          </Button>
          </Link>
          <Link to="/login">
          <Button style={{color:"#fff"}}>
            Login
          </Button>  
          </Link>
      </div>
    );

    return ( <div >
              <AppBar style={{ position: "fixed",zIndex:"1201",left:0,top:0}}>
                <Toolbar>
                  <Typography variant="h6" style={{ flexGrow: 1,}}>
                        EEG Database
                  </Typography>
                  {isAuthenticated ? authLinks : guestLinks}
                </Toolbar>
              </AppBar>
            </div>         
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Header);
