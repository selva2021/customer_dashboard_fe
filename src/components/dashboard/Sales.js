import { Bar } from 'react-chartjs-2';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  colors
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {useCustomerStore} from '../../store'
const Sales = (props) => {

  const customers = useCustomerStore(state => state.customers)
  let pZeroAarry = customers.map((c)=> c.p_zero) 
  let pOneAarry = customers.map((c)=> c.p_one)
  let pTwoAarry = customers.map((c)=> c.p_two)
  let graphData = customers.map((c)=> c.p_zero+c.p_one+c.p_two)
  let graphLabels = customers.map((c)=> c.customer_name)

  console.log({graphData})
  const theme = useTheme();

  const data = {
    datasets: [
      {
        backgroundColor: colors.teal[500],
        data: graphData,
        label: 'Total Issues'
      },
      {
        backgroundColor: colors.indigo[500],
        data: pZeroAarry,
        label: 'P0'
      },
      {
        backgroundColor: colors.amber[500],
        data: pOneAarry,
        label: 'P1'
      },
      {
        backgroundColor: colors.red[500],
        data: pTwoAarry,
        label: 'P2'
      }
      
    ],
    labels: graphLabels
  };

  const options = {
    animation: true,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          barThickness: 12,
          maxBarThickness: 10,
          barPercentage: 0.5,
          categoryPercentage: 0.5,
          ticks: {
            fontColor: theme.palette.text.secondary
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          }
        }
      ]
    },
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  return (
    <Card {...props}>
      <CardHeader
        action={(
          <Button
            endIcon={<ArrowDropDownIcon />}
            size="small"
            variant="text"
          >
           
          </Button>
        )}
        title="Issues"
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: 'relative'
          }}
        >
          <Bar
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        
      </Box>
    </Card>
  );
};

export default Sales;
