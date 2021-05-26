import { Box, Typography } from '@material-ui/core'

const TotalSavings = () => {
    return (
        <>
            <Typography variant="h5">
                Savings
            </Typography>
            <Box mt={3} mx={2}>
                <Box display="flex" justifyContent="flex-start" pt={1}>
                    <Box pr={4}>
                        <Typography variant="h6">
                            Subject
                        </Typography>
                    </Box>
                    <Box px={4}>
                        <Typography variant="h6">
                            :
                        </Typography>
                    </Box>
                    <Box px={4}>
                        <Typography variant="h6">
                            Value
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default TotalSavings
