import { makeStyles } from '@material-ui/core/styles'

import { 
    Box, 
    Typography,
    IconButton, 
} from '@material-ui/core'

import GitHubIcon from '@material-ui/icons/GitHub'
import TwitterIcon from '@material-ui/icons/Twitter'

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.up('md')]: {
            position: 'absolute', 
            bottom: 15,
        },
        [theme.breakpoints.down('sm')]: {
            padding: '0px 100rem'
        }
    },
    link: {
        [theme.breakpoints.up('sm')]: {
            color: theme.palette.primary.main
        },
        [theme.breakpoints.down('sm')]: {
            color: '#fff',
        }
    }
}))

const BottomLinks = () => {

    const classes = useStyles()

    return (
        <>
            <Box className={classes.root} mt={2} px={{ xs: 4, sm: 0, md: 6}} display="flex" justifyContent="space-between" alignItems="center">
                <Box px={{ xs:3, sm: 5, md:4 }}>
                    <Typography variant="body2" className={classes.link}>
                        Privacy Policy
                    </Typography>
                </Box>
                <Box px={{ xs:3, sm: 5, md:4 }}>
                    <Typography variant="body2" className={classes.link}>
                        Report a Bug
                    </Typography>
                </Box>
                <Box px={{ xs:3, sm: 5, md:4 }}>
                    <IconButton className={classes.link}>
                        <GitHubIcon />
                    </IconButton>
                </Box>
                <Box px={{ xs:3, sm: 5, md:4 }}>
                    <IconButton className={classes.link}>
                        <TwitterIcon />
                    </IconButton>
                </Box>
            </Box>
        </>
    )
}

export default BottomLinks
