import {
  Box,
  Button,
} from '@material-ui/core';
import {useCustomerModalStore} from '../../store'
const CustomerListToolbar = (props) => {
  
  const toggleShowModel = useCustomerModalStore(state => state.toggleShowModel)

  return (
  <Box {...props}>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end'
      }}
    >
      <Button
        color="primary"
        variant="contained"
        onClick={()=>toggleShowModel(true,{})}
      >
        Add customer
      </Button>
    </Box>
  
  </Box>
)};

export default CustomerListToolbar;
