import { Box, Typography } from '@material-ui/core'

import WishListItem from '../WishList/WishListItem'

const WishList = ({wishlists, edit, change, del}) => {
    return (
        <>  
            <Box display="flex" justifyContent="space-between" mt={5} mb={3}>
                <Typography variant="h5">
                    WishList
                </Typography>
            </Box>
            { wishlists.length > 0 ?
                wishlists.map(w => 
                    <WishListItem
                    key={w._id}
                    id={w._id}
                    date={w.createdAt} 
                    subject={w.subject}
                    totalAmount={w.total_amount}
                    savingsAmount={w.savings_amount}
                    currentAmount={w.current_amount}
                    status={w.status}
                    edit={edit}
                    change={change}
                    del={del}
                    />
                )
            :  
                <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="40vh"
                >
                    <Typography variant="h6" align="center" color="secondary">Tap '+' to add a wishlist</Typography>
                </Box>
                }
        </>
    )
}

export default WishList
