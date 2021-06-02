import { makeStyles } from '@material-ui/core/styles'

import { Box, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    title_text: {
        
        fontFamily: 'Georgia, serif',
        [theme.breakpoints.up('sm')]: {
            fontSize: 32,
            color: '#fff', 
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 45,
            color: theme.palette.primary.main
        }
    }
}))

const TitleLogo = () => {
    const classes = useStyles()
    return (
        <>
            <Box>
                <Typography className={classes.title_text}>
                    Expendit
                </Typography>
            </Box>
        </>
    )
}

export default TitleLogo
