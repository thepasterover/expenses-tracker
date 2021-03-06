import { useRouter } from 'next/router'

import { makeStyles } from '@material-ui/core/styles'

import { Box, Typography, Avatar, Badge } from '@material-ui/core'

import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';

import { toast } from 'react-toastify'

import {axiosInstance} from '../../../axios'

import { format } from 'date-fns'

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
    },
    badge: {
        cursor: 'pointer', 
        minWidth: 27,
        minHeight: 31,
        borderRadius: '50%',
        transition: 'width 5s',
        '&:hover': {
            minWidth: 35,
            minHeight: 34,
        }
    }
}));

const AvatarContent = ({username, avatar, date, token}) => {
    const classes = useStyles()
    const router = useRouter()

    const handleAvatarEdit = async(event) => {
        try {
            let formData = new FormData()
            formData.append('file', event.target.files[0])
            const res = await axiosInstance.post('/user/profile/avatar', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': token,
                }
            })
            router.reload()
            toast.success(res.data.message)
        } catch(err) {
            if(err.response) {
                toast.error(err.response.data.error)
            }
        }
    }

    return (
        <>
            <Box display="flex" alignItems="center" p={1} mt={2} mb={4} flexWrap="wrap" className={classes.root}  >
                <Box borderRadius="50%" borderColor="primary.main" border={2} borderLeft={0} borderBottom={0} p={1} >
                <input type="file" accept="image/*" id="contained-button-file" hidden onChange={event => handleAvatarEdit(event)} />
                <label htmlFor="contained-button-file">
                    <Badge
                    id='badge' 
                    overlap="circle"
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                    }}
                    badgeContent={<CreateOutlinedIcon fontSize="small" />}
                    color="primary"
                    classes={{ badge: classes.badge }}                   
                    >
                        <Avatar
                        id='avatar'
                        style={{ width: "160px", height: '160px', cursor: 'pointer' }}
                        src={`https://expenditserver.herokuapp.com${avatar}`}
                        />
                    </Badge>
                </label>
                </Box>
                <Box px={{ xs: 2, sm: 3, md: 3}} pt={{xs: 2, sm: 2, md:0, lg: 0}} className={classes.info}>
                    <Box>
                        <Typography variant="h4">
                            {username}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography color="secondary" variant="subtitle1">
                            Member since { format( new Date(date), 'MMM yyyy' ) }
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default AvatarContent
