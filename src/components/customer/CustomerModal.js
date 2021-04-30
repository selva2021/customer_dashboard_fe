import {React,useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useCustomerModalStore} from '../../store'
const axios = require('axios')
export default function CustomerModal(props) {
  
    const show = useCustomerModalStore(state => state.show)
    const customer = useCustomerModalStore(state => state.customer)
    const toggleShowModel = useCustomerModalStore(state => state.toggleShowModel)
   
    const handleClose = () => {
        toggleShowModel(false)
    };
    

    let [customerName, setCustomerName] = useState('')
    let [incidentStatus, setIncidentStatus] = useState('')
    let [issueType, setIssueType] = useState('')
    let [status, setStatus] = useState('') 
    let [majorChangePlan, setMajorChangePlan] = useState('') 
    let [pZero, setpZero] = useState('')
    let [pOne, setpOne] = useState('')
    let [pTwo, setpTwo] = useState('')

    const saveDetails = async () =>{
        handleClose()
        let id = customer?._id?customer?._id:'11134ed1111a0956c0511111'
        let url = `${process.env.REACT_APP_BE_BASE_URL}/customer/${id}`

        let payload = {
            "customer_name":customerName?customerName:customer?.customer_name,
            "major_change_plan":majorChangePlan?majorChangePlan:customer?.major_change_plan,
            "incident_status":incidentStatus?incidentStatus:customer?.incident_status,
            "issue_type":issueType?issueType:customer?.issue_type,
            "status":status?status:customer?.status,
            "p_zero":pZero?pZero:customer?.p_zero,
            "p_one":pOne?pOne:customer?.p_one,
            "p_two":pTwo?pTwo:customer?.p_two
        }

        const headerOptions = {headers: { 'Content-Type': 'application/json'}}

        if(payload.customer_name && payload.issue_type){
          const done = await axios.patch(url,payload,headerOptions)
          toggleShowModel(false,done.data)
          alert('Done. Saved')
        }else{
          alert('Inputs cannot be empty')
        }
        
        
      }
      
  return (
    <div>
      <Dialog open={show} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Customer Details</DialogTitle>
        <DialogContent>
          
          <TextField
          required
            margin="dense"
            id="name"
            label="Customer Name"
            type="text"
            onChange={event => setCustomerName(event.target.value)} 
            value={customerName?customerName:customer?.customer_name}
            fullWidth
          />
            <TextField
          required
            margin="dense"
            id="name"
            label="Incident Status"
            type="text"
            onChange={event => setIncidentStatus(event.target.value)} 
            value={incidentStatus?incidentStatus:customer?.incident_status}
            fullWidth
          />
            <TextField
          required

            margin="dense"
            id="name"
            label="	Issue type"
            type="text"
            onChange={event => setIssueType(event.target.value)} 
            value={issueType?issueType:customer?.issue_type}
            fullWidth
          />
            <TextField
          required

            margin="dense"
            id="name"
            label="Issue status"
            type="text"
            onChange={event => setStatus(event.target.value)} 
            value={status?status:customer?.status}
            fullWidth
            />
            <TextField
          required
           
            margin="dense"
            id="name"
            label="Major Change Plan"
            type="text"
            onChange={event => setMajorChangePlan(event.target.value)} 
            value={majorChangePlan?majorChangePlan:customer?.major_change_plan}
            fullWidth
          />
               <TextField
          required
            margin="dense"
            id="name"
            label="P0"
            type="text"
            onChange={event => setpZero(event.target.value)} 
            value={pZero?pZero:customer?.p_zero}
            fullWidth
          />
           <TextField
          required
            margin="dense"
            id="name"
            label="P1"
            type="text"
            onChange={event => setpOne(event.target.value)} 
            value={pOne?pOne:customer?.p_one}
            fullWidth
          />
           <TextField
          required
            margin="dense"
            id="name"
            label="P2"
            type="text"
            onChange={event => setpTwo(event.target.value)} 
            value={pTwo?pTwo:customer?.p_two}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={saveDetails} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
