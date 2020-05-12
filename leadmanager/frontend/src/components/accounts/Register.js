import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/auth';
import { createMessage } from '../../actions/messages';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
export class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    password2: '',
    first_name:2
  };

  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, password2 , first_name} = this.state;
    if (password !== password2) {
      this.props.createMessage({ passwordNotMatch: 'Passwords do not match' });
    } else {
      const newUser = {
        username,
        password,
        email,
        first_name
      };
      this.props.register(newUser);
    }
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    const { username, email, password, password2 } = this.state;
    return (
         <Container component="main" maxWidth="xs"><br/><br/><br/>
          <CssBaseline />
          <div style={{ display: 'flex',flexDirection: 'column',alignItems: 'center',}}>
            <br/>
            <Avatar style={{backgroundColor: "#E34551"}}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            Register
            </Typography>
        <br></br>
        {/* <h2  style={{fontWeight:"bold",textAlign:"center"}}>Secure Server for remote viewing and transfer of Encrypted EEG Database
        </h2> */}
        <div>
        
          <form onSubmit={this.onSubmit}>
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="text"
            autoFocus
            onChange={this.onChange}
            type="text"
          />
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={this.onChange}
            type="email"
          />

            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            name="password"
            onChange={this.onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            name="password2"
            onChange={this.onChange}
          />
          <Select
            name="first_name"
            onChange={this.onChange}
            value={this.state.first_name}
            fullWidth
            style={{margin:"15px 0"}}
          >
              <MenuItem value={0}>Admin</MenuItem>
              <MenuItem value={1}>Contributor</MenuItem>
              <MenuItem value={2}>Researcher/Student/Other</MenuItem>
          </Select>
            {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Register
          </Button>
         
          </form>
        </div>
        </div>
        </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register, createMessage })(Register);


