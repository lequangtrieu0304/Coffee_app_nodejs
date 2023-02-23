import axios from 'axios';
import { getUserInfo} from '../localStroge';

export const dailyOrders = async () => {
    try{
        const { token } = getUserInfo();
        const response = await axios({
            url: `http://localhost:3500/api/orders/summary`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        })
        if(response.status !== 200){
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

export const sellingProducts = async () => {
    try{
        const response = await axios({
            url: `http://localhost:3500/api/orders/selling-products`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if(response.status !== 200){
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

export const getAllOrder = async () => {
    try{
        const response = await axios({
            url: `http://localhost:3500/api/orders/`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
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

export const getOrderById = async (id) => {
    try{
        const response = await axios({
            url: `http://localhost:3500/api/orders/${id}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

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

export const createOrderLogin = async (order) => {
    try {
        const { token } = getUserInfo();
        const response = await axios({
            url: `http://localhost:3500/api/orders/auth`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            data: order
        })
        if(response.status !== 201){
            throw new Error(response.data.message);
        }
        return response.data;
    }
    catch (err){
        return {
            error: err.response.data.message || err.message,
        }
    }
}

export const createOrder = async (order) => {
    try {
        const response = await axios({
            url: `http://localhost:3500/api/orders/`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: order
        })
        if(response.status !== 201){
            throw new Error(response.data.message);
        }
        return response.data;
    }
    catch (err){
        return {
            error: err.response.data.message || err.message,
        }
    }
}

