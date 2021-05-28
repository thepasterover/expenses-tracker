import AccountForm from '@components/Profile/Form/AccountForm'

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
                <AccountForm />
            </Box>
        </>
    )
}

export default AccountInfo
