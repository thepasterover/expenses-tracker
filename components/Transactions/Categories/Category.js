import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import { Grid, Box, Icon, Typography} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    icon: {
        fontSize: '30px',
        cursor: 'pointer',
        color: '#848E98'
    },
}));

const Category = ({selectedCategoryIndex, setSelectedCategoryIndex, color, icon, category, index}) => {
    const classes = useStyles()
    return (
        <>
        <Grid item key={index} xs={4} sm={2}>
            <Box p={3} display="flex" flexDirection="column" alignContent="center" alignItems="center">
                <Box onClick={() => setSelectedCategoryIndex(index)}>
                    <Icon style={{ color: ( selectedCategoryIndex === index && color )}} className={classes.icon}>
                    {icon}
                    </Icon>
                </Box>
                <Box pt={1} >
                    <Typography variant="body2" style={{color: ( selectedCategoryIndex !== index && '#848E98')}} component="div">
                    <Box fontWeight="fontWeightBold">
                        {category}
                    </Box>
                    </Typography>
                </Box>
            </Box>
        </Grid> 
        </>
    )
}

export default Category
