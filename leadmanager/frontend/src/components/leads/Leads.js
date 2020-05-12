import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLeads, deleteLead , updateLead } from '../../actions/leads';
import MaterialTable from 'material-table';
import GetAppIcon from '@material-ui/icons/GetApp';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Paper from '@material-ui/core/Paper';


const  columns = [
      { title: 'ID', field: 'id' , editable: 'never'},
      { title: 'Name', field: 'name' },
      { title: 'Email', field: 'email' },
      { title: 'Desc', field: 'message',
                render: (rowData) => rowData.message?rowData.message.toString().substring(0, 30)+"...." :''},
      { title: 'Download', field: 'eeg', editable: 'never',
                render: (rowData) => <a style={{color:"#2D63EF"}} href={rowData.eeg?rowData.eeg.toString():''}><GetAppIcon/></a> },
    ]
export class Leads extends Component {
  static propTypes = {
    leads: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    getLeads: PropTypes.func.isRequired,
    deleteLead: PropTypes.func.isRequired,
    updateLead: PropTypes.func.isRequired,
  };
  state={
    open:false
  }
  componentDidMount() {
    this.props.getLeads();
 
  }
  handleClickOpen = () => {
    this.setState({open:true})
    
  };
   handleClose = () => {
    this.setState({open:false})
  };

  render() {
    return (
      <Fragment>
        <MaterialTable
      title="Avaliable Datasets"
      columns={columns}
      data={this.props.leads}
      editable={{
        // onRowAdd: (newData) =>
        //   new Promise((resolve) => {
        //     setTimeout(() => {
        //       resolve();
        //       setState((prevState) => {
        //         const data = [...prevState.data];
        //         data.push(newData);
        //         return { ...prevState, data };
        //       });
        //     }, 600);
        //   }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            if(this.props.user.first_name=='2')
              this.handleClickOpen()
            else  
              this.props.updateLead(newData);
            setTimeout(() => {
                  this.props.getLeads();
                  resolve();     
            }, 600);
           
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              if(this.props.user.first_name=='1'||this.props.user.first_name=='2')
              this.handleClickOpen()
              else
              this.props.deleteLead(oldData.id)
            }, 600);
            resolve();  
          }),
      }}
      detailPanel={rowData => {
        return (
          <Paper elevation={3} style={{textAlign:"center",padding:"10px",fontSize:"17px"}} >
              <div>
               <span style={{fontWeight:"bold"}}>{rowData.name}</span>
              </div>
              <div>
              <span style={{fontWeight:"bold"}}>{rowData.email}</span>
              </div>
              <div>
              <span>{rowData.message}</span>
              </div>
         </Paper>
        )
      }}
      onRowClick={(event, rowData, togglePanel) => {console.log(this.props);togglePanel()}}
    />


      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle> */}
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div>If you find something wrong or want to update Dataset please  </div>
            <a target="_blank" href="https://mail.google.com/mail/u/0/?view=cm&fs=1&to=sandeshbagade25@gmail.com&tf=1">
              Email us 
            </a>  to take action on this dataset
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog> 
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  leads: state.leads.leads,
  user: state.auth.user,
 
});

export default connect(mapStateToProps, { getLeads, deleteLead , updateLead })(Leads);
