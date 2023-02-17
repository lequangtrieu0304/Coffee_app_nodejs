import axios from "axios";
import { getAdminInfo } from "../localStroge";

export const getAllProduct = async () => {
    try{
        const response = await axios({
            url: `http://localhost:3001/api/products/`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message);
        }
        return response.data;
    }
    catch(err){
        return {
            error: err.response.data.message || err.message
        }
    }
}

export const getProductById = async (id) => {
    try{
        const response = await axios({
            url: `http://localhost:3001/api/products/${id}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message);
        }
        return response.data;
    }
    catch(err){
        return {
            error: err.response.data.message || err.message
        }
    }
}

export const getProductByKey = async ({searchKeyword = ''}) => {
    try{
        let queryString = '?';
        if(searchKeyword){
            queryString += `searchKeyword=${searchKeyword}&`
        }
        const response = await axios({
            url: `http://localhost:3001/api/products${queryString}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if(response.statusText !== 'OK'){
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

export const createProduct = async () => {
    try{
        const { token } = getAdminInfo();
        const response = await axios({
            url: `http://localhost:3001/api/products`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        })
        if(response.statusText !== 'Created'){
            throw new Error(response.data.message)
        }
        return response.data;
    }
    catch (err){
        return {
            error: err.response ? err.response.data.message : err.message
        }
    }
}

export const updatedProduct = async (data) => {
    try {
        const { token } = getAdminInfo();
        const response = await axios({
            url: `http://localhost:3001/api/products/${data._id}`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            data: data,
        })
        if(response.statusText !== 'OK'){
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

export const deleteProduct = async (id) => {
    try{
        const { token } = getAdminInfo();
        const response = await axios({
            url: `http://localhost:3001/api/products/${id}`,
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message);
        }
        return response.data;
    }
    catch(err){
        return {
            error: err.response.data.message || err.message,
        }
    }
}