import { createMuiTheme } from '@material-ui/core/styles';

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
  typography: {
    fontFamily: ['Inter', 'Roboto', 'sans-serif']
  }
});

export default theme;