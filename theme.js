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
      main: red.A400,
    },
    pink:{
        main: '#ff3378'
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;