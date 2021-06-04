import AccountForm from '@components/Profile/Form/AccountForm'

import { Box, Typography } from '@material-ui/core'

const AccountInfo = ({data, setFormData, update}) => {
    return (
        <>
            <Box p={1} mt={3}>
                <Box mb={4}>
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
