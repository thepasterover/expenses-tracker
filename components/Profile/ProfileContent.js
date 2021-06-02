import React, { useState } from 'react'

import AvatarContent from '@components/Profile/SubContents/AvatarContent'
import AccountInfo from '@components/Profile/SubContents/AccountInfo'

import { toast } from 'react-toastify'

import { axiosInstance } from '../../axios'

const ProfileContent = ({user, token}) => {
    const [ formData, setFormData ] = useState({
        username: user.username || '',
        email: user.email || '',
        address: user.address || '',
        city: user.city || '',
        state: user.state || '',
        pincode: user.pincode || '',
        phone: user.phone || '',
        avatar: user.avatar?.url ? user.avatar.url : '/public/images/avatars/default.jpg',
        date: user.date
    })

    const updateProfile = async() => {
        try{
            const res = await axiosInstance.post('/user/profile/update', {
                username: formData.username,
                address: formData.address,
                city: formData.city,
                state: formData.state,
                pincode: formData.pincode,
                phone: formData.phone
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                }
            })
            toast.success(res.data.message)
        } catch(err) {
            if(err.response) {
                toast.error(err.response.data.error)
            }
        }
    }

    return (
        <>
            <AvatarContent 
            username={formData.username} 
            date={formData.date} 
            token={token}
            avatar={formData.avatar}
            date={formData.date}
            />
            <AccountInfo
            data={formData}
            setFormData={setFormData}
            update={updateProfile}
            /> 
        </>
    )
}

export default ProfileContent
