import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import { orange } from '@material-ui/core/colors';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';
import {useCustomerStore} from '../../store'

const TasksProgress = (props) => { 
  
  const customers = useCustomerStore(state => state.customers)

  let allIssues = customers.map((c)=>(c.p_zero+c.p_one+c.p_two))

  let totalIssues = allIssues.reduce((acc,current)=>acc+current,0)
  return (
  <Card
    sx={{ height: '100%' }}
    {...props}
  >
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="h6"
          >
           Total Issues
          </Typography>
          <Typography
            color="textPrimary"
            variant="h3"
          >
            {totalIssues}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: orange[600],
              height: 56,
              width: 56
            }}
          >
            <InsertChartIcon />
          </Avatar>
        </Grid>
      </Grid>
      
    </CardContent>
  </Card>
)};

export default TasksProgress;
