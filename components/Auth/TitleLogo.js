import { makeStyles } from '@material-ui/core/styles'

import { Box, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    title:{
        [theme.breakpoints.up('md')]: {
            position: 'absolute', 
            bottom: 15, 
            left: 10,
        },
        [theme.breakpoints.down('sm')]: {

        }
    },
    title_text: {
        color: '#fff', 
        [theme.breakpoints.up('sm')]: {
            fontSize: 32
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 45
        }
    }
}))

const TitleLogo = () => {

    const classes = useStyles()

    return (
        <>
            <Box className={classes.title} mx={{xs: 0, md:4}}>
                <Typography className={classes.title_text}>
                    Expendit
                </Typography>
            </Box>
        </>
    )
}

export default TitleLogo
