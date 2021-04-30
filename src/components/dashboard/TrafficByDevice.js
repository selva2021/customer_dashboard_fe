import { Doughnut } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  useTheme
} from '@material-ui/core';
import BugReportIcon from '@material-ui/icons/BugReport';
import {useCustomerStore} from '../../store'
const TrafficByDevice = (props) => {
  const theme = useTheme();
  
  const customers = useCustomerStore(state => state.customers)

  const pZero = customers.map(c => c.p_zero)
  const pOne = customers.map(c => c.p_one )
  const pTwo = customers.map(c => c.p_two )
  console.log({pZero,pOne,pTwo})
const total =  pZero.reduce((a,c)=>a+c,0)+pOne.reduce((a,c)=>a+c,0)+pTwo.reduce((a,c)=>a+c,0)
console.log({total})  
const data = {
    datasets: [
      {
        data: [pZero.reduce((a,c)=>a+c,0), pOne.reduce((a,c)=>a+c,0), pTwo.reduce((a,c)=>a+c,0)],
        backgroundColor: [
          colors.indigo[500],
          colors.red[600],
          colors.orange[600]
        ],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: ['P0', 'P1', 'P2']
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
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

  const devices = [
    {
      title: 'P0',
      value: Math.round((pZero.reduce((a,c)=>a+c,0)/total)*100),
      icon: BugReportIcon,
      color: colors.indigo[500]
    },
    {
      title: 'P1',
      value: Math.round((pOne.reduce((a,c)=>a+c,0)/total)*100),
      icon: BugReportIcon,
      color: colors.red[600]
    },
    {
      title: 'P2',
      value: Math.round((pTwo.reduce((a,c)=>a+c,0)/total)*100),
      icon: BugReportIcon,
      color: colors.orange[600]
    }
  ];

  return (
    <Card {...props}>
      <CardHeader title="Issues by Levels" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: 'relative'
          }}
        >
          <Doughnut
            data={data}
            options={options}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2
          }}
        >
          {devices.map(({
            color,
            icon: Icon,
            title,
            value
          }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: 'center'
              }}
            >
              <Icon color="action" />
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                style={{ color }}
                variant="h2"
              >
                {value}
                %
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default TrafficByDevice;
