import { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';
import CustomerModal from './CustomerModal'
import {useCustomerModalStore} from '../../store'

const CustomerListResults = ({ customers, ...rest }) => {
  const navigate = useNavigate();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const toggleShowModel = useCustomerModalStore(state => state.toggleShowModel)
  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleInsidentStatus = (customer) =>{
      let incidentStatus = 'Normal'
        if(customer.p_zero > 0 || customer.p_one > 0){
          incidentStatus = 'Critical'
        }

    
        if(customer.p_zero == 0 && customer.p_one == 0 && customer.p_two > 0){
          incidentStatus = 'Medium'
        }
        
        if(customer.p_zero == 0 && customer.p_one == 0 && customer.p_two == 0){
          incidentStatus = 'Normal'
        }
        return incidentStatus
  }

  return (
<>
    <CustomerModal/>
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === customers.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0
                      && selectedCustomerIds.length < customers.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                Customer Name
                </TableCell>
                <TableCell>
                Incident Status
                </TableCell>
                <TableCell>
                Issue
                </TableCell>
                <TableCell>
                Major Change Plan
                </TableCell>
                <TableCell>
                P0
                </TableCell>
                <TableCell>
                P1
                </TableCell>
                <TableCell>
                P2
                </TableCell>
                <TableCell>
                Total Issues
                </TableCell>
                <TableCell>
                Created At
                </TableCell>
                <TableCell>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.slice(0, limit).map((customer) => (
               
                <TableRow
                  hover
                  key={customer.id}
                  selected={selectedCustomerIds.indexOf(customer._id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(customer._id) !== -1}
                      onChange={(event) => handleSelectOne(event, customer._id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                       <a onClick={()=>navigate(`/app/cdashboard/${customer._id}`, { replace: false })}>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {customer.customer_name}
                      </Typography>
                      </a>
                    </Box>
                  </TableCell>
                  <TableCell style={handleInsidentStatus(customer) === 'Critical' ? {color:"red"}:{color:"green"}}>
                    {handleInsidentStatus(customer)}
                  </TableCell>
                  <TableCell>
                    {`${customer.issue_type}`}
                  </TableCell>
                  <TableCell>
                    {customer.major_change_plan}
                  </TableCell>
                  <TableCell>
                    {customer.p_zero}
                  </TableCell>
                  <TableCell>
                    {customer.p_one}
                  </TableCell>
                  <TableCell>
                    {customer.p_two}
                  </TableCell>
                  <TableCell>
                    {(customer.p_zero)+(customer.p_one)+(customer.p_two)}
                  </TableCell>
                  <TableCell>
                    {moment(customer.createdAt).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>
                    <Button onClick={()=>toggleShowModel(true,customer)}>Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={customers.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
    </>
  );
};

CustomerListResults.propTypes = {
  customers: PropTypes.array.isRequired
};

export default CustomerListResults;
