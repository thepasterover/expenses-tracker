import { makeStyles } from '@material-ui/core/styles'

import { Box, TextField, InputAdornment } from '@material-ui/core'

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


let phoneProps =  (
    <InputAdornment position="start"> +91 </InputAdornment>
)


const TwoFields = ({label1, label2, value1, value2, handler1, handler2, phone, errorText1, errorText2, validator1, validator2}) => {
    const classes = useStyles()

    return (
        <>
            <Box display="flex" flexWrap="wrap" mt={3}>
                    
                    <Box  className={classes.field} pr={{ xs: 0, sm: 0,  md: 2}}>
                        <TextField 
                        color="primary"
                        variant="outlined"
                        label={label1}
                        fullWidth
                        value={value1}
                        onChange={event => {handler1(event.target.value); validator1(event.target.value)}}
                        error={errorText1 !== ''}
                        helperText={errorText1}
                        />
                    </Box>
                    <Box className={classes.field} pl={{ xs: 0, sm: 0,  md: 2}} pt={{ xs: 3, sm: 3, md: 0 }}>
                        <TextField
                        color="primary"
                        variant="outlined"
                        label={label2}
                        fullWidth
                        value={value2}
                        onChange={event => {handler2(event.target.value); validator2(event.target.value)}}
                        InputProps={{
                            startAdornment: (phone ? phoneProps :  null)
                        }}
                        error={errorText2 !== ''}
                        helperText={errorText2}
                        />
                        
                    </Box>
                </Box>
        </>
    )
}

export default TwoFields
