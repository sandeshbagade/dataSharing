import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes, { func } from 'prop-types';
import { addLead } from '../../actions/leads';
import {DropzoneArea} from 'material-ui-dropzone'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
export class Form extends Component {
  state = {
    name: '',
    email: '',
    message: '',
    eeg:null
  };

  static propTypes = {
    addLead: PropTypes.func.isRequired,
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  fileUpload(files){
    this.setState({
      eeg: files[0]
    });
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message , eeg } = this.state;
    const lead = { name, email, message , eeg};
    console.log(lead.eeg)
      await this.props.addLead(lead);
      this.setState({
        name: '',
        email: '',
        message: '',
        eeg:null
      });
      // this.props.history.push("/"); 
      
    
  };

  render() {
    const { name, email, message , eeg } = this.state;
    return (
      <div>
        {/* <h2>Add EEG Data</h2> */}
        <form onSubmit={this.onSubmit}> 
          <TextField id="outlined-basic" 
                     label="Title" 
                     variant="outlined"
                     type="text"
                     name="name"
                     onChange={this.onChange}
                     value={name}
                     size="small" 
                     fullWidth
                     style={{paddingBottom:"10px"}}
          /><br/>
          <TextField id="outlined-basic" 
                     label="Email" 
                     variant="outlined"
                     type="email"
                     name="email"
                     onChange={this.onChange}
                     value={email} 
                     size="small" 
                     fullWidth
                     style={{paddingBottom:"10px"}}
          /><br/>
          <TextField id="outlined-basic" 
                     label="EEG Data Description" 
                     variant="outlined"
                     type="text"
                     name="message"
                     onChange={this.onChange}
                     value={message}
                     size="small" 
                     fullWidth
                     style={{paddingBottom:"10px"}}
          /><br/>
          <DropzoneArea  acceptedFiles={['']} filesLimit={1}  
              onChange={this.fileUpload.bind(this)}
              style={{paddingBottom:"30px"}}
              maxFileSize={500000000000}
          /><br/>
     
            <Button type="submit" variant="contained" color="primary">
            Upload
            </Button>
         
        </form>
      </div>
    );
  }
}

export default connect(null, { addLead })(Form);
