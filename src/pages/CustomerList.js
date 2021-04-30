import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import CustomerListResults from 'src/components/customer/CustomerListResults';
import CustomerListToolbar from 'src/components/customer/CustomerListToolbar';
import {useCustomerStore,useCustomerModalStore} from '../store'
import React, {useEffect } from 'react';
const axios = require('axios');

function CustomerList() {
  const customer = useCustomerModalStore(state => state.customer)

const customers = useCustomerStore(state => state.customers)
const addCustomer = useCustomerStore(state => state.addCustomer)

useEffect(() => {
  (async() => {
    const customers = await axios.get(`${process.env.REACT_APP_BE_BASE_URL}/customer`)
    addCustomer(customers.data.customers)
  })()
 
},[customer,customer]);


  return(<>
    <Helmet>
      <title>Customers </title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <CustomerListToolbar />
        <Box sx={{ pt: 3 }}>
          <CustomerListResults customers={customers} />
        </Box>
      </Container>
    </Box>
  </>
) };

export default CustomerList;
