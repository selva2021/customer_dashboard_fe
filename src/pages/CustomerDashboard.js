import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid,
  Typography,
  CardContent,
  Card
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import React, {useEffect,useState } from 'react';
import Sales from 'src/components/dashboard//Sales';
import TasksProgress from 'src/components/dashboard//TasksProgress';
import TotalCustomers from 'src/components/dashboard//TotalCustomers';
import LatestOrders from 'src/components/dashboard/LatestOrders'
import CdashboardPieChart from 'src/components/dashboard//CdashboardPieChart';
import {useCustomerStore} from '../store'
const axios = require('axios')
const useStyles = makeStyles({
  root: {
   
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const CustomerDashboard = (props) => { 
  const classes = useStyles();
const params = useParams()

let [customerFromDB, setCustomerFromDB] = useState({})


useEffect(() => {

  (async() => {
    const customer = await axios.get(`${process.env.REACT_APP_BE_BASE_URL}/customer/${params.id}`)

    setCustomerFromDB(customer.data.user)
  })()
},[]);

  return (
  <>
    <Helmet>
      <title>Dashboard </title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            xs={12}
          >
            <Card className={classes.root}>
    <CardContent>
            <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        
            <Typography
        align="center"
        color="textPrimary"
        gutterBottom
        variant="h4"
      >
        {customerFromDB.customer_name}
      </Typography>
      </Box>
      </CardContent>
      </Card>
      </Grid>
      <Grid
      item
      xs={12}>
  <Card className={classes.root}>
    <CardContent>
            <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
          <Typography
        align="center"
        color="textPrimary"
        gutterBottom
        variant="subtitle1"
      >
       Issue Type / Status : {`${customerFromDB.issue_type} ${customerFromDB.status}`}
      </Typography>
      <Typography
        align="center"
        color="textPrimary"
        gutterBottom
        variant="subtitle1"
      >
       Major Change Plan : {customerFromDB.major_change_plan}
      </Typography>
      <Typography
        align="center"
        color="textPrimary"
        gutterBottom
        variant="subtitle1"
      >
       P0 : {customerFromDB.p_zero}
      </Typography>
      <Typography
        align="center"
        color="textPrimary"
        gutterBottom
        variant="subtitle1"
      >
       P1 : {customerFromDB.p_one}
      </Typography>
      <Typography
        align="center"
        color="textPrimary"
        gutterBottom
        variant="subtitle1"
      >
       P2 : {customerFromDB.p_two}
      </Typography>
      <Typography
        align="center"
        color="textPrimary"
        gutterBottom
        variant="subtitle1"
      >
       Total Issues : {customerFromDB.p_zero+customerFromDB.p_one+customerFromDB.p_two}
      </Typography>
 </Box>
      </CardContent>
      </Card>
      </Grid>
          <Grid
            item
            xs={12}
          >
            <CdashboardPieChart customer={customerFromDB} sx={{ height: '100%' }} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
)};

export default CustomerDashboard;
