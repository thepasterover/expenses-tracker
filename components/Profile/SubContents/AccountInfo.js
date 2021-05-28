import AccountForm from '@components/Profile/Form/AccountForm'

import { makeStyles } from '@material-ui/core/styles'

import { Box, Typography, TextField } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    
}));

const AccountInfo = ({data, setFormData, update}) => {
    const classes = useStyles()
    return (
        <>
            <Box p={1} mt={3}>
                <Box mb={3}>
                    <Typography variant="h5">
                        Account Information
                    </Typography>
                </Box>
                <AccountForm 
                data={data}
                setFormData={setFormData}
                update={update}
                />
            </Box>
        </>
    )
}

export default AccountInfo
