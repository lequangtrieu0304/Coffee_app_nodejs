import axios from "axios";
import { getUserInfo } from "../localStroge";

export const uploadImage = async (formData) => {
    try {
        const { token } = getUserInfo();
        const response = await axios({
            url: `http://localhost:3500/api/uploads/image`,
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
            data: formData,
        })
        if(response.status !== 201){
            throw new Error(response.data.message)
        }
        return response.data;
    }
    catch(err){
        return {
            error: err.response ? err.response.data.message : err.message
        }
    }
}

export const uploadUser = async (formData) => {
    try {
        const { token } = getUserInfo();
        const response = await axios({
            url: `http://localhost:3500/api/uploads-user/image-user`,
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
            data: formData,
        })
        if(response.status !== 201){
            throw new Error(response.data.message)
        }
        return response.data;
    }
    catch(err){
        return {
            error: err.response ? err.response.data.message : err.message
        }
    }
}