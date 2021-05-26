import { Box, Typography, Card } from '@material-ui/core'

import WishListItem from '../WishList/WishListItem'

const WishList = () => {
    return (
        <>  
            <Box display="flex" justifyContent="space-between" mt={5} mb={3}>
                <Typography variant="h5">
                    WishList
                </Typography>
            </Box>
            <WishListItem />
            <WishListItem />
        </>
    )
}

export default WishList
