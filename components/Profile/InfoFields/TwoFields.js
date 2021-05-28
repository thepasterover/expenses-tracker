import { makeStyles } from '@material-ui/core/styles'

import { Box, TextField } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    field: {
        [theme.breakpoints.up('sm')]: {
            width: "50%"
        },
        [theme.breakpoints.down('sm')]: {
            width: "100%"
        },
    }
}));

const Names = () => {
    const classes = useStyles()
    return (
        <>
            <Box display="flex" flexWrap="wrap">
                    <Box  className={classes.field} pr={{ xs: 0, sm: 0,  md: 2}}>
                        <TextField 
                        color="primary"
                        variant="outlined"
                        label="First Name"
                        inputStyle ={{width: '100%'}}
                        fullWidth
                        />
                    </Box>
                    <Box  className={classes.field} pl={{ xs: 0, sm: 0,  md: 2}} pt={{ xs: 3, sm: 3, md: 0 }}>
                        <TextField
                        color="primary"
                        variant="outlined"
                        label="Last Name"
                        inputStyle ={{width: '100%'}}
                        fullWidth
                        />
                    </Box>
                </Box>
        </>
    )
}

export default Names
