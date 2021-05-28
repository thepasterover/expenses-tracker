import TwoFields from '@components/Profile/InfoFields/TwoFields'

import { makeStyles } from '@material-ui/core/styles'

import { Box, Typography, TextField } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    
}));

const AccountInfo = ({theme}) => {
    const classes = useStyles()
    return (
        <>
            <Box p={1} mt={3}>
                <Box mb={3}>
                    <Typography variant="h5">
                        Account Information
                    </Typography>
                </Box>
                <TwoFields />
                <Box mt={2}>
                    <TextField 
                    color="primary"
                    variant="outlined"
                    label="Email"
                    fullWidth
                    />
                </Box>
            </Box>
        </>
    )
}

export default AccountInfo
