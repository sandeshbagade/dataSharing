import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig , tokenConfigForUpload} from './auth';

import { GET_LEADS, DELETE_LEAD, ADD_LEAD , UPDATE_LEAD} from './types';

// GET LEADS
export const getLeads = () => (dispatch, getState) => {
  axios
    .get('/api/leads/', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_LEADS,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// DELETE LEAD
export const deleteLead = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/leads/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ deleteLead: 'Lead Deleted' }));
      dispatch({
        type: DELETE_LEAD,
        payload: id,
      });
    })
    .catch((err) => console.log(err));
};

// ADD LEAD
export const addLead = (lead) => (dispatch, getState) => {

  const token = getState().auth.token;
  const formData = new FormData();
  formData.append("name", lead.name);
  formData.append("email", lead.email);
  formData.append("message", lead.message);
  formData.append("eeg", lead.eeg);
 
  axios
    .post('/api/leads/', formData, {headers: { Authorization: `Token ${token}` }})
    .then((res) => {
      dispatch(createMessage({ addLead: 'Lead Added' }));
      dispatch({
        type: ADD_LEAD,
        payload: res.data,
      });
    })
    .then(()=>{
      location.reload()
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status))
      console.log(err.response.data)
    });
};


// UPDATE LEAD
export const updateLead = (lead) => (dispatch, getState) => {
  console.log(tokenConfigForUpload(getState))
  const token = getState().auth.token;
  const formData = new FormData();
  formData.append("name", lead.name);
  formData.append("email", lead.email);
  formData.append("message", lead.message);
  //formData.append("eeg", lead.eeg);
  axios
    .put(`/api/leads/${lead.id}/`, formData, {headers: { Authorization: `Token ${token}` }})
    .then((res) => {
      dispatch(createMessage({ addLead: 'Lead Updated' }));
      dispatch({
        type: UPDATE_LEAD,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status))
      console.log(err.response.data)
    });
};
