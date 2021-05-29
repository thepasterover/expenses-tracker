import React, { useState } from 'react'

import AvatarContent from '@components/Profile/SubContents/AvatarContent'
import AccountInfo from '@components/Profile/SubContents/AccountInfo'

import { axiosInstance } from '../../axios'

const ProfileContent = ({user, token}) => {
    const [ formData, setFormData ] = useState({
        firstName: user.first_name || '',
        lastName: user.last_name || '',
        email: user.email || '',
        address: user.address || '',
        city: user.city || '',
        state: user.state || '',
        pincode: user.pincode || '',
        phone: user.phone || '',
        avatar: user.avatar.url
    })

    const updateProfile = async() => {
        await axiosInstance.post('/user/profile/update', {
            firstName: formData.firstName,
            lastName: formData.lastName,
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
    }

    return (
        <>
            <AvatarContent 
            firstName={formData.firstName} 
            lastName={formData.lastName} 
            token={token}
            avatar={formData.avatar}
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
