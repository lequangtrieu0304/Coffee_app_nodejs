import axios from "axios";
import { getAdminInfo } from "../localStroge";

export const uploadImage = async (formData) => {
    try {
        const { token } = getAdminInfo();
        const response = await axios({
            url: `http://localhost:3001/api/uploads/image`,
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
            data: formData,
        })
        if(response.statusText !== 'Created'){
            throw new Error(response.data.message)
        }
        return response.data;
    }
    catch(err){
        return {
            error: err.message,
        }
    }
}