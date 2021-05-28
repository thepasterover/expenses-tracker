import { makeStyles } from '@material-ui/core/styles'

import { Box, Typography, Avatar } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down('sm')]: {
            justifyContent: "center"
        }   
    },
    info: {
        [theme.breakpoints.down('sm')]: {
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center"
        }
    }
}));

const AvatarContent = ({firstName, lastName}) => {
    const classes = useStyles()
    return (
        <>
            <Box display="flex" alignItems="center" p={1} flexWrap="wrap" className={classes.root}  >
                <Box borderRadius="50%" borderColor="primary.main" border={2} borderLeft={0} borderBottom={0} p={1} >
                    <Avatar
                    style={{ width: "160px", height: '160px', }}
                    src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
                    />
                </Box>
                <Box px={{ xs: 2, sm: 3, md: 3}} pt={{xs: 2, sm: 2, md:0, lg: 0}} className={classes.info}>
                    <Box>
                        <Typography variant="h4">
                            {firstName + ' ' + lastName }
                        </Typography>
                    </Box>
                    <Box>
                        <Typography color="secondary" variant="subtitle1">
                            Member since 2012 
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default AvatarContent
