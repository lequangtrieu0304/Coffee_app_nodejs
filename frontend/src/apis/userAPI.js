import axios from "axios";
import { getUserInfo } from "../localStroge";

export const loginAccount = async (data) => {
    try{
        const response = await axios({
            url: `http://localhost:3500/api/users/login`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: data,
        })
        console.log(response);
        if(response.status !== 200){
            throw new Error(response.data.message);
        }
        return response.data;
    }
    catch(err){
        return {
            error: err.response ? err.response.data.message : err.message
        }
    }
}

export const registerAccount = async (data) => {
    try {
        const response = await axios ({
            url: `http://localhost:3500/api/users/register`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: data
        })
        if(response.status !== 200){
            throw new Error(response.data.message);
        }
        return response.data;
    }
    catch (err){
        return {
            error: err.response ? err.response.data.message : err.message 
        }
    }
}


export const updateAccount = async (data) => {
    try {
        const {id, token } = getUserInfo();
        const response = await axios ({
            url: `http://localhost:3500/api/users/update/${id}`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            data: data
        })
        if(response.status !== 200){
            throw new Error(response.data.message);
        }
        return response.data;
    }
    catch (err){
        return {
            error: err.response ? err.response.data.message : err.message 
        }
    }
}