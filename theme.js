import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ff3378',
    },
    secondary: {
      main: '#848E98',
    },
    error: {
      main: '#DC3545',
    },
    pink:{
        main: '#ff3378'
    },
    background: {
      default: '#fff',
    },
    success: {
      main: '#28A745'
    },
  },
});

export default theme;